# Changelog

## 0.3.0 — 2026-08-04
- Added Alembic migration support and migration-aware database initialisation.
- Added Streamlit multipage structure for Dashboard, Clients, Quotes, Invoices, Expenses, Documents, Reports, Backup/Export, Settings, and Audit Log.
- Added CRUD/status workflows across repositories with stronger audit logging.
- Added backup restore safety workflow with typed confirmation and safety-backup creation.
- Expanded validation schemas and automated tests for lifecycle, backups, exports, and review-bundle safety.

## 0.2.1 — 2026-08-04
- Added optional bcrypt-hash login and idle-session timeout.
- Added safe private/Tailscale bind selection; public addresses are rejected.

## 0.2.0 — 2026-08-04
- Established local Streamlit/SQLite foundation with exports, backups, and review bundle tooling.
