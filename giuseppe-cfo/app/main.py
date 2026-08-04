from datetime import date, timedelta
from decimal import Decimal

import streamlit as st

from app.config import ensure_local_directories
from app.database import initialise_database, session_factory
from app.models import Client, Expense, Invoice
from app.repositories.clients import ClientsRepository
from app.repositories.expenses import ExpensesRepository
from app.repositories.invoices import InvoicesRepository
from app.repositories.settings import SettingsRepository
from app.services.accounting import (
    business_use_amount,
    estimated_profit,
    gross_turnover,
    remaining_threshold,
    suggested_tax_reserve,
    threshold_percentage,
    threshold_warning,
    total_expenses,
)
from app.services.backups import create_backup
from app.services.exports import export_excel
from app.ui.authentication import require_login

st.set_page_config("GIUSEPPE CFO", "💼", layout="wide")
if not require_login():
    st.stop()
ensure_local_directories()
initialise_database()
Session = session_factory()
st.title("GIUSEPPE CFO")
st.caption("Private local business management. No cloud services or external data transfer.")
with Session() as session:
    settings = SettingsRepository(session).get_or_create()
    clients, invoices, expenses = list(session.query(Client)), list(session.query(Invoice)), list(session.query(Expense))
    turnover, costs = gross_turnover(invoices), total_expenses(expenses)
    profit = estimated_profit(turnover, costs)
    threshold = threshold_percentage(turnover, Decimal(str(settings.vat_threshold_dkk)))
    dashboard, clients_tab, quotes, invoices_tab, expenses_tab, documents, reports, export, settings_tab = st.tabs(["Dashboard","Clients","Quotes","Invoices","Expenses","Documents","Reports","Backup & Export","Settings"])
    with dashboard:
        cols = st.columns(4)
        for col, label, value in zip(cols, ["Gross turnover","Expenses","Estimated profit","Tax reserve (planning)"], [turnover,costs,profit,suggested_tax_reserve(profit,Decimal(str(settings.tax_reserve_percentage)))]):
            col.metric(label, f"{value:,.2f} DKK")
        st.info(f"PMV threshold: {threshold_warning(threshold)} — {remaining_threshold(turnover,Decimal(str(settings.vat_threshold_dkk))):,.2f} DKK remaining. Planning only, not tax advice.")
    with clients_tab:
        with st.form("new_client"):
            name, email = st.text_input("Company or client name *"), st.text_input("Email")
            if st.form_submit_button("Save client") and name:
                ClientsRepository(session).create(client_code=f"C-{len(clients)+1:04d}", company_name=name, email=email); session.commit(); st.success("Client saved.")
        st.dataframe([{"Code":c.client_code,"Name":c.company_name,"Email":c.email} for c in clients],use_container_width=True)
    with quotes: st.info("Quotes are stored locally; draft creation is available in the next interface update.")
    with invoices_tab:
        if clients:
            with st.form("new_invoice"):
                client=st.selectbox("Client",clients,format_func=lambda c:c.company_name); title=st.text_input("Title *"); amount=st.number_input("Net amount",min_value=0.0)
                if st.form_submit_button("Create invoice draft") and title:
                    net=Decimal(str(amount)); InvoicesRepository(session).create_draft(client_id=client.id,issue_date=date.today(),due_date=date.today()+timedelta(days=14),title=title,original_net_amount=net,net_amount_dkk=net,gross_amount_dkk=net);session.commit();st.success("Invoice draft saved.")
        else: st.info("Create a client first.")
    with expenses_tab:
        with st.form("new_expense"):
            supplier, amount, use = st.text_input("Supplier *"), st.number_input("Amount",min_value=0.0), st.slider("Business use %",0,100,100)
            if st.form_submit_button("Save expense") and supplier:
                value=Decimal(str(amount)); ExpensesRepository(session).create(expense_date=date.today(),supplier=supplier,original_amount=value,amount_dkk=value,business_use_percentage=Decimal(use),deductible_planning_amount_dkk=business_use_amount(value,Decimal(use)));session.commit();st.success("Expense saved.")
    with documents: st.info("Document copying is intentionally disabled. Register local paths in a future update.")
    with reports: st.write("Dashboard calculations update from local saved records.")
    with export:
        if st.button("Create local backup"): st.success(f"Created {create_backup().name}")
        if st.button("Export Excel"): st.success(f"Created {export_excel(session).name}")
    with settings_tab: st.warning("Not VAT registered" if not settings.vat_registered else "VAT registered")
