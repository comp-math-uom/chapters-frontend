# Contributing to Chapters Frontend

Thank you for contributing to `chapters-frontend`.

## Workflow

1. Create a feature/fix branch from the current mainline branch.
2. Keep PRs focused and reviewable.
3. Run local quality checks before opening a PR.
4. Include enough context for reviewers to verify behavior quickly.

## Branch Naming

Recommended format:

- `feat/<short-description>`
- `fix/<short-description>`
- `docs/<short-description>`
- `refactor/<short-description>`

## Commit Guidance

- Use clear, imperative commit messages.
- Keep each commit logically coherent.
- Avoid combining unrelated concerns in one commit.

## Pull Request Checklist

- [ ] Changes are scoped to one primary concern
- [ ] `npm run lint` passes
- [ ] Manual verification completed for affected routes
- [ ] Environment/config changes documented in `docs/ENVIRONMENT_REFERENCE.md`
- [ ] New known risks captured in `docs/RISK_REGISTER.md` when relevant
- [ ] Docs updated if behavior/contracts changed

## Testing Expectations

Current repo has limited automated test coverage. Until a test harness is introduced:

- Validate affected user flows manually.
- Include reproducible verification steps in PR description.
- Prefer small, incremental changes in high-risk files:
  - `app/lib/services/blogService.js`
  - `app/lib/services/portfolioService.js`
  - `app/providers/Providers.jsx`

## Code Quality Standards

- Keep API base URLs centralized in service API wrappers.
- Avoid hardcoded identity values (for example static user IDs).
- Avoid introducing new `NEXT_PUBLIC_*` secrets.
- Remove debug-only code before merge (`debugger`, noisy console traces).

## Documentation Standards

If your change impacts setup, architecture, contracts, or runtime behavior, update relevant docs:

- `README.md`
- `docs/ARCHITECTURE.md`
- `docs/API_AND_CONTRACTS.md`
- `docs/DATA_MODELS_AND_STORAGE.md`
- `docs/ENVIRONMENT_REFERENCE.md`
- `docs/RUN_AND_DEPLOY.md`
- `docs/TROUBLESHOOTING.md`
- `docs/RISK_REGISTER.md`

## Security and Secret Handling

- Never commit confidential values to repository-tracked files.
- Treat all `NEXT_PUBLIC_*` values as non-secret by design.
- If a value is sensitive, move handling to a trusted backend path.
