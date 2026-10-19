import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import SEO from "../../components/SEO";
import { supabase } from "../../lib/supabase";
import { useAccountUser } from "../../lib/useAccountUser";
import type { CreatorOffer } from "../../types/marketplace";
import { formatMoney } from "../../types/marketplace";

export default function OffersList() {
  const user = useAccountUser();
  const [offers, setOffers] = useState<CreatorOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    void supabase.from("creator_offers").select("*").eq("creator_id", user.id).order("updated_at", { ascending: false }).then(({ data, error: queryError }) => {
      if (!active) return;
      if (queryError) setError("Your offers could not load. Please try again soon.");
      else setOffers((data || []) as CreatorOffer[]);
      setLoading(false);
    });
    return () => { active = false; };
  }, [user.id]);

  return (
    <>
      <SEO title="My creator offers" description="Manage your ScriptsPlay creator offers." noindex />
      <div className="market-account-panel">
        <div className="market-account-panel-heading"><div><h2>My offers</h2><p>Write a clear offer, save a draft, and send it for review when it is ready.</p></div><Link className="btn btn-primary" to="/account/offers/new"><Plus size={18} /> Create an offer</Link></div>
        {error && <p className="sp-form-error" role="alert">{error}</p>}
        {loading ? <p role="status">Loading offers…</p> : offers.length ? (
          <div className="market-manage-list">{offers.map((offer) => (
            <article className="market-manage-row" key={offer.id}><div><span className="market-status">{offer.status.replaceAll("_", " ")}</span><h3>{offer.title}</h3><p>{offer.kind.replaceAll("_", " ")} · {formatMoney(offer.price_minor, offer.currency)}</p></div><Link className="sp-text-link" to={`/account/offers/${offer.id}/edit`}>Edit offer <ArrowRight size={17} /></Link></article>
          ))}</div>
        ) : !error && <div className="market-account-empty"><h3>No offers yet</h3><p>Start with one creative service you can deliver well. Your draft stays private until it is reviewed.</p><Link className="sp-text-link" to="/account/offers/new">Create your first offer <ArrowRight size={17} /></Link></div>}
      </div>
    </>
  );
}
