"""Private-network binding validation for the local Streamlit launcher."""

import ipaddress
import os
import subprocess

BIND_ADDRESS_ENV = "GIUSEPPE_CFO_BIND_ADDRESS"
USE_TAILSCALE_ENV = "GIUSEPPE_CFO_USE_TAILSCALE"


def is_private_bind_address(value: str) -> bool:
    try:
        address = ipaddress.ip_address(value)
    except ValueError:
        return False
    return address.is_loopback or address.is_private or address in ipaddress.ip_network("100.64.0.0/10")


def tailscale_address() -> str:
    output = subprocess.check_output(["tailscale", "ip", "-4"], text=True, timeout=10).strip()
    address = output.splitlines()[0]
    if not is_private_bind_address(address):
        raise ValueError("Tailscale returned a non-private address.")
    return address


def bind_address() -> str:
    configured = os.getenv(BIND_ADDRESS_ENV, "").strip()
    if configured:
        if not is_private_bind_address(configured):
            raise ValueError("GIUSEPPE_CFO_BIND_ADDRESS must be loopback, private LAN, or Tailscale CGNAT.")
        return configured
    if os.getenv(USE_TAILSCALE_ENV) == "1":
        return tailscale_address()
    return "127.0.0.1"
