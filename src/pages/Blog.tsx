import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import SEO from '../components/SEO';

const Blog: React.FC = () => {
    return (
        <>
            <SEO
                title="The ScriptsPlay Blog - Transcription & Media Formatting"
                description="Read extensive industry insights, updates, and articles on transcription, global media accessibility, and the future of engaging content output."
            />

            <section className="hero-section" style={{ minHeight: '50vh' }}>
                <div className="hero-bg-wrapper" style={{ opacity: 0.5 }}>
                    <img
                        src="/images/blog_header.png"
                        alt="Stylish modern creative workspace"
                        className="hero-image"
                        style={{ objectPosition: 'center center' }}
                    />
                </div>

                <div className="container">
                    <div className="hero-content">
                        <h1 className="public-mobile-title-xl" style={{ fontSize: '3.5rem', color: 'var(--primary-blue-light)' }}>The ScriptsPlay Blog</h1>
                    </div>
                </div>
            </section>

            <section className="section section-gray" style={{ position: 'relative', zIndex: 10 }}>
                <div className="container" style={{ maxWidth: '1100px' }}>

                    <div className="public-split-layout">

                        {/* Main Articles List */}
                        <div className="public-stack" style={{ gap: '2.5rem' }}>
                            <article className="card shadow-md public-article-card" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '4px solid var(--primary-blue-light)' }}>
                                <div className="public-mobile-inline-meta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--primary-blue)', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>SEO & Accessibility</span>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>October 12, 2025</span>
                                </div>

                                <h2 className="public-mobile-title-lg" style={{ fontSize: '2.25rem', marginTop: '0.5rem', marginBottom: '0.5rem', lineHeight: '1.3' }}>
                                    Why Accurate Video Transcription Matters for Content Creators
                                </h2>

                                <p className="public-mobile-body-lg" style={{ fontSize: '1.125rem', color: 'var(--text-main)', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                                    Hitting publish is only half the battle. In this extensive breakdown, we explore how accessibility integrations and embedded SEO benefits compound exponentially for large-scale YouTube creators and enterprise media companies when their content is properly formatted and repurposed as text.
                                </p>

                                <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                    <span style={{ padding: '0.35rem 1rem', backgroundColor: 'var(--secondary-gray-dark)', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 500 }}>#Accessibility</span>
                                    <span style={{ padding: '0.35rem 1rem', backgroundColor: 'var(--secondary-gray-dark)', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 500 }}>#SEO benefits</span>
                                    <span style={{ padding: '0.35rem 1rem', backgroundColor: 'var(--secondary-gray-dark)', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 500 }}>#Content repurposing</span>
                                </div>

                                <Link to="/blog/why-accurate-video-transcription-matters" className="btn btn-outline" style={{ alignSelf: 'flex-start', padding: '0.75rem 2rem' }}>Read Full Article <ArrowRight size={18} /></Link>
                            </article>

                            <article className="card shadow-md public-article-card" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '4px solid var(--accent-teal)' }}>
                                <div className="public-mobile-inline-meta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--accent-teal)', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Audience Engagement</span>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>August 22, 2025</span>
                                </div>

                                <h2 className="public-mobile-title-lg" style={{ fontSize: '2.25rem', marginTop: '0.5rem', marginBottom: '0.5rem', lineHeight: '1.3' }}>
                                    How Professional Captioning Improves Audience Engagement
                                </h2>

                                <p className="public-mobile-body-lg" style={{ fontSize: '1.125rem', color: 'var(--text-main)', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                                    Internal research metrics clearly indicate that time-synced captioning directly influences viewer retention across all scrolling social platforms. Dive into the data detailing how optimizing for mobile silent viewing and accommodating global, non-native speaking audiences creates an unfair advantage.
                                </p>

                                <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                    <span style={{ padding: '0.35rem 1rem', backgroundColor: 'var(--secondary-gray-dark)', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 500 }}>#Global audiences</span>
                                    <span style={{ padding: '0.35rem 1rem', backgroundColor: 'var(--secondary-gray-dark)', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 500 }}>#Silent viewing</span>
                                    <span style={{ padding: '0.35rem 1rem', backgroundColor: 'var(--secondary-gray-dark)', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 500 }}>#Better retention</span>
                                </div>

                                <Link to="/blog/how-professional-captioning-improves-engagement" className="btn btn-outline" style={{ alignSelf: 'flex-start', padding: '0.75rem 2rem' }}>Read Full Article <ArrowRight size={18} /></Link>
                            </article>
                        </div>

                        {/* Sidebar */}
                        <aside>
                            <div className="card shadow-lg public-sidebar-card" style={{ background: 'var(--primary-dark)', color: 'white', padding: '2.5rem', position: 'sticky', top: '100px' }}>
                                <div style={{ background: 'rgba(249, 115, 22, 0.2)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                    <Mail size={24} style={{ color: 'var(--accent-orange)' }} />
                                </div>
                                <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>Never miss an update.</h3>
                                <p style={{ color: 'var(--secondary-gray-dark)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                                    Join the internal ScriptsPlay newsletter for monthly insights on formatting strategies and enterprise video operations. We don't span.
                                </p>
                                <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <input
                                        type="email"
                                        placeholder="Your best email address"
                                        style={{ padding: '1rem', borderRadius: 'var(--radius-md)', border: 'none', width: '100%', fontSize: '1rem' }}
                                    />
                                    <button type="button" className="btn btn-primary" style={{ width: '100%' }}>Subscribe Now</button>
                                </form>
                            </div>
                        </aside>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Blog;
