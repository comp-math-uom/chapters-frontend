import Keycloak from 'keycloak-js';

let keycloak;

export function getKeycloakInstance() {
    if (!keycloak) {
        keycloak = new Keycloak({
            url: process.env.NEXT_PUBLIC_KEYCLOAK_URL || 'http://localhost:8080', // Change to your Keycloak server URL
            realm: 'uni',
            clientId: 'frontend-client-local', // Change to your client ID

        });
    }
    return keycloak;
} 