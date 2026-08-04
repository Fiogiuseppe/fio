import streamlit as st

from app.config import ensure_local_directories, load_private_environment
from app.database import initialise_database, session_factory
from app.ui.authentication import require_login


def bootstrap():
    load_private_environment()
    if not require_login():
        st.stop()
    ensure_local_directories()
    initialise_database(create_safety_backup=True)
    return session_factory()
