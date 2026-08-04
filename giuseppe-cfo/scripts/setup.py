import sys

from app.config import ensure_local_directories
from app.database import initialise_database

if sys.version_info < (3, 11):
    raise SystemExit("Python 3.11 or later is required.")
ensure_local_directories(); initialise_database()
print("Local database initialised.")
print("Create a virtual environment: python3 -m venv .venv")
print("Activate it: source .venv/bin/activate")
print("Install packages: python -m pip install -e '.[dev]'")
print("Start the application: python run_app.py")
