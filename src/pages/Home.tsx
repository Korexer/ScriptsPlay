import { Link } from "react-router-dom";
import { ArrowRight, PencilLine, CheckCircle2 } from "lucide-react";
import SEO from "../components/SEO";
import Storyboard from "../components/public/Storyboard";
import { CTA, UseCases } from "../components/public/PublicUI";
import { articles } from "../content/articles";

export default function Home() {
  return (
    <>
      <SEO
        title="Whiteboard Animation Videos for Business"
        description="Make your business easier to understand. ScriptsPlay creates whiteboard explainer videos, training videos, and agency content from script to final delivery."
      />
      <section className="sp-hero">
        <div className="container sp-hero-grid">
          <div>
            <p className="sp-eyebrow">
              <span className="sp-dot" /> Whiteboard animation, made for your
              business
            </p>
            <h1>
              Big ideas.
              <br />
              Simply <span>explained.</span>
            </h1>
            <p className="sp-lead">
              Turn “What do you do?” into “Now I get it.” We create whiteboard
              videos that explain your service, teach your audience, and give
              people a clear next step.
            </p>
            <div className="sp-actions">
              <Link to="/contact" className="btn btn-primary">
                Let’s plan your video <ArrowRight size={18} />
              </Link>
              <Link to="/services" className="sp-light-link">
                Explore the service <ArrowRight size={17} />
              </Link>
            </div>
            <p className="sp-hero-note">
              <CheckCircle2 size={16} /> Script, scene planning & animation in
              one project
            </p>
          </div>
          <Storyboard />
        </div>
      </section>
      <div className="sp-strip">
        <div className="container">
          <span>Built for ideas worth understanding</span>
          <strong>Business explainers</strong>
          <strong>Training & education</strong>
          <strong>Agency content</strong>
        </div>
      </div>
      <section className="sp-section">
        <div className="container">
          <div className="sp-section-heading">
            <p className="sp-eyebrow">A clearer way to communicate</p>
            <h2>
              Your audience has questions.
              <br />
              Give them a story they can follow.
            </h2>
            <p>
              A complicated product. A lesson that needs an example. A service
              that takes too long to explain. Start with one message and let the
              visuals do some of the work.
            </p>
          </div>
          <UseCases />
        </div>
      </section>
      <section className="sp-section sp-soft">
        <div className="container sp-split">
          <div>
            <p className="sp-eyebrow">From your idea to a finished video</p>
            <h2>
              You know your business.
              <br />
              We help tell the story.
            </h2>
            <p>
              Bring a website link, an outline, or a script. We turn it into a
              focused visual story, then work through your feedback before final
              delivery.
            </p>
            <Link className="sp-text-link" to="/services">
              See what goes into your project <ArrowRight size={18} />
            </Link>
          </div>
          <div className="sp-note-card">
            <PencilLine size={32} />
            <h3>One video. One job.</h3>
            <p>
              Explain the product. Introduce the course. Show the process. Give
              your video one clear purpose, so your audience knows what to do
              next.
            </p>
            <div className="sp-note-tags">
              <span>A clear script</span>
              <span>Purposeful visuals</span>
              <span>Your brand</span>
            </div>
          </div>
        </div>
      </section>
      <section className="sp-section">
        <div className="container">
          <div className="sp-heading-row">
            <div>
              <p className="sp-eyebrow">The ScriptsPlay journal</p>
              <h2>Make your next video more useful.</h2>
            </div>
            <Link className="sp-text-link" to="/blog">
              All articles <ArrowRight size={18} />
            </Link>
          </div>
          <div className="sp-grid-two">
            {articles.map((a) => (
              <Link className="sp-article-card" to={a.path} key={a.path}>
                <span className="sp-eyebrow">{a.category}</span>
                <h3>{a.title}</h3>
                <p>{a.description}</p>
                <span className="sp-text-link">
                  Read the guide <ArrowRight size={17} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
