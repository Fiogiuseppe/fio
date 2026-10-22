"""Initial Giuseppe CFO schema.

Revision ID: 20260804_0001
Revises:
Create Date: 2026-08-04
"""

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = "20260804_0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "audit_logs",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("timestamp", sa.DateTime(), nullable=False),
        sa.Column("entity_type", sa.String(length=50), nullable=False),
        sa.Column("entity_identifier", sa.String(length=100), nullable=False),
        sa.Column("action", sa.String(length=20), nullable=False),
        sa.Column("summary", sa.Text(), nullable=False),
    )
    op.create_table(
        "business_settings",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("business_name", sa.String(length=200), nullable=False),
        sa.Column("business_type", sa.String(length=50), nullable=False),
        sa.Column("main_industry_code", sa.String(length=30), nullable=False),
        sa.Column("main_industry_description", sa.String(length=200), nullable=False),
        sa.Column("start_date", sa.Date(), nullable=False),
        sa.Column("business_address", sa.String(length=250), nullable=False),
        sa.Column("postal_code", sa.String(length=30), nullable=False),
        sa.Column("city", sa.String(length=100), nullable=False),
        sa.Column("country", sa.String(length=100), nullable=False),
        sa.Column("email", sa.String(length=254), nullable=False),
        sa.Column("telephone", sa.String(length=50), nullable=False),
        sa.Column("website", sa.String(length=250), nullable=False),
        sa.Column("cvr_number", sa.String(length=50), nullable=False),
        sa.Column("bank_name", sa.String(length=150), nullable=False),
        sa.Column("iban", sa.String(length=50), nullable=False),
        sa.Column("swift_bic", sa.String(length=50), nullable=False),
        sa.Column("accounting_currency", sa.String(length=3), nullable=False),
        sa.Column("vat_registered", sa.Boolean(), nullable=False),
        sa.Column("vat_threshold_dkk", sa.Numeric(14, 2), nullable=False),
        sa.Column("tax_reserve_percentage", sa.Numeric(5, 2), nullable=False),
        sa.Column("invoice_prefix", sa.String(length=20), nullable=False),
        sa.Column("quote_prefix", sa.String(length=20), nullable=False),
        sa.Column("next_invoice_sequence", sa.Integer(), nullable=False),
        sa.Column("next_quote_sequence", sa.Integer(), nullable=False),
    )
    op.create_table(
        "clients",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("client_code", sa.String(length=30), nullable=False, unique=True),
        sa.Column("company_name", sa.String(length=200), nullable=False),
        sa.Column("contact_name", sa.String(length=200), nullable=False),
        sa.Column("email", sa.String(length=254), nullable=False),
        sa.Column("telephone", sa.String(length=50), nullable=False),
        sa.Column("billing_address", sa.Text(), nullable=False),
        sa.Column("postal_code", sa.String(length=30), nullable=False),
        sa.Column("city", sa.String(length=100), nullable=False),
        sa.Column("country", sa.String(length=100), nullable=False),
        sa.Column("vat_or_business_number", sa.String(length=80), nullable=False),
        sa.Column("default_currency", sa.String(length=3), nullable=False),
        sa.Column("payment_terms_days", sa.Integer(), nullable=False),
        sa.Column("notes", sa.Text(), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
    )
    op.create_table(
        "documents",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("document_type", sa.String(length=50), nullable=False),
        sa.Column("original_filename", sa.String(length=255), nullable=False),
        sa.Column("stored_path", sa.Text(), nullable=False),
        sa.Column("related_entity_type", sa.String(length=50), nullable=False),
        sa.Column("related_entity_id", sa.Integer(), nullable=True),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
    )
    op.create_table(
        "expenses",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("expense_number", sa.String(length=40), nullable=False, unique=True),
        sa.Column("expense_date", sa.Date(), nullable=False),
        sa.Column("supplier", sa.String(length=200), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("category", sa.String(length=100), nullable=False),
        sa.Column("currency", sa.String(length=3), nullable=False),
        sa.Column("original_amount", sa.Numeric(14, 2), nullable=False),
        sa.Column("exchange_rate_to_dkk", sa.Numeric(14, 6), nullable=False),
        sa.Column("amount_dkk", sa.Numeric(14, 2), nullable=False),
        sa.Column("business_use_percentage", sa.Numeric(5, 2), nullable=False),
        sa.Column("deductible_planning_amount_dkk", sa.Numeric(14, 2), nullable=False),
        sa.Column("payment_method", sa.String(length=100), nullable=False),
        sa.Column("receipt_path", sa.Text(), nullable=False),
        sa.Column("notes", sa.Text(), nullable=False),
        sa.Column("is_archived", sa.Boolean(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
    )
    op.create_table(
        "quotes",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("quote_number", sa.String(length=40), nullable=False, unique=True),
        sa.Column("client_id", sa.Integer(), sa.ForeignKey("clients.id"), nullable=False),
        sa.Column("issue_date", sa.Date(), nullable=False),
        sa.Column("expiry_date", sa.Date(), nullable=False),
        sa.Column("title", sa.String(length=250), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("currency", sa.String(length=3), nullable=False),
        sa.Column("original_subtotal", sa.Numeric(14, 2), nullable=False),
        sa.Column("exchange_rate_to_dkk", sa.Numeric(14, 6), nullable=False),
        sa.Column("subtotal_dkk", sa.Numeric(14, 2), nullable=False),
        sa.Column("status", sa.String(length=20), nullable=False),
        sa.Column("document_path", sa.Text(), nullable=False),
        sa.Column("notes", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
    )
    op.create_table(
        "invoices",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("invoice_number", sa.String(length=40), nullable=False, unique=True),
        sa.Column("client_id", sa.Integer(), sa.ForeignKey("clients.id"), nullable=False),
        sa.Column("issue_date", sa.Date(), nullable=False),
        sa.Column("due_date", sa.Date(), nullable=False),
        sa.Column("title", sa.String(length=250), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("category", sa.String(length=100), nullable=False),
        sa.Column("currency", sa.String(length=3), nullable=False),
        sa.Column("original_net_amount", sa.Numeric(14, 2), nullable=False),
        sa.Column("exchange_rate_to_dkk", sa.Numeric(14, 6), nullable=False),
        sa.Column("net_amount_dkk", sa.Numeric(14, 2), nullable=False),
        sa.Column("vat_rate", sa.Numeric(5, 4), nullable=False),
        sa.Column("vat_amount_dkk", sa.Numeric(14, 2), nullable=False),
        sa.Column("gross_amount_dkk", sa.Numeric(14, 2), nullable=False),
        sa.Column("status", sa.String(length=20), nullable=False),
        sa.Column("amount_paid_dkk", sa.Numeric(14, 2), nullable=False),
        sa.Column("paid_date", sa.Date(), nullable=True),
        sa.Column("document_path", sa.Text(), nullable=False),
        sa.Column("notes", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
    )


def downgrade() -> None:
    op.drop_table("invoices")
    op.drop_table("quotes")
    op.drop_table("expenses")
    op.drop_table("documents")
    op.drop_table("clients")
    op.drop_table("business_settings")
    op.drop_table("audit_logs")
