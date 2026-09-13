import SEO from "../components/SEO";
import { PageIntro, Checklist } from "../components/public/PublicUI";
export default function Jobs() {
  return (
    <>
      <SEO
        title="Creative Collaboration"
        description="Interested in collaborating with ScriptsPlay on whiteboard animation? Share relevant scriptwriting, illustration, animation, or voiceover work."
      />
      <PageIntro
        eyebrow="Creative collaboration"
        title="Help make complex ideas clear."
        tone="teal"
      >
        <p>
          Scriptwriters, illustrators, animators, and voice talent: tell us
          about the work you do best.
        </p>
      </PageIntro>
      <section className="sp-section sp-soft">
        <div className="container sp-split">
          <div>
            <h2>Start with your work.</h2>
            <p>
              ScriptsPlay’s public service is whiteboard video production for
              businesses. If your skills fit that work, you can share a short
              introduction and relevant portfolio links.
            </p>
            <p>
              This is an invitation to introduce yourself, not a promise of an
              open role or paid assignment. Any project scope, rate, and working
              terms would be agreed separately.
            </p>
            <a
              className="btn btn-primary"
              href="mailto:jobs@scriptsplay.com?subject=Creative%20collaboration%20with%20ScriptsPlay"
            >
              Introduce yourself by email
            </a>
          </div>
          <div className="sp-card">
            <h3>What to include</h3>
            <Checklist
              items={[
                "Your name and creative speciality",
                "Two or three relevant portfolio links",
                "Your role in the work you share",
                "Availability and preferred project types",
                "Your usual rates or how you scope a project",
              ]}
            />
            <p className="sp-small">
              Send to jobs@scriptsplay.com. Please share links rather than large
              attachments.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
