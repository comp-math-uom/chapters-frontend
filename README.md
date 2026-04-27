# Chapters Frontend

`chapters-frontend` is a Next.js (App Router) client for the UOM AI Chapter portal. It contains:

- Blog experiences (list, read, create, edit)
- Portfolio experiences (gallery, create, update, search)
- Keycloak-based browser authentication and role-aware UI actions

## Quickstart

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose (optional, for containerized runs)

### Local Run (npm)

1. Install dependencies:

```sh
npm install
```

2. Create/update your `.env` file (see `docs/ENVIRONMENT_REFERENCE.md`).
3. Start the development server:

```sh
npm run dev
```

4. Open `http://localhost:3000`.

### Local Run (Docker Compose)

```sh
docker compose -f docker-compose.dev.yml up --build
```

Open `http://localhost:3000`.

## Build and Start (Production Mode)

```sh
npm run build
npm run start
```

For container deployment details, see `docs/RUN_AND_DEPLOY.md`.

## Project Structure

- `app/(blog)/*`: blog routes and feature UI
- `app/(portfolio)/*`: portfolio routes and feature UI
- `app/(auth)/*`: signup/auth-related routes
- `app/components/*`: shared and feature components
- `app/lib/services/*`: API wrappers and service-layer logic
- `app/providers/*`: app-wide providers (auth, navigation, UI)
- `docs/*`: operational and architecture documentation

## Documentation Map

- `docs/ONBOARDING.md`: setup path for new contributors
- `docs/ARCHITECTURE.md`: route, provider, data flow, and auth architecture
- `docs/API_AND_CONTRACTS.md`: external API contracts and integration assumptions
- `docs/DATA_MODELS_AND_STORAGE.md`: data sources, mappings, and storage model
- `docs/ENVIRONMENT_REFERENCE.md`: environment variable catalog and safety guidance
- `docs/RUN_AND_DEPLOY.md`: local runtime and deployment runbook
- `docs/TROUBLESHOOTING.md`: symptom-based debugging guide
- `CONTRIBUTING.md`: branch, PR, and quality workflow
- `docs/RISK_REGISTER.md`: prioritized current risks and mitigations
- `docs/AI_AGENT_NOTES.md`: safety notes for AI-assisted edits

## First-Run Validation Checklist

- Home page loads without runtime errors
- Blog listing page renders and can fetch data
- Portfolio listing page renders and can fetch data
- Sign in/out action appears in navbar as expected
- No obvious console/network failures for base API/auth configuration

## Current Known Risks

The active issue inventory is tracked in `docs/RISK_REGISTER.md`. High priority items currently include:

- Sensitive value exposure via client-public environment variables
- Production auth URL misconfiguration risk in compose config
- Hardcoded identity and token-handling fragility in service-layer calls

## Scripts

- `npm run dev`: start development server
- `npm run build`: create production build
- `npm run start`: run production server
- `npm run lint`: run Next.js lint checks