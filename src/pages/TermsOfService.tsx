import SEO from "../components/SEO";
import { PageIntro } from "../components/public/PublicUI";
export default function TermsOfService() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Terms for ScriptsPlay public website use and enquiries about whiteboard animation projects, quotes, revisions, and delivery."
      />
      <PageIntro eyebrow="Working together" title="Terms of service">
        <p>
          Public website and whiteboard video projects · Updated September 13,
          2026
        </p>
      </PageIntro>
      <div className="container sp-reading sp-article-body sp-legal">
        <section>
          <h2>Scope of these terms</h2>
          <p>
            These terms describe use of scriptsplay.com and enquiries about
            ScriptsPlay’s whiteboard animation service. A written project
            agreement or accepted quote sets the terms of a paid project. These
            public terms do not amend existing private worker or contractor
            arrangements.
          </p>
        </section>
        <section>
          <h2>Quotes and project approval</h2>
          <p>
            Sending an enquiry does not place an order or authorise a charge.
            Before production begins, we agree the scope, price and currency,
            payment schedule, delivery plan, and review process in writing. Any
            taxes, fees, or third-party costs should be identified in that
            agreement. Website examples are illustrative unless expressly
            identified as completed work.
          </p>
        </section>
        <section>
          <h2>What your project includes</h2>
          <p>
            The accepted scope defines script work, scene planning, animation,
            voiceover, music, on-screen text, video length, output formats, and
            revision rounds. Extra versions, new scenes, or changes to an
            approved script may change the cost and schedule. Editable files are
            included only where agreed.
          </p>
        </section>
        <section>
          <h2>Your materials and approvals</h2>
          <p>
            You are responsible for having permission to use materials you
            provide, including logos, images, scripts, music, and personal
            information. Please provide accurate product details and have an
            authorised person review the script, visual direction, claims, and
            draft video. We may decline content that infringes rights, is
            unlawful, or misrepresents a person or business.
          </p>
          <p>
            If your video concerns a regulated or specialist subject, arrange
            review by a qualified person. Animation is a communication format
            and does not itself provide professional certification or advice.
          </p>
        </section>
        <section>
          <h2>Timelines and changes</h2>
          <p>
            Delivery dates are agreed after reviewing the brief. They depend on
            receiving materials, approvals, and payments as scheduled. If
            feedback is delayed or the scope changes, we will discuss an updated
            schedule. A requested deadline is not confirmed until accepted in
            writing.
          </p>
        </section>
        <section>
          <h2>Usage rights and third-party assets</h2>
          <p>
            You retain your rights in materials you provide. The project
            agreement specifies the rights to the final video and when those
            rights take effect, including any payment conditions. Fonts, music,
            stock assets, voices, and production tools may carry separate
            licence restrictions. We agree relevant licensing and use
            requirements as part of the project.
          </p>
          <p>
            We will ask before displaying your commissioned video or identifying
            you as a client in our public portfolio. A private sample is a
            concept for discussion and should not be presented as an approved
            client project.
          </p>
        </section>
        <section>
          <h2>AI-assisted production</h2>
          <p>
            AI tools may assist with drafts, narration, or animation. Tell us
            about restrictions on AI use, confidential information, voice
            choices, and brand assets before supplying them. Agreed requirements
            form part of the scope. Human review and client approval remain part
            of the project process.
          </p>
        </section>
        <section>
          <h2>Cancellation and project concerns</h2>
          <p>
            Payment, cancellation, and refund arrangements are set out in your
            written agreement. Contact us promptly if you want to pause, change,
            or cancel work so we can confirm the work completed and the options
            available. Nothing in these public terms removes rights that cannot
            lawfully be excluded.
          </p>
        </section>
        <section>
          <h2>Results and website use</h2>
          <p>
            A video’s commercial results depend on its audience, message,
            distribution, offer, and other factors. We do not guarantee sales,
            conversion rates, views, or learner outcomes. Use this website
            lawfully and do not misuse its forms, interfere with its operation,
            or submit material you are not entitled to share.
          </p>
        </section>
        <section>
          <h2>Contact</h2>
          <p>
            Questions about a quote, a project, or these terms? Email{" "}
            <a href="mailto:hello@scriptsplay.com">hello@scriptsplay.com</a>.
          </p>
        </section>
      </div>
    </>
  );
}
