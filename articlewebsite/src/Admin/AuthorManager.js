import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

function AuthorManager() {
  const [author, setAuthor] = useState({
    name: "",
    bio: "",
    bookTitle: "",
    bookLink: "",
    aboutLink: "",
    twitter: "",
    instagram: "",
  });

  const [articles, setArticles] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedArticleId, setSelectedArticleId] = useState("");
  const [selectedAuthorId, setSelectedAuthorId] = useState("");
  const [docId, setDocId] = useState(null);
  const [saveMessage, setSaveMessage] = useState("");
  const [assignMessage, setAssignMessage] = useState("");


  const fetchArticles = async () => {
    try {
      const snapshot = await getDocs(collection(db, "articles"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const snapshot = await getDocs(collection(db, "authorSidebar"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAuthors(data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchAuthors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (docId) {
        await updateDoc(doc(db, "authorSidebar", docId), author);
      } else {
        const newDoc = await addDoc(collection(db, "authorSidebar"), author);
        setDocId(newDoc.id);
      }
      // alert("Saved successfully!");
      setSaveMessage("✅ Changes saved successfully!");
      setTimeout(() => { setSaveMessage(""); window.location.reload(); }, 3000);
      fetchAuthors(); // Refresh author list
    } catch (error) {
      console.error("Error saving author data:", error);
    }
  };

  const handleChange = (e) => {
    setAuthor({ ...author, [e.target.name]: e.target.value });
  };

  const handleAssignAuthor = async () => {
    if (!selectedArticleId || !selectedAuthorId) return;

    try {
      const articleRef = doc(db, "articles", selectedArticleId);
      await updateDoc(articleRef, { authorId: selectedAuthorId });
      // alert("Author assigned successfully!");
      setAssignMessage("✅ Author assigned successfully!");
      setTimeout(() => { setAssignMessage(""); window.location.reload(); }, 3000)
      setSelectedArticleId("");
      setSelectedAuthorId("");
      fetchArticles(); // Refresh
    } catch (error) {
      console.error("Error assigning author:", error);
    }
  };

  const containerStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    marginBottom: "40px",
  };

  const inputStyle = {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "6px",
  };

  const labelStyle = {
    fontWeight: "bold",
    marginTop: "10px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
  };

  const headingStyle = {
    color: "#333",
    marginBottom: "10px",
  };

  return (
    <div style={containerStyle}>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {/* Manage Author Sidebar */}
        <div style={{ flex: "1", minWidth: "320px" }}>
          <h2 style={headingStyle}>🛠 Manage Author Sidebar</h2>

          <label style={labelStyle}>Select Author: </label>
          <select
            style={inputStyle}
            value={docId || "new"}
            onChange={(e) => {
              const selectedId = e.target.value;
              if (selectedId === "new") {
                setAuthor({
                  name: "",
                  bio: "",
                  bookTitle: "",
                  bookLink: "",
                  aboutLink: "",
                  twitter: "",
                  instagram: "",
                });
                setDocId(null);
              } else {
                const selectedAuthor = authors.find((a) => a.id === selectedId);
                setAuthor(selectedAuthor || {});
                setDocId(selectedId);
              }
            }}
          >
            <option value="new">-- New Author --</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name || "Unnamed Author"}
              </option>
            ))}
          </select>

          <form onSubmit={handleSubmit} style={formStyle} autoComplete="off">
            <input
              style={inputStyle}
              name="name"
              placeholder="Author Name"
              value={author.name}
              onChange={handleChange}
              required
            />
            <textarea
              style={{ ...inputStyle, height: "80px" }}
              name="bio"
              placeholder="Author Bio"
              value={author.bio}
              onChange={handleChange}
              required
            />
            <input
              style={inputStyle}
              name="bookTitle"
              placeholder="Book Title"
              value={author.bookTitle}
              onChange={handleChange}
            />
            <input
              style={inputStyle}
              name="bookLink"
              placeholder="Book Link"
              value={author.bookLink}
              onChange={handleChange}
            />
            <input
              style={inputStyle}
              name="aboutLink"
              placeholder="About Page Link"
              value={author.aboutLink}
              onChange={handleChange}
            />
            <input
              style={inputStyle}
              name="LinkedIn"
              placeholder="LinkedIn Link"
              value={author.LinkedIn}
              onChange={handleChange}
            />
            <input
              style={inputStyle}
              name="instagram"
              placeholder="Instagram Link"
              value={author.instagram}
              onChange={handleChange}
            />
            <button type="submit" style={buttonStyle}>
              {docId ? "Update" : "Add"} Author Info
            </button>
            {saveMessage && <p style={{ color: "green" }}>{saveMessage}</p>}

          </form>
        </div>

        {/* Assign Author to Article */}
        <div style={{ flex: "1", minWidth: "320px" }}>
          <h2 style={headingStyle}>📝 Assign Author to Article</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAssignAuthor();
            }}
            style={formStyle}
          >
            <label style={labelStyle}>Choose an Article:</label>
            <select
              style={inputStyle}
              value={selectedArticleId}
              onChange={(e) => setSelectedArticleId(e.target.value)}
              required
            >
              <option value="">-- Select an Article --</option>
              {articles.map((article) => (
                <option key={article.id} value={article.id}>
                  {article.title || "Untitled Article"}
                </option>
              ))}
            </select>

            <label style={labelStyle}>Choose an Author:</label>
            <select
              style={inputStyle}
              value={selectedAuthorId}
              onChange={(e) => setSelectedAuthorId(e.target.value)}
              required
            >
              <option value="">-- Select an Author --</option>
              {authors.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name || "Unnamed Author"}
                </option>
              ))}
            </select>

            <button type="submit" style={buttonStyle}>
              Assign Author
            </button>
            {assignMessage && <p style={{ color: "green" }}>{assignMessage}</p>}

          </form>

          {/* Loaded Authors List */}
          <div style={{ marginTop: "30px" }}>
            <h3>📚 Authors Loaded:</h3>
            <ul>
              {authors.map((a) => (
                <li key={a.id}>{a.name || "Unnamed Author"}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorManager;
