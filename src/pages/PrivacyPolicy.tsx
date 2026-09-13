import SEO from "../components/SEO";
import { PageIntro } from "../components/public/PublicUI";
export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="How ScriptsPlay handles enquiries, project briefs, and information used to provide whiteboard animation services."
      />
      <PageIntro eyebrow="Your information" title="Privacy policy">
        <p>
          Public website and whiteboard video enquiries · Updated September 13,
          2026
        </p>
      </PageIntro>
      <div className="container sp-reading sp-article-body">
        <section>
          <h2>Who we are</h2>
          <p>
            ScriptsPlay provides whiteboard animation and explainer video
            services through scriptsplay.com. For questions about your
            information, contact{" "}
            <a href="mailto:hello@scriptsplay.com">hello@scriptsplay.com</a>.
            This notice describes public website enquiries and video projects.
            It does not replace separately agreed terms for private accounts or
            contractor relationships.
          </p>
        </section>
        <section>
          <h2>Information you choose to share</h2>
          <p>
            Our quote form asks for your name, email, project type, and project
            brief. You may also share a company or website, preferred video
            length, deadline, and budget. If you contact us by email or discuss
            a project, the conversation may include scripts, brand assets,
            feedback, and delivery information. Creative collaboration enquiries
            may include portfolio links and availability.
          </p>
          <p>
            Please share only information you are entitled to provide. Avoid
            including confidential customer records, sensitive personal
            information, or account passwords in a public enquiry.
          </p>
        </section>
        <section>
          <h2>Why we use this information</h2>
          <p>
            We use enquiry details to answer your request, prepare a quote,
            discuss a possible project, and maintain a record of the
            conversation. For agreed work, we use project materials to produce,
            review, and deliver the video. We also use relevant records to
            handle support, protect our services, and meet applicable
            record-keeping duties.
          </p>
          <p>
            Where applicable data-protection law requires a legal basis, these
            purposes may involve taking steps at your request before a contract,
            performing an agreed contract, complying with legal duties, or our
            legitimate interests in responding to business enquiries and
            operating the service. Where consent is required for a separate use,
            we will request it.
          </p>
        </section>
        <section>
          <h2>Service providers and project tools</h2>
          <p>
            The site uses Vercel for hosting and Supabase for the existing
            enquiry database. A contact submission can also trigger an email
            notification. These providers and the email services involved
            process the information needed to deliver those functions. The site
            loads fonts from Google Fonts, which involves a connection from your
            browser.
          </p>
          <p>
            Video production can involve third-party and AI-assisted tools.
            Discuss confidentiality restrictions and any required processing
            agreement with us before sharing project materials. We will agree
            relevant project requirements before work begins. Provider
            processing can take place in countries other than your own; contact
            us to discuss applicable arrangements for your project.
          </p>
        </section>
        <section>
          <h2>Storage and retention</h2>
          <p>
            We retain enquiry and project records for the purposes described
            above, including the project relationship, follow-up, dispute
            handling, and applicable record-keeping obligations. The appropriate
            period depends on the record and purpose. You can ask us about
            retention or request deletion at hello@scriptsplay.com. Some records
            may need to be retained for legal or contractual reasons.
          </p>
        </section>
        <section>
          <h2>Browser storage and external links</h2>
          <p>
            The public website does not require a customer account to request a
            quote. Existing account features may use browser storage to maintain
            a session. Links to email services or other websites are subject to
            those services’ own privacy practices.
          </p>
        </section>
        <section>
          <h2>Your choices and requests</h2>
          <p>
            You may ask to access, correct, or delete information you supplied.
            Depending on the law that applies to you, you may also have rights
            to object, restrict processing, receive a portable copy, withdraw
            consent, or complain to a data-protection authority. We may need to
            verify your identity and consider applicable exceptions before
            responding.
          </p>
          <p>
            To make a request, email{" "}
            <a href="mailto:hello@scriptsplay.com">hello@scriptsplay.com</a>{" "}
            with enough context to identify the relevant enquiry or project. You
            can also ask us to stop business follow-up messages.
          </p>
        </section>
        <section>
          <h2>Updates</h2>
          <p>
            We may update this notice when the public site or service changes.
            The date above identifies this version.
          </p>
        </section>
      </div>
    </>
  );
}
