# Chapters Frontend API and Contracts

## Outbound API Clients
- `app/lib/services/blogApi.js`: Axios instance with `NEXT_PUBLIC_BLOG_API`.
- `app/lib/services/portfolioApi.js`: Axios instance with `NEXT_PUBLIC_PORTFOLIO_API_URL`.

Service wrappers:
- `app/lib/services/blogService.js`
- `app/lib/services/portfolioService.js`

## Blog Contract Expectations
- Public reads via `/blogs/public/*`.
- Mutations via `/blogs/createblog`, `/blogs/updateblog/{id}`, `/blogs/blogs/{id}`, etc.
- Auth may be sent using bearer token and/or `x-user-id` depending on current service method.

## Portfolio Contract Expectations
- Reads: `/projects/all`, `/projects/{id}`, `/projects/search`.
- Mutations: `/projects/create`, `/projects/{id}`, `/projects/{id}/featured`.
- Protected routes require bearer token accepted by backend role guards.

## Identity Contract
- Keycloak init fields:
  - `NEXT_PUBLIC_KEYCLOAK_URL`
  - `NEXT_PUBLIC_KEYCLOAK_REALM`
  - `NEXT_PUBLIC_KEYCLOAK_CLIENT_ID`
- Access token is set into Axios defaults for primary API clients.
- Browser auth initialization and lifecycle are managed in `app/providers/Providers.jsx`.

## Known Contract Drift
- Some service methods still use static local data (`photos`, `contributors`, `batches`).
- `authService` signup uses a hardcoded absolute URL rather than shared API base config.
- One portfolio update method points to local `http://localhost:3000/portfolio`.

## Contract Safety Guidance
- Treat backend route prefixes as strict contracts.
- Keep all outbound URLs centralized in API wrappers/env vars.
- Avoid hardcoded user identity headers in client logic.
- Treat client-provided identity headers as non-authoritative; backend should enforce identity from token claims.

## Verification After Contract Changes

When backend routes/contracts change:

1. Update service wrapper paths in one place.
2. Validate blog list/detail/mutation flows.
3. Validate portfolio list/search/mutation flows.
4. Verify auth-protected endpoints with an authenticated session.
5. Record known drift or temporary adapters in `docs/RISK_REGISTER.md`.

## Related Docs

- `docs/ARCHITECTURE.md`
- `docs/DATA_MODELS_AND_STORAGE.md`
- `docs/ENVIRONMENT_REFERENCE.md`
- `docs/TROUBLESHOOTING.md`
- `docs/RISK_REGISTER.md`
