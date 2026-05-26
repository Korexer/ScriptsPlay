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
                <div className="container public-legal-shell" style={{ maxWidth: '800px' }}>
                    <h1>Privacy Policy</h1>
                    <p>Last updated: March 10, 2026</p>
                </div>
            </div>

            <section className="section section-light">
                <div className="container public-legal-shell" style={{ maxWidth: '800px' }}>
                    <div style={{ color: 'var(--text-main)' }}>
                        <h2 className="mb-4 text-primary-dark">1. Introduction</h2>
                        <p className="mb-6">Welcome to ScriptsPlay ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website scriptsplay.com, use our services, or apply to join our network of independent transcription professionals.</p>

                        <h2 className="mb-4 text-primary-dark mt-8">2. Information We Collect</h2>
                        <p className="mb-4">We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
                        <h3 className="text-lg font-semibold mt-4 mb-2">Personal Data</h3>
                        <p className="mb-4">Personally identifiable information, such as your name, email address, telephone number, and demographic information that you voluntarily give to us when you register with the Site, request services, or apply for a position. For our independent contractors, this also includes resume data, assessment results, and payment routing information.</p>
                        <h3 className="text-lg font-semibold mt-4 mb-2">Client Audio & Media Files</h3>
                        <p className="mb-6">When clients submit audio, video, or document files for transcription, we collect and store these files securely. We treat all client media as highly confidential and subject to strict access controls.</p>

                        <h2 className="mb-4 text-primary-dark mt-8">3. How We Use Your Information</h2>
                        <p className="mb-4">Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginBottom: '2rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}>Create and manage your account.</li>
                            <li style={{ marginBottom: '0.5rem' }}>Process transactions, deliver transcription services, and send related information, including confirmations and invoices.</li>
                            <li style={{ marginBottom: '0.5rem' }}>Evaluate and onboard prospective independent transcriptionists.</li>
                            <li style={{ marginBottom: '0.5rem' }}>Manage contractor payouts and performance metrics.</li>
                            <li style={{ marginBottom: '0.5rem' }}>Respond to customer service requests and support needs.</li>
                            <li style={{ marginBottom: '0.5rem' }}>Monitor and analyze usage and trends to improve your experience with the Site.</li>
                        </ul>

                        <h2 className="mb-4 text-primary-dark mt-8">4. Disclosure of Your Information</h2>
                        <p className="mb-4">We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
                        <h3 className="text-lg font-semibold mt-4 mb-2">Third-Party Service Providers</h3>
                        <p className="mb-4">We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, and customer service. Specifically, our independent contractors use our proprietary portal to access client media under strict Non-Disclosure Agreements (NDAs).</p>
                        <h3 className="text-lg font-semibold mt-4 mb-2">By Law or to Protect Rights</h3>
                        <p className="mb-6">If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</p>

                        <h2 className="mb-4 text-primary-dark mt-8">5. Data Security</h2>
                        <p className="mb-6">We use administrative, technical, and physical security measures to help protect your personal information and client media. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

                        <h2 className="mb-4 text-primary-dark mt-8">6. Confidentiality of Client Materials</h2>
                        <p className="mb-6">ScriptsPlay implements rigorous confidentiality protocols. All independent contractors are required to sign strict NDAs before accessing any client media. Client files are processed within secure environments, and contractors are prohibited from downloading or storing client media on personal devices beyond the scope of active work assignments.</p>

                        <h2 className="mb-4 text-primary-dark mt-8">7. Your Privacy Rights</h2>
                        <p className="mb-4">Depending on your location (e.g., under GDPR or CCPA), you may have the right to:</p>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginBottom: '2rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}>Request access to your personal data.</li>
                            <li style={{ marginBottom: '0.5rem' }}>Request correction of incomplete or inaccurate data.</li>
                            <li style={{ marginBottom: '0.5rem' }}>Request erasure of your personal data.</li>
                            <li style={{ marginBottom: '0.5rem' }}>Object to processing of your personal data.</li>
                            <li style={{ marginBottom: '0.5rem' }}>Request the transfer of your personal data.</li>
                        </ul>
                        <p className="mb-6">If you wish to exercise any of these rights, please contact us using the details below.</p>

                        <h2 className="mb-4 text-primary-dark mt-8">8. Contact Us</h2>
                        <p className="mb-4">If you have questions or comments about this Privacy Policy, please contact us at:</p>
                        <p className="font-semibold text-primary-dark">ScriptsPlay</p>
                        <p>Email: hello@scriptsplay.com</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PrivacyPolicy;
