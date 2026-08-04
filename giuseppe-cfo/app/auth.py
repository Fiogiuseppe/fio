"""Optional local login and idle-session protection."""

import os
import time

import bcrypt

PASSWORD_HASH_ENV = "GIUSEPPE_CFO_PASSWORD_HASH"
TIMEOUT_ENV = "GIUSEPPE_CFO_SESSION_TIMEOUT_MINUTES"
DEFAULT_TIMEOUT_SECONDS = 30 * 60


def configured_password_hash() -> str | None:
    value = os.getenv(PASSWORD_HASH_ENV, "").strip()
    return value or None


def authentication_enabled() -> bool:
    return configured_password_hash() is not None


def verify_password(password: str, password_hash: str | None = None) -> bool:
    """Return false for malformed hashes; never persist the supplied password."""
    encoded_hash = (password_hash or configured_password_hash() or "").encode()
    try:
        return bool(encoded_hash) and bcrypt.checkpw(password.encode(), encoded_hash)
    except (ValueError, TypeError):
        return False


def timeout_seconds(value: str | None = None) -> int:
    try:
        minutes = int(value if value is not None else os.getenv(TIMEOUT_ENV, "30"))
    except ValueError:
        minutes = 30
    return max(1, minutes) * 60


def session_is_valid(last_activity: float | None, now: float | None = None) -> bool:
    return (
        last_activity is not None and (now or time.monotonic()) - last_activity < timeout_seconds()
    )
