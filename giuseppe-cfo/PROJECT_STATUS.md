# Giuseppe CFO — project status

Date: 2026-08-04  
Branch: `cursor/giuseppe-cfo-a2a2`  
Version target: MVP (local-first accounting/admin)

## 1) What is completed

- Local-only Streamlit app with SQLite persistence.
- Alembic-based schema management and initial migration.
- Safety handling for pre-Alembic local databases (safety backup before stamp).
- Multipage interface:
  - Home (`app/main.py`)
  - Dashboard, Clients, Quotes, Invoices, Expenses, Documents, Reports,
    Backup & Export, Settings, Audit Log.
- Repository workflows:
  - clients: create/update/archive/restore/search/filter
  - quotes: create/edit/status/duplicate/convert
  - invoices: draft/update/send/payment/cancel/archive/copy/overdue refresh
  - expenses: create/update/archive/restore/filter
  - documents: path metadata registration/list
  - settings updates and audit notes
  - audit log listing/filtering
- Services:
  - Decimal-based accounting calculations
  - invoice/quote numbering
  - CSV export per entity
  - Excel export with dashboard/reports/settings summary (bank fields excluded)
  - backup create + restore with typed `RESTORE` confirmation and safety backup
  - secure review-bundle generation with secret scanning
- Optional local password login + session timeout (existing).

## 2) Current limitations (honest)

- Sent-invoice correction is basic; no dedicated credit-note entity yet.
- Document metadata currently has no explicit archive flag.
- Reports are functional but not yet exhaustive across every requested split.
- PDF generation is still deferred.
- Some final UX polish/confirmation flows can be further refined.

## 3) Safety and privacy state

- Database remains local at `data/private/giuseppe_cfo.sqlite3`.
- No cloud sync, no Google/AI/banking/email integrations.
- No telemetry added.
- Review bundle excludes database/documents/exports/backups.
- Planning disclaimer shown; tax/legal uncertainty recorded in `docs/OPEN_QUESTIONS.md`.

## 4) Manual fictional verification (temporary environment)

Performed on temporary database/location using fictional records only:

1. Initialized fresh temp DB via migrations.
2. Created fictional client.
3. Created fictional quote.
4. Marked quote accepted.
5. Converted quote to draft invoice.
6. Marked invoice sent.
7. Recorded partial payment.
8. Recorded final payment.
9. Added fictional expense.
10. Generated clients/quotes/invoices/expenses CSV exports.
11. Generated Excel export.
12. Created backup ZIP.
13. Restored from backup with typed confirmation and safety backup.
14. Generated review bundle.

Result: successful.

## 5) Automated quality results

- `python -m pytest` → **18 passed**
- `python -m ruff check app tests scripts` → **passed**
- `python -m ruff format --check app tests scripts` → **passed**
- `python -m mypy app` → **passed**

## 6) Next recommended work

1. Introduce a dedicated sent-invoice correction workflow.
2. Expand report slices and export options.
3. Add deeper integration tests for end-to-end page interactions.
4. Add document-archive semantics if required.
