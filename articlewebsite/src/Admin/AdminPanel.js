import React, { useState, useRef, useEffect } from "react";
import ArticleManager from "./ArticleManager";
import AuthorManager from "./AuthorManager";
import "./AdminPanel.css"; // 👈 new CSS file for this component

import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


function AdminPanel() {
    const [openPanel, setOpenPanel] = useState(null); // 'articles' | 'authors' | null
    const containerRef = useRef(null);
    const navigate = useNavigate(); // 👈 to redirect after logout



    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login"); // redirect to login page
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // Handle outside click to close open panel
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpenPanel(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1 className="dashboard-title">Admin Dashboard</h1>
                <button className="logout-button" onClick={handleLogout}>
                    🔒 Logout
                </button>
            </div>


            <div className="admin-buttons">
                <button
                    className={`admin-button ${openPanel === "articles" ? "active" : ""}`}
                    onClick={() => setOpenPanel("articles")}
                >
                    📰 Manage Articles
                </button>
                <button
                    className={`admin-button ${openPanel === "authors" ? "active" : ""}`}
                    onClick={() => setOpenPanel("authors")}
                >
                    👤 Manage Authors
                </button>
            </div>

            {openPanel && (
                <div ref={containerRef} className="admin-panel-container">
                    {openPanel === "articles" && <ArticleManager />}
                    {openPanel === "authors" && <AuthorManager />}
                </div>
            )}
        </div>
    );
}

export default AdminPanel;
