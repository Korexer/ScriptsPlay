import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEO from "../SEO";
import { articles } from "../../content/articles";
import { CTA } from "./PublicUI";

export default function Article({ index }: { index: number }) {
  const article = articles[index];
  return (
    <>
      <SEO title={article.title} description={article.description} article />
      <article>
        <header className="sp-intro">
          <div className="container sp-reading">
            <Link className="sp-text-link" to="/blog">
              <ArrowLeft size={16} /> Back to the journal
            </Link>
            <p className="sp-eyebrow">{article.category}</p>
            <h1>{article.title}</h1>
            <p className="sp-lead">{article.description}</p>
            <p className="sp-byline">
              By Korex at ScriptsPlay ·{" "}
              <time dateTime="2026-09-13">September 13, 2026</time>
            </p>
          </div>
        </header>
        <div className="container sp-reading sp-article-body">
          <nav className="sp-contents" aria-label="Article contents">
            <strong>In this guide</strong>
            {article.sections.map((s, i) => (
              <a href={`#section-${i}`} key={s.title}>
                {s.title}
              </a>
            ))}
          </nav>
          {article.sections.map((s, i) => (
            <section id={`section-${i}`} key={s.title}>
              <h2>{s.title}</h2>
              {s.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </section>
          ))}
          <aside className="sp-related">
            <p className="sp-eyebrow">Read next</p>
            <Link to={articles[1 - index].path}>
              {articles[1 - index].title}
            </Link>
          </aside>
        </div>
      </article>
      <CTA />
    </>
  );
}
