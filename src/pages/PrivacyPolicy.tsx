import React from 'react';
import SEO from '../components/SEO';

const PrivacyPolicy: React.FC = () => {
    return (
        <>
            <SEO
                title="Privacy Policy"
                description="Privacy Policy detailing how ScriptsPlay collects and protects user data."
            />

            <div className="page-header" style={{ padding: '6rem 0 3rem' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h1>Privacy Policy</h1>
                    <p>Last updated: March 10, 2026</p>
                </div>
            </div>

            <section className="section section-light">
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div style={{ color: 'var(--text-main)' }}>
                        <h2 className="mb-4 text-primary-dark">1. Data Collection</h2>
                        <p>We collect information that you provide securely to us when you apply for a transcriptionist role or submit an inquiry for services through our website. This may include your name, email address, resume data, and payment information securely stored by our third-party payment processors.</p>

                        <h2 className="mb-4 text-primary-dark mt-8">2. Email Data Usage</h2>
                        <p>Your email address is strictly used to communicate regarding worker applications or client services. For applicants, your email address (`jobs@scriptsplay.com` interactions) acts as the primary mode for receiving skill assessments and internal dashboard access details.</p>

                        <h2 className="mb-4 text-primary-dark mt-8">3. Cookies</h2>
                        <p>We use essential cookies to maintain the functionality of this website. Analytics cookies are used to understand site traffic and optimize our marketing and recruitment workflow. You can opt out of non-essential cookies via your browser settings.</p>

                        <h2 className="mb-4 text-primary-dark mt-8">4. User Rights</h2>
                        <p>Under GDPR and CCPA, you retain the right to:</p>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginBottom: '2rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}>Request access to your personal data.</li>
                            <li style={{ marginBottom: '0.5rem' }}>Request correction or erasure of your data.</li>
                            <li style={{ marginBottom: '0.5rem' }}>Object to our processing of your personal data.</li>
                        </ul>
                        <p>You can fulfill these rights by contacting us at hello@scriptsplay.com.</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PrivacyPolicy;
