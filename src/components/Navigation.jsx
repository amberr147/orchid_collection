import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ThemeContext } from './ThemeContext';
import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, logoutUser } from '../features/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { signOut, onAuthStateChanged, signInWithPopup } from 'firebase/auth';

function BasicExample() {
    const { theme, dark, toggle } = useContext(ThemeContext);
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                dispatch(setUser(currentUser));
            } else {
                dispatch(logoutUser());
            }
        });
        return () => unsubscribe();
    }, [dispatch]);

    const handleLogout = async () => {
        await signOut(auth);
        dispatch(logoutUser());
        localStorage.setItem('logout', Date.now());
        navigate('/');
    };

    const handleLogin = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        dispatch(setUser(result.user));
        navigate('/');
    };

    return (
        <Navbar
            expand="lg"
            className="shadow-sm px-4 py-3"
            style={{
                background: `linear-gradient(90deg, ${theme.cardBackground}, ${dark ? '#1a1a1a' : '#fafafa'})`,
                transition: 'background 0.3s ease'
            }}
        >
            <Container fluid>
                <Navbar.Brand
                    as={Link}
                    to="/"
                    className="fw-bold fs-4"
                    style={{
                        color: theme.headerColor,
                        letterSpacing: '1px'
                    }}
                >
                    🌺 Orchid Collection
                </Navbar.Brand>

                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    style={{
                        border: 'none',
                        backgroundColor: dark ? '#333' : '#ddd'
                    }}
                />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto gap-3 align-items-center">
                        <Link to="/" className="nav-link fw-semibold" style={{ color: theme.cardText }}>Home</Link>
                        <Link to="/contact" className="nav-link fw-semibold" style={{ color: theme.cardText }}>Contact</Link>
                        <Link to="/about" className="nav-link fw-semibold" style={{ color: theme.cardText }}>About</Link>

                        <NavDropdown
                            title={<span style={{ color: theme.cardText }}>Explore</span>}
                            id="basic-nav-dropdown"
                            menuVariant={dark ? 'dark' : 'light'}
                        >
                            <NavDropdown.Item as={Link} to="/special">🌸 Special Orchids</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/natural">🌿 Natural Orchids</NavDropdown.Item>
                            {user && user.role === 'admin' && (
                                <>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to="/create">+ Add Orchid</NavDropdown.Item>
                                </>
                            )}
                        </NavDropdown>
                    </Nav>

                    <div className="d-flex align-items-center gap-2 mt-2 mt-lg-0">
                        <button
                            className="btn btn-sm rounded-pill"
                            onClick={toggle}
                            style={{
                                backgroundColor: theme.headerColor,
                                color: theme.backgroundColor,
                                border: 'none',
                                fontWeight: '500',
                                padding: '8px 18px'
                            }}
                        >
                            {dark ? '☀️ Light' : '🌙 Dark'}
                        </button>

                        {user ? (
                            <>
                                <Link to="/profile" className="btn btn-outline-secondary rounded-pill fw-semibold" style={{ padding: '8px 18px' }}>
                                    Profile
                                </Link>
                                <button
                                    className="btn btn-outline-danger rounded-pill fw-semibold"
                                    onClick={handleLogout}
                                    style={{ padding: '8px 18px' }}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button
                                className="btn btn-outline-primary rounded-pill fw-semibold"
                                onClick={handleLogin}
                                style={{ padding: '8px 18px' }}
                            >
                                Login
                            </button>
                        )}
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BasicExample;
