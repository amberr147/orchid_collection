import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/user/userSlice';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom';

export default function GoogleLogin() {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state?.message || null;

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            setUser(result.user);
            dispatch(setUser(result.user));
            navigate('/');
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="google-login-page d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8f9fa, #e0f7fa)' }}>
            <div className="login-card text-center p-5 rounded-4 shadow-lg" style={{ backgroundColor: 'white', maxWidth: 400 }}>
                <h2 className="mb-3" style={{ color: '#2f3640' }}>Welcome to <span style={{ color: '#0097e6' }}>Hman's Garden</span> 🌸</h2>
                <p className="text-muted mb-4">Enter the serene garden of creativity. <br />Sign in to step inside.</p>

                {user ? (
                    <div>
                        <img
                            src={user.photoURL}
                            alt={user.displayName}
                            style={{ borderRadius: '50%', width: 90, height: 90 }}
                        />
                        <h4 className="mt-3" style={{ color: '#0097e6' }}>
                            Welcome, {user.displayName} 🌿
                        </h4>
                    </div>
                ) : (
                    <button
                        className="btn btn-primary px-4 py-2 mb-3"
                        style={{ borderRadius: '30px', backgroundColor: '#0097e6', border: 'none' }}
                        onClick={handleLogin}
                    >
                        Sign in with Google
                    </button>
                )}

                {error && <div className="text-danger mt-3">{error}</div>}
                {message && <div className="text-danger mb-3 fw-semibold">{message}</div>}
            </div>
        </div>
    );
}
