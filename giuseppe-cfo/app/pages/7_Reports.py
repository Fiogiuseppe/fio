import io
from decimal import Decimal

import pandas as pd
import streamlit as st

from app.models import Client, Expense, Invoice
from app.services.accounting import (
    category_totals,
    estimated_profit,
    monthly_totals,
    outstanding_invoices,
    overdue_invoices,
)
from app.ui.navigation import page_title
from app.ui.runtime import bootstrap

Session = bootstrap()
page_title("Reports", "Based on records entered into Giuseppe CFO.")


def download_frame(frame: pd.DataFrame, label: str, filename: str) -> None:
    buffer = io.StringIO()
    frame.to_csv(buffer, index=False)
    st.download_button(label, data=buffer.getvalue(), file_name=filename, mime="text/csv")


with Session() as session:
    invoices = list(session.query(Invoice))
    expenses = list(session.query(Expense))
    years = sorted(
        {item.issue_date.year for item in invoices} | {item.expense_date.year for item in expenses}
    )
    selected_year = st.selectbox("Select year", years or [None])
    year_invoices = (
        [item for item in invoices if item.issue_date.year == selected_year]
        if selected_year
        else []
    )
    year_expenses = (
        [item for item in expenses if item.expense_date.year == selected_year]
        if selected_year
        else []
    )

    monthly_revenue = monthly_totals(year_invoices, "net_amount_dkk")
    monthly_expenses = monthly_totals(year_expenses, "deductible_planning_amount_dkk")
    months = sorted(set(monthly_revenue) | set(monthly_expenses))
    report_rows = []
    for month in months:
        revenue = monthly_revenue.get(month, Decimal("0"))
        cost = monthly_expenses.get(month, Decimal("0"))
        report_rows.append(
            {
                "month": month,
                "turnover_dkk": revenue,
                "expenses_dkk": cost,
                "profit_dkk": estimated_profit(revenue, cost),
            }
        )
    monthly_frame = pd.DataFrame(report_rows)
    st.subheader("Monthly turnover, expenses, and estimated profit")
    st.dataframe(monthly_frame, use_container_width=True)
    if not monthly_frame.empty:
        st.line_chart(
            monthly_frame.set_index("month")[["turnover_dkk", "expenses_dkk", "profit_dkk"]]
        )
    download_frame(monthly_frame, "Download monthly CSV", "monthly_report.csv")

    st.subheader("Revenue by category")
    by_category = pd.DataFrame(
        [
            {"category": key, "turnover_dkk": value}
            for key, value in category_totals(year_invoices).items()
        ]
    )
    st.dataframe(by_category, use_container_width=True)
    if not by_category.empty:
        st.bar_chart(by_category.set_index("category"))
    download_frame(by_category, "Download revenue-by-category CSV", "revenue_by_category.csv")

    st.subheader("Expenses by category")
    expense_totals: dict[str, Decimal] = {}
    for item in year_expenses:
        expense_totals[item.category] = expense_totals.get(item.category, Decimal("0")) + Decimal(
            str(item.deductible_planning_amount_dkk)
        )
    expense_category_frame = pd.DataFrame(
        [{"category": key, "expenses_dkk": value} for key, value in sorted(expense_totals.items())]
    )
    st.dataframe(expense_category_frame, use_container_width=True)
    download_frame(
        expense_category_frame, "Download expenses-by-category CSV", "expenses_by_category.csv"
    )

    st.subheader("Revenue by client")
    client_names = {item.id: item.company_name for item in session.query(Client).all()}
    by_client: dict[str, Decimal] = {}
    for item in year_invoices:
        key = client_names.get(item.client_id, f"Client {item.client_id}")
        by_client[key] = by_client.get(key, Decimal("0")) + Decimal(str(item.net_amount_dkk))
    by_client_frame = pd.DataFrame(
        [{"client": key, "revenue_dkk": value} for key, value in sorted(by_client.items())]
    )
    st.dataframe(by_client_frame, use_container_width=True)
    download_frame(by_client_frame, "Download revenue-by-client CSV", "revenue_by_client.csv")

    st.subheader("Invoices summary")
    invoice_frame = pd.DataFrame(
        [
            {
                "number": item.invoice_number,
                "status": item.status,
                "gross_dkk": item.gross_amount_dkk,
                "paid_dkk": item.amount_paid_dkk,
            }
            for item in year_invoices
        ]
    )
    st.dataframe(invoice_frame, use_container_width=True)
    download_frame(invoice_frame, "Download invoice summary CSV", "invoice_summary.csv")

    overdue = overdue_invoices(year_invoices)
    paid = [item for item in year_invoices if item.status == "paid"]
    st.subheader("Payment status summary")
    st.write(f"Outstanding invoices value: {outstanding_invoices(year_invoices)} DKK")
    st.write(f"Overdue invoices: {len(overdue)}")
    st.write(f"Paid invoices: {len(paid)}")
    missing_receipts = [item.expense_number for item in year_expenses if not item.receipt_path]
    st.write(f"Expenses with missing receipts: {len(missing_receipts)}")
