import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "../Style/ArticleSection.css";
import Newsletter from './Newsletter';

function ArticleSection() {
    const [articlesByCategory, setArticlesByCategory] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            const snapshot = await getDocs(collection(db, "articles"));
            const articlesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            // Group by category
            const grouped = {};
            articlesData.forEach(article => {
                const cat = article.category || "Uncategorized";
                if (!grouped[cat]) grouped[cat] = [];
                grouped[cat].push(article);
            });

            setArticlesByCategory(grouped);
            setLoading(false);
        };

        fetchArticles();
    }, []);

    return (
        <div className="article-section">
            <div className="hero-container">
                <div className="hero-text">
                    <h1>Articles</h1>
                    <p>
                        This page shares my best articles to read on topics like health, happiness, creativity,
                        productivity and more. The central question that drives my work is, “How can we live
                        better?” To answer that question, I like to write about science-based ways to solve
                        practical problems.
                    </p>
                    <p>
                        You’ll find interesting articles to read on topics like how to stop procrastinating as
                        well as personal recommendations like my list of the best books to read and my minimalist
                        travel guide. Ready to dive in? You can use the categories below to browse my best
                        articles.
                    </p>
                </div>

                <div className="newsletter-wrapper">
                    <Newsletter />
                </div>

            </div>

            <div className="all-articles">
                <h2>All Articles</h2>
                <p>Browse articles by topic.</p>

                {loading ? (
                    <p>Loading articles...</p>
                ) : (
                    <div className="article-grid">
                        {Object.entries(articlesByCategory).map(([category, articles]) => (
                            <div className="article-column" key={category}>
                                <h3>{category}</h3>
                                <hr className="article-separator" />
                                <ul>
                                    {articles.slice(0, 3).map((article) => (
                                        <li key={article.id}>
                                            <a href={`/article/${article.id}`} className="article-link">
                                                {article.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <hr className="article-separator" />
                                <a href={`/articles/${category.toLowerCase()}`} className="read-more">
                                    READ MORE ARTICLES ON {category.toUpperCase()} →
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ArticleSection;
