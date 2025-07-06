import React, { useState, useEffect } from "react";

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";


import { db } from "../firebase"; // ✅ ensure this path is correct
import "./Admin.css";

function ArticleManager() {
    const [articles, setArticles] = useState([]);
    const [form, setForm] = useState({ title: "", category: "", content: "" });
    const [editingId, setEditingId] = useState(null);

    // ✅ Fetch all articles from Firebase
    const fetchArticles = async () => {
        try {
            const snapshot = await getDocs(collection(db, "articles"));
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setArticles(data);
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    // ✅ Add or update article
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingId) {
                const docRef = doc(db, "articles", editingId);
                await updateDoc(docRef, form);
                setEditingId(null);
            } else {
                await addDoc(collection(db, "articles"), form);
            }

            setForm({ title: "", category: "", content: "" });
            fetchArticles();
        } catch (error) {
            console.error("Error saving article:", error);
        }
    };

    // ✅ Delete article
    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "articles", id));
            fetchArticles();
        } catch (error) {
            console.error("Error deleting article:", error);
        }
    };

    // ✅ Prepare article for editing
    const handleEdit = (article) => {
        setForm({
            title: article.title,
            category: article.category,
            content: article.content,
        });
        setEditingId(article.id);
    };

    return (
        <div className="admin-container">
            <h2>🛠 Manage Articles</h2>

            <form onSubmit={handleSubmit} className="admin-form">
                <input
                    type="text"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Content"
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    required
                ></textarea>
                <button type="submit">{editingId ? "Update" : "Add"} Article</button>
            </form>

            <div className="article-list">
                {articles.map((a) => (
                    <div key={a.id} className="article-item">
                        <h3>{a.title}</h3>
                        <p><strong>Category:</strong> {a.category}</p>
                        <p>{a.content.slice(0, 100)}...</p>
                        <div className="actions">
                            <button onClick={() => handleEdit(a)}>Edit</button>
                            <button onClick={() => handleDelete(a.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ArticleManager;
