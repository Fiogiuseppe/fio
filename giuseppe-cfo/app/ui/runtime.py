import streamlit as st

from app.config import ensure_local_directories, load_private_environment
from app.database import initialise_database, session_factory
from app.ui.authentication import require_login
from app.ui.theme import apply_theme


def _render_quick_manual() -> None:
    with st.sidebar.expander("Guida rapida", expanded=False):
        st.markdown(
            """
**Uso veloce**
1. Vai su **Clients** e crea un cliente.  
2. Vai su **Quotes** per creare un preventivo.  
3. Converti il preventivo accettato in fattura bozza.  
4. In **Invoices** invia la fattura e registra pagamenti.  
5. In **Expenses** registra spese e ricevute.  
6. In **Backup and Export** crea backup/CSV/Excel.

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
