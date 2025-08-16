import Keycloak from 'keycloak-js';

let keycloak;

export function getKeycloakInstance() {
    if (!keycloak) {
        keycloak = new Keycloak({
            url: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
            realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM,
            clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
        });
    }
    return keycloak;
} 