import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { User } from "@supabase/supabase-js";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import SEO from "../components/SEO";
import { categories } from "../content/marketplace";
import { supabase } from "../lib/supabase";
import type { CastingCall } from "../types/marketplace";
import { formatMoney } from "../types/marketplace";

export default function CastingDetail() {
  const { id } = useParams();
  const [call, setCall] = useState<CastingCall | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [sampleUrl, setSampleUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    void Promise.all([
      supabase.from("casting_calls").select("*").eq("id", id).eq("status", "published").maybeSingle(),
      supabase.auth.getUser(),
    ]).then(([callResult, authResult]) => {
      if (active) { setCall((callResult.data as CastingCall | null) || null); setUser(authResult.data.user); setLoading(false); }
    });
    return () => { active = false; };
  }, [id]);

  async function apply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user || !call || busy) return;
    setBusy(true); setError(""); setNotice("");
    if (sampleUrl && !/^https?:\/\//i.test(sampleUrl.trim())) {
      setError("Use a full https:// link for your sample."); setBusy(false); return;
    }
    const { error: saveError } = await supabase.from("casting_applications").insert({
      casting_id: call.id, creator_id: user.id, message: message.trim(), sample_url: sampleUrl.trim() || null,
    });
    if (saveError) setError(saveError.code === "23505" ? "You already applied to this call." : saveError.message);
    else { setNotice("Your application was sent."); setMessage(""); setSampleUrl(""); }
    setBusy(false);
  }

  if (loading) return <div className="container market-account-loading" role="status">Loading casting call…</div>;
  if (!call) return <section className="sp-section"><div className="container market-discovery-empty"><h1>This casting call is not available.</h1><p>It may have closed or still be in review.</p><Link className="sp-text-link" to="/casting"><ArrowLeft size={17} /> Explore calls</Link></div></section>;
  const closed = Boolean(call.application_deadline && new Date(call.application_deadline) < new Date());

  return (
    <>
      <SEO title={call.title} description={call.description.slice(0, 155)} />
      <section className="market-detail-hero"><div className="container"><Link className="sp-text-link" to="/casting"><ArrowLeft size={17} /> Casting calls</Link><p className="sp-eyebrow">{categories.find((item) => item.slug === call.category_slug)?.name || "Creative project"}</p><h1>{call.title}</h1><div className="market-creator-facts"><span><MapPin size={17} /> {call.is_remote ? "Remote" : [call.city, call.country_code].filter(Boolean).join(", ") || "On location"}</span>{call.budget_minor && call.currency && <span>{formatMoney(call.budget_minor, call.currency)}</span>}</div></div></section>
      <section className="sp-section"><div className="container market-offer-detail-grid"><div><div className="market-detail-block"><h2>About the role</h2><p>{call.description}</p></div><div className="market-detail-block"><h2>Apply for this project</h2>{closed ? <p>Applications are closed.</p> : !user ? <p><Link className="sp-text-link" to={`/sign-in?next=${encodeURIComponent(`/casting/${call.id}`)}`}>Sign in to apply <ArrowRight size={17} /></Link></p> : user.id === call.buyer_id ? <p>This is your casting call.</p> : <form className="market-editor-form" onSubmit={apply}>{error && <p className="sp-form-error" role="alert">{error}</p>}{notice && <p className="market-form-notice" role="status">{notice}</p>}<div className="form-group"><label className="form-label" htmlFor="application-message">Why are you a fit? *</label><textarea className="form-control" id="application-message" minLength={20} maxLength={3000} rows={5} value={message} onChange={(event) => setMessage(event.target.value)} required placeholder="Introduce yourself and explain your relevant work." /></div><div className="form-group"><label className="form-label" htmlFor="application-sample">Link to a relevant sample</label><input className="form-control" id="application-sample" type="url" value={sampleUrl} onChange={(event) => setSampleUrl(event.target.value)} placeholder="https://…" /></div><button className="btn btn-primary" type="submit" disabled={busy}>{busy ? "Sending…" : "Send application"} <ArrowRight size={18} /></button></form>}</div></div><aside className="market-offer-summary"><p className="sp-eyebrow">Opportunity</p><strong>{call.budget_minor && call.currency ? formatMoney(call.budget_minor, call.currency) : "Budget on request"}</strong><p>{call.application_deadline ? `Apply by ${new Date(call.application_deadline).toLocaleDateString()}` : "No fixed application deadline"}</p><p>Read the brief before applying. ScriptsPlay never asks creators to pay to audition.</p></aside></div></section>
    </>
  );
}
