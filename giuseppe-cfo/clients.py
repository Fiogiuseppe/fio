"""Client-record operations."""

from app.google_workspace import GoogleWorkspace
from app.models import Client


def create_client(workspace: GoogleWorkspace, name: str, email: str, address: str = "", cvr: str = "") -> Client:
    return workspace.add_client(name, email, address, cvr)


def list_clients(workspace: GoogleWorkspace) -> list[Client]:
    return workspace.list_clients()
