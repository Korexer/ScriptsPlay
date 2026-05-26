import React from 'react';
import SEO from '../components/SEO';

const TermsOfService: React.FC = () => {
    return (
        <>
            <SEO
                title="Terms of Service"
                description="Terms of Service for using ScriptsPlay and participating in our transcription network."
            />

            <div className="page-header" style={{ padding: '6rem 0 3rem' }}>
                <div className="container public-legal-shell" style={{ maxWidth: '800px' }}>
                    <h1>Terms of Service</h1>
                    <p>Last updated: March 10, 2026</p>
                </div>
            </div>

            <section className="section section-light">
                <div className="container public-legal-shell" style={{ maxWidth: '800px' }}>
                    <div style={{ color: 'var(--text-main)' }}>
                        <h2 className="mb-4 text-primary-dark">1. Acceptance of Terms</h2>
                        <p className="mb-6">By accessing or using the ScriptsPlay website and services, whether as a client or an independent contractor, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services.</p>

                        <h2 className="mb-4 text-primary-dark mt-8">2. Description of Services</h2>
                        <p className="mb-6">ScriptsPlay provides professional video and audio transcription, and captioning solutions. Turnaround times, pricing, and specific service deliverables are agreed upon in client contracts directly via email or our client portal. We reserve the right to modify or discontinue, temporarily or permanently, the Service with or without notice.</p>

                        <h2 className="mb-4 text-primary-dark mt-8">3. User Conduct and Prohibited Activities</h2>
                        <p className="mb-4">Users must not engage in any activity that disrupts or interferes with the website's functionality or our business operations. You agree not to:</p>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginBottom: '2rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}>Submit false, inaccurate, or misleading information through our application or contact forms.</li>
                            <li style={{ marginBottom: '0.5rem' }}>Upload or transmit viruses, malware, or any other malicious code.</li>
                            <li style={{ marginBottom: '0.5rem' }}>Attempt to gain unauthorized access to our internal dashboards, worker portals, or client media.</li>
                            <li style={{ marginBottom: '0.5rem' }}>For independent contractors: Download, distribute, or retain client media files or transcripts outside the scope of active assignments.</li>
                        </ul>

                        <h2 className="mb-4 text-primary-dark mt-8">4. Independent Contractor Terms</h2>
                        <p className="mb-4">Individuals who successfully join the ScriptsPlay network as transcriptionists, editors, or reviewers are classified strictly as independent contractors. You acknowledge and agree that:</p>
                        <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginBottom: '2rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}>You are not an employee of ScriptsPlay. You are responsible for your own taxes, equipment, software, and work schedule.</li>
                            <li style={{ marginBottom: '0.5rem' }}>You must maintain a minimum accuracy rate of 99% on assignments. Persistent failure to meet quality standards will result in account termination.</li>
                            <li style={{ marginBottom: '0.5rem' }}>You must adhere to strict confidentiality. All client media and transcripts are proprietary and confidential. Breach of confidentiality will result in immediate termination and potential legal action.</li>
                        </ul>

                        <h2 className="mb-4 text-primary-dark mt-8">5. Intellectual Property Rights</h2>
                        <p className="mb-6">Clients retain all ownership and intellectual property rights to the audio, video, and document files they submit to ScriptsPlay. Upon full payment for services, the client also holds all intellectual property rights to the finalized transcripts and captions. Independent contractors claim no ownership over the media they transcribe or the resulting transcripts.</p>

                        <h2 className="mb-4 text-primary-dark mt-8">6. Limitation of Liability</h2>
                        <p className="mb-6">ScriptsPlay acts to facilitate transcription and captioning. In no event shall ScriptsPlay, its directors, employees, or agents, be liable for indirect, incidental, special, or consequential damages resulting from the use of our services or website, including but not limited to loss of data, loss of revenue, or business interruption. We maintain strict accuracy targets, but specific liability limitations apply formally within individual client contracts.</p>

                        <h2 className="mb-4 text-primary-dark mt-8">7. Termination</h2>
                        <p className="mb-6">We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.</p>

                        <h2 className="mb-4 text-primary-dark mt-8">8. Governing Law</h2>
                        <p className="mb-6">These Terms shall be governed and construed in accordance with the laws, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</p>

                        <h2 className="mb-4 text-primary-dark mt-8">9. Contact Us</h2>
                        <p className="mb-4">If you have any questions about these Terms, please contact us:</p>
                        <p className="font-semibold text-primary-dark">ScriptsPlay</p>
                        <p>Email: hello@scriptsplay.com</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TermsOfService;
