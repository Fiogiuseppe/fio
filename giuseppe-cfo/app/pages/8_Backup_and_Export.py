import subprocess
import sys
from pathlib import Path

import streamlit as st

from app.config import project_paths
from app.repositories.audit_logs import AuditLogsRepository
from app.services.backups import create_backup, restore_backup
from app.services.exports import export_csv, export_excel
from app.ui.confirmations import typed_confirmation
from app.ui.navigation import page_title
from app.ui.runtime import bootstrap

Session = bootstrap()
page_title("Backup and Export", "Create local files and restore safely.")

with Session() as session:
    st.write(f"Database: `{project_paths().database}`")
    st.write(f"Documents: `{project_paths().documents}`")
    st.write(f"Backups: `{project_paths().backups}`")
    st.write(f"Exports: `{project_paths().exports}`")
    st.write(f"Review bundle: `{project_paths().review_bundle / 'giuseppe_cfo_review.zip'}`")
    if st.button("Create local backup ZIP"):
        backup = create_backup()
        AuditLogsRepository(session).record(
            "backup", backup.name, "create", f"Created backup {backup.name}"
        )
        session.commit()
        st.success(f"Backup created: {backup}")

    if st.button("Export clients CSV"):
        st.success(f"Created: {export_csv(session, 'clients')}")
    if st.button("Export quotes CSV"):
        st.success(f"Created: {export_csv(session, 'quotes')}")
    if st.button("Export invoices CSV"):
        st.success(f"Created: {export_csv(session, 'invoices')}")
    if st.button("Export expenses CSV"):
        st.success(f"Created: {export_csv(session, 'expenses')}")
    if st.button("Export full Excel workbook"):
        st.success(f"Created: {export_excel(session)}")
    if st.button("Create ChatGPT review bundle"):
        completed = subprocess.run(
            [sys.executable, "scripts/create_review_bundle.py"],
            text=True,
            capture_output=True,
            check=False,
        )
        if completed.returncode == 0:
            st.success(f"Created: {completed.stdout.strip()}")
        else:
            st.error(completed.stderr or completed.stdout)

    st.subheader("Restore from backup")
    backups_dir = project_paths().backups
    backups = sorted(backups_dir.glob("*.zip"), reverse=True)
    selected = (
        st.selectbox("Select backup ZIP", backups, format_func=lambda item: item.name)
        if backups
        else None
    )
    if selected:
        st.warning(
            f"Restoring {selected.name} will replace the current database and document metadata paths. "
            "A safety backup of current state will be created first."
        )
        if typed_confirmation("This operation replaces current state.", "RESTORE", "restore_token"):
            if st.button("Restore now"):
                try:
                    safety = restore_backup(Path(selected), "RESTORE", session=session)
                    session.commit()
                    st.success(f"Restore complete. Safety backup: {safety}")
                except ValueError as error:
                    st.error(str(error))
