import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

export function PageIntro({ eyebrow, title, children, tone = "light" }: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  tone?: "light" | "dark" | "blue" | "teal";
}) {
  return (
    <section className={`sp-intro sp-intro-${tone}`}>
      <div className="container">
        <p className="sp-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <div className="sp-lead">{children}</div>
      </div>
    </section>
  );
}

export function CTA({
  title = "Have a project or a skill to share?",
  text = "Tell us what you want to make or what you do best. We are building ScriptsPlay with creators and buyers in mind.",
}: { title?: string; text?: string }) {
  return (
    <section className="sp-cta">
      <div className="container sp-cta-inner">
        <div>
          <p className="sp-eyebrow">Start the conversation</p>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <Link className="btn btn-primary" to="/contact">
          Get in touch <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}

export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="sp-checklist">
      {items.map((item) => (
        <li key={item}><Check size={18} aria-hidden="true" />{item}</li>
      ))}
    </ul>
  );
}
