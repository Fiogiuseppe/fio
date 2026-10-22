import streamlit as st
from pydantic import ValidationError

from app.repositories.clients import ClientsRepository
from app.schemas.client import ClientInput
from app.ui.formatting import dkk
from app.ui.navigation import page_title
from app.ui.runtime import bootstrap

Session = bootstrap()
page_title("Clients", "Create, search, edit, archive, and restore clients.")

with Session() as session:
    repo = ClientsRepository(session)
    search = st.text_input("Search clients", value="")
    active_filter = st.selectbox("Status filter", ["all", "active", "archived"], index=0)
    clients = repo.list(search=search, active_filter=active_filter)

    with st.expander("Create client", expanded=False):
        with st.form("create_client"):
            client_code = st.text_input("Client code", value=repo.next_client_code())
            company_name = st.text_input("Company name *")
            contact_name = st.text_input("Contact name")
            email = st.text_input("Email")
            telephone = st.text_input("Telephone")
            billing_address = st.text_area("Billing address")
            postal_code = st.text_input("Postal code")
            city = st.text_input("City")
            country = st.text_input("Country", value="Denmark")
            vat_or_business_number = st.text_input("VAT or business number")
            default_currency = st.selectbox(
                "Default currency", ["DKK", "EUR", "USD", "GBP", "SEK", "NOK"]
            )
            payment_terms_days = st.number_input(
                "Payment terms (days)", min_value=0, max_value=180, value=14
            )
            notes = st.text_area("Notes")
            if st.form_submit_button("Save client"):
                try:
                    data = ClientInput(
                        company_name=company_name,
                        contact_name=contact_name,
                        email=email or None,
                        telephone=telephone,
                        billing_address=billing_address,
                        postal_code=postal_code,
                        city=city,
                        country=country,
                        vat_or_business_number=vat_or_business_number,
                        default_currency=default_currency,
                        payment_terms_days=int(payment_terms_days),
                        notes=notes,
                    )
                    repo.create(client_code=client_code, **data.model_dump())
                    session.commit()
                    st.success("Client saved.")
                except (ValidationError, ValueError) as error:
                    st.error(str(error))

    st.dataframe(
        [
            {
                "ID": item.id,
                "Code": item.client_code,
                "Company": item.company_name,
                "Email": item.email,
                "Active": item.is_active,
            }
            for item in clients
        ],
        use_container_width=True,
    )

    client_by_id = {item.id: item for item in clients}
    selected_id = (
        st.selectbox(
            "Open client detail",
            list(client_by_id.keys()),
            format_func=lambda cid: (
                f"{client_by_id[cid].client_code} — {client_by_id[cid].company_name}"
            ),
        )
        if clients
        else None
    )
    if selected_id is not None:
        client = client_by_id[selected_id]
        st.subheader(f"Client detail: {client.company_name}")
        st.write(f"Outstanding value: {dkk(repo.outstanding_value(client.id))}")
        st.write(f"Total paid revenue: {dkk(repo.total_paid_revenue(client.id))}")
        st.write("Related quotes")
        st.table(
            [{"Quote": q.quote_number, "Status": q.status} for q in repo.related_quotes(client.id)]
        )
        st.write("Related invoices")
        st.table(
            [
                {"Invoice": i.invoice_number, "Status": i.status}
                for i in repo.related_invoices(client.id)
            ]
        )
        with st.form("edit_client"):
            company_name = st.text_input("Company name *", value=client.company_name)
            contact_name = st.text_input("Contact name", value=client.contact_name)
            email = st.text_input("Email", value=client.email)
            notes = st.text_area("Notes", value=client.notes)
            save = st.form_submit_button("Save changes")
            archive = st.form_submit_button("Archive client")
            restore = st.form_submit_button("Restore client")
            try:
                if save:
                    data = ClientInput(
                        company_name=company_name,
                        contact_name=contact_name,
                        email=email or None,
                        telephone=client.telephone,
                        billing_address=client.billing_address,
                        postal_code=client.postal_code,
                        city=client.city,
                        country=client.country,
                        vat_or_business_number=client.vat_or_business_number,
                        default_currency=client.default_currency,
                        payment_terms_days=client.payment_terms_days,
                        notes=notes,
                    )
                    repo.update(client, **data.model_dump())
                    session.commit()
                    st.success("Client updated.")
                if archive:
                    repo.archive(client)
                    session.commit()
                    st.success("Client archived.")
                if restore:
                    repo.restore(client)
                    session.commit()
                    st.success("Client restored.")
            except (ValidationError, ValueError) as error:
                st.error(str(error))
