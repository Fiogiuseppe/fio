from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class Paths:
    root: Path

    @property
    def database(self) -> Path: return self.root / "data" / "private" / "giuseppe_cfo.sqlite3"
    @property
    def documents(self) -> Path: return self.root / "documents"
    @property
    def exports(self) -> Path: return self.root / "exports"
    @property
    def backups(self) -> Path: return self.root / "backups"
    @property
    def review_bundle(self) -> Path: return self.root / "review_bundle"


def project_paths() -> Paths:
    return Paths(Path(__file__).resolve().parents[1])


def ensure_local_directories(paths: Paths | None = None) -> Paths:
    paths = paths or project_paths()
    for directory in (paths.database.parent, paths.documents, paths.exports, paths.backups, paths.review_bundle):
        directory.mkdir(parents=True, exist_ok=True)
    for name in ("invoices", "quotes", "receipts", "contracts", "other"):
        (paths.documents / name).mkdir(exist_ok=True)
    return paths
