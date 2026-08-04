"""Start Streamlit only on loopback or an approved private-network address."""
import subprocess
import sys

from app.config import ensure_local_directories, load_private_environment
from app.database import initialise_database
from app.network import bind_address

if __name__ == "__main__":
    load_private_environment()
    ensure_local_directories()
    initialise_database()
    address = bind_address()
    command = [sys.executable, "-m", "streamlit", "run", "app/main.py", "--server.address", address]
    raise SystemExit(subprocess.call(command))
