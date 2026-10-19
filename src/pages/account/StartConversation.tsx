import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SEO from "../../components/SEO";
import { supabase } from "../../lib/supabase";
import { useAccountUser } from "../../lib/useAccountUser";

export default function StartConversation() {
  const user = useAccountUser();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const offerId = params.get("offer") || "";
  const [error, setError] = useState("");
  const [needsProfile, setNeedsProfile] = useState(false);

  useEffect(() => {
    let active = true;
    async function start() {
      if (!/^[0-9a-f-]{36}$/i.test(offerId)) { setError("This offer link is not valid."); return; }
      const [offerResult, profileResult] = await Promise.all([
        supabase.from("creator_offers").select("id,creator_id,status").eq("id", offerId).eq("status", "published").maybeSingle(),
        supabase.from("marketplace_profiles").select("id").eq("id", user.id).maybeSingle(),
      ]);
      if (!active) return;
      if (offerResult.error || profileResult.error) { setError("We could not start this conversation. Please try again."); return; }
      if (!offerResult.data) { setError("This offer is no longer available."); return; }
      if (!profileResult.data) { setNeedsProfile(true); return; }
      if (offerResult.data.creator_id === user.id) { setError("You cannot message yourself about your own offer."); return; }
      const { data: existing, error: findError } = await supabase.from("marketplace_conversations")
        .select("id").eq("buyer_id", user.id).eq("offer_id", offerId).maybeSingle();
      if (!active) return;
      if (findError) { setError("We could not open this conversation. Please try again."); return; }
      if (existing) { navigate("/account/messages/" + existing.id, { replace: true }); return; }
      const { data: created, error: createError } = await supabase.from("marketplace_conversations")
        .insert({ buyer_id: user.id, creator_id: offerResult.data.creator_id, offer_id: offerId })
        .select("id").single();
      if (!active) return;
      if (created) { navigate("/account/messages/" + created.id, { replace: true }); return; }
      if (createError?.code === "23505") {
        const { data: retry } = await supabase.from("marketplace_conversations")
          .select("id").eq("buyer_id", user.id).eq("offer_id", offerId).maybeSingle();
        if (active && retry) { navigate("/account/messages/" + retry.id, { replace: true }); return; }
      }
      setError("We could not start this conversation. Please try again.");
    }
    void start();
    return () => { active = false; };
  }, [navigate, offerId, user.id]);

  return (
    <>
      <SEO title="Start a conversation" description="Message a ScriptsPlay creator about an offer." noindex />
      <div className="market-account-panel">
        <h2>Start a conversation</h2>
        {needsProfile ? <div className="market-account-empty"><p>Set up your buyer profile before sending a message. It only takes a minute.</p><Link className="btn btn-primary" to="/account/profile">Create your profile</Link></div> :
          error ? <p className="sp-form-error" role="alert">{error} <Link to="/discover">Explore offers</Link></p> :
            <p role="status">Opening your conversation…</p>}
      </div>
    </>
  );
}
