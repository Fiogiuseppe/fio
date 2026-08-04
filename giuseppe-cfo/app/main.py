from __future__ import annotations

import os
from datetime import date, timedelta
from decimal import Decimal
from pathlib import Path

import streamlit as st

from app.accounting import vat_status
from app.chat import respond
from app.google_workspace import GoogleWorkspace
from app.invoices import generate_invoice_pdf
from app.models import Expense, Invoice, InvoiceLine

st.set_page_config(page_title="Giuseppe CFO", page_icon="💼", layout="wide")
st.title("💼 Giuseppe CFO")
st.caption("En personlig CFO til din danske PMV. Tallene synkroniseres med Google Sheets.")


@st.cache_resource
def workspace() -> GoogleWorkspace:
    service = GoogleWorkspace()
    service.ensure_workbook()
    return service


try:
    db = workspace()
except (KeyError, FileNotFoundError) as error:
    st.error(f"Google-integration er ikke konfigureret: {error}. Kopiér .env.example til dine miljøvariabler.")
    st.stop()

status = vat_status(db.invoice_revenue())
first, second, third = st.columns(3)
first.metric("Omsætning, 12 mdr.", f"{status['rolling_revenue']:,.0f} DKK")
second.metric("Til VAT-grænse", f"{status['remaining']:,.0f} DKK")
third.metric("VAT registrering", "Påkrævet" if status["registration_required"] else "Ikke påkrævet")

tab_clients, tab_expenses, tab_invoices, tab_chat = st.tabs(["Kunder", "Udgifter", "Fakturaer", "Chat"])

with tab_clients:
    with st.form("client"):
        st.subheader("Ny kunde")
        name = st.text_input("Navn *")
        email = st.text_input("E-mail *")
        address = st.text_area("Adresse")
        cvr = st.text_input("CVR (valgfrit)")
        if st.form_submit_button("Gem kunde"):
            if not name or not email:
                st.error("Navn og e-mail er påkrævet.")
            else:
                client = db.add_client(name, email, address, cvr)
                st.success(f"{client.name} er gemt.")
    clients = db.list_clients()
    if clients:
        st.dataframe([client.__dict__ for client in clients], use_container_width=True, hide_index=True)

with tab_expenses:
    with st.form("expense"):
        st.subheader("Ny udgift")
        expense_date = st.date_input("Dato", value=date.today())
        vendor = st.text_input("Leverandør *")
        description = st.text_input("Beskrivelse *")
        net = st.number_input("Beløb ekskl. moms (DKK)", min_value=0.0, step=0.01, format="%.2f")
        vat = st.number_input("Moms (DKK)", min_value=0.0, step=0.01, format="%.2f")
        category = st.text_input("Kategori", value="Andet")
        receipt = st.text_input("Link til kvittering (valgfrit)")
        if st.form_submit_button("Gem udgift"):
            if not vendor or not description:
                st.error("Leverandør og beskrivelse er påkrævet.")
            else:
                db.add_expense(Expense(expense_date, vendor, description, Decimal(str(net)), Decimal(str(vat)), category, receipt))
                st.success("Udgift er gemt i Google Sheets.")

with tab_invoices:
    clients = db.list_clients()
    if not clients:
        st.info("Opret en kunde før du laver en faktura.")
    else:
        with st.form("invoice"):
            st.subheader("Ny faktura")
            selected = st.selectbox("Kunde", clients, format_func=lambda client: f"{client.name} — {client.email}")
            issue_date = st.date_input("Fakturadato", value=date.today())
            due_date = st.date_input("Forfaldsdato", value=date.today() + timedelta(days=int(os.getenv("PAYMENT_TERMS_DAYS", "14"))))
            description = st.text_input("Linjetekst *")
            quantity = st.number_input("Antal", min_value=0.01, value=1.0, step=0.01)
            unit_price = st.number_input("Pris pr. enhed ekskl. moms (DKK)", min_value=0.0, step=0.01, format="%.2f")
            vat_rate = st.selectbox("Momssats", [Decimal("0.25"), Decimal("0")], format_func=lambda rate: f"{rate * 100:.0f}%")
            if st.form_submit_button("Opret PDF og faktura"):
                if not description:
                    st.error("Linjetekst er påkrævet.")
                else:
                    invoice = Invoice(
                        number=db.next_invoice_number(), issue_date=issue_date, due_date=due_date, client=selected,
                        lines=[InvoiceLine(description, Decimal(str(quantity)), Decimal(str(unit_price)), vat_rate)],
                    )
                    pdf = generate_invoice_pdf(invoice, Path("generated-invoices"))
                    pdf_url = db.upload_invoice_pdf(pdf)
                    db.add_invoice(Invoice(invoice.number, invoice.issue_date, invoice.due_date, invoice.client, invoice.lines, pdf_url))
                    st.success(f"Faktura {invoice.number} er gemt.")
                    st.link_button("Åbn PDF i Google Drive", pdf_url)

with tab_chat:
    st.caption("Spørg om momsstatus, cash flow eller din PMV. Chatten kan ikke ændre dit regnskab.")
    question = st.chat_input("Skriv “VAT” for grænsestatus…")
    if question:
        with st.chat_message("user"):
            st.write(question)
        with st.chat_message("assistant"):
            with st.spinner("Tænker…"):
                st.write(respond(question, db))
