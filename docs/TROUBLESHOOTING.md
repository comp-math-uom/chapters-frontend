# Troubleshooting Guide

Use this guide to debug common local and deployment issues in `chapters-frontend`.

## 1) App does not start locally

### Symptoms
- `npm run dev` fails on startup
- Missing module/build errors

### Checks
- Confirm Node.js version is 18+
- Run `npm install` again
- Clear stale build output (`.next`) if needed

### Fix
- Reinstall dependencies and restart dev server.
- Resolve package lock drift before continuing.

## 2) Page loads, but API calls fail

### Symptoms
- Empty blog/portfolio lists
- 4xx/5xx in browser network tab

### Checks
- Verify `NEXT_PUBLIC_BLOG_API` and `NEXT_PUBLIC_PORTFOLIO_API_URL`
- Confirm backend services are reachable from browser network
- Compare called paths with `docs/API_AND_CONTRACTS.md`

### Fix
- Correct endpoint base URLs.
- Align frontend paths to backend contract.

## 3) Sign in flow fails or loops

### Symptoms
- Repeated redirects
- Supabase session/init errors
- Missing token behavior

### Checks
- Validate:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Ensure Supabase URL is valid and matches your project.
- Inspect browser console and network calls to Supabase auth endpoints.

### Fix
- Correct Supabase env values and restart app.
- Ensure redirect URL/callback settings are allowed in Supabase.

## 4) Blog page works locally but fails on Vercel (CORS)

### Symptoms
- Browser console shows CORS errors against `/api/v1/blogs/public/blogs`
- Preflight returns `Disallowed CORS origin`

### Checks
- Confirm frontend production domain (or new Vercel alias) is included in backend `BACKEND_CORS_ORIGINS`
- Verify backend preflight manually:
  - `OPTIONS https://chapters-blogs-backend.vercel.app/api/v1/blogs/public/blogs`
  - `Origin: https://<your-frontend-domain>`

### Fix
- Add missing frontend domain to backend `BACKEND_CORS_ORIGINS` JSON array
- Redeploy backend (`vercel --prod --yes`)
## 5) Authenticated actions fail (create/edit/delete)

### Symptoms
- Mutations return unauthorized/forbidden
- UI shows auth state but backend denies operations

### Checks
- Confirm bearer token is attached on outgoing requests.
- Validate token freshness after refresh flow.
- Inspect service-layer identity headers for hardcoded/stale values.

### Fix
- Ensure provider token lifecycle sets Axios defaults correctly.
- Remove/replace hardcoded identity values with authenticated user context.

## 6) Image upload fails

### Symptoms
- Upload spinner fails
- Third-party API returns unauthorized/rate-limit errors

### Checks
- Validate:
  - `NEXT_PUBLIC_IMAGE_UPLOAD_API`
  - `NEXT_PUBLIC_IMAGEBB_API_KEY`
- Check upload endpoint availability and quota usage.

### Fix
- Update/rotate API key.
- Prefer backend-proxied upload architecture for stronger control.

## 7) Docker container runs but app is broken

### Symptoms
- Container starts but auth/API features fail
- Environment-specific behavior differs from local npm run

### Checks
- Review compose env values, especially auth URL values.
- Confirm container receives expected environment variables.
- Compare dev and prod compose differences.

### Fix
- Correct compose env variables and rebuild container.
- Use deployment env injection instead of static committed values.

## 8) Build succeeds, runtime behavior is inconsistent

### Symptoms
- Works in one route but not another
- Data differs across pages

### Checks
- Check for mixed static and API data paths in feature service methods.
- Confirm each route uses intended service source.

### Fix
- Consolidate route behavior on API-backed paths where possible.
- Remove stale static fallbacks after backend parity is confirmed.

## Escalation Checklist

When filing an issue/PR:
- Include failing route and exact action
- Include environment profile (local/dev/prod)
- Attach console and network error details
- Reference impacted service file and endpoint
- Link related entry in `docs/RISK_REGISTER.md` when applicable

## Related Docs

- `docs/ENVIRONMENT_REFERENCE.md`
- `docs/API_AND_CONTRACTS.md`
- `docs/RUN_AND_DEPLOY.md`
- `docs/RISK_REGISTER.md`
