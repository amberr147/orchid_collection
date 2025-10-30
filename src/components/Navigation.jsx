
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ThemeContext } from './ThemeContext';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

function BasicExample() {
    const { theme, dark, toggle } = useContext(ThemeContext);
    return (
        <Navbar expand="lg" className="shadow-sm" style={{ backgroundColor: theme.cardBackground }}>
            <Container style={{ backgroundColor: theme.cardBackground }}>
                <Navbar.Brand href="/" style={{ color: theme.headerColor }}>🌺 Orchid Collection 🌺</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ backgroundColor: theme.cardBackground }} />
                <Navbar.Collapse id="basic-navbar-nav" style={{ backgroundColor: theme.cardBackground }}>
                    <Nav className="me-auto" style={{ backgroundColor: theme.cardBackground }}>
                        <Link to="/" style={{ color: theme.cardText }}>Home</Link>
                        <Nav.Link href="/contact" style={{ color: theme.cardText }}>Contact</Nav.Link>
                        <Nav.Link href="/about" style={{ color: theme.cardText }}>About</Nav.Link>
                        <NavDropdown title={<span style={{ color: theme.cardText }}>Dropdown</span>} id="basic-nav-dropdown" style={{ backgroundColor: theme.cardBackground }}>
                            <NavDropdown.Item href="/special" style={{ backgroundColor: theme.cardBackground, color: theme.cardText }}>Special Orchids</NavDropdown.Item>
                            <NavDropdown.Item href="/natural" style={{ backgroundColor: theme.cardBackground, color: theme.cardText }}>
                                Original Orchids
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <button
                className="btn btn-sm rounded-pill"
                onClick={toggle}
                style={{
                    backgroundColor: theme.headerColor,
                    color: theme.backgroundColor,
                    border: 'none',
                    padding: '8px 16px'
                }}
            >
                {dark ? '☀️ Light' : '🌙 Dark'}
            </button>
        </Navbar>
    );
}

export default BasicExample;


