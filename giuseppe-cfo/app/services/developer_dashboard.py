from __future__ import annotations

import sqlite3
import subprocess
import time
from dataclasses import dataclass
from datetime import datetime, timedelta
from pathlib import Path

from app.auth import authentication_enabled
from app.config import project_paths
from app.database import resolved_database_url, schema_up_to_date, session_factory
from app.models import AuditLog, Client, Document, Expense, Invoice, Quote


@dataclass(frozen=True)
class PageInfo:
    filename: str
    purpose: str


PAGE_REGISTRY = [
    PageInfo("app/main.py", "Home summary and privacy notice"),
    PageInfo("app/pages/1_Dashboard.py", "Financial dashboard and threshold monitor"),
    PageInfo("app/pages/2_Clients.py", "Client lifecycle management"),
    PageInfo("app/pages/3_Quotes.py", "Quote lifecycle and conversion"),
    PageInfo("app/pages/4_Invoices.py", "Invoice lifecycle and payments"),
    PageInfo("app/pages/5_Expenses.py", "Expense tracking and archive/restore"),
    PageInfo("app/pages/6_Documents.py", "Local document metadata registration"),
    PageInfo("app/pages/7_Reports.py", "Yearly reporting and CSV downloads"),
    PageInfo("app/pages/8_Backup_and_Export.py", "Backups, restore, exports, review bundle"),
    PageInfo("app/pages/9_Settings.py", "Business and VAT settings"),
    PageInfo("app/pages/10_Audit_Log.py", "Audit trail review"),
    PageInfo("app/pages/11_Developer_Dashboard.py", "Technical governance and project review"),
]

FEATURES = {
    "Migrations": True,
    "Clients lifecycle": True,
    "Quotes lifecycle": True,
    "Invoices lifecycle": True,
    "Expenses lifecycle": True,
    "Documents metadata": True,
    "Reports": True,
    "Backup create": True,
    "Backup restore": True,
    "Audit log page": True,
    "PDF generation": False,
    "Dedicated sent-invoice correction entity": False,
    "Document archive workflow": False,
}

KNOWN_BUGS = [
    "Sent-invoice correction uses basic status flow; no dedicated correction entity yet.",
]

TECHNICAL_DEBT = [
    "Reports can be expanded with deeper operational analytics.",
    "Document records need explicit archive semantics.",
    "UI confirmation patterns can be standardized further across pages.",
]


def architecture_markdown() -> str:
    return (
        "UI (Streamlit pages) -> Repositories/Services -> SQLAlchemy Models -> SQLite. "
        "Alembic migrations control schema. Scripts operate setup/backup/review."
    )


def folder_tree(root: Path | None = None, max_depth: int = 3) -> str:
    root = root or project_paths().root
    ignored = {".git", ".venv", "__pycache__", ".mypy_cache", ".ruff_cache", ".pytest_cache"}
    lines: list[str] = [root.name + "/"]

    def walk(path: Path, depth: int) -> None:
        if depth > max_depth:
            return
        children = sorted(
            [p for p in path.iterdir() if p.name not in ignored],
            key=lambda p: (p.is_file(), p.name.lower()),
        )
        for child in children:
            prefix = "  " * depth + "- "
            label = child.name + ("/" if child.is_dir() else "")
            lines.append(prefix + label)
            if child.is_dir():
                walk(child, depth + 1)

    walk(root, 1)
    return "\n".join(lines)


def db_schema_summary() -> dict[str, list[str]]:
    db_path = project_paths().database
    if not db_path.exists():
        return {}
    conn = sqlite3.connect(db_path)
    try:
        tables = [
            row[0]
            for row in conn.execute(
                "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
            )
        ]
        result: dict[str, list[str]] = {}
        for table in tables:
            cols = [row[1] for row in conn.execute(f"PRAGMA table_info('{table}')")]
            result[table] = cols
        return result
    finally:
        conn.close()


def relationship_summary() -> list[str]:
    return [
        "quotes.client_id -> clients.id",
        "invoices.client_id -> clients.id",
        "documents.related_entity_type + related_entity_id -> optional client/quote/invoice/expense link",
    ]


def feature_completion() -> tuple[float, list[tuple[str, bool]]]:
    total = len(FEATURES)
    done = sum(1 for value in FEATURES.values() if value)
    return (done / total) * 100, list(FEATURES.items())


def recent_changes(limit: int = 12) -> list[str]:
    output = subprocess.check_output(
        ["git", "log", f"-{limit}", "--pretty=format:%h %ad %s", "--date=short"],
        cwd=project_paths().root,
        text=True,
    )
    return output.splitlines()


def storage_locations() -> dict[str, str]:
    paths = project_paths()
    return {
        "Database": str(paths.database),
        "Documents": str(paths.documents),
        "Exports": str(paths.exports),
        "Backups": str(paths.backups),
        "Review bundle": str(paths.review_bundle / "giuseppe_cfo_review.zip"),
    }


def backup_status() -> dict[str, str]:
    backups = sorted(project_paths().backups.glob("*.zip"), reverse=True)
    if not backups:
        return {"status": "No backups found."}
    latest = backups[0]
    return {
        "status": "OK",
        "latest_file": latest.name,
        "updated_at": datetime.fromtimestamp(latest.stat().st_mtime).isoformat(timespec="seconds"),
        "size_bytes": str(latest.stat().st_size),
    }


def security_status() -> dict[str, str]:
    return {
        "auth_enabled": "yes" if authentication_enabled() else "no (optional hash not configured)",
        "bind_guard": "Private/loopback address validation enabled",
        "local_only_policy": "No cloud sync or external APIs",
    }


def system_health() -> dict[str, str]:
    start = time.perf_counter()
    session = session_factory()()
    try:
        counts = {
            "clients": str(session.query(Client).count()),
            "quotes": str(session.query(Quote).count()),
            "invoices": str(session.query(Invoice).count()),
            "expenses": str(session.query(Expense).count()),
            "documents": str(session.query(Document).count()),
            "audit_logs": str(session.query(AuditLog).count()),
        }
    finally:
        session.close()
    elapsed_ms = (time.perf_counter() - start) * 1000
    db_path = project_paths().database
    return {
        "schema_at_head": str(schema_up_to_date(resolved_database_url())),
        "db_exists": str(db_path.exists()),
        "db_size_bytes": str(db_path.stat().st_size if db_path.exists() else 0),
        "query_sample_ms": f"{elapsed_ms:.2f}",
        **counts,
    }


def performance_metrics() -> dict[str, str]:
    root = project_paths().root
    tests_duration = subprocess.run(
        ["python", "-m", "pytest", "--co", "-q"],
        cwd=root,
        text=True,
        capture_output=True,
        check=False,
    )
    return {
        "repo_files_tracked": str(
            len(subprocess.check_output(["git", "ls-files"], cwd=root, text=True).splitlines())
        ),
        "tests_collect_exit_code": str(tests_duration.returncode),
        "timestamp": datetime.now().isoformat(timespec="seconds"),
    }


def screenshots_directory() -> Path:
    path = project_paths().root / "docs" / "review_screenshots_auto"
    path.mkdir(parents=True, exist_ok=True)
    return path


def _screenshots_stale(max_age_minutes: int) -> bool:
    target = screenshots_directory()
    pngs = list(target.glob("*.png"))
    if len(pngs) < 11:
        return True
    latest = max(file.stat().st_mtime for file in pngs)
    return datetime.fromtimestamp(latest) < datetime.now() - timedelta(minutes=max_age_minutes)


def auto_capture_screenshots(
    base_url: str = "http://127.0.0.1:8501", max_age_minutes: int = 15
) -> str:
    if not _screenshots_stale(max_age_minutes):
        return "Screenshots already fresh."
    script = f"""
from pathlib import Path
from playwright.sync_api import sync_playwright
out = Path(r"{screenshots_directory()}")
pages = [
    ('home','GIUSEPPE CFO'),
    ('dashboard','Dashboard'),
    ('clients','Clients'),
    ('quotes','Quotes'),
    ('invoices','Invoices'),
    ('expenses','Expenses'),
    ('documents','Documents'),
    ('reports','Reports'),
    ('backup_and_export','Backup and Export'),
    ('settings','Settings'),
    ('audit_log','Audit Log'),
]
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={{'width':1600,'height':1000}})
    page.goto(r"{base_url}", wait_until='networkidle')
    page.wait_for_timeout(2200)
    page.screenshot(path=str(out / 'home.png'), full_page=True)
    for slug,title in pages[1:]:
        for sel in [f"[data-testid='stSidebarNav'] a:has-text('{{title}}')", f"a:has-text('{{title}}')", f"button:has-text('{{title}}')"]:
            loc = page.locator(sel)
            if loc.count() > 0:
                loc.first.click()
                break
        page.wait_for_load_state('networkidle')
        page.wait_for_timeout(1600)
        page.screenshot(path=str(out / f"{{slug}}.png"), full_page=True)
    browser.close()
print("ok")
"""
    result = subprocess.run(
        ["python", "-c", script],
        cwd=project_paths().root,
        text=True,
        capture_output=True,
        check=False,
    )
    if result.returncode != 0:
        return f"Screenshot refresh failed: {result.stderr.strip() or result.stdout.strip()}"
    return "Screenshots updated."


def build_review_markdown() -> str:
    completion_pct, feature_rows = feature_completion()
    lines = [
        "# Developer Dashboard Export",
        f"Generated: {datetime.now().isoformat(timespec='seconds')}",
        "",
        "## Architecture",
        architecture_markdown(),
        "",
        "## Folder Tree",
        "```text",
        folder_tree(),
        "```",
        "",
        "## Database Schema",
    ]
    for table, columns in db_schema_summary().items():
        lines.append(f"- **{table}**: {', '.join(columns)}")
    lines += ["", "## Relationships"]
    lines.extend([f"- {row}" for row in relationship_summary()])
    lines += ["", "## Page Registry"]
    lines.extend([f"- `{item.filename}`: {item.purpose}" for item in PAGE_REGISTRY])
    lines += ["", f"## Feature Completion: {completion_pct:.1f}%"]
    lines.extend([f"- [{'x' if done else ' '}] {name}" for name, done in feature_rows])
    lines += ["", "## Missing Features"]
    lines.extend([f"- {name}" for name, done in feature_rows if not done])
    lines += ["", "## Known Bugs"]
    lines.extend([f"- {row}" for row in KNOWN_BUGS])
    lines += ["", "## Technical Debt"]
    lines.extend([f"- {row}" for row in TECHNICAL_DEBT])
    lines += ["", "## Recent Changes"]
    lines.extend([f"- {row}" for row in recent_changes()])
    lines += ["", "## System Health"]
    for key, value in system_health().items():
        lines.append(f"- {key}: {value}")
    lines += ["", "## Backup Status"]
    for key, value in backup_status().items():
        lines.append(f"- {key}: {value}")
    lines += ["", "## Security Status"]
    for key, value in security_status().items():
        lines.append(f"- {key}: {value}")
    lines += ["", "## Local Storage"]
    for key, value in storage_locations().items():
        lines.append(f"- {key}: `{value}`")
    lines += ["", "## Performance Metrics"]
    for key, value in performance_metrics().items():
        lines.append(f"- {key}: {value}")
    lines += [
        "",
        "## Roadmap",
        "- Stabilize correction workflow",
        "- Expand reporting depth",
        "- Add PDF pipeline after core stability",
    ]
    return "\n".join(lines)
