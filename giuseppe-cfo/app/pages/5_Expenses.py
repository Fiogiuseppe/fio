from decimal import Decimal

import streamlit as st
from pydantic import ValidationError

from app.repositories.expenses import ExpensesRepository
from app.schemas.expense import ExpenseInput
from app.services.exports import export_csv
from app.ui.formatting import dkk
from app.ui.forms import currency_and_rate_fields, expense_category_field
from app.ui.navigation import page_title
from app.ui.runtime import bootstrap

Session = bootstrap()
page_title("Expenses", "Track deductible planning values, receipts, and archive status.")
st.caption("Planning deductible amount only — not a tax conclusion.")

with Session() as session:
    repo = ExpensesRepository(session)
    with st.expander("Create expense"):
        with st.form("create_expense"):
            expense_date = st.date_input("Expense date")
            supplier = st.text_input("Supplier *")
            description = st.text_input("Description")
            category = expense_category_field()
            currency, rate = currency_and_rate_fields(key_prefix="expense")
            original_amount = st.number_input("Original amount", min_value=0.0, format="%.2f")
            business_use = st.slider(
                "Business-use percentage", min_value=0, max_value=100, value=100
            )
            payment_method = st.text_input("Payment method")
            receipt_path = st.text_input("Receipt path")
            notes = st.text_area("Notes")
            if st.form_submit_button("Save expense"):
                try:
                    data = ExpenseInput(
                        expense_date=expense_date,
                        supplier=supplier,
                        description=description,
                        category=category,
                        currency=currency,
                        original_amount=Decimal(str(original_amount)),
                        exchange_rate_to_dkk=rate,
                        business_use_percentage=Decimal(str(business_use)),
                        payment_method=payment_method,
                        receipt_path=receipt_path,
                        notes=notes,
                    )
                    repo.create(
                        expense_date=data.expense_date,
                        supplier=data.supplier,
                        description=data.description,
                        category=data.category,
                        currency=data.currency,
                        original_amount=data.original_amount,
                        exchange_rate_to_dkk=data.exchange_rate_to_dkk,
                        amount_dkk=data.amount_dkk(),
                        business_use_percentage=data.business_use_percentage,
                        deductible_planning_amount_dkk=data.deductible_planning_amount_dkk(),
                        payment_method=data.payment_method,
                        receipt_path=data.receipt_path,
                        notes=data.notes,
                    )
                    session.commit()
                    st.success("Expense saved.")
                except (ValidationError, ValueError) as error:
                    st.error(str(error))

    search = st.text_input("Search expenses")
    category_filter = st.selectbox(
        "Category filter", ["all"] + list({item.category for item in repo.list()})
    )
    supplier_filter = st.text_input("Supplier filter")
    include_archived = st.checkbox("Include archived", value=True)
    expenses = repo.list(
        include_archived=include_archived,
        search=search,
        supplier=supplier_filter,
        category="" if category_filter == "all" else category_filter,
    )
    st.dataframe(
        [
            {
                "ID": item.id,
                "Number": item.expense_number,
                "Date": item.expense_date,
                "Supplier": item.supplier,
                "Category": item.category,
                "Amount DKK": dkk(item.amount_dkk),
                "Deductible planning DKK": dkk(item.deductible_planning_amount_dkk),
                "Missing receipt": not bool(item.receipt_path),
                "Archived": item.is_archived,
            }
            for item in expenses
        ],
        use_container_width=True,
    )
    if st.button("Export expenses CSV"):
        path = export_csv(session, "expenses")
        st.success(f"CSV exported to {path}")
    expense_by_id = {item.id: item for item in expenses}
    selected = (
        st.selectbox(
            "Select expense",
            list(expense_by_id.keys()),
            format_func=lambda eid: (
                f"{expense_by_id[eid].expense_number} — {expense_by_id[eid].supplier}"
            ),
        )
        if expenses
        else None
    )
    if selected is not None:
        expense = expense_by_id[selected]
        with st.form("edit_expense"):
            description = st.text_input("Description", value=expense.description)
            receipt_path = st.text_input("Receipt path", value=expense.receipt_path)
            notes = st.text_area("Notes", value=expense.notes)
            save = st.form_submit_button("Save changes")
            archive = st.form_submit_button("Archive")
            restore = st.form_submit_button("Restore")
            if save:
                repo.update(
                    expense, description=description, receipt_path=receipt_path, notes=notes
                )
                session.commit()
                st.success("Expense updated.")
            if archive:
                repo.archive(expense)
                session.commit()
                st.success("Expense archived.")
            if restore:
                repo.restore(expense)
                session.commit()
                st.success("Expense restored.")
