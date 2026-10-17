import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import SEO from "../../components/SEO";
import { supabase } from "../../lib/supabase";
import { useAccountUser } from "../../lib/useAccountUser";
import type { CastingCall } from "../../types/marketplace";

export default function CastingList() {
  const user = useAccountUser();
  const [calls, setCalls] = useState<CastingCall[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    void supabase.from("casting_calls").select("*").eq("buyer_id", user.id).order("updated_at", { ascending: false }).then(({ data, error: queryError }) => {
      if (!active) return;
      if (queryError) setError("Your casting calls could not load yet.");
      else setCalls((data || []) as CastingCall[]);
      setLoading(false);
    });
    return () => { active = false; };
  }, [user.id]);

  return (
    <>
      <SEO title="My casting calls" description="Manage your ScriptsPlay casting calls." noindex />
      <div className="market-account-panel"><div className="market-account-panel-heading"><div><h2>My casting calls</h2><p>Describe the role or collaboration you need. Calls are reviewed before they appear publicly.</p></div><Link className="btn btn-primary" to="/account/casting/new"><Plus size={18} /> Create a call</Link></div>
        {error && <p className="sp-form-error" role="alert">{error}</p>}
        {loading ? <p role="status">Loading casting calls…</p> : calls.length ? <div className="market-manage-list">{calls.map((call) => <article className="market-manage-row" key={call.id}><div><span className="market-status">{call.status}</span><h3>{call.title}</h3><p>{call.is_remote ? "Remote" : [call.city, call.country_code].filter(Boolean).join(", ")}</p></div><Link className="sp-text-link" to={`/account/casting/${call.id}/edit`}>Edit call <ArrowRight size={17} /></Link></article>)}</div> : !error && <div className="market-account-empty"><h3>No casting calls yet</h3><p>Start with one clear role and tell creators what the project pays, where it happens, and when they need to apply.</p><Link className="sp-text-link" to="/account/casting/new">Create your first call <ArrowRight size={17} /></Link></div>}
      </div>
    </>
  );
}
