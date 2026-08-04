from datetime import date
from decimal import Decimal

import streamlit as st

from app.models import Expense, Invoice
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
from app.ui.components import planning_disclaimer
from app.ui.formatting import dkk
from app.ui.navigation import page_title
from app.ui.runtime import bootstrap

Session = bootstrap()
page_title("Dashboard", "Based on records entered into Giuseppe CFO.")
planning_disclaimer()

with Session() as session:
    settings = SettingsRepository(session).get_or_create()
    invoices = list(session.query(Invoice))
    expenses = list(session.query(Expense))
    turnover = gross_turnover(invoices)
    costs = total_expenses(expenses)
    profit = estimated_profit(turnover, costs)
    reserve = suggested_tax_reserve(profit, Decimal(str(settings.tax_reserve_percentage)))
    threshold = Decimal(str(settings.vat_threshold_dkk))
    percentage = threshold_percentage(turnover, threshold)
    remaining = remaining_threshold(turnover, threshold)
    overdue = overdue_invoices(invoices, date.today())
    unpaid = [item for item in invoices if item.status not in {"paid", "cancelled"}]

    a, b, c, d = st.columns(4)
    a.metric("Gross turnover", dkk(turnover))
    b.metric("Total expenses", dkk(costs))
    c.metric("Estimated profit", dkk(profit))
    d.metric("Suggested tax reserve", dkk(reserve))
    e, f, g, h = st.columns(4)
    e.metric("Threshold", dkk(threshold))
    f.metric("Used", f"{percentage}%")
    g.metric("Remaining", dkk(remaining))
    h.metric("Status", threshold_warning(percentage))
    st.info(
        "If you expect to exceed the threshold, verify the required registration change with SKAT before continuing."
    )
    st.metric("Unpaid invoices", f"{len(unpaid)} / {dkk(outstanding_invoices(invoices))}")
    st.metric("Overdue invoices", str(len(overdue)))
