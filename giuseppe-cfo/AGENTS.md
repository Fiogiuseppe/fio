# Local financial application rules
- Keep everything local; never deploy, publish, or connect an external service without explicit approval.
- Never commit private business data or silently alter/delete financial records.
- Use migrations for schema changes; add tests for calculations; run quality checks after meaningful changes.
- Record uncertain Danish accounting, VAT, tax, or legal questions in `docs/OPEN_QUESTIONS.md`.
- Update `docs/PROJECT_STATUS.md`, `docs/CHANGELOG.md`, and architecture decisions after meaningful changes.
