import streamlit as st


def apply_theme() -> None:
    st.markdown(
        """
<style>
    :root {
        --bg: #f6f7f9;
        --card: #ffffff;
        --text: #111827;
        --muted: #6b7280;
        --line: #e5e7eb;
        --accent: #0a84ff;
    }
    .stApp { background: var(--bg); color: var(--text); }
    .block-container {
        padding-top: 1.1rem;
        padding-bottom: 2.2rem;
        max-width: 1180px;
    }
    h1, h2, h3 {
        letter-spacing: -0.02em;
        font-weight: 650;
    }
    [data-testid="stSidebar"] {
        background: #fbfbfc;
        border-right: 1px solid var(--line);
    }
    [data-testid="stSidebarNav"] {
        padding-top: 0.4rem;
    }
    div[data-testid="stMetric"] {
        background: var(--card);
        border: 1px solid var(--line);
        border-radius: 14px;
        padding: 0.8rem 1rem;
        box-shadow: 0 1px 1px rgba(17,24,39,0.02);
    }
    [data-testid="stMetricLabel"] {
        color: var(--muted);
    }
    [data-testid="stMetricValue"] {
        font-weight: 650;
    }
    .stButton button, .stDownloadButton button {
        border-radius: 10px;
        border: 1px solid #d1d5db;
        background: #fff;
        color: #111827;
    }
    .stButton button:hover, .stDownloadButton button:hover {
        border-color: #9ca3af;
    }
    .stDataFrame, [data-testid="stTable"] {
        background: var(--card);
        border: 1px solid var(--line);
        border-radius: 12px;
        overflow: hidden;
    }
    div[data-testid="stMarkdownContainer"] p {
        color: #111827;
    }
</style>
        """,
        unsafe_allow_html=True,
    )
