from datetime import date, timedelta
from decimal import Decimal

import streamlit as st
from pydantic import ValidationError

from app.models import Client
from app.repositories.quotes import QuotesRepository
from app.schemas.quote import QuoteInput
from app.services.exports import export_csv
from app.ui.formatting import dkk
from app.ui.forms import currency_and_rate_fields
from app.ui.navigation import page_title
from app.ui.runtime import bootstrap

Session = bootstrap()
page_title("Quotes", "Create and manage quote lifecycle.")

with Session() as session:
    repo = QuotesRepository(session)
    clients = list(
        session.query(Client).filter(Client.is_active.is_(True)).order_by(Client.company_name)
    )
    search = st.text_input("Search quotes")
    status_filter = st.selectbox(
        "Status",
        ["all", "draft", "sent", "accepted", "rejected", "expired", "converted", "archived"],
    )
    quotes = repo.list()
    if search:
        quotes = [q for q in quotes if search.lower() in f"{q.quote_number} {q.title}".lower()]
    if status_filter != "all":
        quotes = [q for q in quotes if q.status == status_filter]

    with st.expander("Create quote", expanded=False):
        if not clients:
            st.info("Create a client first.")
        else:
            with st.form("create_quote"):
                client = st.selectbox("Client", clients, format_func=lambda item: item.company_name)
                issue_date = st.date_input("Issue date", value=date.today())
                expiry_date = st.date_input("Expiry date", value=date.today() + timedelta(days=30))
                title = st.text_input("Title *")
                description = st.text_area("Description")
                currency, rate = currency_and_rate_fields(key_prefix="quote")
                amount = st.number_input("Subtotal", min_value=0.0, format="%.2f")
                notes = st.text_area("Notes")
                if st.form_submit_button("Save quote"):
                    try:
                        data = QuoteInput(
                            client_id=client.id,
                            issue_date=issue_date,
                            expiry_date=expiry_date,
                            title=title,
                            description=description,
                            currency=currency,
                            original_subtotal=Decimal(str(amount)),
                            exchange_rate_to_dkk=rate,
                            notes=notes,
                        )
                        repo.create(
                            client_id=data.client_id,
                            issue_date=data.issue_date,
                            expiry_date=data.expiry_date,
                            title=data.title,
                            description=data.description,
                            currency=data.currency,
                            original_subtotal=data.original_subtotal,
                            exchange_rate_to_dkk=data.exchange_rate_to_dkk,
                            subtotal_dkk=data.subtotal_dkk(),
                            notes=data.notes,
                        )
                        session.commit()
                        st.success("Quote saved.")
                    except (ValidationError, ValueError) as error:
                        st.error(str(error))

    st.dataframe(
        [
            {
                "ID": item.id,
                "Number": item.quote_number,
                "Client ID": item.client_id,
                "Status": item.status,
                "Subtotal DKK": dkk(item.subtotal_dkk),
                "Issue date": item.issue_date,
            }
            for item in quotes
        ],
        use_container_width=True,
    )

    if st.button("Export quotes CSV"):
        path = export_csv(session, "quotes")
        st.success(f"CSV exported to {path}")

    quote_by_id = {item.id: item for item in quotes}
    selected = (
        st.selectbox(
            "Select quote",
            list(quote_by_id.keys()),
            format_func=lambda qid: f"{quote_by_id[qid].quote_number} ({quote_by_id[qid].status})",
        )
        if quotes
        else None
    )
    if selected is not None:
        quote = quote_by_id[selected]
        st.subheader(f"{quote.quote_number} — {quote.title}")
        st.write(f"Subtotal: {dkk(quote.subtotal_dkk)}")
        if quote.status == "draft":
            with st.form("edit_quote"):
                title = st.text_input("Title", value=quote.title)
                description = st.text_area("Description", value=quote.description)
                notes = st.text_area("Notes", value=quote.notes)
                if st.form_submit_button("Save draft"):
                    repo.update(quote, title=title, description=description, notes=notes)
                    session.commit()
                    st.success("Draft updated.")
        action = st.selectbox("Set status", ["sent", "accepted", "rejected", "expired", "archived"])
        if st.button("Apply status"):
            repo.set_status(quote, action)
            session.commit()
            st.success("Status updated.")
        if st.button("Duplicate quote"):
            copy = repo.duplicate(quote)
            session.commit()
            st.success(f"Created {copy.quote_number}")
        due_date = st.date_input(
            "Due date for converted invoice", value=date.today() + timedelta(days=14)
        )
        if st.button("Convert accepted quote to draft invoice"):
            try:
                invoice = repo.convert_to_invoice_draft(quote, due_date)
                session.commit()
                st.success(f"Created draft invoice {invoice.invoice_number}")
            except ValueError as error:
                st.error(str(error))
