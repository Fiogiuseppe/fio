"""Read-only AI CFO guidance."""

from app.chat import respond
from app.google_workspace import GoogleWorkspace


def ask_cfo(workspace: GoogleWorkspace, question: str) -> str:
    return respond(question, workspace)
