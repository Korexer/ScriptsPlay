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
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h1>Terms of Service</h1>
                    <p>Last updated: March 10, 2026</p>
                </div>
            </div>

            <section className="section section-light">
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div style={{ color: 'var(--text-main)' }}>
                        <h2 className="mb-4 text-primary-dark">1. Service Terms</h2>
                        <p>By using the ScriptsPlay website and services, you agree to these Terms of Service. ScriptsPlay provides professional video transcription and captioning solutions. Turnaround times and specific service deliverables will be agreed upon in client contracts directly via email or our portal.</p>

                        <h2 className="mb-4 text-primary-dark mt-8">2. Website Usage Rules</h2>
                        <p>Users must not engage in any activity that disrupts or interferes with the website's functionality. The site acts as a marketing brand presence and recruitment portal. Do not submit false information through our application or contact forms.</p>

                        <h2 className="mb-4 text-primary-dark mt-8">3. Worker Independence Clause</h2>
                        <p>Individuals who successfully join the ScriptsPlay network as transcriptionists or editors are classified strictly as independent contractors. You are responsible for your own taxes, equipment, and work schedule. ScriptsPlay provides task access but does not act as an employer in a traditional sense.</p>

                        <h2 className="mb-4 text-primary-dark mt-8">4. Liability Limitations</h2>
                        <p>ScriptsPlay acts merely to facilitate transcription and captioning. In no event shall ScriptsPlay be liable for indirect, incidental, special, or consequential damages resulting from the use of our services or website. We maintain 99% accuracy targets, but specific liability limitations apply formally within client contracts.</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TermsOfService;
