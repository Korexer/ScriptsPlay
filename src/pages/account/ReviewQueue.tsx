import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import SEO from "../../components/SEO";
import { supabase } from "../../lib/supabase";
import { useAccountUser } from "../../lib/useAccountUser";
import type { CastingCall, CreatorOffer, MarketplaceProfile } from "../../types/marketplace";
import { formatMoney } from "../../types/marketplace";

interface Sample {
  id: string;
  offer_id: string;
  media_type: "image" | "video" | "audio";
  caption: string;
  object_path: string;
  url?: string;
}

export default function ReviewQueue() {
  const user = useAccountUser();
  const isAdmin = user.app_metadata?.scriptsplay_admin === true;
  const [offers, setOffers] = useState<CreatorOffer[]>([]);
  const [calls, setCalls] = useState<CastingCall[]>([]);
  const [people, setPeople] = useState<Record<string, MarketplaceProfile>>({});
  const [samples, setSamples] = useState<Record<string, Sample[]>>({});
  const [loading, setLoading] = useState(isAdmin);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!isAdmin) return;
    let active = true;
    async function load() {
      const [offerResult, callResult] = await Promise.all([
        supabase.from("creator_offers").select("*").eq("status", "review").order("created_at").limit(100),
        supabase.from("casting_calls").select("*").eq("status", "review").order("created_at").limit(100),
      ]);
      if (!active) return;
      if (offerResult.error || callResult.error) {
        setError("The review queue could not load. Please try again.");
        setLoading(false);
        return;
      }
      const offerRows = (offerResult.data || []) as CreatorOffer[];
      setOffers(offerRows);
      setCalls((callResult.data || []) as CastingCall[]);
      const creatorIds = [...new Set(offerRows.map((offer) => offer.creator_id))];
      if (creatorIds.length) {
        const { data: profiles } = await supabase.from("marketplace_profiles").select("*").in("id", creatorIds);
        if (active) setPeople(Object.fromEntries(((profiles || []) as MarketplaceProfile[]).map((profile) => [profile.id, profile])));
      }
      if (offerRows.length) {
        const { data: media } = await supabase.from("offer_media")
          .select("id,offer_id,media_type,caption,object_path")
          .in("offer_id", offerRows.map((offer) => offer.id)).order("position");
        const signed = await Promise.all(((media || []) as Sample[]).map(async (sample) => {
          const { data } = await supabase.storage.from("marketplace-samples").createSignedUrl(sample.object_path, 3600);
          return { ...sample, url: data?.signedUrl };
        }));
        if (active) {
          const grouped: Record<string, Sample[]> = {};
          for (const sample of signed) (grouped[sample.offer_id] ||= []).push(sample);
          setSamples(grouped);
        }
      }
      if (active) setLoading(false);
    }
    void load();
    return () => { active = false; };
  }, [isAdmin]);

  async function decide(kind: "offer" | "casting", id: string, accept: boolean) {
    if (busyId) return;
    if (!accept && !window.confirm("Reject this submission? The owner can edit and resubmit it.")) return;
    setBusyId(id);
    setError("");
    setNotice("");
    const table = kind === "offer" ? "creator_offers" : "casting_calls";
    const { data, error: updateError } = await supabase.from(table)
      .update({ status: accept ? "published" : "rejected", published_at: accept ? new Date().toISOString() : null })
      .eq("id", id).eq("status", "review").select("id").maybeSingle();
    if (updateError || !data) setError("The review decision could not be saved. Please try again.");
    else {
      if (kind === "offer") setOffers((current) => current.filter((item) => item.id !== id));
      else setCalls((current) => current.filter((item) => item.id !== id));
      setNotice(accept ? "Submission published." : "Submission rejected.");
    }
    setBusyId("");
  }

  return (
    <>
      <SEO title="Review queue" description="Review creator offers and casting calls for ScriptsPlay." noindex />
      <div className="market-account-panel">
        <div className="market-account-panel-heading"><div><h2>Review queue</h2><p>Check the offer, rights, samples, and casting brief before it goes public.</p></div></div>
        {!isAdmin ? <p className="sp-form-error" role="alert">This account does not have review access.</p> : <>
          {error && <p className="sp-form-error" role="alert">{error}</p>}
          {notice && <p className="market-form-notice" role="status">{notice}</p>}
          {loading ? <p role="status">Loading submissions…</p> : <>
            <h3>Creator offers ({offers.length})</h3>
            {offers.length ? <div className="market-manage-list">{offers.map((offer) => {
              const person = people[offer.creator_id];
              const media = samples[offer.id] || [];
              const canPublish = Boolean(person?.is_creator && person?.is_public && media.length);
              return <article className="market-review-card" key={offer.id}>
                <span className="market-status">{offer.kind.replaceAll("_", " ")}</span>
                <h4>{offer.title}</h4>
                <p><strong>Creator:</strong> {person?.display_name || "Profile not found"} · {formatMoney(offer.price_minor, offer.currency)}</p>
                <p><strong>Description:</strong> {offer.description}</p>
                <p><strong>Deliverable:</strong> {offer.deliverable}</p>
                <p><strong>Usage rights:</strong> {offer.usage_rights}</p>
                {person?.portfolio_url && <a className="sp-text-link" href={person.portfolio_url} target="_blank" rel="noopener noreferrer">Portfolio <ExternalLink size={16} /></a>}
                {media.length > 0 && <div className="market-sample-grid">{media.map((sample) => <figure key={sample.id}>{sample.url && (sample.media_type === "video" ? <video controls preload="none" src={sample.url} /> : sample.media_type === "audio" ? <audio controls preload="none" src={sample.url} /> : <img src={sample.url} alt={sample.caption || offer.title} loading="lazy" />)}<figcaption>{sample.caption}</figcaption></figure>)}</div>}
                {!canPublish && <p className="market-review-warning">Approval needs a public creator profile and at least one sample.</p>}
                <div className="sp-actions"><button className="btn btn-primary" type="button" disabled={!canPublish || Boolean(busyId)} onClick={() => void decide("offer", offer.id, true)}>Publish offer</button><button className="btn btn-outline" type="button" disabled={Boolean(busyId)} onClick={() => void decide("offer", offer.id, false)}>Reject</button></div>
              </article>;
            })}</div> : <p>No offers need review.</p>}
            <h3 className="market-review-subheading">Casting calls ({calls.length})</h3>
            {calls.length ? <div className="market-manage-list">{calls.map((call) => <article className="market-review-card" key={call.id}>
              <h4>{call.title}</h4><p>{call.description}</p>
              <p><strong>Location:</strong> {call.is_remote ? "Remote" : [call.city, call.country_code].filter(Boolean).join(", ") || "Not set"}</p>
              <p><strong>Budget:</strong> {call.budget_minor && call.currency ? formatMoney(call.budget_minor, call.currency) : "Not stated"}</p>
              <div className="sp-actions"><button className="btn btn-primary" type="button" disabled={Boolean(busyId)} onClick={() => void decide("casting", call.id, true)}>Publish call</button><button className="btn btn-outline" type="button" disabled={Boolean(busyId)} onClick={() => void decide("casting", call.id, false)}>Reject</button></div>
            </article>)}</div> : <p>No casting calls need review.</p>}
          </>}
        </>}
      </div>
    </>
  );
}
