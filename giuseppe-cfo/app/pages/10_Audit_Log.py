from datetime import datetime, time

import streamlit as st

from app.repositories.audit_logs import AuditLogsRepository
from app.ui.navigation import page_title
from app.ui.runtime import bootstrap

Session = bootstrap()
page_title("Audit Log", "Create/update/archive/status/payment/backup/restore events.")

with Session() as session:
    repo = AuditLogsRepository(session)
    entity_type = st.text_input("Filter entity type")
    action = st.text_input("Filter action")
    start_date = st.date_input("Start date", value=None)
    end_date = st.date_input("End date", value=None)
    start = datetime.combine(start_date, time.min) if start_date else None
    end = datetime.combine(end_date, time.max) if end_date else None
    logs = repo.list(entity_type=entity_type, action=action, start=start, end=end, limit=1000)
    st.dataframe(
        [
            {
                "Timestamp": item.timestamp,
                "Action": item.action,
                "Entity": item.entity_type,
                "Entity ID": item.entity_identifier,
                "Summary": item.summary,
            }
            for item in logs
        ],
        use_container_width=True,
    )
