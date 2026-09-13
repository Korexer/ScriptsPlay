import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

export function PageIntro({
  eyebrow,
  title,
  children,
  tone = "light",
}: {
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
  title = "What would you like to explain?",
  text = "Send us your website, an idea, or a rough script. We’ll help shape it into a video brief and a clear quote.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="sp-cta">
      <div className="container sp-cta-inner">
        <div>
          <p className="sp-eyebrow">Let’s put your idea in motion</p>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <Link className="btn btn-primary" to="/contact">
          Tell us about your video <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}

export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="sp-checklist">
      {items.map((item) => (
        <li key={item}>
          <Check size={18} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

const steps = [
  [
    "01",
    "Share the brief",
    "Tell us who the video is for, what they need to understand, and what they should do next.",
  ],
  [
    "02",
    "Approve the story",
    "We shape the script and scene plan. You review the message before we move into animation.",
  ],
  [
    "03",
    "Watch it take shape",
    "Your story becomes a whiteboard animation with narration, on-screen text, and brand details agreed in your brief.",
  ],
  [
    "04",
    "Make it yours",
    "Review the draft, send your agreed revisions, and receive the final video in the formats set out in your quote.",
  ],
];

export function Process() {
  return (
    <div className="sp-process">
      {steps.map(([number, title, text]) => (
        <div key={number}>
          <span className="sp-step-number">{number}</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
}

const useCases = [
  {
    title: "Explain your business",
    audience: "Businesses & software teams",
    text: "Turn a product, service, or complex workflow into a story a new customer can follow.",
    examples: "Website explainers · Product introductions · Sales videos",
    topic: "Business explainer",
  },
  {
    title: "Teach one useful idea",
    audience: "Educators & training providers",
    text: "Give a course, process, or lesson a visual explanation that learners can revisit.",
    examples: "Course trailers · Training lessons · Process guides",
    topic: "Training video",
  },
  {
    title: "Create for your clients",
    audience: "Marketing & creative agencies",
    text: "Add whiteboard videos to a client campaign, with production under your agency’s brand when agreed.",
    examples: "Client explainers · Content repurposing · Social edits",
    topic: "Agency project",
  },
];

export function UseCases() {
  return (
    <div className="sp-grid-three">
      {useCases.map((item, i) => (
        <article className="sp-card" key={item.title}>
          <span className="sp-index">0{i + 1}</span>
          <p className="sp-eyebrow">{item.audience}</p>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <p className="sp-small">{item.examples}</p>
          <Link
            className="sp-text-link"
            to={`/contact?project=${encodeURIComponent(item.topic)}`}
          >
            Discuss this video <ArrowRight size={17} />
          </Link>
        </article>
      ))}
    </div>
  );
}
