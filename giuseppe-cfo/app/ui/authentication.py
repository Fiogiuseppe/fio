import time

import streamlit as st

from app.auth import authentication_enabled, session_is_valid, verify_password


def require_login() -> bool:
    """Render local login when configured, returning whether the app may continue."""
    if not authentication_enabled():
        return True
    if session_is_valid(st.session_state.get("auth_last_activity")):
        st.session_state.auth_last_activity = time.monotonic()
        return True
    st.session_state.pop("auth_last_activity", None)
    st.title("GIUSEPPE CFO")
    st.warning("This local app is locked. Sign in to continue.")
    with st.form("local_login"):
        password = st.text_input("Password", type="password", autocomplete="current-password")
        if st.form_submit_button("Sign in"):
            if verify_password(password):
                st.session_state.auth_last_activity = time.monotonic()
                st.rerun()
            st.error("Password not accepted.")
    return False
