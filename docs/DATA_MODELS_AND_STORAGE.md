# Chapters Frontend Data Models and Storage

## State and Data Sources
- Primary dynamic data from backend APIs (blog + portfolio).
- Secondary/local data from static files under `app/data/*` for some portfolio flows.
- Feature pages generally keep state with `useState` and React context providers.

## Client Storage
- `localStorage` stores:
  - `kc_access_token`
  - `kc_refresh_token`
- Axios auth headers are initialized from Keycloak events/provider lifecycle.

## UI Data Patterns
- Blog preview/list and comments fetched from blog API service.
- Portfolio gallery maps backend project shape into UI gallery shape.
- Forms submit transformed payload objects to service methods.
- Navigation/UI action state is shared through provider context where needed.

## Data Integrity Risks
- Module-scope `window.localStorage` access in service code can fail under SSR/build conditions.
- Mixed static/API paths can make behavior non-deterministic across pages/features.
- Hardcoded user identifiers in some service methods can corrupt ownership/auth assumptions.

## AI Agent Guidance
- Keep data mapping logic near service boundaries.
- Avoid widening local-storage token usage without explicit security review.
- Remove static fallback paths only with verified replacement API coverage.

## Recommended Data Hygiene Rules

- Prefer one source of truth per feature path (API over static fallback where available).
- Keep mapping logic explicit in service methods, not spread across components.
- Do not cache auth-sensitive data at module scope.
- Use defensive checks for nullable/partial backend payloads.

## Related Docs

- `docs/ARCHITECTURE.md`
- `docs/API_AND_CONTRACTS.md`
- `docs/ENVIRONMENT_REFERENCE.md`
- `docs/RISK_REGISTER.md`
