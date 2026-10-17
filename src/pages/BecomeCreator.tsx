import { Link } from "react-router-dom";
import { ArrowRight, Camera, CircleDollarSign, ListChecks, Mic2 } from "lucide-react";
import SEO from "../components/SEO";
import { categories, feeExample } from "../content/marketplace";

export default function BecomeCreator() {
  return (
    <>
      <SEO title="Become a ScriptsPlay creator" description="Turn your acting, voice, video, music, dance or performance skill into a clear creator offer and earn from work you love." />
      <section className="market-page-hero market-page-hero-orange"><div className="container"><p className="sp-eyebrow">For the people who make it happen</p><h1>Your talent can earn more than views.</h1><p>Make it easy for buyers to find what you do, hear or see your work, and pay you for a clear result.</p><Link className="btn btn-primary" to="/contact">Introduce your talent <ArrowRight size={18} /></Link></div></section>
      <section className="sp-section"><div className="container"><div className="sp-section-heading"><p className="sp-eyebrow">There is room for your skill</p><h2>Create an offer around what you do best.</h2><p>Start with one service you can deliver well. Your portfolio can show many sides of your work.</p></div><div className="market-category-grid market-category-grid-compact">{categories.map(({ slug, name, examples, icon: Icon }) => <Link className="market-category" key={slug} to={`/discover?category=${slug}`}><span className="market-category-icon"><Icon size={26} /></span><h3>{name}</h3><p>{examples}</p></Link>)}</div></div></section>
      <section className="sp-section sp-soft"><div className="container market-process-grid"><div><p className="sp-eyebrow">A simple creator path</p><h2>Show what you make and how you work.</h2><p>You do not need the biggest audience. Buyers should be able to judge your actual skill and how well your offer fits their project.</p></div><div className="market-detail-list"><div><Camera /><div><h3>Build your showcase</h3><p>Add your bio, skills, languages, location, and original samples.</p></div></div><div><ListChecks /><div><h3>Publish a clear offer</h3><p>Set the format, scope, price, delivery time, revisions, and usage rights.</p></div></div><div><Mic2 /><div><h3>Make the content</h3><p>Respond to a buyer brief, complete the work, and deliver video or audio.</p></div></div></div></div></section>
      <section className="sp-section"><div className="container market-simple-cta"><div><p className="sp-eyebrow">Straightforward earnings</p><h2>Know your earnings before you take an order.</h2><p>For a {feeExample.price}-unit creator price, the 20% creator fee is {feeExample.creatorFee} units and your earnings are {feeExample.creatorEarns} units, before any separate taxes or payout charges that apply.</p><p className="market-inline-note"><CircleDollarSign size={19} /> See every fee before you accept a project.</p></div><Link className="sp-text-link" to="/fees">Read the full fee example <ArrowRight size={18} /></Link></div></section>
    </>
  );
}
