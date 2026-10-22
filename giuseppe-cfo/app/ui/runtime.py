import streamlit as st

from app.config import ensure_local_directories, load_private_environment
from app.database import initialise_database, session_factory
from app.ui.authentication import require_login
from app.ui.theme import apply_theme


def _render_quick_manual() -> None:
    with st.sidebar.expander("Guida rapida", expanded=False):
        st.markdown(
            """
**Uso veloce (2 minuti)**
1. **Clients** → crea cliente  
2. **Quotes** → crea preventivo  
3. Converti il preventivo accettato in fattura bozza  
4. **Invoices** → invia e registra pagamenti  
5. **Expenses** → registra spese + ricevute  
6. **Backup and Export** → salva backup + export

**Nota**
- Tool di pianificazione, non consulenza fiscale/contabile.
- I dati restano locali su questo computer.
            """
        )


def bootstrap():
    load_private_environment()
    if not require_login():
        st.stop()
    apply_theme()
    _render_quick_manual()
    ensure_local_directories()
    initialise_database(create_safety_backup=True)
    return session_factory()
