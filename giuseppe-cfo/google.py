"""Google Workspace facade.

The package path keeps third-party ``google.*`` imports available despite this
project's requested module name.
"""

from pkgutil import extend_path

__path__ = extend_path([], __name__)

__all__ = ["GoogleWorkspace"]


def __getattr__(name: str):
    if name == "GoogleWorkspace":
        from app.google_workspace import GoogleWorkspace

        return GoogleWorkspace
    raise AttributeError(f"module {__name__!r} has no attribute {name!r}")
