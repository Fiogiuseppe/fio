from datetime import datetime
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

from app.config import ensure_local_directories, project_paths


def create_backup(paths=None) -> Path:
    paths = ensure_local_directories(paths or project_paths())
    target = paths.backups / f"giuseppe_cfo_backup_{datetime.now():%Y-%m-%d_%H%M%S}.zip"
    with ZipFile(target, "w", ZIP_DEFLATED) as archive:
        if paths.database.exists(): archive.write(paths.database, "data/private/giuseppe_cfo.sqlite3")
        for path in paths.documents.rglob("*"):
            if path.is_file(): archive.write(path, path.relative_to(paths.root))
    return target
