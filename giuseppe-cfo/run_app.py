"""Start the local Streamlit application at http://localhost:8501."""
import subprocess
import sys
from app.config import ensure_local_directories
from app.database import initialise_database

if __name__ == "__main__":
    ensure_local_directories(); initialise_database()
    raise SystemExit(subprocess.call([sys.executable, "-m", "streamlit", "run", "app/main.py"]))
