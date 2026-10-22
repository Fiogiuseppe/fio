# Backup and recovery

## Backup

Create a local backup from the UI (Backup & Export page) or:

```bash
python scripts/create_backup.py
```

A backup ZIP is saved under `backups/` and contains:

- `data/private/giuseppe_cfo.sqlite3`
- the local `documents/` folder content

## Recovery workflow

Use the Backup & Export page:

1. Select a backup ZIP.
2. Read the warning describing replacement of current local state.
3. Type `RESTORE`.
4. Confirm restore.

The application then:

1. validates that the backup contains the SQLite file;
2. creates an automatic safety backup of the current state;
3. restores database and document files from the selected ZIP;
4. logs the operation in the audit log.

## Migrations and safety backup

Database initialisation uses Alembic migrations. For older databases that already have the known schema but no `alembic_version` table, the app stamps the schema as head and first creates a safety backup.

Manual migration command:

```bash
alembic upgrade head
```

## Important cautions

- Keep regular backups before entering real business records.
- Never test restore against production data; use temporary copies for tests.
- Store backups on encrypted storage where possible.
