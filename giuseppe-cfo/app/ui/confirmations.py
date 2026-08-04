import streamlit as st


def typed_confirmation(prompt: str, token: str, key: str) -> bool:
    st.warning(prompt)
    typed = st.text_input(f"Type {token} to confirm", key=key)
    return typed.strip() == token
