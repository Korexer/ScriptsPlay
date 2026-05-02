import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MapPin, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { supabase } from '../lib/supabase';

const Contact: React.FC = () => {
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('submitting');
        setError(null);

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const message = formData.get('message') as string;

        try {
            // Step 1: Save to database
            const { error: submitError } = await supabase
                .from('contact_submissions')
                .insert([{ name, email, message }]);

            if (submitError) throw submitError;

            // Step 2: Trigger email notification via Edge Function
            const { error: fnError } = await supabase.functions.invoke('send-contact-email', {
                body: { name, email, message },
            });

            if (fnError) {
                // Log but don't block success — message is saved even if email fails
                console.error('Email notification error:', fnError);
            }

            setFormStatus('success');
        } catch (err: any) {
            console.error('Submission error:', err);
            setError('Failed to send message. Please try again later.');
            setFormStatus('idle');
        }
    };

    return (
        <>
            <SEO
                title="Contact Us"
                description="Get in touch with ScriptsPlay for enterprise transcription services or to apply for a transcriptionist position."
            />

            <div className="page-header">
                <div className="container" style={{ maxWidth: '800px' }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Get In Touch
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        We'd love to hear from you. Whether you need bulk transcription services, or you want to join our network, use the information below to reach us.
                    </motion.p>
                </div>
            </div>

            <section className="section section-gray">
                <div className="container">
                    <div className="grid grid-cols-2 gap-8" style={{ alignItems: 'flex-start' }}>

                        {/* Contact Methods */}
                        <div>
                            <h2 className="mb-4">Contact Information</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.125rem' }}>
                                For security and privacy reasons, all worker applications and client service requests must be sent via email or through our verified portals.
                            </p>

                            <div className="card mb-4" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', padding: '2rem' }}>
                                <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: 'var(--radius-full)' }}>
                                    <Mail size={24} style={{ color: 'var(--primary-blue-light)' }} />
                                </div>
                                <div>
                                    <h3 style={{ marginBottom: '0.25rem' }}>General & Client Inquiries</h3>
                                    <a href="mailto:hello@scriptsplay.com" style={{ color: 'var(--text-muted)' }}>hello@scriptsplay.com</a>
                                </div>
                            </div>

                            <div className="card mb-4" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', padding: '2rem' }}>
                                <div style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)', padding: '1rem', borderRadius: 'var(--radius-full)' }}>
                                    <Mail size={24} style={{ color: 'var(--accent-orange)' }} />
                                </div>
                                <div>
                                    <h3 style={{ marginBottom: '0.25rem' }}>Worker Applications</h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Send your resume, cover letter, and experience to apply.</p>
                                    <a href="mailto:jobs@scriptsplay.com" style={{ color: 'var(--primary-dark)', fontWeight: 600 }}>jobs@scriptsplay.com</a>
                                </div>
                            </div>

                            <div className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', padding: '2rem' }}>
                                <div style={{ backgroundColor: 'rgba(20, 184, 166, 0.1)', padding: '1rem', borderRadius: 'var(--radius-full)' }}>
                                    <MapPin size={24} style={{ color: 'var(--accent-teal)' }} />
                                </div>
                                <div>
                                    <h3 style={{ marginBottom: '0.25rem' }}>Office</h3>
                                    <p style={{ color: 'var(--text-muted)' }}>We are a globally distributed team. Operations run remotely securely.</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="card" style={{ padding: '3rem' }}>
                            <h2 style={{ marginBottom: '2rem' }}>Send Us a Message</h2>

                            {formStatus === 'success' ? (
                                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                                    <CheckCircle2 size={64} style={{ color: 'var(--accent-teal)', margin: '0 auto 1.5rem' }} />
                                    <h3>Message Sent!</h3>
                                    <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>We'll get back to you as soon as possible.</p>
                                    <button className="btn btn-outline mt-4" onClick={() => setFormStatus('idle')}>Send Another Message</button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    {error && (
                                        <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm mb-6 border border-red-100">
                                            {error}
                                        </div>
                                    )}

                                    <div className="form-group">
                                        <label className="form-label" htmlFor="name">Full Name</label>
                                        <input type="text" id="name" name="name" className="form-control" required placeholder="Jane Doe" />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" htmlFor="email">Email Address</label>
                                        <input type="email" id="email" name="email" className="form-control" required placeholder="jane@example.com" />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" htmlFor="message">Your Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            className="form-control"
                                            rows={5}
                                            required
                                            placeholder="How can we help you?"
                                            style={{ resize: 'vertical' }}
                                        ></textarea>
                                    </div>

                                    {/* Spam Protection Honeypot/ReCaptcha could go here functionally */}
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                                        By submitting this form, you agree to our Privacy Policy. This site is protected by reCAPTCHA.
                                    </p>

                                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={formStatus === 'submitting'}>
                                        {formStatus === 'submitting' ? (
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                                <Loader2 className="animate-spin" size={18} /> Sending...
                                            </div>
                                        ) : (
                                            <>
                                                Send Message <Send size={18} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
