# Environment Reference

This document defines runtime variables used by `chapters-frontend`, with safety guidance.

## Safety Rule

Any variable prefixed with `NEXT_PUBLIC_` is exposed to browser code and can be inspected by users.  
Never store confidential server secrets in `NEXT_PUBLIC_*` variables.

## Variable Catalog

### API Endpoints

- `NEXT_PUBLIC_BLOG_API` (required)
  - Used by: `app/lib/services/blogApi.js`, `app/lib/services/blogService.js`
  - Purpose: base URL for blog API calls
  - Example: `https://aistudentchapter.lk/api/v1`

- `NEXT_PUBLIC_PORTFOLIO_API_URL` (required)
  - Used by: `app/lib/services/portfolioApi.js`, `app/lib/services/portfolioService.js`
  - Purpose: base URL for portfolio API calls
  - Example: `http://127.0.0.1:8080/`

- `NEXT_PUBLIC_API_BASE_URL` (optional/legacy)
  - Purpose: generic API base variable
  - Note: currently not the primary source for service wrappers

### Auth / Keycloak

- `NEXT_PUBLIC_KEYCLOAK_URL` (required)
  - Used by: `app/lib/services/keycloak.js`
  - Purpose: Keycloak server URL

- `NEXT_PUBLIC_KEYCLOAK_REALM` (required)
  - Used by: `app/lib/services/keycloak.js`
  - Purpose: Keycloak realm

- `NEXT_PUBLIC_KEYCLOAK_CLIENT_ID` (required)
  - Used by: `app/lib/services/keycloak.js`
  - Purpose: Keycloak client id for browser auth flow

- `NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI` (required in most environments)
  - Purpose: redirect destination after auth flows
  - Example: `http://localhost:3000`

- `NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET` (not safe for frontend; should be removed)
  - Risk: browser-visible secret exposure
  - Action: remove from frontend env contract and move to backend-only secret handling

### Media Upload

- `NEXT_PUBLIC_IMAGE_UPLOAD_API` (required for image upload features)
  - Used by:
    - `app/components/blog/BlogSettingsForm.jsx`
    - `app/lib/services/portfolioService.js`
  - Purpose: upload endpoint URL
  - Example: `https://api.imgbb.com/1/upload`

- `NEXT_PUBLIC_IMAGEBB_API_KEY` (public third-party token; still sensitive from abuse perspective)
  - Used by:
    - `app/components/blog/BlogSettingsForm.jsx`
    - `app/lib/services/portfolioService.js`
  - Risk: quota/billing misuse if leaked
  - Action: rotate regularly and consider moving uploads behind a backend proxy

## Environment Profiles

### Local Development

- Point API URLs to local/dev instances.
- Keep auth redirect URI aligned with local host/port.
- Avoid using production credentials.

### Staging/Production

- Validate all URLs before release (including Keycloak URL correctness).
- Inject env values through deployment platform/CI secrets, not committed `.env` files.
- Re-check that no secret-like value exists in `NEXT_PUBLIC_*`.

## Validation Checklist

- `npm run dev` starts without env-related crashes.
- Login flow initializes without Keycloak configuration errors.
- Blog and portfolio pages can fetch data.
- Image upload path works only with approved endpoint/key configuration.

## Related Docs

- `docs/RUN_AND_DEPLOY.md`
- `docs/TROUBLESHOOTING.md`
- `docs/RISK_REGISTER.md`
