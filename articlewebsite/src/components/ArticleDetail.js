import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../Style/ArticleDetail.css";

function ArticleDetail() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [author, setAuthor] = useState(null);

    // 🔹 Fetch article on mount or when `id` changes
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const articleRef = doc(db, "articles", id);
                const articleSnap = await getDoc(articleRef);

                if (articleSnap.exists()) {
                    const articleData = { id: articleSnap.id, ...articleSnap.data() };
                    setArticle(articleData);
                }
            } catch (error) {
                console.error("Error fetching article:", error);
            }
        };

        fetchArticle();
    }, [id]);

    // 🔹 Fetch author separately when article is set and has authorId
    useEffect(() => {
        const fetchAuthor = async () => {
            if (article?.authorId) {
                try {
                    const authorRef = doc(db, "authorSidebar", article.authorId);
                    const authorSnap = await getDoc(authorRef);

                    if (authorSnap.exists()) {
                        setAuthor(authorSnap.data());
                    }
                } catch (error) {
                    console.error("Error fetching author:", error);
                }
            }
        };

        fetchAuthor();
    }, [article]);

    if (!article) return <div>Loading article...</div>;

    return (
        <div className="article-detail-container">
            <div className="main-article">
                <h1>{article.title}</h1>
                <p className="meta">
                    <em>Written by {author?.name || "Unknown Author"}</em> &nbsp; | &nbsp;{" "}
                    {article.category}
                </p>
                <hr />
                <div className="article-body">
                    {article.content?.split("\n").map((para, idx) => (
                        <p key={idx}>{para}</p>
                    ))}
                </div>
            </div>

            {author && (
                <aside className="author-sidebar">
                    <h5 className="sidebar-heading">ABOUT THE AUTHOR</h5>
                    <hr className="sidebar-divider" />

                    <p>
                        <strong>{author.name}</strong> {author.bio}
                    </p>

                    {author.bookTitle && author.bookLink && (
                        <p>
                            Author of the <em>#<i>{author.bookTitle}</i></em>{" "}
                            The Best Article Till Now! {" "}
                            <a href={author.bookLink} target="_blank" rel="noreferrer">
                                {/* <u>{author.bookTitle}</u> */}Share Link!
                            </a>.
                        </p>
                    )}

                    {author.aboutLink && (
                        <p>
                            <a
                                href={author.aboutLink}
                                target="_blank"
                                rel="noreferrer"
                                className="learn-link"
                            >
                                Click here to learn more →
                            </a>
                        </p>
                    )}

                    <div className="social-icons">
                        {author.LinkedIn && (
                            <a href={author.LinkedIn} target="_blank" rel="noreferrer">
                                <img src="https://brandlogos.net/wp-content/uploads/2020/11/linkedin-logo.png" alt="LinkedIn" />
                            </a>
                        )}
                        {author.instagram && (
                            <a href={author.instagram} target="_blank" rel="noreferrer">
                                <img src="https://tse2.mm.bing.net/th/id/OIP.2kP1YwgePjb3Ow80nOQvwAHaHw?rs=1&pid=ImgDetMain&o=7&rm=3" alt="Instagram" />
                            </a>
                        )}
                    </div>
                </aside>
            )}
        </div>
    );
}

export default ArticleDetail;
