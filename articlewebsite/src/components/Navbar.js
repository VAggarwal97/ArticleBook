import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../Style/Navbar.css';

function Navbar() {
    const [showBanner, setShowBanner] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);



    useEffect(() => {
        const timer = setTimeout(() => setShowBanner(false), 5000);
        return () => clearTimeout(timer);
    }, []);



    const toggleRef = useRef(null);
    const dropdownRef = useRef(null);


    // Close dropdown if click outside

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target) &&
                toggleRef.current &&
                !toggleRef.current.contains(e.target)
            ) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [menuOpen]);


    return (
        <>
            {/* Top Banner */}
            {showBanner && (
                <div className={`top-banner ${showBanner ? 'show' : ''}`}>
                    <div className="top-banner-content">
                        <button className="close-btn" onClick={() => setShowBanner(false)}>×</button>
                        <p><strong>Weekly wisdom you can read in 5 minutes.</strong> Add the free 3-2-1 Newsletter to your inbox.</p>
                        <form className="newsletter-form">
                            <input type="email" placeholder="Your email address" />
                            <button type="submit">I'M IN!</button>
                        </form>
                    </div>
                </div>
            )}


            <nav className={`navbar ${showBanner ? 'shifted' : ''}`}>
                <div className="logo">vaggarwal</div>

                {/* Desktop Center Menu */}
                <div className="menu">
                    <Link to="/books">Books</Link>
                    <Link to="/">Articles</Link>
                    <Link to="/newsletter">Newsletter</Link>
                    <Link to="/app">App</Link>
                    <Link to="/speaking">Speaking</Link>
                </div>

                {/* Mobile Menu Toggle */}
                {/* <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button> */}


                <button
                    ref={toggleRef}
                    className="menu-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>

                {menuOpen && (
                    <div className="dropdown-menu" ref={dropdownRef}>
                        ...
                    </div>
                )}



                {/* Mobile Dropdown Menu */}
                {menuOpen && (
                    <div className="dropdown-menu" ref={dropdownRef}>
                        <Link to="/books" onClick={() => setMenuOpen(false)}>Books</Link>
                        <Link to="/" onClick={() => setMenuOpen(false)}>Articles</Link>
                        <Link to="/newsletter" onClick={() => setMenuOpen(false)}>Newsletter</Link>
                        <Link to="/app" onClick={() => setMenuOpen(false)}>App</Link>
                        <Link to="/speaking" onClick={() => setMenuOpen(false)}>Speaking</Link>
                    </div>
                )}

                <div className="admin-link">
                    <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
                </div>
            </nav>


        </>
    );
}

export default Navbar;
