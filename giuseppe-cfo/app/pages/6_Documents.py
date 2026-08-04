from pathlib import Path

import streamlit as st

from app.models import Client, Expense, Invoice, Quote
from app.repositories.documents import DocumentsRepository
from app.services.documents import path_exists, validate_local_document_path
from app.ui.navigation import page_title
from app.ui.runtime import bootstrap

Session = bootstrap()
page_title("Documents", "Register local document metadata only (paths, not file contents).")
st.caption("Files are not copied automatically. Documents stay where you stored them.")

with Session() as session:
    repo = DocumentsRepository(session)
    with st.expander("Register document"):
        with st.form("register_document"):
            document_type = st.selectbox(
                "Type", ["invoice_pdf", "quote_pdf", "receipt", "contract", "other"]
            )
            file_path = st.text_input("Local path *")
            related_entity_type = st.selectbox(
                "Related entity", ["", "client", "quote", "invoice", "expense"]
            )
            related_ids = {
                "client": [item.id for item in session.query(Client).all()],
                "quote": [item.id for item in session.query(Quote).all()],
                "invoice": [item.id for item in session.query(Invoice).all()],
                "expense": [item.id for item in session.query(Expense).all()],
            }
            related_entity_id = st.selectbox(
                "Related ID", [None] + related_ids.get(related_entity_type, [])
            )
            description = st.text_area("Description")
            if st.form_submit_button("Register path"):
                try:
                    resolved = validate_local_document_path(file_path)
                    repo.create(
                        document_type=document_type,
                        original_filename=Path(resolved).name,
                        stored_path=str(resolved),
                        related_entity_type=related_entity_type,
                        related_entity_id=related_entity_id,
                        description=description,
                    )
                    session.commit()
                    st.success("Document metadata saved.")
                except ValueError as error:
                    st.error(str(error))

    type_filter = st.selectbox(
        "Type filter", ["all", "invoice_pdf", "quote_pdf", "receipt", "contract", "other"]
    )
    entity_filter = st.selectbox("Entity filter", ["all", "client", "quote", "invoice", "expense"])
    docs = repo.list(
        document_type="" if type_filter == "all" else type_filter,
        related_entity_type="" if entity_filter == "all" else entity_filter,
    )
    st.dataframe(
        [
            {
                "ID": item.id,
                "Type": item.document_type,
                "Filename": item.original_filename,
                "Path": item.stored_path,
                "Exists": path_exists(item.stored_path),
                "Entity": item.related_entity_type,
                "Entity ID": item.related_entity_id,
            }
            for item in docs
        ],
        use_container_width=True,
    )
    selected = (
        st.selectbox(
            "Open local document path",
            [item.stored_path for item in docs],
        )
        if docs
        else None
    )
    if selected:
        st.code(selected, language="text")
        st.link_button("Open local file", f"file://{selected}")
    invoice_without_pdf = [
        item.invoice_number for item in session.query(Invoice).all() if not item.document_path
    ]
    missing_receipts = [
        item.expense_number for item in session.query(Expense).all() if not item.receipt_path
    ]
    st.write("Expenses missing receipt paths:", ", ".join(missing_receipts) or "None")
    st.write("Invoices missing PDF paths:", ", ".join(invoice_without_pdf) or "None")
