from __future__ import annotations

import os

from app.accounting import vat_status
from app.google_workspace import GoogleWorkspace


def respond(message: str, workspace: GoogleWorkspace) -> str:
    """Answer CFO questions without allowing an LLM to mutate accounting records."""
    normalized = message.strip().lower()
    if normalized in {"vat", "moms", "vat status", "moms status"}:
        status = vat_status(workspace.invoice_revenue())
        required = "Ja — registrering er påkrævet." if status["registration_required"] else "Nej, ikke endnu."
        return (
            f"Omsætning (rullende 12 måneder): {status['rolling_revenue']:,.2f} DKK\n"
            f"Grænse: {status['threshold']:,.2f} DKK\n"
            f"Tilbage: {status['remaining']:,.2f} DKK\n{required}"
        )
    if normalized in {"help", "hjælp"}:
        return "Brug formularerne til at oprette kunder, udgifter og fakturaer. Spørg “VAT” for status eller stil et CFO-spørgsmål."

    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return "OpenAI er ikke konfigureret. Sæt OPENAI_API_KEY for CFO-spørgsmål; “VAT” virker allerede."

    from openai import OpenAI

    status = vat_status(workspace.invoice_revenue())
    prompt = (
        "You are a careful CFO assistant for a Danish PMV. Give concise, practical guidance. "
        "Do not claim tax advice is definitive; recommend an accountant for binding decisions. "
        f"Current rolling net revenue is {status['rolling_revenue']} DKK against the 50,000 DKK VAT threshold. "
        f"User question: {message}"
    )
    response = OpenAI(api_key=api_key).responses.create(
        model=os.getenv("OPENAI_MODEL", "gpt-4.1-mini"),
        input=prompt,
    )
    return response.output_text
