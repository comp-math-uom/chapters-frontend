# Chapters Frontend AI Agent Notes

## High-Risk Files
- `app/lib/services/blogService.js`
- `app/lib/services/portfolioService.js`
- `app/providers/Providers.jsx`
- Feature pages that handle create/update forms and auth-aware mutations

## Known Pitfalls
- `window.localStorage` used at import time in blog service.
- Hardcoded `x-user-id` fallbacks (`'1'`) in mutation methods.
- Debugger statements in runtime code.
- Mixed static-content and live-API data paths in portfolio flows.

## Safe Edit Strategy
1. Keep API wrappers (`blogApi`, `portfolioApi`) as single source of base URL.
2. Move token access into runtime-safe client-only execution paths.
3. Remove hardcoded identities before extending authenticated features.
4. Validate both blog and portfolio pages after service-layer changes.

## Verification Checklist
- Dev server builds and renders target pages.
- Authenticated requests include valid bearer token and no fake user headers.
- Create/edit/delete operations map to correct backend endpoints.
- No `debugger;` or environment-specific hacks remain in production paths.

## Related Docs
- `docs/ARCHITECTURE.md`
- `docs/API_AND_CONTRACTS.md`
- `docs/ENVIRONMENT_REFERENCE.md`
- `docs/RISK_REGISTER.md`
