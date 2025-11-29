import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext.jsx';
import './Footer.css';

function Footer() {
    const { dark, theme, toggle } = useContext(ThemeContext);

    const styleVars = {
        background: theme.cardBackground,
        color: theme.color,
        borderTop: `1px solid ${theme.borderColor}`,
        '--link-color': theme.headerColor,
        '--muted-color': theme.cardText
    };

    return (
        <footer className="app-footer pt-3" style={styleVars}>
            <div className="container footer-inner">
                <div className="footer-left">
                    <div className="brand">React-FER</div>
                    <div className="foot-desc">A small orchid directory — crafted with ❤️</div>
                    <div className="copy">© {new Date().getFullYear()}</div>
                </div>

                <div className="footer-center">
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                    <a href="/privacy">Privacy</a>
                </div>

                <div className="footer-right">
                    <div className="socials">
                        <a href="https://github.com/amberr147" target="_blank" rel="noreferrer">GitHub</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
