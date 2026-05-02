import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Shield, Zap, Target, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Home: React.FC = () => {
    return (
        <>
            <SEO
                title="Professional Video Transcription at Scale"
                description="ScriptsPlay connects high-volume content creators and film studios with trained transcription professionals for fast, accurate delivery."
            />

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-bg-wrapper">
                    <img
                        src="/images/hero_image.png"
                        alt="Professional Transcriptionist working on dual monitors"
                        className="hero-image"
                    />
                </div>

                <div className="container">
                    <div className="hero-content">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 style={{ marginBottom: '1.5rem', fontWeight: 800, color: 'var(--accent-orange)' }}>Professional Video Transcription & Captioning at Scale</h1>
                            <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', color: 'var(--secondary-gray-dark)', maxWidth: '600px' }}>
                                Trusted by large content creators and production studios to deliver fast, accurate transcripts and captions.
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
                                    Request Service
                                    <ArrowRight size={20} />
                                </Link>
                                <Link to="/jobs" className="btn btn-outline" style={{ color: 'var(--white)', borderColor: 'rgba(255,255,255,0.3)', padding: '1rem 2rem', fontSize: '1.125rem' }}>
                                    Work With Us
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="section section-light">
                <div className="container">
                    <div className="text-center mb-8">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            How ScriptsPlay Works
                        </motion.h2>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                            A streamlined 3-step pipeline designed for high-volume content production.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-8">
                        <motion.div className="card text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="card-icon" style={{ margin: '0 auto 1.5rem' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>1</span>
                            </div>
                            <h3>Client Submits Video</h3>
                            <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
                                Securely upload your bulk video or audio content through our enterprise portal.
                            </p>
                        </motion.div>

                        <motion.div className="card text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="card-icon" style={{ margin: '0 auto 1.5rem', backgroundColor: 'rgba(249, 115, 22, 0.1)', color: 'var(--accent-orange)' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>2</span>
                            </div>
                            <h3>Distributed Work</h3>
                            <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
                                ScriptsPlay distributes the workload across our network of trained transcription professionals.
                            </p>
                        </motion.div>

                        <motion.div className="card text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="card-icon" style={{ margin: '0 auto 1.5rem', backgroundColor: 'rgba(20, 184, 166, 0.1)', color: 'var(--accent-teal)' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>3</span>
                            </div>
                            <h3>Review & Delivery</h3>
                            <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
                                Senior editors review and finalize transcripts for high accuracy delivery.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why ScriptsPlay */}
            <section className="section section-gray">
                <div className="container">
                    <div className="grid grid-cols-2 gap-8 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="mb-4">Why ScriptsPlay</h2>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <Zap size={24} style={{ color: 'var(--accent-orange)' }} />
                                    <div>
                                        <h4 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>Fast Turnaround</h4>
                                        <p style={{ color: 'var(--text-muted)', margin: 0 }}>Optimized pipelines for rapid delivery without sacrificing quality.</p>
                                    </div>
                                </li>
                                <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <Users size={24} style={{ color: 'var(--primary-blue-light)' }} />
                                    <div>
                                        <h4 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>Scalable Workforce</h4>
                                        <p style={{ color: 'var(--text-muted)', margin: 0 }}>Can accommodate varying volume demands instantly.</p>
                                    </div>
                                </li>
                                <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <Target size={24} style={{ color: 'var(--accent-teal)' }} />
                                    <div>
                                        <h4 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>Professional Transcriptionists</h4>
                                        <p style={{ color: 'var(--text-muted)', margin: 0 }}>Experienced professionals with industry-specific knowledge.</p>
                                    </div>
                                </li>
                                <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <Shield size={24} style={{ color: 'var(--primary-blue)' }} />
                                    <div>
                                        <h4 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>Multi-layer Quality Review</h4>
                                        <p style={{ color: 'var(--text-muted)', margin: 0 }}>Every project goes through extensive grammatical proofing.</p>
                                    </div>
                                </li>
                                <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <CheckCircle2 size={24} style={{ color: 'var(--primary-dark)' }} />
                                    <div>
                                        <h4 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>Competitive Pricing</h4>
                                        <p style={{ color: 'var(--text-muted)', margin: 0 }}>Enterprise-grade results tailored for high-volume budgets.</p>
                                    </div>
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <img
                                src="/images/services_video.png"
                                alt="High quality editing timeline"
                                style={{ borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)' }}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="section section-dark text-center">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="mb-8">The ScriptsPlay Standard</h2>
                        <div className="grid grid-cols-4 gap-6">
                            <div>
                                <h3 style={{ color: 'var(--accent-orange)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>99%</h3>
                                <p>Accurate Transcripts</p>
                            </div>
                            <div>
                                <h3 style={{ color: 'var(--primary-blue-light)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>100%</h3>
                                <p>Secure Client Handling</p>
                            </div>
                            <div>
                                <h3 style={{ color: 'var(--accent-teal)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>24/7</h3>
                                <p>Reliable Delivery</p>
                            </div>
                            <div>
                                <h3 style={{ color: 'var(--white)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>10K+</h3>
                                <p>Professional Workforce</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Work Opportunities */}
            <section className="section section-light">
                <div className="container">
                    <div className="glass p-8" style={{ borderRadius: 'var(--radius-xl)', padding: '4rem', background: 'linear-gradient(135deg, rgba(239, 246, 255, 1) 0%, rgba(219, 234, 254, 1) 100%)' }}>
                        <div className="grid grid-cols-2 gap-8 items-center text-left">
                            <div>
                                <h2 className="mb-4">Begin Your Remote Career</h2>
                                <p style={{ fontSize: '1.125rem', color: 'var(--text-main)', marginBottom: '2rem' }}>
                                    ScriptsPlay hires transcriptionists, caption specialists, and editors worldwide. Join our distributed ecosystem and work flexibly from anywhere.
                                </p>
                                <Link to="/jobs" className="btn btn-primary bg-primary text-white">
                                    View Work Opportunities
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                            <div>
                                <img
                                    src="/images/remote_worker.png"
                                    alt="Remote transcriptionist working from home"
                                    style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest News */}
            <section className="section section-gray">
                <div className="container">
                    <div className="flex justify-between items-center mb-8">
                        <h2>Latest Insights</h2>
                        <Link to="/blog" className="btn btn-outline">All Articles</Link>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <Link to="/blog/why-accurate-video-transcription-matters" className="card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ height: '200px', backgroundColor: 'var(--primary-blue)', padding: '2rem', display: 'flex', alignItems: 'flex-end' }}>
                                <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.875rem' }}>SEO & Marketing</span>
                            </div>
                            <div style={{ padding: '2rem' }}>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>October 12, 2025</p>
                                <h3 className="mb-2">Why Accurate Video Transcription Matters for Content Creators</h3>
                                <p style={{ color: 'var(--text-muted)', marginBottom: 0 }}>Discover the accessibility and SEO benefits that come with precise video transcription and captioning workflows.</p>
                            </div>
                        </Link>

                        <Link to="/blog/how-professional-captioning-improves-engagement" className="card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ height: '200px', backgroundColor: 'var(--accent-teal)', padding: '2rem', display: 'flex', alignItems: 'flex-end' }}>
                                <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.875rem' }}>Engagement</span>
                            </div>
                            <div style={{ padding: '2rem' }}>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>August 22, 2025</p>
                                <h3 className="mb-2">How Professional Captioning Improves Audience Engagement</h3>
                                <p style={{ color: 'var(--text-muted)', marginBottom: 0 }}>Reach global audiences and retain viewer attention effectively with robust, professional captioning.</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
