import streamlit as st

from app.services.developer_dashboard import (
    KNOWN_BUGS,
    PAGE_REGISTRY,
    TECHNICAL_DEBT,
    architecture_markdown,
    auto_capture_screenshots,
    backup_status,
    build_review_markdown,
    db_schema_summary,
    feature_completion,
    folder_tree,
    performance_metrics,
    recent_changes,
    relationship_summary,
    screenshots_directory,
    security_status,
    storage_locations,
    system_health,
)
from app.ui.navigation import page_title
from app.ui.runtime import bootstrap

Session = bootstrap()
del Session

st.set_page_config("Developer Dashboard", "🛠️", layout="wide")
page_title("Developer Dashboard", "Technical review and project management view (auto-refreshed)")

st.caption("This page is for technical governance only.")
refresh_result = auto_capture_screenshots()
st.info(refresh_result)

st.subheader("1. Complete project architecture")
st.write(architecture_markdown())

st.subheader("2. Folder tree")
st.code(folder_tree(max_depth=4), language="text")

st.subheader("3. Database schema and relationships")
schema = db_schema_summary()
for table, columns in schema.items():
    st.markdown(f"- **{table}**: {', '.join(columns)}")
st.markdown("**Relationships**")
for relation in relationship_summary():
    st.markdown(f"- {relation}")

st.subheader("4. Page registry and purpose")
st.table([{"Page": item.filename, "Purpose": item.purpose} for item in PAGE_REGISTRY])

st.subheader("5. Feature completion percentage")
completion, rows = feature_completion()
st.metric("Completion", f"{completion:.1f}%")
st.table([{"Feature": feature, "Done": done} for feature, done in rows])

st.subheader("6. Missing features")
st.table([{"Missing": feature} for feature, done in rows if not done] or [{"Missing": "None"}])

st.subheader("7. Known bugs")
st.table([{"Bug": item} for item in KNOWN_BUGS])

st.subheader("8. Technical debt")
st.table([{"Debt": item} for item in TECHNICAL_DEBT])

st.subheader("9. Roadmap")
st.markdown(
    "- Stabilize sent-invoice correction workflow\n"
    "- Expand reports and analytics coverage\n"
    "- Add optional PDF generation after lifecycle stability"
)

st.subheader("10. Recent changes")
st.code("\n".join(recent_changes()), language="text")

st.subheader("11. System health")
st.table([{"Metric": key, "Value": value} for key, value in system_health().items()])

st.subheader("12. Local storage/database location")
st.table([{"Resource": key, "Path": value} for key, value in storage_locations().items()])

st.subheader("13. Backup status")
st.table([{"Metric": key, "Value": value} for key, value in backup_status().items()])

st.subheader("14. Security status")
st.table([{"Metric": key, "Value": value} for key, value in security_status().items()])

st.subheader("15. Performance metrics")
st.table([{"Metric": key, "Value": value} for key, value in performance_metrics().items()])

st.subheader("16. Automatic screenshots of every page")
shots_dir = screenshots_directory()
for file in sorted(shots_dir.glob("*.png")):
    st.markdown(f"**{file.name}**")
    st.image(str(file))

st.subheader("17. Export complete project review as Markdown")
markdown_review = build_review_markdown()
st.download_button(
    "Download review markdown",
    data=markdown_review,
    file_name="developer_dashboard_export.md",
    mime="text/markdown",
)
st.text_area("Preview", markdown_review, height=300)
