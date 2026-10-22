"""Create a source-only review ZIP; abort when likely secrets are detected."""

import re
import subprocess
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

from app.config import ensure_local_directories, project_paths

ROOT = project_paths().root
SAFE = (
    "app",
    "scripts",
    "tests",
    "docs",
    "README.md",
    "CHANGELOG.md",
    "AGENTS.md",
    "pyproject.toml",
    "requirements.txt",
    "Makefile",
    ".cursor",
)
SECRET = re.compile(r"""\b(api[_-]?key|password|secret|token)\b\s*=\s*["'][^"']+""", re.I)


def candidates() -> list[Path]:
    items = []
    for name in SAFE:
        path = ROOT / name
        if path.is_file():
            items.append(path)
        elif path.exists():
            items.extend(p for p in path.rglob("*") if p.is_file() and "__pycache__" not in p.parts)
    return items


def create() -> Path:
    paths = ensure_local_directories()
    suspect = []
    for path in candidates():
        if SECRET.search(path.read_text(errors="ignore")):
            suspect.append(path.relative_to(ROOT))
    if suspect:
        raise RuntimeError("Review bundle aborted; inspect: " + ", ".join(map(str, suspect)))
    output = paths.review_bundle / "giuseppe_cfo_review.zip"
    with ZipFile(output, "w", ZIP_DEFLATED) as archive:
        for path in candidates():
            archive.write(path, path.relative_to(ROOT))
        archive.writestr(
            "PROJECT_TREE.txt", subprocess.check_output(["git", "ls-files"], cwd=ROOT, text=True)
        )
        archive.writestr(
            "CHANGED_FILES.txt",
            subprocess.check_output(["git", "status", "--short"], cwd=ROOT, text=True),
        )
        archive.writestr(
            "GIT_DIFF.patch", subprocess.check_output(["git", "diff", "HEAD"], cwd=ROOT, text=True)
        )
    return output


if __name__ == "__main__":
    print(create())
