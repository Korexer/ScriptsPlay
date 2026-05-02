import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Heart, Zap, Award } from 'lucide-react';
import SEO from '../components/SEO';

const AboutUs: React.FC = () => {
    return (
        <>
            <SEO
                title="About Us"
                description="ScriptsPlay aims to simplify transcription workflows for large-scale content production while creating remote work opportunities for skilled professionals."
            />

            <div className="page-header">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        About ScriptsPlay
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Transforming the way content creators manage audio and video accessibility at scale.
                    </motion.p>
                </div>
            </div>

            <section className="section section-light">
                <div className="container">
                    <div className="grid grid-cols-2 gap-8 items-center mb-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="mb-4">Our Mission</h2>
                            <p className="public-mobile-body-lg" style={{ fontSize: '1.125rem', color: 'var(--text-main)' }}>
                                ScriptsPlay aims to simplify transcription workflows for large-scale content production while creating remote work opportunities for skilled professionals worldwide.
                            </p>
                            <p className="public-mobile-body-lg" style={{ fontSize: '1.125rem', color: 'var(--text-main)' }}>
                                We believe that accurate text formatting makes the world's knowledge and entertainment universally accessible.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <img
                                src="/images/about_team.png"
                                alt="ScriptsPlay distributed team"
                                style={{ borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)' }}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="section section-gray">
                <div className="container">
                    <div className="text-center mb-8">
                        <h2>What We Do</h2>
                        <p style={{ maxWidth: '700px', margin: '0 auto', color: 'var(--text-muted)' }}>
                            A full-suite pipeline for managing the written word behind the video.
                        </p>
                    </div>

                    <div className="grid grid-cols-4 gap-6">
                        <div className="card text-center">
                            <h3 className="mb-2">Video Transcription</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>High-fidelity conversion of spoken audio into perfectly punctuated text.</p>
                        </div>
                        <div className="card text-center">
                            <h3 className="mb-2">Caption Creation</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Time-synced, beautifully formatted captions adapted for various platforms.</p>
                        </div>
                        <div className="card text-center">
                            <h3 className="mb-2">Editing & Proofing</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Deep grammatical correction resulting in 99%+ accuracy rating.</p>
                        </div>
                        <div className="card text-center">
                            <h3 className="mb-2">Large-Scale Processing</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Handling hundreds of hours of content seamlessly to meet enterprise deadlines.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section section-dark">
                <div className="container">
                    <div className="grid grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="mb-4">Our Workforce Model</h2>
                            <p className="public-mobile-body-lg" style={{ fontSize: '1.125rem', color: 'var(--secondary-gray-dark)', marginBottom: '1.5rem' }}>
                                ScriptsPlay operates on a uniquely distributed worker model. We don't believe in centralized, restrictive office setups.
                            </p>
                            <p className="public-mobile-body-lg" style={{ fontSize: '1.125rem', color: 'var(--secondary-gray-dark)' }}>
                                We work directly with a network of trained transcriptionists and editors who collaborate through our secure, proprietary internal work system. This means faster turnaround for clients, and completely flexible work opportunities for our talent.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="glass-dark p-6" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                                <Globe size={32} style={{ color: 'var(--primary-blue-light)', marginBottom: '1rem' }} />
                                <h4 style={{ color: 'var(--white)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Global Reach</h4>
                                <p style={{ color: 'var(--secondary-gray-dark)', fontSize: '0.9rem' }}>Talent sourced from every timezone.</p>
                            </div>
                            <div className="glass-dark p-6" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                                <Zap size={32} style={{ color: 'var(--accent-orange)', marginBottom: '1rem' }} />
                                <h4 style={{ color: 'var(--white)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Speed</h4>
                                <p style={{ color: 'var(--secondary-gray-dark)', fontSize: '0.9rem' }}>Rapid delivery timelines.</p>
                            </div>
                            <div className="glass-dark p-6" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                                <Award size={32} style={{ color: 'var(--accent-teal)', marginBottom: '1rem' }} />
                                <h4 style={{ color: 'var(--white)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Quality Standards</h4>
                                <p style={{ color: 'var(--secondary-gray-dark)', fontSize: '0.9rem' }}>Meticulous internal QA processes.</p>
                            </div>
                            <div className="glass-dark p-6" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                                <Heart size={32} style={{ color: 'var(--white)', marginBottom: '1rem' }} />
                                <h4 style={{ color: 'var(--white)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Worker Support</h4>
                                <p style={{ color: 'var(--secondary-gray-dark)', fontSize: '0.9rem' }}>Valuing our transcription network.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutUs;
