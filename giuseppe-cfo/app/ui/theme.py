import streamlit as st


def apply_theme() -> None:
    st.markdown(
        """
<style>
    :root {
        --bg: #f4f5f7;
        --card: #ffffff;
        --text: #0f172a;
        --muted: #64748b;
        --line: #e2e8f0;
        --accent: #2563eb;
        --accent-soft: #dbeafe;
    }
    .stApp {
        color: var(--text);
        background:
            radial-gradient(1400px 500px at 10% -10%, #eef4ff 0%, transparent 55%),
            radial-gradient(1200px 400px at 100% -30%, #f5f3ff 0%, transparent 55%),
            var(--bg);
    }
    .block-container {
        padding-top: 1.1rem;
        padding-bottom: 2.4rem;
        max-width: 1240px;
    }
    h1, h2, h3 {
        letter-spacing: -0.02em;
        font-weight: 700;
        color: var(--text);
    }
    h1 {
        font-size: 2rem;
        margin-bottom: 0.15rem;
    }
    h2 {
        font-size: 1.35rem;
    }
    [data-testid="stSidebar"] {
        background: #f8fafc;
        border-right: 1px solid var(--line);
    }
    [data-testid="stSidebarNav"] {
        padding-top: 0.4rem;
    }
    [data-testid="stSidebarNav"] a {
        border-radius: 10px;
        margin: 0.08rem 0.35rem;
        padding: 0.35rem 0.6rem;
    }
    [data-testid="stSidebarNav"] a:hover {
        background: #eef2ff;
    }
    div[data-testid="stMetric"] {
        background: var(--card);
        border: 1px solid var(--line);
        border-radius: 16px;
        padding: 0.9rem 1rem;
        box-shadow: 0 10px 22px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.04);
    }
    [data-testid="stMetricLabel"] {
        color: var(--muted);
        font-weight: 500;
    }
    [data-testid="stMetricValue"] {
        font-weight: 700;
    }
    .stButton button, .stDownloadButton button {
        border-radius: 12px;
        border: 1px solid #d1d5db;
        background: #fff;
        color: var(--text);
        font-weight: 600;
        transition: all .15s ease;
    }
    .stButton button:hover, .stDownloadButton button:hover {
        border-color: #94a3b8;
        transform: translateY(-1px);
        box-shadow: 0 8px 18px rgba(15, 23, 42, 0.06);
    }
    .stDataFrame, [data-testid="stTable"] {
        background: var(--card);
        border: 1px solid var(--line);
        border-radius: 14px;
        overflow: hidden;
        box-shadow: 0 4px 10px rgba(15, 23, 42, 0.03);
    }
    div[data-testid="stMarkdownContainer"] p {
        color: var(--text);
    }
    .gc-eyebrow {
        display: inline-block;
        font-size: 0.72rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #1e40af;
        background: var(--accent-soft);
        border: 1px solid #bfdbfe;
        padding: 0.22rem 0.45rem;
        border-radius: 999px;
        font-weight: 700;
        margin-bottom: 0.45rem;
    }
    .gc-header-card {
        background: rgba(255,255,255,0.9);
        backdrop-filter: blur(8px);
        border: 1px solid var(--line);
        border-radius: 18px;
        padding: 1rem 1.1rem 0.9rem 1.1rem;
        margin-bottom: 0.8rem;
        box-shadow: 0 10px 20px rgba(15, 23, 42, 0.04);
    }
    .gc-divider {
        height: 1px;
        background: linear-gradient(90deg, transparent, #dbe3ee, transparent);
        margin: 0.45rem 0 0.9rem 0;
    }
</style>
        """,
        unsafe_allow_html=True,
    )
