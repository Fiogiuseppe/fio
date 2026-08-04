# PROJECT STATUS

Date: 2026-08-04  
Project: **GIUSEPPE CFO** (local-first PMV business app)  
Branch: `cursor/giuseppe-cfo-a2a2`

## what is complete

- Local MVP architecture is stable (Streamlit + SQLite + SQLAlchemy + Alembic).
- Premium minimalist UI theme (sidebar quick manual included).
- All core menu pages are implemented and functional:
  - Home
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
  - Developer Dashboard
- Clients workflow: create, search/filter, detail view, edit, archive, restore, related totals.
- Quotes workflow: create, edit draft, status updates, duplicate, convert accepted quote to invoice draft.
- Invoices workflow: create/edit draft, send with official numbering, partial/full payment, overdue handling, cancel, archive, copy.
- Expenses workflow: create/edit/search/filter (date/category/supplier), archive/restore, receipt-path tracking.
- Documents workflow: register local path metadata, filter, check file existence, missing receipt/invoice-PDF indicators.
- Reports workflow: yearly reporting with monthly turnover/expenses/profit, revenue by category, expenses by category, revenue by client, invoice summary, CSV downloads.
- Backup and export workflow:
  - clients/quotes/invoices/expenses CSV
  - Excel export
  - backup ZIP creation
  - safe restore (typed `RESTORE` + automatic safety backup)
  - review bundle generation
- Settings workflow: editable PMV settings with private bank fields stored locally and audited notable changes.
- Security workflow: optional local login, session timeout, private-bind guard, secret-scanned review bundle.
- Realistic fictional sample data is available immediately:
  - Home page button: “Create fictional demo data”
  - CLI: `python scripts/create_demo_data.py`
- Quality checks last run: pytest, ruff, mypy — passing.

## what is missing

- Dedicated credit-note / sent-invoice correction entity/workflow.
- Native PDF generation/styling for quotes/invoices.
- Optional document metadata archive-state workflow.

## known issues (if any)

- No blocking runtime defects found in latest validation.
- Non-blocking gap: dedicated correction entity/workflow for sent invoices is not implemented yet.
- Cloud agent cannot write directly to the user’s Mac Desktop; project lives in repo / downloadable ZIP artifacts.

## overall completion percentage

**95%**

## exact steps to run the application

```bash
cd giuseppe-cfo
python3 -m venv .venv
source .venv/bin/activate
pip install -e '.[dev]'
python scripts/setup.py
python run_app.py
```

Open:

`http://127.0.0.1:8501`

Optional fictional demo data:

```bash
python scripts/create_demo_data.py
```

## key local paths

- App root: `giuseppe-cfo/`
- Database: `data/private/giuseppe_cfo.sqlite3`
- Documents: `documents/{invoices,quotes,receipts,contracts,other}/`
- Exports: `exports/`
- Backups: `backups/`
- Review bundle: `review_bundle/`
