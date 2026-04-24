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

### Auth / Supabase

- `NEXT_PUBLIC_SUPABASE_URL` (required)
  - Used by: `app/lib/services/supabase.js`
  - Purpose: Supabase project URL (for auth and session APIs)

- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (required)
  - Used by: `app/lib/services/supabase.js`
  - Purpose: Public client key for browser auth flows (safe to expose as intended by Supabase)

- `NEXT_PUBLIC_KEYCLOAK_URL` (legacy/deprecated)
  - Status: no longer used in active frontend auth flow

- `NEXT_PUBLIC_KEYCLOAK_REALM` (legacy/deprecated)
  - Status: no longer used in active frontend auth flow

- `NEXT_PUBLIC_KEYCLOAK_CLIENT_ID` (legacy/deprecated)
  - Status: no longer used in active frontend auth flow

- `NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET` (unsafe/deprecated)
  - Status: must not be used in frontend runtime

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
- Ensure Supabase redirect URL configuration includes your local host/port.
- Avoid using production credentials.

### Staging/Production

- Validate Supabase URL/key and auth redirect settings before release.
- Inject env values through deployment platform/CI secrets, not committed `.env` files.
- Re-check that no secret-like value exists in `NEXT_PUBLIC_*`.

## Validation Checklist

- `npm run dev` starts without env-related crashes.
- Login flow initializes and creates/restores Supabase session correctly.
- Blog and portfolio pages can fetch data.
- Image upload path works only with approved endpoint/key configuration.

## Related Docs

- `docs/RUN_AND_DEPLOY.md`
- `docs/TROUBLESHOOTING.md`
- `docs/RISK_REGISTER.md`
