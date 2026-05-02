import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Play } from 'lucide-react';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Determine if we need a transparent navbar (on homepage hero)
    const isTransparent = ['/', '/jobs', '/services', '/blog'].includes(location.pathname) && !isScrolled;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className={`navbar ${isTransparent ? 'transparent' : 'scrolled'}`}>
            <div className="container navbar-container">
                <Link to="/" className="logo" onClick={closeMenu}>
                    <Play size={24} className="text-accent" style={{ color: 'var(--accent-orange)' }} />
                    ScriptsPlay
                </Link>

                {/* Desktop Navigation */}
                <nav className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/about" className="nav-link">About Us</Link>
                    <Link to="/services" className="nav-link">Service</Link>
                    <Link to="/blog" className="nav-link">Blog</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>
                    
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'var(--white)',
                    padding: '1.5rem',
                    boxShadow: 'var(--shadow-md)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                }}>
                    <Link to="/" className="nav-link" style={{ color: 'var(--primary-dark)', padding: '0.5rem 0' }} onClick={closeMenu}>Home</Link>
                    <Link to="/about" className="nav-link" style={{ color: 'var(--primary-dark)', padding: '0.5rem 0' }} onClick={closeMenu}>About Us</Link>
                    <Link to="/services" className="nav-link" style={{ color: 'var(--primary-dark)', padding: '0.5rem 0' }} onClick={closeMenu}>Service</Link>
                    <Link to="/blog" className="nav-link" style={{ color: 'var(--primary-dark)', padding: '0.5rem 0' }} onClick={closeMenu}>Blog</Link>
                    <Link to="/contact" className="nav-link" style={{ color: 'var(--primary-dark)', padding: '0.5rem 0' }} onClick={closeMenu}>Contact</Link>
                    
                </div>
            )}
        </header>
    );
};

export default Header;
