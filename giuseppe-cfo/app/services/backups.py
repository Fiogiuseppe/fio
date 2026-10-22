from datetime import datetime
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

from app.config import ensure_local_directories, project_paths
from app.repositories.audit_logs import AuditLogsRepository


def create_backup(paths=None) -> Path:
    paths = ensure_local_directories(paths or project_paths())
    target = paths.backups / f"giuseppe_cfo_backup_{datetime.now():%Y-%m-%d_%H%M%S_%f}.zip"
    with ZipFile(target, "w", ZIP_DEFLATED) as archive:
        if paths.database.exists():
            archive.write(paths.database, "data/private/giuseppe_cfo.sqlite3")
        for path in paths.documents.rglob("*"):
            if path.is_file():
                archive.write(path, path.relative_to(paths.root))
    return target


def validate_backup_zip(backup_zip: Path) -> None:
    with ZipFile(backup_zip, "r") as archive:
        names = set(archive.namelist())
        if "data/private/giuseppe_cfo.sqlite3" not in names:
            raise ValueError("Backup does not contain the SQLite database.")


def restore_backup(
    backup_zip: Path,
    confirmation_text: str,
    session=None,
    paths=None,
) -> Path:
    if confirmation_text.strip() != "RESTORE":
        raise ValueError("Type RESTORE to confirm recovery.")
    paths = ensure_local_directories(paths or project_paths())
    validate_backup_zip(backup_zip)
    safety_backup = create_backup(paths)
    with ZipFile(backup_zip, "r") as archive:
        archive.extract("data/private/giuseppe_cfo.sqlite3", paths.root)
        for member in archive.namelist():
            if member.startswith("documents/"):
                archive.extract(member, paths.root)
    if session is not None:
        AuditLogsRepository(session).record(
            "backup",
            "restore",
            "restore",
            f"Restored from {backup_zip.name}; safety backup {safety_backup.name}",
        )
    return safety_backup
