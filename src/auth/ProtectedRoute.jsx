// src/auth/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, logoutUser } from '../features/user/userSlice';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export default function ProtectedRoute({ children, adminOnly = false }) {
    const [localUser, setLocalUser] = useState(undefined);
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const unLogin = onAuthStateChanged(auth, (currentUser) => {
            setLocalUser(currentUser);
            if (currentUser) {
                dispatch(setUser(currentUser));
            } else {
                dispatch(logoutUser());
            }
        });
        return () => unLogin();
    }, [dispatch]);

    if (localUser === undefined) {
        return (
            <div style={{ textAlign: 'center', marginTop: '20%' }}>
                <h3>Checking authentication...</h3>
            </div>
        );
    }

    // Nếu chưa login
    if (!user) {
        return <Navigate to="/login" replace state={{ message: "Please login to continue" }} />;
    }

    // Nếu route này chỉ dành cho admin
    if (adminOnly && user.role !== "admin") {
        setTimeout(() => {
            window.history.back();
        }, 2000);
        return (
            <div style={{ textAlign: 'center', marginTop: '20%' }}>
                <h3>You do not have permission to access this page.</h3>
                <p>Redirecting back...</p>
            </div>
        );
    }


    return children;
}
