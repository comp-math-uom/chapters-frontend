'use client';

import { NavigationProvider } from "@/app/providers/NavigationProvider";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState, createContext, useContext } from 'react';
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
            const preferredUsername = metadata.username || user?.email?.split("@")[0] || user?.id || null;
            const picture = metadata.avatar_url || metadata.picture || null;

            return {
                authenticated: Boolean(activeSession?.access_token),
                token: activeSession?.access_token || null,
                tokenParsed: activeSession ? {
                    sub: user?.id || null,
                    email: user?.email || null,
                    preferred_username: preferredUsername,
                    picture,
                    firstName: metadata.first_name || "",
                    lastName: metadata.last_name || ""
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