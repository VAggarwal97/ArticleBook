// src/Admin/PrivateRoute.js
// import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase"; // ✅ make sure this matches your path

const PrivateRoute = ({ children }) => {
    const [user, loading] = useAuthState(auth);

    if (loading) return <p>Loading...</p>;
    if (!user) return <Navigate to="/login" />;

    return children;
};

export default PrivateRoute;
