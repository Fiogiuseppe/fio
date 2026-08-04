# GIUSEPPE CFO
Private, local-first business management for Giuseppe Fioretti’s Danish PMV. Data stays on this computer in SQLite; no cloud services, telemetry, or external APIs are used.

## Install and start (macOS)
```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -e '.[dev]'
python scripts/setup.py
python run_app.py
```
Open `http://localhost:8501`; localhost is only this computer, not a public website. Stop with `Ctrl+C`.

## Daily use
Use the visual interface to create clients, drafts, quotes and expenses; view planning metrics; export CSV/Excel; and create a local ZIP backup. The tax reserve is a planning estimate, not a tax calculation. The PMV threshold monitor uses issue-date turnover and does not perform VAT registration.

## Commands
```bash
python -m pytest
python scripts/create_backup.py
python scripts/create_review_bundle.py
```
The database is `data/private/giuseppe_cfo.sqlite3`. Documents are under `documents/`, exports under `exports/`, backups under `backups/`, and the review ZIP is `review_bundle/giuseppe_cfo_review.zip`.

## Troubleshooting
Run `python scripts/setup.py` to initialise the local database. If port 8501 is busy, stop the earlier local app and run again. Backups are local files: protect them with your normal device security.
