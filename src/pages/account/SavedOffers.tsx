import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "../../components/SEO";
import { supabase } from "../../lib/supabase";
import { useAccountUser } from "../../lib/useAccountUser";
import type { CreatorOffer } from "../../types/marketplace";
import { formatMoney } from "../../types/marketplace";

interface SavedRow {
  offer_id: string;
  created_at: string;
}

export default function SavedOffers() {
  const user = useAccountUser();
  const [saved, setSaved] = useState<SavedRow[]>([]);
  const [offers, setOffers] = useState<Record<string, CreatorOffer>>({});
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      const { data, error: listError } = await supabase.from("saved_offers")
        .select("offer_id,created_at").eq("buyer_id", user.id)
        .order("created_at", { ascending: false });
      if (!active) return;
      if (listError) { setError("Your saved offers could not load. Please try again."); setLoading(false); return; }
      const rows = (data || []) as SavedRow[];
      setSaved(rows);
      if (rows.length) {
        const { data: visibleOffers } = await supabase.from("creator_offers").select("*")
          .in("id", rows.map((row) => row.offer_id)).eq("status", "published");
        if (active) setOffers(Object.fromEntries(((visibleOffers || []) as CreatorOffer[]).map((offer) => [offer.id, offer])));
      }
      if (active) setLoading(false);
    }
    void load();
    return () => { active = false; };
  }, [user.id]);

  async function remove(offerId: string) {
    if (busyId) return;
    setBusyId(offerId);
    setError("");
    const { error: deleteError } = await supabase.from("saved_offers").delete()
      .eq("buyer_id", user.id).eq("offer_id", offerId);
    if (deleteError) setError("This offer could not be removed. Please try again.");
    else setSaved((current) => current.filter((row) => row.offer_id !== offerId));
    setBusyId("");
  }

  return (
    <>
      <SEO title="Saved offers" description="Your saved ScriptsPlay creator offers." noindex />
      <div className="market-account-panel">
        <div className="market-account-panel-heading"><div><h2>Saved offers</h2><p>Keep interesting offers here while you compare creators.</p></div><Link className="sp-text-link" to="/discover">Find more offers <ArrowRight size={17} /></Link></div>
        {error && <p className="sp-form-error" role="alert">{error}</p>}
        {loading ? <p role="status">Loading saved offers…</p> : saved.length ? (
          <div className="market-manage-list">{saved.map((row) => {
            const offer = offers[row.offer_id];
            return <article className="market-manage-row" key={row.offer_id}><div><h3>{offer?.title || "Offer no longer public"}</h3><p>{offer ? formatMoney(offer.price_minor, offer.currency) : "You can remove this saved offer."}</p></div><div className="market-row-actions">{offer && <Link className="sp-text-link" to={"/offer/" + offer.slug}>View offer <ArrowRight size={17} /></Link>}<button className="sp-text-link market-inline-button" type="button" onClick={() => void remove(row.offer_id)} disabled={Boolean(busyId)}>Remove</button></div></article>;
          })}</div>
        ) : !error && <div className="market-account-empty"><h3>No saved offers yet</h3><p>Find a creator offer you like and save it for later.</p><Link className="sp-text-link" to="/discover">Explore offers <ArrowRight size={17} /></Link></div>}
      </div>
    </>
  );
}
