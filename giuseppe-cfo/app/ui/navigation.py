import streamlit as st


def page_title(title: str, subtitle: str = "") -> None:
    st.markdown("<div class='gc-header-card'>", unsafe_allow_html=True)
    st.markdown("<span class='gc-eyebrow'>Giuseppe CFO</span>", unsafe_allow_html=True)
    st.title(title)
    if subtitle:
        st.caption(subtitle)
    st.markdown("<div class='gc-divider'></div>", unsafe_allow_html=True)
    st.markdown("</div>", unsafe_allow_html=True)
