import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import SEO from "../components/SEO";
import { PageIntro, CTA } from "../components/public/PublicUI";
import { articles } from "../content/articles";
export default function Blog() {
  return (
    <>
      <SEO
        title="ScriptsPlay Journal"
        description="Practical guides for buyers briefing video creators and creators selling video, audio, music, acting and performance work."
      />
      <PageIntro
        eyebrow="The ScriptsPlay journal"
        title="Make better work together."
      >
        <p>
          Useful notes for buyers who need creative work and creators who want
          to earn from their skills.
        </p>
      </PageIntro>
      <section className="sp-section">
        <div className="container sp-grid-two">
          {articles.map((a, i) => (
            <article className="sp-article-card" key={a.path}>
              <div className={i ? "sp-article-art sp-teal" : "sp-article-art"}>
                <BookOpen size={48} />
                <span>0{i + 1} / FIELD NOTES</span>
              </div>
              <p className="sp-eyebrow">{a.category}</p>
              <h2>
                <Link to={a.path}>{a.title}</Link>
              </h2>
              <p>{a.description}</p>
              <p className="sp-small">
                Korex at ScriptsPlay · October 18, 2026
              </p>
              <Link className="sp-text-link" to={a.path}>
                Read the guide <ArrowRight size={17} />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <CTA
        title="Have an idea to make real?"
        text="Tell us about the project you need made, or introduce the creative work you offer."
      />
    </>
  );
}
