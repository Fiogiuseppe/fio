import sys

from app.config import ensure_local_directories
from app.database import initialise_database, resolved_database_url, schema_up_to_date

if sys.version_info < (3, 11):
    raise SystemExit("Python 3.11 or later is required.")
ensure_local_directories()
initialise_database(create_safety_backup=True)
print("Local database initialised.")
print(f"Schema at head: {schema_up_to_date(resolved_database_url())}")
print("Create a virtual environment: python3 -m venv .venv")
print("Activate it: source .venv/bin/activate")
print("Install packages: python -m pip install -e '.[dev]'")
print("Start the application: python run_app.py")
print("Run migrations manually: alembic upgrade head")
