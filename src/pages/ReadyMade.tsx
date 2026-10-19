import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileAudio, FileVideo, ShieldCheck } from "lucide-react";
import SEO from "../components/SEO";
import { supabase } from "../lib/supabase";
import type { CreatorOffer } from "../types/marketplace";
import { formatMoney } from "../types/marketplace";

export default function ReadyMade() {
  const [offers, setOffers] = useState<CreatorOffer[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    void supabase.from("creator_offers").select("*").eq("kind", "ready_made").eq("status", "published").order("published_at", { ascending: false }).limit(30).then(({ data }) => {
      if (active) { setOffers((data || []) as CreatorOffer[]); setLoading(false); }
    });
    return () => { active = false; };
  }, []);
  return (
    <>
      <SEO title="Ready-made video and audio" description="Discover finished video and audio from creators. See clear usage rights before purchasing content for your project." />
      <section className="market-page-hero market-page-hero-blue">
        <div className="container">
          <p className="sp-eyebrow">Ready-made content</p>
          <h1>A finished piece can be the perfect starting point.</h1>
          <p>Explore original video and audio made by creators, with clear terms for how you can use each piece.</p>
        </div>
      </section>
      <section className="sp-section">
        <div className="container market-feature-grid">
          <article className="market-feature"><FileVideo size={28} /><h2>Video you can use</h2><p>Discover original clips, performances, skits, and social content.</p></article>
          <article className="market-feature"><FileAudio size={28} /><h2>Sound with a story</h2><p>Find beats, instrumentals, spoken pieces, and other original audio.</p></article>
          <article className="market-feature"><ShieldCheck size={28} /><h2>Know your rights</h2><p>Each listing will show the licence, permitted use, and whether the sale is exclusive.</p></article>
        </div>
      </section>
      <section className="sp-section sp-soft"><div className="container"><div className="sp-section-heading"><p className="sp-eyebrow">Browse finished work</p><h2>Ready when you are.</h2></div>{loading ? <p role="status">Loading content…</p> : offers.length ? <div className="market-offer-grid">{offers.map((offer) => <article className="market-offer-card" key={offer.id}><div className="market-offer-art"><span>Ready-made content</span></div><div className="market-offer-body"><h2><Link to={`/offer/${offer.slug}`}>{offer.title}</Link></h2><p>{offer.deliverable}</p><div><span>{formatMoney(offer.price_minor, offer.currency)}</span><Link className="sp-text-link" to={`/offer/${offer.slug}`}>View details <ArrowRight size={16} /></Link></div></div></article>)}</div> : <div className="market-simple-cta"><div><h3>We are preparing the first collection.</h3><p>Have a specific need now? Share your brief and we can discuss the right content.</p></div><Link className="btn btn-primary" to="/contact">Share your brief <ArrowRight size={18} /></Link></div>}</div></section>
    </>
  );
}
