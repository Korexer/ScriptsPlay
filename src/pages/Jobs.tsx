import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, DollarSign, Clock, Users, Laptop } from 'lucide-react';
import SEO from '../components/SEO';

const Jobs: React.FC = () => {
    return (
        <>
            <SEO
                title="Work With ScriptsPlay - Freelance Transcription Jobs"
                description="ScriptsPlay offers remote work opportunities for transcription professionals worldwide. Apply for entry-level, professional, or editing roles."
            />

            <section className="hero-section" style={{ minHeight: '60vh' }}>
                <div className="hero-bg-wrapper">
                    <img
                        src="/images/jobs_header.png"
                        alt="Happy freelance transcriptionist working from home"
                        className="hero-image"
                        style={{ objectPosition: 'center 30%' }}
                    />
                </div>

                <div className="container">
                    <div className="hero-content">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="public-mobile-title-xl"
                            style={{ fontSize: '3.5rem', color: 'var(--accent-orange)' }}
                        >
                            Become a Transcriptionist
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="public-mobile-body-lg"
                            style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', maxWidth: '700px' }}
                        >
                            Join our proprietary global network. Earn reliable money remotely by converting engaging audio to text, directly from your laptop.
                        </motion.p>
                    </div>
                </div>
            </section>

            <section className="section section-light" style={{ position: 'relative', zIndex: 10 }}>
                <div className="container">
                    <div className="grid grid-cols-4 gap-6 mb-8">
                        <div className="card text-center flex flex-col items-center shadow-lg">
                            <Clock size={36} style={{ color: 'var(--accent-teal)', marginBottom: '1rem' }} />
                            <h4 style={{ fontSize: '1.125rem' }}>Set Your Own Hours</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Work exactly when you want, for as long as you want.</p>
                        </div>
                        <div className="card text-center flex flex-col items-center shadow-lg">
                            <Laptop size={36} style={{ color: 'var(--primary-blue-light)', marginBottom: '1rem' }} />
                            <h4 style={{ fontSize: '1.125rem' }}>Work From Anywhere</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Our platform runs 100% online. All you need is internet access.</p>
                        </div>
                        <div className="card text-center flex flex-col items-center shadow-lg">
                            <DollarSign size={36} style={{ color: 'var(--accent-orange)', marginBottom: '1rem' }} />
                            <h4 style={{ fontSize: '1.125rem' }}>Reliable Payouts</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>No chasing invoices. Bi-weekly payments directly to your account.</p>
                        </div>
                        <div className="card text-center flex flex-col items-center shadow-lg">
                            <Users size={36} style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }} />
                            <h4 style={{ fontSize: '1.125rem' }}>Growth Opportunities</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Get promoted to editing and review roles for higher pay rates.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section section-gray">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '4rem' }}>
                        <h2 style={{ color: 'var(--primary-dark)', fontSize: '2.5rem' }}>Available Worker Roles</h2>
                        <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', maxWidth: '750px', margin: '0 auto' }}>
                            We operate on a transparent tier system. Qualified applicants gain access to our internal dashboard where continuous work is streamed directly to you.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-6" style={{ marginBottom: '5rem' }}>
                        <motion.div className="card flex flex-col" style={{ borderTop: '4px solid var(--primary-blue-light)' }} whileHover={{ y: -5 }}>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.75rem' }}>Entry Level<br /><span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Transcriptionist</span></h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>Perfect for typists new to the professional formatting space. You'll tackle straightforward YouTube videos and clear interviews.</p>
                                <div style={{ marginBottom: '1.5rem', padding: '0.75rem 1rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                                    <span style={{ fontWeight: 700, color: 'var(--primary-blue-light)' }}>Pay Rate:</span> <span style={{ fontWeight: 600 }}>$1.80</span> <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>/ video min</span>
                                </div>
                                <div style={{ marginBottom: '2rem' }}>
                                    <p style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.95rem' }}><CheckCircle2 size={18} style={{ color: 'var(--primary-blue-light)', flexShrink: 0, marginTop: '2px' }} /> Convert clear, spoken audio to text.</p>
                                    <p style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.95rem' }}><CheckCircle2 size={18} style={{ color: 'var(--primary-blue-light)', flexShrink: 0, marginTop: '2px' }} /> Beginner friendly standard content guidelines.</p>
                                    <p style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.95rem' }}><CheckCircle2 size={18} style={{ color: 'var(--primary-blue-light)', flexShrink: 0, marginTop: '2px' }} /> Focus on accuracy over complex styling.</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div className="card flex flex-col" style={{ borderTop: '4px solid var(--accent-orange)', transform: 'scale(1.05)', zIndex: 10, boxShadow: 'var(--shadow-xl)' }} whileHover={{ y: -5 }}>
                            <div style={{ position: 'absolute', top: '-12px', right: '2rem', background: 'var(--accent-orange)', color: 'white', padding: '0.35rem 1.25rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>MOST POPULAR</div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.75rem' }}>Professional<br /><span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Transcriptionist</span></h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>The sweet spot for experienced workers. Tackle enterprise workloads like corporate docs, complex jargon, and rapid-fire podcast panels.</p>
                                <div style={{ marginBottom: '1.5rem', padding: '0.75rem 1rem', background: 'rgba(249, 115, 22, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(249, 115, 22, 0.1)' }}>
                                    <span style={{ fontWeight: 700, color: 'var(--accent-orange)' }}>Pay Rate:</span> <span style={{ fontWeight: 600 }}>$2.40</span> <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>/ video min</span>
                                </div>
                                <div style={{ marginBottom: '2rem' }}>
                                    <p style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.95rem' }}><CheckCircle2 size={18} style={{ color: 'var(--accent-orange)', flexShrink: 0, marginTop: '2px' }} /> Handle complex audio, cross-talk & jargon.</p>
                                    <p style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.95rem' }}><CheckCircle2 size={18} style={{ color: 'var(--accent-orange)', flexShrink: 0, marginTop: '2px' }} /> Strict adherence to style guidelines verbatim.</p>
                                    <p style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.95rem' }}><CheckCircle2 size={18} style={{ color: 'var(--accent-orange)', flexShrink: 0, marginTop: '2px' }} /> Maintain high 99% accuracy standard.</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div className="card flex flex-col" style={{ borderTop: '4px solid var(--accent-teal)' }} whileHover={{ y: -5 }}>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.75rem' }}>Editor & Reviewer<br /><span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>Quality Assurance</span></h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>For grammatical experts. You won't be typing from scratch; instead, you review submitted drafts, fixing punctuation and structural errors.</p>
                                <div style={{ marginBottom: '1.5rem', padding: '0.75rem 1rem', background: 'rgba(20, 184, 166, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(20, 184, 166, 0.1)' }}>
                                    <span style={{ fontWeight: 700, color: 'var(--accent-teal)' }}>Pay Rate:</span> <span style={{ fontWeight: 600 }}>$3.00</span> <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>/ video min</span>
                                </div>
                                <div style={{ marginBottom: '2rem' }}>
                                    <p style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.95rem' }}><CheckCircle2 size={18} style={{ color: 'var(--accent-teal)', flexShrink: 0, marginTop: '2px' }} /> Proofread and heavily edit draft transcripts.</p>
                                    <p style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.95rem' }}><CheckCircle2 size={18} style={{ color: 'var(--accent-teal)', flexShrink: 0, marginTop: '2px' }} /> Format output for broadcast subtitle engines.</p>
                                    <p style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.95rem' }}><CheckCircle2 size={18} style={{ color: 'var(--accent-teal)', flexShrink: 0, marginTop: '2px' }} /> Provide rating feedback for junior workers.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mb-16">
                        <div className="glass p-8" style={{ padding: '3rem', borderRadius: 'var(--radius-xl)' }}>
                            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.75rem', color: 'var(--primary-dark)' }}>Worker Promotion System</h3>
                            <p className="public-mobile-body-lg" style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.125rem', lineHeight: '1.7' }}>
                                Unlike other platforms where you're perpetually stuck at the bottom rung, ScriptsPlay actively evaluates all workers. We promote typists every two months based entirely on accuracy matrices, style consistency, typing speed, and reliability.
                            </p>
                            <div className="public-mobile-stack" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', padding: '1.5rem', background: 'var(--white)', borderRadius: 'var(--radius-lg)' }}>
                                <div style={{ padding: '0.5rem 1rem', background: 'var(--secondary-gray-dark)', color: 'var(--primary-dark)', borderRadius: 'var(--radius-md)', fontWeight: 700 }}>Entry</div>
                                <ArrowRight size={20} style={{ color: 'var(--text-muted)' }} />
                                <div style={{ padding: '0.5rem 1rem', background: 'var(--primary-blue-light)', color: 'white', borderRadius: 'var(--radius-md)', fontWeight: 700 }}>Professional</div>
                                <ArrowRight size={20} style={{ color: 'var(--text-muted)' }} />
                                <div style={{ padding: '0.5rem 1rem', background: 'var(--primary-dark)', color: 'white', borderRadius: 'var(--radius-md)', fontWeight: 700 }}>Editor</div>
                            </div>
                        </div>

                        <div className="glass p-8" style={{ padding: '3rem', borderRadius: 'var(--radius-xl)' }}>
                            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.75rem', color: 'var(--primary-dark)' }}>Reliable Payment Infrastructure</h3>
                            <p className="public-mobile-body-lg" style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.125rem', lineHeight: '1.7' }}>
                                You earned the money, so you should get paid predictably. We ensure our talent gets paid on time, every single time, processing payroll twice per month internally.
                            </p>
                            <div className="grid grid-cols-1 gap-4">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', background: 'var(--white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                                    <div style={{ padding: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: 'var(--radius-md)' }}><CheckCircle2 size={24} style={{ color: 'var(--primary-blue-light)' }} /></div>
                                    <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>PayPal Integration (Global)</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', background: 'var(--white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                                    <div style={{ padding: '0.5rem', background: 'rgba(20, 184, 166, 0.1)', borderRadius: 'var(--radius-md)' }}><CheckCircle2 size={24} style={{ color: 'var(--accent-teal)' }} /></div>
                                    <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>Direct Bank Transfers (US/EU)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card public-dark-cta-card shadow-xl" style={{ padding: '5rem 3rem', background: 'var(--primary-dark)', color: 'white' }}>
                        <h3 className="public-mobile-title-xl" style={{ fontSize: '2.5rem', marginBottom: '1.25rem', color: 'white' }}>Ready to send your application?</h3>
                        <p className="public-mobile-body-lg" style={{ color: 'var(--secondary-gray-dark)', fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '650px', margin: '0 auto 3rem', lineHeight: '1.8' }}>
                            We do not use an automated gatekeeper form. Apply directly by pitching your resume, cover letter, and your relevant typing experience directly to our hiring team's inbox.
                        </p>

                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: 'var(--radius-lg)', maxWidth: '500px', margin: '0 auto 2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <p style={{ fontSize: '0.95rem', color: 'var(--accent-orange)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Application Pipeline</p>
                            <ol style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '1rem', color: 'rgba(255,255,255,0.8)' }}>
                                <li><strong>Apply</strong> &mdash; Send your cover letter and resume.</li>
                                <li><strong>Interview</strong> &mdash; If selected, we will contact you.</li>
                                <li><strong>Assess</strong> &mdash; Complete a simple non-paid assessment.</li>
                                <li><strong>Work</strong> &mdash; Pass the test and start working immediately!</li>
                            </ol>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                            <a href="mailto:jobs@scriptsplay.com" className="btn btn-primary public-mobile-body-lg" style={{ padding: '1.25rem 4rem', fontSize: '1.25rem', fontWeight: 800 }}>
                                Email: jobs@scriptsplay.com
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Jobs;
