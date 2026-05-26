import React from 'react';
import { motion } from 'framer-motion';
import { Mic, PlaySquare, GraduationCap, Building, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';

const Services: React.FC = () => {
    return (
        <>
            <SEO
                title="Enterprise Transcription & Captioning Solutions"
                description="ScriptsPlay offers enterprise-grade transcription and captioning workflows tailored for high-volume content creators, film studios, and educational platforms."
            />

            <section className="hero-section" style={{ minHeight: '60vh' }}>
                <div className="hero-bg-wrapper" style={{ opacity: 0.6 }}>
                    <img
                        src="/images/service_header.png"
                        alt="Large scale broadcast studio production"
                        className="hero-image"
                        style={{ objectPosition: 'center center' }}
                    />
                </div>

                <div className="container">
                    <div className="hero-content">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="public-mobile-title-xl"
                            style={{ fontSize: '3.5rem', color: 'var(--accent-teal)' }}
                        >
                            Transcription & Captioning
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="public-mobile-body-lg"
                            style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', maxWidth: '700px' }}
                        >
                            End-to-end media formatting solutions optimized for accuracy, privacy, and massive scale.
                        </motion.p>
                    </div>
                </div>
            </section>

            <section className="section section-light" style={{ position: 'relative', zIndex: 10 }}>
                <div className="container">
                    <div className="grid grid-cols-4 gap-6 mb-12">
                        <div className="card text-center flex flex-col items-center" style={{ padding: '2.5rem 1.5rem' }}>
                            <PlaySquare size={44} style={{ color: 'var(--accent-orange)', margin: '0 auto 1.5rem' }} />
                            <h3 style={{ fontSize: '1.25rem' }}>YouTube Creators</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.75rem', lineHeight: '1.6' }}>Increase your global reach, viewer retention, and organic algorithm indexing.</p>
                        </div>
                        <div className="card text-center flex flex-col items-center" style={{ padding: '2.5rem 1.5rem' }}>
                            <Building size={44} style={{ color: 'var(--primary-blue-light)', margin: '0 auto 1.5rem' }} />
                            <h3 style={{ fontSize: '1.25rem' }}>Film Studios & Docs</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.75rem', lineHeight: '1.6' }}>Deliver broadcast-quality, multi-format subtitling workflows on strict timelines.</p>
                        </div>
                        <div className="card text-center flex flex-col items-center" style={{ padding: '2.5rem 1.5rem' }}>
                            <GraduationCap size={44} style={{ color: 'var(--accent-teal)', margin: '0 auto 1.5rem' }} />
                            <h3 style={{ fontSize: '1.25rem' }}>Online Courses</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.75rem', lineHeight: '1.6' }}>Cater to diverse learning styles and adhere completely to accessibility formatting.</p>
                        </div>
                        <div className="card text-center flex flex-col items-center" style={{ padding: '2.5rem 1.5rem' }}>
                            <Mic size={44} style={{ color: 'var(--primary-dark)', margin: '0 auto 1.5rem' }} />
                            <h3 style={{ fontSize: '1.25rem' }}>Podcasts & Media</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.75rem', lineHeight: '1.6' }}>Instantly transform long-form audio into readable, indexable articles and quotes.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section section-gray">
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <div className="text-center mb-10">
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)' }}>How The Pipeline Operates</h2>
                        <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', maxWidth: '750px', margin: '0 auto' }}>
                            We've engineered our processing pipeline to bypass the traditional bottlenecks faced by auto-generated software and centralized agencies.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-12">
                        <div className="public-process-step">
                            <div className="public-process-step-badge" style={{ background: 'var(--primary-blue-light)' }}>1</div>
                            <div>
                                <h3 className="public-mobile-title-lg" style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Bulk Submission & Routing</h3>
                                <p className="public-mobile-body-lg" style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                                    Clients submit batches of audio or video content securely through our infrastructure. Our internal routing system automatically calculates the complexity of the dialogue, the required turnaround time, and any specialized formatting instructions (like strict verbatim vs. clean read).
                                </p>
                            </div>
                        </div>

                        <div className="public-process-step">
                            <div className="public-process-step-badge" style={{ background: 'var(--accent-teal)' }}>2</div>
                            <div>
                                <h3 className="public-mobile-title-lg" style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Distributed Task Processing</h3>
                                <p className="public-mobile-body-lg" style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                                    The workload is intelligently distributed in structured segments across our verified network of thousands of professional transcriptionists. This distributed architecture allows us to process 50 hours of content just as quickly as 1 hour—by scaling the human workforce in real-time.
                                </p>
                            </div>
                        </div>

                        <div className="public-process-step">
                            <div className="public-process-step-badge" style={{ background: 'var(--accent-orange)' }}>3</div>
                            <div>
                                <h3 className="public-mobile-title-lg" style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Multi-Layer Editor Review</h3>
                                <p className="public-mobile-body-lg" style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                                    Every transcribed segment is stitched back together and passed to our senior Quality Assurance Editors. They run extensive grammatical proofing, ensure perfect speaker tracking, and verify that the sync-timing on captions matches the visual cuts frame-by-frame.
                                </p>
                            </div>
                        </div>

                        <div className="public-process-step">
                            <div className="public-process-step-badge" style={{ background: 'var(--primary-dark)' }}>4</div>
                            <div>
                                <h3 className="public-mobile-title-lg" style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Final Delivery & Export</h3>
                                <p className="public-mobile-body-lg" style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
                                    We deliver the final, 99%+ accurate text in your preferred formats, ranging from standard `.txt` and `.docx` structures to specialized caption files like `.srt`, `.vtt`, or `.scc` optimized for broadcast environments.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section section-light">
                <div className="container">
                    <div className="grid grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Enterprise Security & Compliance</h2>
                            <p className="public-mobile-body-lg" style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.8' }}>
                                We understand that pre-release footage, documentary interviews, and enterprise communications are deeply confidential. ScriptsPlay adheres to strict operational security protocols.
                            </p>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <ShieldCheck size={28} style={{ color: 'var(--primary-blue-light)' }} />
                                    <span style={{ fontSize: '1.125rem', fontWeight: 500, color: 'var(--primary-dark)' }}>Strict NDA enforcement for all distributed workers.</span>
                                </li>
                                <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <ShieldCheck size={28} style={{ color: 'var(--primary-blue-light)' }} />
                                    <span style={{ fontSize: '1.125rem', fontWeight: 500, color: 'var(--primary-dark)' }}>Secure, encrypted data handling environments.</span>
                                </li>
                                <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <ShieldCheck size={28} style={{ color: 'var(--primary-blue-light)' }} />
                                    <span style={{ fontSize: '1.125rem', fontWeight: 500, color: 'var(--primary-dark)' }}>Fragmented task distribution (workers only see small clips).</span>
                                </li>
                            </ul>
                        </div>
                        <div className="card public-dark-cta-card" style={{ background: 'var(--primary-dark)', color: 'white', padding: '4rem 3rem', textAlign: 'center' }}>
                            <h3 className="public-mobile-title-lg" style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'white' }}>Ready for a custom quote?</h3>
                            <p className="public-mobile-body-lg" style={{ color: 'var(--secondary-gray-dark)', fontSize: '1.125rem', marginBottom: '2.5rem' }}>
                                Contact our enterprise sales team directly. We can arrange pilot testing to prove our speed and accuracy workflow on your real content.
                            </p>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@scriptsplay.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary public-mobile-body-lg" style={{ padding: '1rem 2.5rem', fontSize: '1.125rem', width: '100%' }}>hello@scriptsplay.com</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Services;
