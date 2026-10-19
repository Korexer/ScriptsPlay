import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function SaveOfferButton({ offerId, offerSlug }: { offerId: string; offerSlug: string }) {
  const [userId, setUserId] = useState("");
  const [hasProfile, setHasProfile] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const offerPath = "/offer/" + offerSlug;

  useEffect(() => {
    let active = true;
    async function load() {
      const { data: auth } = await supabase.auth.getUser();
      if (!active || !auth.user) { if (active) setLoading(false); return; }
      setUserId(auth.user.id);
      const [profile, savedOffer] = await Promise.all([
        supabase.from("marketplace_profiles").select("id").eq("id", auth.user.id).maybeSingle(),
        supabase.from("saved_offers").select("offer_id").eq("buyer_id", auth.user.id).eq("offer_id", offerId).maybeSingle(),
      ]);
      if (!active) return;
      setHasProfile(Boolean(profile.data));
      setSaved(Boolean(savedOffer.data));
      setLoading(false);
    }
    void load();
    return () => { active = false; };
  }, [offerId]);

  async function toggle() {
    if (!userId || !hasProfile || busy) return;
    setBusy(true);
    setError("");
    const { error: saveError } = saved
      ? await supabase.from("saved_offers").delete().eq("buyer_id", userId).eq("offer_id", offerId)
      : await supabase.from("saved_offers").insert({ buyer_id: userId, offer_id: offerId });
    if (saveError) setError("Could not update saved offers. Please try again.");
    else setSaved(!saved);
    setBusy(false);
  }

  if (loading) return null;
  if (!userId) return <Link className="market-save-offer" to={"/sign-in?next=" + encodeURIComponent(offerPath)}><Bookmark size={18} /> Save this offer</Link>;
  if (!hasProfile) return <Link className="market-save-offer" to={"/account/profile?next=" + encodeURIComponent(offerPath)}><Bookmark size={18} /> Set up profile to save</Link>;
  return <div><button className="market-save-offer" type="button" onClick={() => void toggle()} disabled={busy} aria-pressed={saved}>{saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}{saved ? "Saved" : "Save this offer"}</button>{error && <p className="sp-form-error" role="alert">{error}</p>}</div>;
}
