from datetime import date
from decimal import Decimal

import streamlit as st
from pydantic import ValidationError

from app.models import Client
from app.repositories.invoices import InvoicesRepository
from app.repositories.settings import SettingsRepository
from app.schemas.invoice import InvoiceInput, InvoicePaymentInput
from app.services.exports import export_csv
from app.ui.formatting import dkk
from app.ui.forms import currency_and_rate_fields
from app.ui.navigation import page_title
from app.ui.runtime import bootstrap

Session = bootstrap()
page_title("Invoices", "Draft, send, collect payments, cancel, and archive.")

with Session() as session:
    repo = InvoicesRepository(session)
    settings = SettingsRepository(session).get_or_create()
    clients = list(
        session.query(Client).filter(Client.is_active.is_(True)).order_by(Client.company_name)
    )
    repo.refresh_overdue()
    session.commit()
    st.warning("Not VAT registered" if not settings.vat_registered else "VAT registered")
    st.caption("Invoice compliance should be verified before issuing the first real invoice.")

    with st.expander("Create draft invoice"):
        if not clients:
            st.info("Create a client first.")
        else:
            with st.form("create_invoice"):
                client = st.selectbox("Client", clients, format_func=lambda item: item.company_name)
                issue_date = st.date_input("Issue date", value=date.today())
                due_date = st.date_input("Due date", value=date.today())
                title = st.text_input("Title *")
                description = st.text_area("Description")
                category = st.text_input("Category", value="Creative services")
                currency, rate = currency_and_rate_fields(key_prefix="invoice")
                net_amount = st.number_input("Net amount", min_value=0.0, format="%.2f")
                vat_rate = st.number_input(
                    "VAT rate", min_value=0.0, max_value=1.0, value=0.0, format="%.4f"
                )
                notes = st.text_area("Notes")
                if st.form_submit_button("Save draft"):
                    try:
                        data = InvoiceInput(
                            client_id=client.id,
                            issue_date=issue_date,
                            due_date=due_date,
                            title=title,
                            description=description,
                            category=category,
                            currency=currency,
                            original_net_amount=Decimal(str(net_amount)),
                            exchange_rate_to_dkk=rate,
                            vat_rate=Decimal(str(vat_rate)),
                            notes=notes,
                        )
                        repo.create_draft(
                            client_id=data.client_id,
                            issue_date=data.issue_date,
                            due_date=data.due_date,
                            title=data.title,
                            description=data.description,
                            category=data.category,
                            currency=data.currency,
                            original_net_amount=data.original_net_amount,
                            exchange_rate_to_dkk=data.exchange_rate_to_dkk,
                            net_amount_dkk=data.net_amount_dkk(),
                            vat_rate=data.vat_rate,
                            vat_amount_dkk=data.vat_amount_dkk(settings.vat_registered),
                            gross_amount_dkk=data.gross_amount_dkk(settings.vat_registered),
                            notes=data.notes,
                        )
                        session.commit()
                        st.success("Draft saved.")
                    except (ValidationError, ValueError) as error:
                        st.error(str(error))

    invoices = repo.list()
    search = st.text_input("Search invoice")
    year = st.selectbox(
        "Year", ["all"] + sorted({str(item.issue_date.year) for item in invoices}, reverse=True)
    )
    client_filter = st.selectbox(
        "Client",
        ["all"] + [str(item.id) for item in clients],
        format_func=lambda value: (
            "all" if value == "all" else next(c.company_name for c in clients if str(c.id) == value)
        ),
    )
    status = st.selectbox(
        "Status",
        ["all", "draft", "sent", "partially_paid", "paid", "overdue", "cancelled", "archived"],
    )
    filtered = invoices
    if search:
        filtered = [
            item
            for item in filtered
            if search.lower() in f"{item.invoice_number} {item.title}".lower()
        ]
    if year != "all":
        filtered = [item for item in filtered if str(item.issue_date.year) == year]
    if client_filter != "all":
        filtered = [item for item in filtered if str(item.client_id) == client_filter]
    if status != "all":
        filtered = [item for item in filtered if item.status == status]
    st.dataframe(
        [
            {
                "ID": item.id,
                "Number": item.invoice_number,
                "Status": item.status,
                "Issue date": item.issue_date,
                "Due date": item.due_date,
                "Gross DKK": dkk(item.gross_amount_dkk),
                "Paid DKK": dkk(item.amount_paid_dkk),
            }
            for item in filtered
        ],
        use_container_width=True,
    )
    if st.button("Export invoices CSV"):
        path = export_csv(session, "invoices")
        st.success(f"CSV exported to {path}")

    invoice_by_id = {item.id: item for item in filtered}
    selected = (
        st.selectbox(
            "Select invoice",
            list(invoice_by_id.keys()),
            format_func=lambda iid: (
                f"{invoice_by_id[iid].invoice_number} ({invoice_by_id[iid].status})"
            ),
        )
        if filtered
        else None
    )
    if selected is not None:
        invoice = invoice_by_id[selected]
        st.subheader(f"{invoice.invoice_number} — {invoice.title}")
        st.write(
            f"Outstanding: {dkk(Decimal(str(invoice.gross_amount_dkk)) - Decimal(str(invoice.amount_paid_dkk)))}"
        )
        if invoice.status == "draft":
            with st.form("edit_invoice_draft"):
                title = st.text_input("Title", value=invoice.title)
                description = st.text_area("Description", value=invoice.description)
                notes = st.text_area("Notes", value=invoice.notes)
                if st.form_submit_button("Save draft"):
                    repo.update_draft(invoice, title=title, description=description, notes=notes)
                    session.commit()
                    st.success("Draft updated.")
            if st.button("Mark draft sent"):
                repo.mark_sent(invoice)
                session.commit()
                st.success(f"Official number assigned: {invoice.invoice_number}")
        if invoice.status in {"sent", "partially_paid", "overdue"}:
            with st.form("payment_invoice"):
                amount = st.number_input("Payment amount DKK", min_value=0.01, format="%.2f")
                paid_date = st.date_input("Paid date", value=date.today())
                if st.form_submit_button("Record payment"):
                    try:
                        payment = InvoicePaymentInput(
                            amount_dkk=Decimal(str(amount)), paid_date=paid_date
                        )
                        repo.record_payment(invoice, payment.amount_dkk, payment.paid_date)
                        session.commit()
                        st.success("Payment recorded.")
                    except (ValidationError, ValueError) as error:
                        st.error(str(error))
        if st.button("Copy into new draft"):
            copy = repo.copy_to_draft(invoice)
            session.commit()
            st.success(f"Created {copy.invoice_number}")
        if st.button("Cancel invoice"):
            repo.mark_cancelled(invoice, reason="Cancelled by user")
            session.commit()
            st.success("Invoice cancelled (number remains reserved).")
        if st.button("Archive invoice"):
            repo.mark_archived(invoice)
            session.commit()
            st.success("Invoice archived.")
