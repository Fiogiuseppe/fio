from datetime import date
from decimal import Decimal

import streamlit as st

from app.config import ensure_local_directories, load_private_environment
from app.database import initialise_database, session_factory
from app.models import Expense, Invoice
from app.repositories.audit_logs import AuditLogsRepository
from app.repositories.settings import SettingsRepository
from app.services.accounting import (
    estimated_profit,
    gross_turnover,
    outstanding_invoices,
    overdue_invoices,
    remaining_threshold,
    suggested_tax_reserve,
    threshold_percentage,
    threshold_warning,
    total_expenses,
)
from app.ui.authentication import require_login
from app.ui.components import planning_disclaimer
from app.ui.formatting import dkk
from app.ui.navigation import page_title

st.set_page_config("GIUSEPPE CFO", "💼", layout="wide")
load_private_environment()
if not require_login():
    st.stop()
ensure_local_directories()
initialise_database(create_safety_backup=True)
Session = session_factory()

page_title("GIUSEPPE CFO", "Private local business management for Giuseppe’s PMV.")
st.caption("All records stay on this computer. No cloud sync. No telemetry.")
planning_disclaimer()

with Session() as session:
    settings = SettingsRepository(session).get_or_create()
    invoices = list(session.query(Invoice))
    expenses = list(session.query(Expense))
    turnover = gross_turnover(invoices)
    costs = total_expenses(expenses)
    profit = estimated_profit(turnover, costs)
    threshold = Decimal(str(settings.vat_threshold_dkk))
    threshold_pct = threshold_percentage(turnover, threshold)
    unpaid_value = outstanding_invoices(invoices)
    overdue = overdue_invoices(invoices, date.today())
    rows = [
        ("Business", settings.business_name),
        ("Type", settings.business_type),
        ("Year", str(date.today().year)),
        ("Gross turnover", dkk(turnover)),
        ("Expenses", dkk(costs)),
        ("Estimated profit", dkk(profit)),
        (
            "Suggested tax reserve",
            dkk(suggested_tax_reserve(profit, Decimal(str(settings.tax_reserve_percentage)))),
        ),
        ("Threshold remaining", dkk(remaining_threshold(turnover, threshold))),
        ("Threshold used", f"{threshold_pct}%"),
        (
            "Unpaid invoices",
            f"{len([i for i in invoices if i.status not in {'paid', 'cancelled'}])} ({dkk(unpaid_value)})",
        ),
        ("Overdue invoices", str(len(overdue))),
    ]
    first, second = st.columns(2)
    with first:
        for label, value in rows[:6]:
            st.metric(label, value)
    with second:
        for label, value in rows[6:]:
            st.metric(label, value)

    st.info(
        f"PMV threshold status: {threshold_warning(threshold_pct)}. "
        "If you expect to exceed the threshold, verify the required registration change with SKAT before continuing."
    )
    st.warning("Not VAT registered" if not settings.vat_registered else "VAT registered")

    st.subheader("Recent activity")
    activities = AuditLogsRepository(session).list(limit=5)
    if not activities:
        st.write("No activity recorded yet.")
    else:
        st.table(
            [
                {
                    "Timestamp": item.timestamp,
                    "Action": item.action,
                    "Entity": item.entity_type,
                    "ID": item.entity_identifier,
                    "Summary": item.summary,
                }
                for item in activities
            ]
        )
