from decimal import Decimal

import streamlit as st

from app.ui.formatting import dkk


def metric_row(metrics: list[tuple[str, Decimal | int | str]]) -> None:
    columns = st.columns(len(metrics))
    for column, (label, value) in zip(columns, metrics):
        column.metric(label, dkk(value) if isinstance(value, Decimal) else str(value))


def planning_disclaimer() -> None:
    st.info("Planning tool only — not tax or accounting advice.")
