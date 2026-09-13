import SEO from "../components/SEO";
import { PageIntro, CTA, Checklist } from "../components/public/PublicUI";
export default function AboutUs() {
  return (
    <>
      <SEO
        title="About ScriptsPlay"
        description="Meet ScriptsPlay: whiteboard animation for businesses, educators, and agencies. Clear scripts, purposeful visuals, and a straightforward production process."
      />
      <PageIntro
        eyebrow="About ScriptsPlay"
        title="Good ideas deserve a clear explanation."
      >
        <p>
          We help businesses turn what they know into videos their audience can
          follow.
        </p>
      </PageIntro>
      <section className="sp-section">
        <div className="container sp-split">
          <div>
            <p className="sp-eyebrow">Why we do this</p>
            <h2>Understanding comes before the next step.</h2>
            <p>
              A customer cannot value a service they do not understand. A
              learner needs more than a wall of information. And a useful idea
              should not get lost in a long explanation.
            </p>
            <p>
              ScriptsPlay creates whiteboard animation videos that connect your
              message to a real audience need. We start with the story, then use
              drawings, movement, and narration to make the path easier to
              follow.
            </p>
          </div>
          <div className="sp-note-card">
            <p className="sp-eyebrow">A note from Korex</p>
            <h3>“Let’s make the useful part easy to see.”</h3>
            <p>
              I’m Korex, the person behind ScriptsPlay. Bring your idea, even if
              it is still rough. We’ll work out who it is for, what matters
              most, and how a short video can explain it.
            </p>
            <p className="sp-signature">Korex / ScriptsPlay</p>
          </div>
        </div>
      </section>
      <section className="sp-section sp-soft">
        <div className="container">
          <div className="sp-section-heading">
            <p className="sp-eyebrow">Our approach</p>
            <h2>Simple communication. Thoughtful production.</h2>
          </div>
          <div className="sp-grid-three">
            {[
              [
                "Start with the audience",
                "We ask what the viewer already knows, what is confusing, and what they need to do next.",
              ],
              [
                "Make every scene useful",
                "Each drawing should explain something. We focus the script and scene plan before adding movement.",
              ],
              [
                "Keep the project clear",
                "You receive a defined scope and review points. Decisions about timing, revisions, and delivery happen before they become surprises.",
              ],
            ].map(([title, text]) => (
              <div className="sp-card" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="sp-section">
        <div className="container sp-split">
          <div>
            <h2>
              Your knowledge.
              <br />
              Our visual storytelling.
            </h2>
            <p>
              You remain the expert on your product, course, or service. We use
              your approved information to develop the story and invite your
              feedback throughout the project.
            </p>
          </div>
          <Checklist
            items={[
              "For businesses, training providers, and agencies",
              "Remote collaboration through a clear written brief",
              "AI-assisted tools with human review",
              "Brand and confidentiality requirements discussed upfront",
            ]}
          />
        </div>
      </section>
      <CTA />
    </>
  );
}
