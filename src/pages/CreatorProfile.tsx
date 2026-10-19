import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import SEO from "../components/SEO";
import { supabase } from "../lib/supabase";
import type { CreatorOffer, MarketplaceProfile } from "../types/marketplace";
import { formatMoney } from "../types/marketplace";

export default function CreatorProfile() {
  const { handle } = useParams();
  const [profile, setProfile] = useState<MarketplaceProfile | null>(null);
  const [offers, setOffers] = useState<CreatorOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      const { data } = await supabase.from("marketplace_profiles").select("*").eq("handle", handle).eq("is_public", true).eq("is_creator", true).maybeSingle();
      if (!active) return;
      if (!data) { setLoading(false); return; }
      const person = data as MarketplaceProfile;
      setProfile(person);
      const { data: rows } = await supabase.from("creator_offers").select("*").eq("creator_id", person.id).eq("status", "published").order("published_at", { ascending: false });
      if (active) { setOffers((rows || []) as CreatorOffer[]); setLoading(false); }
    }
    void load();
    return () => { active = false; };
  }, [handle]);

  if (loading) return <div className="container market-account-loading" role="status">Loading creator…</div>;
  if (!profile) return <section className="sp-section"><div className="container market-discovery-empty"><h1>This profile is not available.</h1><p>It may be private or still in review.</p><Link className="sp-text-link" to="/discover"><ArrowLeft size={17} /> Explore creators</Link></div></section>;

  return (
    <>
      <SEO title={`${profile.display_name} — ScriptsPlay creator`} description={profile.bio.slice(0, 155) || `Explore creative work by ${profile.display_name} on ScriptsPlay.`} />
      <section className="market-detail-hero"><div className="container"><Link className="sp-text-link" to="/discover"><ArrowLeft size={17} /> Explore talent</Link><p className="sp-eyebrow">Creator profile</p><h1>{profile.display_name}</h1><p>{profile.bio || "Creative talent on ScriptsPlay."}</p><div className="market-creator-facts">{(profile.city || profile.country_code) && <span><MapPin size={17} /> {[profile.city, profile.country_code].filter(Boolean).join(", ")}</span>}{profile.languages.length > 0 && <span>{profile.languages.join(" · ")}</span>}</div></div></section>
      <section className="sp-section"><div className="container"><div className="sp-section-heading"><p className="sp-eyebrow">Creator offers</p><h2>See what {profile.display_name} can make.</h2></div>{offers.length ? <div className="market-offer-grid">{offers.map((offer) => <article className="market-offer-card" key={offer.id}><div className="market-offer-art"><span>{offer.kind.replaceAll("_", " ")}</span></div><div className="market-offer-body"><h2><Link to={`/offer/${offer.slug}`}>{offer.title}</Link></h2><p>{offer.deliverable}</p><div><span>{formatMoney(offer.price_minor, offer.currency)}</span><Link className="sp-text-link" to={`/offer/${offer.slug}`}>View offer <ArrowRight size={16} /></Link></div></div></article>)}</div> : <p>No public offers yet.</p>}{profile.portfolio_url && <p className="market-portfolio-link"><a href={profile.portfolio_url} target="_blank" rel="noopener noreferrer">Visit creator portfolio <ArrowRight size={16} /></a></p>}</div></section>
    </>
  );
}
