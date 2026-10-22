"""Start Streamlit only on loopback or an approved private-network address."""
import subprocess
import sys

from app.config import ensure_local_directories, load_private_environment
from app.database import initialise_database, resolved_database_url, schema_up_to_date
from app.network import bind_address

if __name__ == "__main__":
    load_private_environment()
    ensure_local_directories()
    initialise_database(create_safety_backup=True)
    if not schema_up_to_date(resolved_database_url()):
        raise SystemExit("Database schema is not at head revision. Run migrations before starting.")
    address = bind_address()
    command = [sys.executable, "-m", "streamlit", "run", "app/main.py", "--server.address", address]
    raise SystemExit(subprocess.call(command))
