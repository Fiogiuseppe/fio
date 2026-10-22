# Decisions
## 2026-08-04 — Local SQLite
Reason: confidential business records must remain on Giuseppe’s computer. Alternative cloud databases were rejected. Consequence: backups are the user’s responsibility.

## 2026-08-04 — Threshold monitor
Issue-date turnover is used as a simple planning signal. It is not a determination of VAT obligations and requires verification when relevant.

## 2026-08-04 — Migration-first schema control
Alembic is now the source of truth for schema setup. `Base.metadata.create_all()` is not used in production startup. Existing pre-Alembic local schemas are stamped only after a safety backup.
