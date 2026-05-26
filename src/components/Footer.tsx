import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Mail } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div>
                        <Link to="/" className="logo" style={{ color: 'var(--white)', marginBottom: '1rem' }}>
                            <Play size={24} style={{ color: 'var(--accent-orange)' }} />
                            ScriptsPlay
                        </Link>
                        <p className="public-mobile-body-md" style={{ maxWidth: '300px' }}>
                            Trusted by large content creators and production studios to deliver fast, accurate transcripts and captions at scale.
                        </p>
                    </div>

                    <div>
                        <h4 className="footer-title">Company</h4>
                        <div className="footer-links">
                            <Link to="/about">About Us</Link>
                            <Link to="/blog">Blog</Link>
                            <Link to="/contact">Contact Us</Link>
                        </div>
                    </div>

                    <div>
                        {/* Removed Service Title as requested */}
                        <div className="footer-links" style={{ marginTop: '2.7rem' }}>
                            <Link to="/services">Service</Link>
                            <Link to="/jobs">Job</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="footer-title">Contact</h4>
                        <div className="footer-links" style={{ color: 'var(--secondary-gray-dark)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Mail size={16} />
                                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@scriptsplay.com" target="_blank" rel="noopener noreferrer">hello@scriptsplay.com</a>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Mail size={16} />
                                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=jobs@scriptsplay.com" target="_blank" rel="noopener noreferrer">jobs@scriptsplay.com</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} ScriptsPlay. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <Link to="/privacy-policy">Privacy Policy</Link>
                        <Link to="/terms-of-service">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
