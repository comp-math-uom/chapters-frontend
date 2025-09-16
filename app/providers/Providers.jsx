'use client';

import { NavigationProvider } from "@/app/providers/NavigationProvider";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState, createContext, useContext } from 'react';
import { getKeycloakInstance } from "@/app/lib/services/keycloak";
import api from "@/app/lib/services/axios";
import portfolioApi from "@/app/lib/services/portfolioApi";
import blogApi from "@/app/lib/services/blogApi";

const KeycloakContext = createContext();

export function useKeycloak() {
    return useContext(KeycloakContext);
}

function KeycloakProvider({ children }) {
    const [keycloak, setKeycloak] = useState(null);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const kc = getKeycloakInstance();
        if (!kc.__initialized) {
            kc.init({ onLoad: 'check-sso', pkceMethod: 'S256', silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html' })
                .then(authenticated => {
                    setInitialized(true);
                    if (authenticated) {
                        localStorage.setItem('kc_access_token', kc.token);
                        localStorage.setItem('kc_refresh_token', kc.refreshToken);
                    }
                })
                .catch(() => setInitialized(true));
            kc.__initialized = true;
        } else {
            setInitialized(true);
        }
        setKeycloak(kc);
    }, []);

    useEffect(() => {
        if (keycloak) {
            const setAuthHeader = (token) => {
                const authHeader = `Bearer ${token}`;
                api.defaults.headers.common['Authorization'] = authHeader; // For your other service if needed
                portfolioApi.defaults.headers.common['Authorization'] = authHeader; // For the portfolio service
                blogApi.defaults.headers.common['Authorization'] = authHeader; // For the portfolio service
            };

            const removeAuthHeader = () => {
                delete api.defaults.headers.common['Authorization'];
                delete portfolioApi.defaults.headers.common['Authorization'];
                delete blogApi.defaults.headers.common['Authorization'];
            };

            keycloak.onAuthSuccess = () => {
                localStorage.setItem('kc_access_token', keycloak.token);
                setAuthHeader(keycloak.token);
            };
            keycloak.onTokenRefresh = () => {
                localStorage.setItem('kc_access_token', keycloak.token);
                setAuthHeader(keycloak.token);
            };
            keycloak.onAuthLogout = () => {
                localStorage.removeItem('kc_access_token');
                removeAuthHeader();
            };

            // Set header if already authenticated
            if (keycloak.authenticated && keycloak.token) {
                setAuthHeader(keycloak.token);
            }
        }
    }, [keycloak]);

    return (
        <KeycloakContext.Provider value={{ keycloak, initialized }}>
            {children}
        </KeycloakContext.Provider>
    );
}

export function Providers({children}) {
    return (
        <KeycloakProvider>
            <NavigationProvider>
                <ChakraProvider>
                    {children}
                </ChakraProvider>
            </NavigationProvider>
        </KeycloakProvider>
    );
}