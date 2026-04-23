# Onboarding Guide

This guide helps new contributors run and validate `chapters-frontend` quickly and safely.

## 1) Prerequisites

- Node.js 18+ and npm
- Git
- Docker + Docker Compose (optional, but recommended for parity checks)
- Access to required backend/auth environments (blog API, portfolio API, Keycloak)

## 2) Clone and Install

```sh
git clone <repo-url>
cd chapters-frontend
npm install
```

## 3) Configure Environment

1. Create a `.env` file in repo root.
2. Fill required values from your environment owner.
3. Use `docs/ENVIRONMENT_REFERENCE.md` for the full variable list and safe-value guidance.

Important:
- Treat `NEXT_PUBLIC_*` as browser-visible. Do not place secrets in these values.
- If a server-side secret is required by an integration, it must be moved out of the frontend runtime contract.

## 4) Run the App

### Option A: npm

```sh
npm run dev
```

### Option B: Docker Compose

```sh
docker compose -f docker-compose.dev.yml up --build
```

Open `http://localhost:3000`.

## 5) First-Day Validation Flow

Use this smoke pass after setup:

1. Open `/` and confirm no render crash.
2. Open `/blog` and confirm list fetch succeeds.
3. Open one blog detail page and verify comments load.
4. Open `/portfolio` and confirm gallery/search behavior renders.
5. Trigger sign-in from navbar and verify Keycloak redirect/login flow starts.
6. After login, verify authenticated UI controls appear.

If any step fails, use `docs/TROUBLESHOOTING.md`.

## 6) Key Code Areas to Learn First

- App shell and providers:
  - `app/layout.jsx`
  - `app/providers/Providers.jsx`
- Feature routes:
  - `app/(blog)/...`
  - `app/(portfolio)/...`
  - `app/(auth)/...`
- Service layer:
  - `app/lib/services/blogService.js`
  - `app/lib/services/portfolioService.js`
  - `app/lib/services/keycloak.js`

## 7) Safe Contribution Rules

- Keep API base URLs centralized in service API wrappers.
- Avoid hardcoding user identity, tokens, or environment-specific URLs.
- Do not introduce new client-visible secrets.
- Run lint before opening a PR.

See `CONTRIBUTING.md` for the full workflow.
