// src/auth/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, logoutUser } from '../features/user/userSlice';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export default function ProtectedRoute({ children }) {
    const [localUser, setLocalUser] = useState(undefined); // undefined = đang kiểm tra đăng nhập
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
        // Đang loading, chưa biết login hay chưa
        return (
            <div style={{ textAlign: 'center', marginTop: '20%' }}>
                <h3>Checking authentication...</h3>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace state={{ message: "Vui lòng đăng nhập để tiếp tục" }} />;
    }

    // Đã đăng nhập -> cho vào app
    return children;
}
