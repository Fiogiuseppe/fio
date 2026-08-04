from decimal import Decimal

import streamlit as st

from app.constants import CURRENCIES, EXPENSE_CATEGORIES


def currency_and_rate_fields(
    default_currency: str = "DKK", key_prefix: str = ""
) -> tuple[str, Decimal]:
    currency = st.selectbox(
        "Currency",
        CURRENCIES,
        index=CURRENCIES.index(default_currency),
        key=f"{key_prefix}_currency",
    )
    default_rate = Decimal("1")
    rate = st.number_input(
        "Exchange rate to DKK (1 unit foreign currency = X DKK)",
        min_value=0.000001,
        value=float(default_rate),
        format="%.6f",
        key=f"{key_prefix}_rate",
        disabled=currency == "DKK",
    )
    return currency, Decimal("1") if currency == "DKK" else Decimal(str(rate))


def expense_category_field(key: str = "expense_category") -> str:
    return st.selectbox("Category", EXPENSE_CATEGORIES, key=key)
