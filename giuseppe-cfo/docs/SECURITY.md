# Security and private-device access

GIUSEPPE CFO is local-first. The SQLite database, documents, exports, and backups remain on the primary computer. The application does not synchronise data through Google Drive, Dropbox, iCloud, network folders, or any other cloud service.

## Network boundary

`python run_app.py` binds to `127.0.0.1` by default. To make it available only to Giuseppe’s other Tailscale-connected personal devices, install and sign in to Tailscale on the primary computer and each personal device, then set `GIUSEPPE_CFO_USE_TAILSCALE=1` in a local, Git-ignored `.env` file or shell environment before starting the app.

The launcher obtains the Tailscale IPv4 address and rejects public bind addresses. Alternatively, `GIUSEPPE_CFO_BIND_ADDRESS` may contain a loopback, RFC1918 private-LAN, or Tailscale `100.64.0.0/10` address. It rejects public IP addresses.

Never use Tailscale Funnel, router port forwarding, a reverse proxy exposed to the internet, or a public hostname for this application.

## Optional login

Set `GIUSEPPE_CFO_PASSWORD_HASH` locally to a bcrypt hash. The password itself is never stored by the application. When the variable is present, the login screen is required and idle sessions expire after 30 minutes by default. Set `GIUSEPPE_CFO_SESSION_TIMEOUT_MINUTES` locally to change this interval.

Generate a hash on the primary computer:

```bash
python -c "import bcrypt; print(bcrypt.hashpw(b'choose-a-long-password', bcrypt.gensalt()).decode())"
```

Put only the resulting hash in `.env`; `.env` and private data are ignored by Git.

## Threat assumptions

Tailscale controls which enrolled personal devices can reach the private address; the application password is an additional local-app gate. Device disk encryption, operating-system login security, Tailscale account security, and physical access remain Giuseppe’s responsibility.

Backups are unencrypted ZIP files unless protected by the operating system or backup destination. Keep them on encrypted storage and do not share them.
