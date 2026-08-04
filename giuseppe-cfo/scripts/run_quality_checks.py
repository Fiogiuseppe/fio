import subprocess
import sys
from pathlib import Path

from app.config import ensure_local_directories

commands = [
    ["python", "-m", "pytest"],
    ["python", "-m", "ruff", "check", "."],
    ["python", "-m", "ruff", "format", "--check", "."],
    ["python", "-m", "mypy", "app"],
]
results = []
for command in commands:
    completed = subprocess.run(command, text=True, capture_output=True)
    results.append("$ " + " ".join(command) + "\n" + completed.stdout + completed.stderr)
Path(ensure_local_directories().root / "docs" / "QUALITY_RESULTS.txt").write_text(
    "\n\n".join(results)
)
sys.exit(any(subprocess.run(command).returncode for command in commands))
