# Chapters Frontend Run and Deploy

## Local Development
- Install: `npm install`
- Run dev server: `npm run dev`
- App default URL: `http://localhost:3000`
- Setup details for new contributors: `docs/ONBOARDING.md`

## Production Build
- Build: `npm run build`
- Start: `npm run start`

## Container Workflow
- Dockerfile present for production image.
- Compose files:
  - `docker-compose.dev.yml`
  - `docker-compose.prod.yml`

Recommended local container run:

```sh
docker compose -f docker-compose.dev.yml up --build
```

## CI/Delivery
- GitHub workflow exists for Docker image build/push on version tag events.

## Required Runtime Env
- API base URLs for blog and portfolio backends.
- Supabase URL and anon key settings.
- Image upload endpoint and key values.
- Full variable reference: `docs/ENVIRONMENT_REFERENCE.md`

## Deployment Caveats
- Ensure no secret-like values are shipped in `NEXT_PUBLIC_*`.
- Validate backend URL/prefix correctness before deploy.
- Remove debug statements and hardcoded identity fallbacks from production code paths.

## Deployment Runbook (Minimum)

1. Validate env values for target environment.
2. Build artifact/image from current release commit.
3. Deploy with target environment config injection.
4. Run post-deploy smoke checks.
5. Roll back if critical auth/API flows fail.

## Vercel local-files deployment order (recommended)

Use this order to avoid broken production rollouts:

1. `vercel remove chapters-frontend --yes` (only when you need a full reset)
2. `vercel link --yes` (recreate/link project)
3. Add production env vars first (`vercel env add ... production`)
4. Deploy from local files: `vercel --prod --yes`
5. Verify `/blog` and `/portfolio` on the new deployment URL
6. If blog API calls fail with CORS, update backend `BACKEND_CORS_ORIGINS` with the new frontend domain and redeploy backend

## Post-Deploy Smoke Checklist

- `/` renders successfully.
- `/blog` list request succeeds.
- `/portfolio` list/search request succeeds.
- Supabase login flow initializes and returns correctly.
- Authenticated mutation path can be exercised in a safe environment.

## Rollback Guidance

- Revert to prior stable image/tag.
- Reapply known-good env configuration.
- Confirm smoke checklist passes on rollback target.

## Related Docs

- `README.md`
- `docs/ONBOARDING.md`
- `docs/ENVIRONMENT_REFERENCE.md`
- `docs/TROUBLESHOOTING.md`
- `docs/RISK_REGISTER.md`
