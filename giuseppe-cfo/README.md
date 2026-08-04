# GIUSEPPE CFO

Local-only business-management software for Giuseppe Fioretti’s Danish PMV.

Planning tool only — not tax or accounting advice.

## Privacy model

- SQLite database remains local.
- No cloud database, Google APIs, email APIs, banking APIs, or telemetry.
- Backups and exports are local files you control.
- Review bundles exclude database/files and scan for likely secrets.

## Install

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -e '.[dev]'
```

## Initialize database and migrations

```bash
python scripts/setup.py
alembic upgrade head
```

## Run

```bash
python run_app.py
```

Open `http://127.0.0.1:8501` (localhost only). Stop with `Ctrl+C`.

## Common commands

```bash
python -m pytest
python -m ruff check app tests scripts
python -m ruff format --check app tests scripts
python -m mypy app
python scripts/create_backup.py
python scripts/create_review_bundle.py
```

## Storage locations

- Database: `data/private/giuseppe_cfo.sqlite3`
- Documents: `documents/`
- Invoices documents: `documents/invoices/`
- Quotes documents: `documents/quotes/`
- Receipts: `documents/receipts/`
- Exports: `exports/`
- Backups: `backups/`
- Review ZIP: `review_bundle/giuseppe_cfo_review.zip`

## Recovery

Use the Backup & Export page to restore from a ZIP. The app requires typed confirmation (`RESTORE`) and creates a safety backup before replacing current state.

## Troubleshooting

- If schema is outdated, run `alembic upgrade head`.
- If port 8501 is busy, stop the old process and restart.
- Keep frequent local backups before entering real business records.
