import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, FileCheck2, MessageCircle, PlayCircle } from "lucide-react";
import SEO from "../components/SEO";
import { processSteps } from "../content/marketplace";

export default function HowItWorks() {
  return (
    <>
      <SEO title="How ScriptsPlay works" description="Learn how buyers and creators connect, agree on a brief, deliver video or audio, request revisions and complete a project on ScriptsPlay." />
      <section className="market-page-hero market-page-hero-blue"><div className="container"><p className="sp-eyebrow">How it works</p><h1>A clear way to make something together.</h1><p>From the first search to the final file, everyone should know what is being made and what happens next.</p></div></section>
      <section className="sp-section"><div className="container"><div className="sp-section-heading"><p className="sp-eyebrow">For buyers</p><h2>Find, brief, and receive.</h2></div><ol className="market-how-grid">{processSteps.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol></div></section>
      <section className="sp-section sp-soft"><div className="container market-process-grid"><div><p className="sp-eyebrow">For creators</p><h2>Show the work. Set the terms. Get paid.</h2><p>Build a profile around what you actually do. Add samples, set a clear offer, and receive projects that fit your skills.</p><Link className="sp-text-link" to="/become-a-creator">See the creator path <ArrowRight size={18} /></Link></div><div className="market-detail-list"><div><PlayCircle /><div><h3>Show your talent</h3><p>Use original video and audio samples so buyers can understand your style.</p></div></div><div><MessageCircle /><div><h3>Agree on the brief</h3><p>Keep the deliverable, deadline, revisions, and rights in one place.</p></div></div><div><FileCheck2 /><div><h3>Deliver with confidence</h3><p>Send your work for review and see the order through to completion.</p></div></div></div></div></section>
      <section className="sp-section"><div className="container market-simple-cta"><div><p className="sp-eyebrow">Clear from the start</p><h2>Know what the order includes.</h2><p>Every creator offer will show its price, deliverable, timing, revision rules, and usage rights. The buyer can review a delivery and request a covered revision before completion.</p><p className="market-inline-note"><CheckCircle2 size={19} /> The checkout total and creator earnings are shown before an order begins.</p></div><Link className="btn btn-primary" to="/fees">See the fees <ArrowRight size={18} /></Link></div></section>
    </>
  );
}
