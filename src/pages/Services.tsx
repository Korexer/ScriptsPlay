import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "../components/SEO";
import {
  PageIntro,
  CTA,
  Checklist,
  Process,
  UseCases,
} from "../components/public/PublicUI";
const faqs = [
  [
    "Do I need a finished script?",
    "No. Send your website, notes, or a rough outline. We can help shape the script around your audience and the one thing they need to understand. If you already have a script, we can work from it.",
  ],
  [
    "How much does a video cost?",
    "We quote for the scope of your project. Length, script work, scene detail, narration, revisions, and output formats all affect the price. Tell us your budget and we will explain what can fit before you commit.",
  ],
  [
    "How long will it take?",
    "We agree a delivery schedule after reviewing your brief. Please include your deadline in the enquiry. Script approval, the number of scenes, and feedback timing all affect delivery.",
  ],
  [
    "Can you use our branding?",
    "Yes. Share your logo, colours, brand guide, and any approved product wording. We agree the visual direction with you before production.",
  ],
  [
    "Can an agency resell the video?",
    "Tell us if the work is for an agency client. We can agree delivery under your agency brand, confidentiality, review steps, and usage rights in the project scope.",
  ],
  [
    "Are revisions included?",
    "Your quote states the number and type of revision rounds. Reviewing the script and scene plan early helps keep later changes focused. New messages, extra scenes, or new formats may need a revised quote.",
  ],
  [
    "What will I receive?",
    "The agreed final video files. We confirm resolution, aspect ratio, voiceover, music, on-screen text, and any extra versions in the quote. Editable source files are only included when agreed.",
  ],
  [
    "Do you use AI?",
    "AI tools can support script drafts, narration, or production. ScriptsPlay handles the project and reviews the output. Tell us about any brand or confidentiality rules before sharing materials.",
  ],
];
export default function Services() {
  return (
    <>
      <SEO
        title="Whiteboard Video Services"
        description="Business explainers, training videos, and white-label agency production. Explore the ScriptsPlay process, deliverables, and custom project quotes."
      />
      <PageIntro
        eyebrow="The service"
        title="A clear message. A video to match."
      >
        <p>
          Whiteboard animation for businesses with something useful to explain.
          Start with a single video or plan a series around your audience.
        </p>
      </PageIntro>
      <section className="sp-section">
        <div className="container">
          <UseCases />
        </div>
      </section>
      <section className="sp-section sp-soft">
        <div className="container sp-split">
          <div>
            <p className="sp-eyebrow">The whole story, taken care of</p>
            <h2>From the first line to the final frame.</h2>
            <p>
              We build the project around your message and where the video will
              be used. Your written quote makes the deliverables, feedback
              rounds, and timeline clear.
            </p>
            <Checklist
              items={[
                "A script shaped around your audience and goal",
                "A scene plan for reviewing the visual story",
                "Whiteboard animation with agreed brand details",
                "Narration and audio options defined in your brief",
                "Draft review and the revisions in your quote",
                "Final exports for your agreed publishing channels",
              ]}
            />
          </div>
          <aside className="sp-quote-card">
            <p className="sp-eyebrow">Start with a focused project</p>
            <h3>Your first explainer</h3>
            <p>
              A 45–90 second video is a useful starting point for a single idea.
              We can also scope shorter social edits or a longer training
              lesson.
            </p>
            <hr />
            <h4>Custom quote. Clear scope.</h4>
            <p>
              Tell us the goal, length, deadline, and budget you have in mind.
              We’ll confirm the approach and price before work begins.
            </p>
            <Link className="btn btn-primary" to="/contact">
              Request a video quote <ArrowRight size={18} />
            </Link>
          </aside>
        </div>
      </section>
      <section className="sp-section">
        <div className="container">
          <div className="sp-section-heading">
            <p className="sp-eyebrow">Your project, step by step</p>
            <h2>Approve the story before we animate it.</h2>
          </div>
          <Process />
        </div>
      </section>
      <section className="sp-section sp-soft">
        <div className="container sp-faq">
          <p className="sp-eyebrow">Before we get started</p>
          <h2>Your questions, answered.</h2>
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <CTA
        title="Have a video in mind?"
        text="Tell us what you want your audience to understand. We’ll help define the right video for the job."
      />
    </>
  );
}
