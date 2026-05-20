'use client';

import { NavigationProvider } from "@/app/providers/NavigationProvider";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState, createContext, useContext, useCallback } from 'react';
import { supabase } from "@/app/lib/services/supabase";
import api from "@/app/lib/services/axios";
import portfolioApi from "@/app/lib/services/portfolioApi";
import blogApi from "@/app/lib/services/blogApi";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [auth, setAuth] = useState({
        authenticated: false,
        token: null,
        tokenParsed: null,
        role: null,
        login: async () => {
            if (typeof window !== "undefined") {
                window.location.href = "/auth/login";
            }
        },
        logout: async () => {
            await supabase.auth.signOut();
        }
    });
    const [initialized, setInitialized] = useState(false);

    const setAuthHeader = useCallback((token) => {
        if (!token) {
            delete api.defaults.headers.common['Authorization'];
            delete portfolioApi.defaults.headers.common['Authorization'];
            delete blogApi.defaults.headers.common['Authorization'];
            return;
        }
        const authHeader = `Bearer ${token}`;
        api.defaults.headers.common['Authorization'] = authHeader;
        portfolioApi.defaults.headers.common['Authorization'] = authHeader;
        blogApi.defaults.headers.common['Authorization'] = authHeader;
    }, []);

    const buildDisplayName = (firstName, lastName, email) => {
        const combined = `${firstName || ""} ${lastName || ""}`.trim();
        if (combined) return combined;
        if (firstName) return firstName;
        if (email) return email.split("@")[0];
        return "User";
    };

    const mapSessionToAuthShape = useCallback((activeSession, profile = null) => {
        const user = activeSession?.user;
        const metadata = user?.user_metadata || {};
        const firstName = profile?.first_name ?? metadata.first_name ?? "";
        const lastName = profile?.last_name ?? metadata.last_name ?? "";
        const email = user?.email || profile?.email || null;
        const picture = metadata.avatar_url || metadata.picture || null;
        const displayName = buildDisplayName(firstName, lastName, email);
        const role = profile?.role || null;

        return {
            authenticated: Boolean(activeSession?.access_token),
            token: activeSession?.access_token || null,
            role,
            tokenParsed: activeSession ? {
                sub: user?.id || null,
                email,
                preferred_username: metadata.username || null,
                picture,
                firstName,
                lastName,
                displayName,
                role,
            } : null,
            login: async () => {
                if (typeof window !== "undefined") {
                    window.location.href = "/auth/login";
                }
            },
            logout: async () => {
                await supabase.auth.signOut();
            }
        };
    }, []);

    // Pull /user/me (role + canonical first/last) once we have a token.
    const fetchProfile = useCallback(async () => {
        try {
            const { data } = await portfolioApi.get('/user/me');
            return data;
        } catch (err) {
            // Non-fatal: caller falls back to JWT metadata.
            console.warn('Failed to fetch /user/me:', err?.response?.status || err?.message);
            return null;
        }
    }, []);

    useEffect(() => {
        let isMounted = true;

        const applySession = async (activeSession) => {
            if (!isMounted) return;
            setSession(activeSession || null);
            setAuthHeader(activeSession?.access_token || null);

            // Optimistic update from session metadata first…
            setAuth(mapSessionToAuthShape(activeSession || null));

            // …then refine with /user/me if we have a token.
            if (activeSession?.access_token) {
                const profile = await fetchProfile();
                if (!isMounted) return;
                setAuth(mapSessionToAuthShape(activeSession, profile));
            }
        };

        const initializeSession = async () => {
            const { data } = await supabase.auth.getSession();
            await applySession(data.session || null);
            if (isMounted) setInitialized(true);
        };

        initializeSession();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
            applySession(nextSession || null);
        });

        return () => {
            isMounted = false;
            listener.subscription.unsubscribe();
        };
    }, [setAuthHeader, mapSessionToAuthShape, fetchProfile]);

    return (
        <AuthContext.Provider value={{ auth, initialized, session }}>
            {children}
        </AuthContext.Provider>
    );
}

export function Providers({ children }) {
    return (
        <AuthProvider>
            <NavigationProvider>
                <ChakraProvider>
                    {children}
                </ChakraProvider>
            </NavigationProvider>
        </AuthProvider>
    );
}
