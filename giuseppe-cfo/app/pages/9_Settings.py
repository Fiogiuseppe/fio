from decimal import Decimal

import streamlit as st
from pydantic import ValidationError

from app.repositories.settings import SettingsRepository
from app.schemas.settings import SettingsInput
from app.ui.navigation import page_title
from app.ui.runtime import bootstrap

Session = bootstrap()
page_title("Settings", "Business profile and private financial settings.")
st.caption("Bank details are private and excluded from standard exports.")

with Session() as session:
    repo = SettingsRepository(session)
    settings = repo.get_or_create()
    with st.form("settings_form"):
        business_name = st.text_input("Business name", value=settings.business_name)
        business_type = st.text_input("Business type", value=settings.business_type)
        industry_code = st.text_input("Main industry code", value=settings.main_industry_code)
        industry_description = st.text_input(
            "Main industry description", value=settings.main_industry_description
        )
        start_date = st.date_input("Business start date", value=settings.start_date)
        business_address = st.text_input("Business address", value=settings.business_address)
        postal_code = st.text_input("Postal code", value=settings.postal_code)
        city = st.text_input("City", value=settings.city)
        country = st.text_input("Country", value=settings.country)
        email = st.text_input("Email", value=settings.email)
        telephone = st.text_input("Telephone", value=settings.telephone)
        website = st.text_input("Website", value=settings.website)
        cvr_number = st.text_input("CVR number", value=settings.cvr_number)
        bank_name = st.text_input("Bank name (private)", value=settings.bank_name)
        iban = st.text_input("IBAN (private)", value=settings.iban)
        swift_bic = st.text_input("SWIFT/BIC (private)", value=settings.swift_bic)
        accounting_currency = st.selectbox(
            "Accounting currency",
            ["DKK", "EUR", "USD", "GBP", "SEK", "NOK"],
            index=["DKK", "EUR", "USD", "GBP", "SEK", "NOK"].index(settings.accounting_currency),
        )
        vat_registered = st.checkbox("VAT registered", value=settings.vat_registered)
        vat_threshold_dkk = st.number_input(
            "VAT threshold DKK", min_value=1.0, value=float(settings.vat_threshold_dkk)
        )
        tax_reserve_percentage = st.number_input(
            "Planning tax reserve percentage",
            min_value=0.0,
            max_value=100.0,
            value=float(settings.tax_reserve_percentage),
        )
        invoice_prefix = st.text_input("Invoice prefix", value=settings.invoice_prefix)
        quote_prefix = st.text_input("Quote prefix", value=settings.quote_prefix)
        submit = st.form_submit_button("Save settings")
        if submit:
            try:
                data = SettingsInput(
                    business_name=business_name,
                    business_type=business_type,
                    main_industry_code=industry_code,
                    main_industry_description=industry_description,
                    start_date=start_date,
                    business_address=business_address,
                    postal_code=postal_code,
                    city=city,
                    country=country,
                    email=email or None,
                    telephone=telephone,
                    website=website,
                    cvr_number=cvr_number,
                    bank_name=bank_name,
                    iban=iban,
                    swift_bic=swift_bic,
                    accounting_currency=accounting_currency,
                    vat_registered=vat_registered,
                    vat_threshold_dkk=Decimal(str(vat_threshold_dkk)),
                    tax_reserve_percentage=Decimal(str(tax_reserve_percentage)),
                    invoice_prefix=invoice_prefix,
                    quote_prefix=quote_prefix,
                )
                changing_sensitive = (
                    data.vat_registered != settings.vat_registered
                    or data.invoice_prefix != settings.invoice_prefix
                    or data.quote_prefix != settings.quote_prefix
                )
                if changing_sensitive and not st.session_state.get("settings_confirm_sensitive"):
                    raise ValueError(
                        "Tick the sensitive-change confirmation checkbox before changing VAT status or prefixes."
                    )
                repo.update(settings, **data.model_dump())
                session.commit()
                st.success("Settings updated.")
            except (ValidationError, ValueError) as error:
                st.error(str(error))
    st.checkbox(
        "I confirm VAT status/prefix changes affect future records only.",
        key="settings_confirm_sensitive",
    )
