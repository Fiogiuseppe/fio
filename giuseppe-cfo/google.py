"""Google Workspace facade.

The package path keeps third-party ``google.*`` imports available despite this
project's requested module name.
"""

from pkgutil import extend_path

__path__ = extend_path([], __name__)

from app.google_workspace import GoogleWorkspace

__all__ = ["GoogleWorkspace"]
