# Giuseppe CFO user guide

## Start on the primary computer

The primary computer holds the only database, documents, exports, and backups. It must be switched on, connected to Tailscale if remote access is needed, and running GIUSEPPE CFO before another device can connect.

```bash
cd giuseppe-cfo
source .venv/bin/activate
python run_app.py
```

On the primary computer, open `http://127.0.0.1:8501`.

## Optional Tailscale access from another personal computer

1. Install Tailscale and sign in on both personal computers.
2. On the primary computer, create a local `.env` file from `.env.example`.
3. Add `GIUSEPPE_CFO_USE_TAILSCALE=1`; optionally add `GIUSEPPE_CFO_PASSWORD_HASH`.
4. Start the app using the command above.
5. Find the primary computer’s Tailscale IPv4 address with `tailscale ip -4`.
6. On the other personal device, while connected to the same Tailscale account/tailnet, open `http://TAILSCALE-IP:8501`.

This is private device-to-device access, not public hosting. Do not enable Tailscale Funnel or router port forwarding.

## Login and timeout

If a local password hash has been configured, enter the corresponding password on the login screen. A session expires after 30 minutes of inactivity unless the primary computer uses a different local timeout setting.

## Important

Closing the terminal or putting the primary computer to sleep stops access from other devices. No data is copied to the other device; it remains on the primary computer.
