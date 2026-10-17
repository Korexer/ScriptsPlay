import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ClipboardList, MapPin, Users } from "lucide-react";
import SEO from "../components/SEO";
import { supabase } from "../lib/supabase";
import type { CastingCall } from "../types/marketplace";
import { formatMoney } from "../types/marketplace";

export default function Casting() {
  const [calls, setCalls] = useState<CastingCall[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    void supabase.from("casting_calls").select("*").eq("status", "published").order("published_at", { ascending: false }).limit(30).then(({ data }) => {
      if (active) { setCalls((data || []) as CastingCall[]); setLoading(false); }
    });
    return () => { active = false; };
  }, []);
  return (
    <>
      <SEO title="Casting calls and creative projects" description="Find actors, performers, video creators, voice talent and collaborators for your next project. ScriptsPlay makes the brief and applications easier to manage." />
      <section className="market-page-hero"><div className="container"><p className="sp-eyebrow">Casting & collaboration</p><h1>Post the part. Find the person.</h1><p>Describe a role, skit, production or creative project, then hear from people who can bring it to life.</p></div></section>
      <section className="sp-section"><div className="container market-feature-grid">
        <article className="market-feature"><ClipboardList size={28} /><h2>Write a clear brief</h2><p>Set the role, format, deadline, budget, and work you need delivered.</p></article>
        <article className="market-feature"><MapPin size={28} /><h2>Find local or remote</h2><p>Choose on-location talent when a shoot needs people nearby.</p></article>
        <article className="market-feature"><Users size={28} /><h2>See more potential</h2><p>Look beyond follower counts and review samples from emerging creators.</p></article>
      </div></section>
      <section className="sp-section sp-soft"><div className="container"><div className="sp-heading-row"><div className="sp-section-heading"><p className="sp-eyebrow">Open opportunities</p><h2>Find a role that fits.</h2></div><Link className="sp-text-link" to="/account/casting/new">Post a casting call <ArrowRight size={18} /></Link></div>{loading ? <p role="status">Loading opportunities…</p> : calls.length ? <div className="market-casting-grid">{calls.map((call) => <article className="market-casting-card" key={call.id}><p className="sp-eyebrow">{call.category_slug.replaceAll("-", " ")}</p><h3><Link to={`/casting/${call.id}`}>{call.title}</Link></h3><p>{call.description.slice(0, 170)}{call.description.length > 170 ? "…" : ""}</p><div><span>{call.is_remote ? "Remote" : [call.city, call.country_code].filter(Boolean).join(", ")}</span><strong>{call.budget_minor && call.currency ? formatMoney(call.budget_minor, call.currency) : "Budget on request"}</strong></div><Link className="sp-text-link" to={`/casting/${call.id}`}>View call <ArrowRight size={17} /></Link></article>)}</div> : <div className="market-simple-cta"><div><h3>We are preparing the first casting calls.</h3><p>Have a role to fill? Create a draft or send your brief to ScriptsPlay.</p></div><Link className="btn btn-primary" to="/account/casting/new">Create a call <ArrowRight size={18} /></Link></div>}</div></section>
    </>
  );
}
