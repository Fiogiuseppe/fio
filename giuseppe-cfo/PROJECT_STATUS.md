# Giuseppe CFO — Project Status

Reviewed: 4 August 2026  
Version: 0.2.0  
Purpose: a private, local-first business-management application for a Danish PMV. It uses local SQLite storage and a Streamlit interface. It has no active cloud, AI, banking, Google, email, telemetry, or analytics integrations.

## What has already been built

- Local path management for the database, documents, exports, backups, and review bundles.
- SQLite persistence with SQLAlchemy 2.x models for clients, quotes, invoices, expenses, documents, settings, and audit logs.
- Default local business settings, including the PMV VAT threshold of 50,000 DKK and a 40% planning tax reserve.
- Local Streamlit interface with Dashboard, Clients, Quotes, Invoices, Expenses, Documents, Reports, Backup & Export, and Settings tabs.
- Pure Decimal-based accounting calculations for conversion, business use, turnover, expenses, profit estimate, tax-reserve estimate, outstanding invoices, overdue invoices, and threshold status.
- Repositories for client, quote, invoice, expense, settings, and audit-log records.
- Invoice and quote sequencing services (`GF-YYYY-NNN` and `Q-YYYY-NNN`).
- Local Excel export, local ZIP backup, and a source-only review-bundle generator with a secret-value scan.
- Test, lint, and type-check configuration.

## Fully working

| Area | Current behaviour |
|---|---|
| Local setup | `scripts/setup.py` creates required folders, initialises the SQLite schema, and creates default settings. |
| Local-only server | `run_app.py` starts Streamlit on `http://127.0.0.1:8501`; Streamlit usage statistics are disabled. |
| Client creation | The Clients tab saves a client name and optional email to SQLite and displays saved clients. |
| Invoice drafts | The Invoices tab can create a DKK invoice draft for an existing client. |
| Expense creation | The Expenses tab saves a DKK expense with business-use percentage and calculates the planning deductible amount. |
| Dashboard calculations | Turnover, expenses, estimated profit, planning tax reserve, and PMV threshold status update from saved invoice/expense records. |
| Excel export | The interface creates a timestamped Excel workbook in `exports/`. |
| Local backup | The interface and `scripts/create_backup.py` create a ZIP containing the database and local documents. |
| Review bundle | `scripts/create_review_bundle.py` generates `review_bundle/giuseppe_cfo_review.zip` and refuses likely credential values. |

## Partially implemented

| Area | Existing implementation | Missing connection or limitation |
|---|---|---|
| Quotes | `Quote` model, repository, and number generator exist. | Quotes tab is a placeholder; no create/edit/accept/reject/convert workflow. |
| Invoice lifecycle | Repository can mark drafts sent and record partial/full payments. | No UI to view invoices, send them, record payments, cancel, duplicate, or correct them. |
| Clients | Repository can list and archive. | No search, edit, archive, active/inactive filtering, or safe sequential client-code service. |
| Settings | Complete settings model exists. | Settings tab only shows VAT registration state; editing is not wired. |
| Reports | Monthly/category/outstanding/overdue calculation functions exist. | Reports tab has no tables, charts, or filters. |
| CSV exports | `export_csv()` supports each principal entity. | CSV export is not exposed in the interface. |
| Documents | Document model and a local-path validator exist. | No document repository, registration, browse view, relationship picker, or missing-receipt report. |
| Audit log | Create/update audit entries are created by quote, invoice, and expense repositories. | No audit-log view; client creation and archival do not create audit entries. |
| Currency | Models retain original currency and exchange rate; conversion service exists. | Forms only accept DKK; no rate entry or currency selector. |

## Missing

- Alembic configuration and migrations. The current database is made with `Base.metadata.create_all()`.
- Backup restore flow, confirmation screen, safety backup, and recovery test.
- Invoice/quote PDF generation and PDF storage paths.
- Full record editing, archiving, correction, and explicit deletion-confirmation workflows.
- Quote conversion into draft invoices.
- Payment, overdue, cancellation, and sent-invoice interface actions.
- Receipt attachment and document registration UI.
- Individual Streamlit page modules under `app/pages/` and reusable UI modules under `app/ui/`.
- Pydantic validation beyond the currently unused `ClientInput` schema.
- Broader automated coverage for repositories, exports, backups, documents, invoice lifecycle, and Streamlit interactions.
- `CHANGELOG.md`, `DATA_MODEL.md`, `SECURITY.md`, `BACKUP_AND_RECOVERY.md`, `USER_GUIDE.md`, and `DEVELOPMENT_PLAN.md`.
- Migration, page, UI, and `.cursor/rules/` files requested in the larger target structure.

## Folder structure

Tracked files:

```text
giuseppe-cfo/
├── .env.example                    # Legacy cloud-oriented template; unused by current code
├── .gitignore
├── .streamlit/config.toml          # localhost-only and telemetry disabled
├── AGENTS.md
├── Makefile
├── PROJECT_STATUS.md
├── README.md
├── pyproject.toml
├── requirements.txt
├── run_app.py
├── app/
│   ├── __init__.py
│   ├── config.py
│   ├── constants.py
│   ├── database.py
│   ├── main.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── audit_log.py
│   │   ├── client.py
│   │   ├── document.py
│   │   ├── expense.py
│   │   ├── invoice.py
│   │   ├── quote.py
│   │   └── settings.py
│   ├── repositories/
│   │   ├── __init__.py
│   │   ├── audit_logs.py
│   │   ├── clients.py
│   │   ├── expenses.py
│   │   ├── invoices.py
│   │   ├── quotes.py
│   │   └── settings.py
│   ├── schemas/client.py
│   └── services/
│       ├── __init__.py
│       ├── accounting.py
│       ├── backups.py
│       ├── currency.py
│       ├── documents.py
│       ├── exports.py
│       └── invoice_numbering.py
├── database/.gitkeep
├── docs/
│   ├── DECISIONS.md
│   ├── OPEN_QUESTIONS.md
│   └── PROJECT_STATUS.md            # Earlier short status note
├── logs/.gitkeep
├── pdf/.gitkeep
├── scripts/
│   ├── create_backup.py
│   ├── create_review_bundle.py
│   ├── initialise_database.py
│   ├── run_quality_checks.py
│   └── setup.py
├── templates/.gitkeep
└── tests/
    ├── conftest.py
    ├── test_accounting.py
    ├── test_clients.py
    └── test_invoice_numbering.py
```

Local runtime folders are intentionally ignored by Git:

```text
data/private/giuseppe_cfo.sqlite3
documents/{invoices,quotes,receipts,contracts,other}/
exports/
backups/
logs/
review_bundle/giuseppe_cfo_review.zip
```

The directories `app/pages/`, `app/ui/`, `migrations/versions/`, `data/examples/`, and `.cursor/rules/` exist locally but currently contain no tracked implementation files.

## How to run

```bash
cd giuseppe-cfo
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -e '.[dev]'
python scripts/setup.py
python run_app.py
```

Open `http://127.0.0.1:8501` in a browser. Stop the app with `Ctrl+C`.

Quality and maintenance commands:

```bash
python -m pytest
python -m ruff check app tests scripts
python -m mypy app
python scripts/create_backup.py
python scripts/create_review_bundle.py
```

## Technologies

- Python 3.12 in the verified environment (project supports Python 3.11+).
- Streamlit for the local graphical interface.
- SQLite for local persistence.
- SQLAlchemy 2.x for ORM models and repositories.
- Decimal for monetary calculations.
- Pandas and openpyxl for exports.
- Pydantic for the current client input schema.
- Pytest, Ruff, and Mypy for quality checks.
- Alembic and ReportLab are declared dependencies but are not yet used in application code.

## Database structure

The local database is `data/private/giuseppe_cfo.sqlite3`.

| Table | Purpose |
|---|---|
| `clients` | Client identity, contact/billing data, default currency, payment terms, notes, and active state. |
| `quotes` | Client-linked quoted values, DKK conversion data, status, document path, and notes. |
| `invoices` | Client-linked draft/issued amounts, VAT fields, payment status, payment amount/date, document path, and notes. |
| `expenses` | Supplier, amount/currency/conversion details, business-use percentage, planning deductible amount, receipt path, and archive state. |
| `documents` | Metadata for local document paths and optional links to other entities. |
| `business_settings` | Single local business configuration row, including private business/bank fields, VAT settings, prefixes, and sequences. |
| `audit_logs` | Timestamp, entity type/id, action, and human-readable summary without full record contents. |

There is deliberately no CPR field in any model. Private database contents and files are Git-ignored.

## Roadmap

### Phase 1 — MVP

1. Wire the current quote, invoice, payment, client archive, settings, document, report, and CSV service capabilities into the Streamlit UI.
2. Add list, search, filter, edit, archive, confirmation, and audit-view flows.
3. Implement safe invoice send/cancel/payment workflows and quote-to-invoice conversion.
4. Add tests for all current repositories/services and interface-critical paths.
5. Replace `create_all()` with an initial Alembic migration, before production data is entered.
6. Complete operational documentation, especially backup/recovery and the user guide.

### Phase 2

1. Implement local PDF generation for quotes and invoices.
2. Add document registration and missing-receipt reporting without automatically copying files.
3. Add multi-currency entry with manual exchange-rate input and clear DKK conversion labels.
4. Add dashboard charts, monthly reports, category reports, and overdue invoice views.
5. Implement a confirmed backup-restore workflow with a safety backup.

### Phase 3

1. Improve corrections, archival history, and audit-log viewing.
2. Add stronger validation and clearer field-level error messages.
3. Provide optional fictional demo data that the user must explicitly choose.
4. Refactor the monolithic Streamlit screen into the planned pages and reusable UI components.

### Future ideas

- Local invoice/quote templates.
- Configurable reports and export column selection.
- Optional encrypted backup guidance and local restore verification.
- Import tooling for existing CSV data, with preview and explicit confirmation.
- More detailed planning scenarios, clearly separate from legal, accounting, or tax advice.

## Verification recorded before this document

- `pytest`: 4 passed.
- `ruff check app tests scripts`: passed.
- `mypy app`: passed for 28 source files.
- Streamlit boot: verified on `127.0.0.1:8501`.

Known warnings and technical follow-ups are documented above; the application should not be described as feature-complete.
