"""Dashboard metrics."""

from app.accounting import vat_status
from app.google_workspace import GoogleWorkspace


def metrics(workspace: GoogleWorkspace) -> dict[str, object]:
    return vat_status(workspace.invoice_revenue())
