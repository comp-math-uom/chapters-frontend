'use client';

import { NavigationProvider } from "@/app/providers/NavigationProvider";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from "@/app/lib/services/supabase";
import api from "@/app/lib/services/axios";
import portfolioApi from "@/app/lib/services/portfolioApi";
import blogApi from "@/app/lib/services/blogApi";

const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

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

    useEffect(() => {
        const setAuthHeader = (token) => {
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
        };

        const mapSessionToAuthShape = (activeSession) => {
            const user = activeSession?.user;
            const metadata = user?.user_metadata || {};
            const appMetadata = user?.app_metadata || {};
            const email = (user?.email || "").toLowerCase();
            const preferredUsername = metadata.username || user?.email?.split("@")[0] || user?.id || null;
            const picture = metadata.avatar_url || metadata.picture || null;
            const roles = Array.isArray(appMetadata.roles) ? appMetadata.roles : [];
            const normalizedRoles = roles.map((role) => String(role).toLowerCase());
            const isAdminEmail = email && ADMIN_EMAILS.includes(email);
            const displayName = metadata.full_name
                || metadata.name
                || [metadata.first_name, metadata.last_name].filter(Boolean).join(" ")
                || metadata.username
                || user?.email?.split("@")[0]
                || user?.id
                || "User";

            return {
                authenticated: Boolean(activeSession?.access_token),
                token: activeSession?.access_token || null,
                roles: normalizedRoles,
                isAdmin: normalizedRoles.includes("admin") || normalizedRoles.includes("moderator") || isAdminEmail,
                displayName,
                tokenParsed: activeSession ? {
                    sub: user?.id || null,
                    email: user?.email || null,
                    preferred_username: preferredUsername,
                    picture,
                    firstName: metadata.first_name || "",
                    lastName: metadata.last_name || "",
                    roles: normalizedRoles,
                    displayName,
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
        };

        let isMounted = true;

        const initializeSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (!isMounted) return;
            setSession(data.session || null);
            setAuthHeader(data.session?.access_token || null);
            setAuth(mapSessionToAuthShape(data.session || null));
            setInitialized(true);
        };

        initializeSession();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
            setSession(nextSession || null);
            setAuthHeader(nextSession?.access_token || null);
            setAuth(mapSessionToAuthShape(nextSession || null));
        });

        return () => {
            isMounted = false;
            listener.subscription.unsubscribe();
        };
    }, []);

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