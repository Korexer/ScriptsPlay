import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock3, FileCheck2, MapPin, RotateCcw } from "lucide-react";
import SEO from "../components/SEO";
import { categories } from "../content/marketplace";
import { supabase } from "../lib/supabase";
import type { CreatorOffer, MarketplaceProfile } from "../types/marketplace";
import { formatMoney } from "../types/marketplace";

interface Sample { id: string; object_path: string; media_type: "image" | "video" | "audio"; caption: string; url?: string }

export default function OfferDetail() {
  const { slug } = useParams();
  const [offer, setOffer] = useState<CreatorOffer | null>(null);
  const [creator, setCreator] = useState<MarketplaceProfile | null>(null);
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      const { data } = await supabase.from("creator_offers").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
      if (!active) return;
      if (!data) { setLoading(false); return; }
      const row = data as CreatorOffer;
      setOffer(row);
      const [profileResult, mediaResult] = await Promise.all([
        supabase.from("marketplace_profiles").select("*").eq("id", row.creator_id).maybeSingle(),
        supabase.from("offer_media").select("id,object_path,media_type,caption").eq("offer_id", row.id).order("position"),
      ]);
      if (!active) return;
      setCreator((profileResult.data as MarketplaceProfile | null) || null);
      const media = (mediaResult.data || []) as Sample[];
      const linked = await Promise.all(media.map(async (sample) => {
        const { data: signed } = await supabase.storage.from("marketplace-samples").createSignedUrl(sample.object_path, 3600);
        return { ...sample, url: signed?.signedUrl };
      }));
      if (active) { setSamples(linked); setLoading(false); }
    }
    void load();
    return () => { active = false; };
  }, [slug]);

  if (loading) return <div className="container market-account-loading" role="status">Loading offer…</div>;
  if (!offer) return <section className="sp-section"><div className="container market-discovery-empty"><h1>This offer is not available.</h1><p>It may be private, paused, or removed.</p><Link className="sp-text-link" to="/discover"><ArrowLeft size={17} /> Explore creators</Link></div></section>;

  return (
    <>
      <SEO title={offer.title} description={offer.deliverable.slice(0, 155)} />
      <section className="market-detail-hero"><div className="container"><Link className="sp-text-link" to="/discover"><ArrowLeft size={17} /> Explore talent</Link><p className="sp-eyebrow">{categories.find((item) => item.slug === offer.category_slug)?.name || "Creative work"}</p><h1>{offer.title}</h1><p>{offer.deliverable}</p></div></section>
      <section className="sp-section"><div className="container market-offer-detail-grid"><div>
        {samples.length > 0 && <div className="market-samples"><h2>See and hear the work</h2><div className="market-sample-grid">{samples.map((sample) => sample.url && <figure key={sample.id}>{sample.media_type === "video" ? <video controls preload="none" src={sample.url} /> : sample.media_type === "audio" ? <audio controls preload="none" src={sample.url} /> : <img src={sample.url} alt={sample.caption || `Sample for ${offer.title}`} loading="lazy" />}<figcaption>{sample.caption}</figcaption></figure>)}</div></div>}
        <div className="market-detail-block"><h2>What you will receive</h2><p>{offer.deliverable}</p></div>
        <div className="market-detail-block"><h2>About this offer</h2><p>{offer.description}</p></div>
        <div className="market-detail-block"><h2>Usage rights</h2><p>{offer.usage_rights}</p></div>
        {offer.buyer_requirements && <div className="market-detail-block"><h2>What the creator needs from you</h2><p>{offer.buyer_requirements}</p></div>}
        {creator && <div className="market-detail-block"><h2>About the creator</h2><p>{creator.display_name}</p><p>{creator.bio}</p><Link className="sp-text-link" to={`/creator/${creator.handle}`}>View creator profile <ArrowRight size={17} /></Link></div>}
      </div><aside className="market-offer-summary"><p className="sp-eyebrow">Offer details</p><strong>{formatMoney(offer.price_minor, offer.currency)}</strong><ul><li><FileCheck2 size={18} /> {offer.kind.replaceAll("_", " ")}</li><li><Clock3 size={18} /> {offer.delivery_days === 0 ? "Ready-made" : `${offer.delivery_days} day delivery`}</li><li><RotateCcw size={18} /> {offer.revisions} included revisions</li><li><MapPin size={18} /> {offer.is_remote ? "Remote" : [offer.city, offer.country_code].filter(Boolean).join(", ") || "On location"}</li></ul><p>Ask the creator about this offer. Checkout is still being prepared.</p><Link className="btn btn-primary" to={"/account/messages/new?offer=" + encodeURIComponent(offer.id)}>Message creator <ArrowRight size={18} /></Link></aside></div></section>
    </>
  );
}
