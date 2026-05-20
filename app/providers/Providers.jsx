'use client';

import { NavigationProvider } from "@/app/providers/NavigationProvider";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState, useRef, createContext, useContext, useCallback } from 'react';
import { supabase } from "@/app/lib/services/supabase";
import api from "@/app/lib/services/axios";
import portfolioApi from "@/app/lib/services/portfolioApi";
import blogApi from "@/app/lib/services/blogApi";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

const setAuthHeader = (token) => {
    if (!token) {
        delete api.defaults.headers.common['Authorization'];
        delete portfolioApi.defaults.headers.common['Authorization'];
        delete blogApi.defaults.headers.common['Authorization'];
        return;
    }
    const value = `Bearer ${token}`;
    api.defaults.headers.common['Authorization'] = value;
    portfolioApi.defaults.headers.common['Authorization'] = value;
    blogApi.defaults.headers.common['Authorization'] = value;
};

const buildDisplayName = (firstName, lastName, email) => {
    const combined = `${firstName || ""} ${lastName || ""}`.trim();
    if (combined) return combined;
    if (firstName) return firstName;
    if (email) return email.split("@")[0];
    return "User";
};

const mapSessionToAuthShape = (activeSession, profile = null) => {
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
};

function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [auth, setAuth] = useState(() => mapSessionToAuthShape(null));
    const [initialized, setInitialized] = useState(false);

    // Track the last user_id we resolved a profile for. We use this to skip
    // re-running side effects (re-fetching /user/me, recomputing auth state)
    // when Supabase fires TOKEN_REFRESHED or duplicate INITIAL_SESSION events
    // on tab refocus -- those events carry the same user, so the UI does not
    // need to re-render and consumers should not re-fire their effects.
    const currentUserIdRef = useRef(null);
    const profileCacheRef = useRef({});

    const fetchProfile = useCallback(async (userId) => {
        // Cache profile per user so repeat events don't trigger extra network
        // hits when the same user re-authenticates after tab focus.
        if (profileCacheRef.current[userId]) {
            return profileCacheRef.current[userId];
        }
        try {
            const { data } = await portfolioApi.get('/user/me');
            profileCacheRef.current[userId] = data;
            return data;
        } catch (err) {
            console.warn('Failed to fetch /user/me:', err?.response?.status || err?.message);
            return null;
        }
    }, []);

    useEffect(() => {
        let isMounted = true;

        const applySession = async (activeSession, { force = false } = {}) => {
            if (!isMounted) return;

            const nextUserId = activeSession?.user?.id || null;
            const nextToken = activeSession?.access_token || null;

            // Always keep the bearer header in sync -- this is cheap and means
            // refreshed tokens take effect immediately for outbound API calls
            // without us touching the React tree.
            setAuthHeader(nextToken);

            // Same user as before? This is a TOKEN_REFRESHED or duplicate
            // INITIAL_SESSION event. Skip the React-state churn so consumers
            // do not re-render and listing pages do not re-fetch.
            if (!force && nextUserId === currentUserIdRef.current && nextUserId !== null) {
                return;
            }
            currentUserIdRef.current = nextUserId;

            setSession(activeSession || null);
            // Optimistic auth shape from the session metadata, then refine
            // with the server's /user/me once it returns.
            setAuth(mapSessionToAuthShape(activeSession || null));

            if (nextUserId) {
                const profile = await fetchProfile(nextUserId);
                if (!isMounted) return;
                // Make sure we are still on the same user -- the user could
                // have signed out while /user/me was in flight.
                if (currentUserIdRef.current !== nextUserId) return;
                setAuth(mapSessionToAuthShape(activeSession, profile));
            }
        };

        const initializeSession = async () => {
            const { data } = await supabase.auth.getSession();
            await applySession(data.session || null, { force: true });
            if (isMounted) setInitialized(true);
        };

        initializeSession();

        const { data: listener } = supabase.auth.onAuthStateChange((event, nextSession) => {
            // SIGNED_OUT must always reset the cache and state.
            if (event === 'SIGNED_OUT') {
                profileCacheRef.current = {};
                currentUserIdRef.current = null;
                applySession(null, { force: true });
                return;
            }
            // SIGNED_IN / USER_UPDATED can carry new profile info -- force a
            // refresh. TOKEN_REFRESHED / INITIAL_SESSION just update the
            // bearer token; the dedupe inside applySession handles that.
            const force = event === 'SIGNED_IN' || event === 'USER_UPDATED';
            applySession(nextSession || null, { force });
        });

        return () => {
            isMounted = false;
            listener.subscription.unsubscribe();
        };
    }, [fetchProfile]);

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
