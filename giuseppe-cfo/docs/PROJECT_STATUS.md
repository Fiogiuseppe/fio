# Project status

## Current stage
Stable local MVP in active hardening.

## Completed functionality
- Alembic migration workflow with migration-aware startup.
- Local SQLite persistence and schema-safe initialisation.
- Multipage Streamlit structure:
  - Dashboard
  - Clients
  - Quotes
  - Invoices
  - Expenses
  - Documents
  - Reports
  - Backup and Export
  - Settings
  - Audit Log
- Core lifecycle operations:
  - client create/edit/archive/restore
  - quote create/edit/status/duplicate/convert
  - invoice draft/send/payment/cancel/archive/copy
  - expense create/edit/archive/restore
- Local CSV and Excel exports.
- Local backup and restore with typed confirmation and safety backup.
- Audit log recording across major operations.
- Secure review-bundle generation with secret scanning.

## Partially completed
- Sent-invoice correction workflow is still basic (no dedicated credit-note/correction entity).
- Documents page stores path metadata and checks existence, but does not yet include archive state for document records.
- Reports are functional but still compact; deeper analytical layouts can be expanded.

## Known issues / constraints
- Tool remains a planning system and does not provide legal/tax advice.
- VAT/tax assumptions must be verified with SKAT/accountant (see OPEN_QUESTIONS).
- PDF generation and advanced invoice formatting remain deferred.

## Last successful verification
- Full automated suite: **18 passed**.
- Ruff check: passed.
- Ruff format check: passed.
- Mypy: passed.
- Fictional end-to-end repository verification run completed on temporary data:
  - client created
  - quote accepted and converted
  - invoice sent and paid in two payments
  - expense added
  - CSV + Excel exported
  - backup and restore completed

## Next recommended task
Complete a dedicated correction workflow for sent invoices and expand report detail views while keeping migration safety and audit traceability.
