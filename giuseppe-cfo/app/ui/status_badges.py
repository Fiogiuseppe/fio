import streamlit as st

STATUS_COLORS = {
    "draft": "#6b7280",
    "sent": "#2563eb",
    "accepted": "#16a34a",
    "rejected": "#dc2626",
    "expired": "#b45309",
    "converted": "#0f766e",
    "partially_paid": "#7c3aed",
    "paid": "#16a34a",
    "overdue": "#dc2626",
    "cancelled": "#374151",
    "archived": "#4b5563",
}


def show_status(label: str) -> None:
    color = STATUS_COLORS.get(label, "#334155")
    st.markdown(
        f"<span style='background:{color};color:white;padding:0.2rem 0.5rem;border-radius:0.4rem'>{label}</span>",
        unsafe_allow_html=True,
    )
