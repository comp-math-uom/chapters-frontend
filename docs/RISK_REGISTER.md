# Risk Register

This register tracks current technical and operational risks in `chapters-frontend`.

Status values:
- `Open`
- `Mitigating`
- `Resolved`

## Risk Template

Each entry includes:
- Risk ID
- Severity
- Affected area
- Evidence
- Impact
- Likelihood
- Short-term mitigation
- Long-term remediation
- Validation steps
- Status
- Owner

---

## RISK-001: Sensitive values exposed via browser-public env vars

- Severity: Critical
- Affected area: Environment and security posture
- Evidence:
  - `.env` includes `NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET`
  - `.env` includes `NEXT_PUBLIC_IMAGEBB_API_KEY`
- Impact:
  - Potential credential/key abuse, quota burn, and security incidents.
- Likelihood: High
- Short-term mitigation:
  - Rotate exposed values.
  - Remove committed `.env` from version control policy where applicable.
- Long-term remediation:
  - Remove secret-like values from all `NEXT_PUBLIC_*`.
  - Move sensitive operations behind backend-controlled endpoints.
- Validation steps:
  1. Confirm no secret values exist in frontend public env namespace.
  2. Verify app functions with rotated/non-sensitive public vars.
- Status: Open
- Owner: TBD

## RISK-002: Malformed production Keycloak URL can break auth

- Severity: High
- Affected area: Production authentication
- Evidence:
  - `docker-compose.prod.yml` contains `NEXT_PUBLIC_KEYCLOAK_URL=http://localhost:8080why`
- Impact:
  - Login and auth lifecycle may fail entirely in deployed container.
- Likelihood: High
- Short-term mitigation:
  - Correct URL value and redeploy.
- Long-term remediation:
  - Validate compose env values in CI before release.
- Validation steps:
  1. Start container with corrected env.
  2. Verify Keycloak init and login flow.
- Status: Open
- Owner: TBD

## RISK-003: Fragile token handling and module-scope localStorage access

- Severity: High
- Affected area: Auth/session reliability
- Evidence:
  - `app/lib/services/blogService.js` reads `window.localStorage` at module scope.
  - Requests in same service use token snapshots that can become stale.
- Impact:
  - Runtime inconsistencies, SSR/client-boundary failures, or unauthorized API calls.
- Likelihood: Medium-High
- Short-term mitigation:
  - Move token reads into runtime-safe paths.
  - Prefer provider-managed Axios authorization defaults.
- Long-term remediation:
  - Consolidate auth header behavior across services.
  - Add regression tests around auth request flow.
- Validation steps:
  1. Login, refresh token, then perform blog mutations.
  2. Confirm request headers remain valid after token lifecycle events.
- Status: Open
- Owner: TBD

## RISK-004: Hardcoded user identity values in blog mutations

- Severity: High
- Affected area: Authorization and data integrity
- Evidence:
  - `app/components/blog/BlogHeader.jsx` uses hardcoded `userId = '1'`.
  - `app/lib/services/blogService.js` sets `x-user-id` fallback to `'1'` in mutation paths.
- Impact:
  - Incorrect ownership attribution and potential unauthorized action behavior.
- Likelihood: High
- Short-term mitigation:
  - Remove hardcoded values from mutation headers.
  - Use authenticated identity from Keycloak context/claims.
- Long-term remediation:
  - Enforce backend-derived identity and stop trusting client-supplied user IDs where possible.
- Validation steps:
  1. Perform mutations as multiple users.
  2. Confirm backend ownership and audit fields match authenticated subject.
- Status: Open
- Owner: TBD

## RISK-005: Portfolio service has endpoint/config drift

- Severity: Medium
- Affected area: Portfolio API integration
- Evidence:
  - `app/lib/services/portfolioService.js` includes hardcoded local URL (`http://localhost:3000/portfolio`) in update path.
  - Mixed use of `portfolioApi` and standalone `axios` calls.
- Impact:
  - Environment-specific failures and inconsistent behavior across methods.
- Likelihood: Medium
- Short-term mitigation:
  - Replace hardcoded URLs with env-driven API wrappers.
- Long-term remediation:
  - Standardize all portfolio requests through `portfolioApi`.
- Validation steps:
  1. Exercise portfolio create/update/read/search in local and deployed profiles.
  2. Confirm all requests target expected backend host and prefix.
- Status: Open
- Owner: TBD

## RISK-006: Error-path bug can mask root causes

- Severity: Medium
- Affected area: Observability and debugging
- Evidence:
  - `app/lib/services/blogService.js` references undefined `blogId` in `addBlogComment` catch block.
- Impact:
  - Secondary errors can hide original failure reason.
- Likelihood: Medium
- Short-term mitigation:
  - Fix error handler variable usage.
- Long-term remediation:
  - Add lint/static checks for undefined references and improve error logging patterns.
- Validation steps:
  1. Trigger failed comment submission.
  2. Confirm logged error represents root cause without secondary exception.
- Status: Open
- Owner: TBD

## RISK-007: Minimal automated tests increase regression risk

- Severity: Medium
- Affected area: Delivery quality
- Evidence:
  - `package.json` has no `test` script.
  - No repository test suite for critical auth/service flows.
- Impact:
  - High probability of unnoticed regressions in release cycles.
- Likelihood: High
- Short-term mitigation:
  - Require manual smoke checklist in PRs.
- Long-term remediation:
  - Introduce unit/integration testing harness for service/auth/route-critical paths.
- Validation steps:
  1. Add baseline test command and CI gate.
  2. Ensure at least core blog/portfolio/auth scenarios are covered.
- Status: Open
- Owner: TBD

## RISK-008: Debug artifacts in runtime code paths

- Severity: Low
- Affected area: Developer experience and runtime hygiene
- Evidence:
  - `debugger;` statements and noisy logs in service/form code paths.
- Impact:
  - Debug interruptions and lower signal-to-noise during support/debugging.
- Likelihood: Medium
- Short-term mitigation:
  - Remove `debugger` and excessive logs from production paths.
- Long-term remediation:
  - Add lint rule/policy to prevent debug artifacts in merge-ready branches.
- Validation steps:
  1. Search codebase for `debugger;`.
  2. Confirm lint/CI blocks new debug artifacts.
- Status: Open
- Owner: TBD

---

## Review Cadence

- Review this register at least once per sprint.
- Update status and owner fields as mitigation work lands.
- Link relevant issues/PRs when available.
