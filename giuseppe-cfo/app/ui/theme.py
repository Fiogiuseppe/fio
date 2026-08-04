import streamlit as st


def apply_theme() -> None:
    st.markdown(
        """
<style>
    .stApp { background: #f5f7fb; }
    h1,h2,h3 { letter-spacing: -0.02em; }
    .block-container { padding-top: 1.2rem; padding-bottom: 2rem; max-width: 1200px; }
    [data-testid="stMetricValue"] { font-weight: 650; }
    [data-testid="stSidebarNav"] { border-right: 1px solid #e5e7eb; }
    .stButton button { border-radius: 10px; border: 1px solid #d1d5db; }
    .stDownloadButton button { border-radius: 10px; border: 1px solid #d1d5db; }
</style>
        """,
        unsafe_allow_html=True,
    )
