import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import SEO from "../components/SEO";
import { PageIntro, CTA } from "../components/public/PublicUI";
import { articles } from "../content/articles";
export default function Blog() {
  return (
    <>
      <SEO
        title="Whiteboard Video Journal"
        description="Practical guides to planning business explainer videos and whiteboard lessons. Shape a clear message, brief the project, and help viewers take the next step."
      />
      <PageIntro
        eyebrow="The ScriptsPlay journal"
        title="Better stories start with clearer thinking."
      >
        <p>
          Practical notes on planning, writing, and using whiteboard videos for
          your business.
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
                Korex at ScriptsPlay · September 13, 2026
              </p>
              <Link className="sp-text-link" to={a.path}>
                Read the guide <ArrowRight size={17} />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <CTA
        title="Put the idea into practice."
        text="Have a message your audience needs to understand? Send us a short brief and we’ll help plan the video."
      />
    </>
  );
}
