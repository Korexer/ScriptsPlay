import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "../../components/SEO";
import { supabase } from "../../lib/supabase";
import { useAccountUser } from "../../lib/useAccountUser";
import type { CastingCall } from "../../types/marketplace";

interface Application {
  id: string;
  casting_id: string;
  status: "submitted" | "shortlisted" | "declined" | "withdrawn";
  created_at: string;
}

export default function MyApplications() {
  const user = useAccountUser();
  const [applications, setApplications] = useState<Application[]>([]);
  const [calls, setCalls] = useState<Record<string, CastingCall>>({});
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      const { data, error: listError } = await supabase.from("casting_applications")
        .select("id,casting_id,status,created_at")
        .eq("creator_id", user.id).order("created_at", { ascending: false });
      if (!active) return;
      if (listError) {
        setError("Your applications could not load. Please try again.");
        setLoading(false);
        return;
      }
      const rows = (data || []) as Application[];
      setApplications(rows);
      const ids = rows.map((row) => row.casting_id);
      if (ids.length) {
        const { data: visibleCalls } = await supabase.from("casting_calls").select("*").in("id", ids);
        if (active) setCalls(Object.fromEntries(((visibleCalls || []) as CastingCall[]).map((call) => [call.id, call])));
      }
      if (active) setLoading(false);
    }
    void load();
    return () => { active = false; };
  }, [user.id]);

  async function withdraw(applicationId: string) {
    if (busyId) return;
    setBusyId(applicationId);
    setError("");
    const { data, error: updateError } = await supabase.from("casting_applications")
      .update({ status: "withdrawn" }).eq("id", applicationId).eq("creator_id", user.id).select("id").maybeSingle();
    if (updateError || !data) setError("Your application could not be withdrawn. Please try again.");
    else setApplications((current) => current.map((row) => row.id === applicationId ? { ...row, status: "withdrawn" } : row));
    setBusyId("");
  }

  return (
    <>
      <SEO title="My applications" description="Track your ScriptsPlay casting applications." noindex />
      <div className="market-account-panel">
        <div className="market-account-panel-heading"><div><h2>My applications</h2><p>See where you applied and whether a buyer has shortlisted your work.</p></div><Link className="sp-text-link" to="/casting">Find casting calls <ArrowRight size={17} /></Link></div>
        {error && <p className="sp-form-error" role="alert">{error}</p>}
        {loading ? <p role="status">Loading applications…</p> : applications.length ? (
          <div className="market-manage-list">{applications.map((application) => {
            const call = calls[application.casting_id];
            return <article className="market-manage-row" key={application.id}><div>
              <span className="market-status">{application.status}</span>
              <h3>{call?.title || "Casting call no longer public"}</h3>
              <p>Applied {new Date(application.created_at).toLocaleDateString()}</p>
            </div><div className="market-row-actions">
              {call?.status === "published" && <Link className="sp-text-link" to={"/casting/" + call.id}>View call <ArrowRight size={17} /></Link>}
              {application.status === "submitted" && <button className="sp-text-link market-inline-button" type="button" disabled={Boolean(busyId)} onClick={() => void withdraw(application.id)}>Withdraw</button>}
            </div></article>;
          })}</div>
        ) : !error && <div className="market-account-empty"><h3>No applications yet</h3><p>Explore open casting calls and send a short note with a relevant sample.</p><Link className="sp-text-link" to="/casting">Explore casting calls <ArrowRight size={17} /></Link></div>}
      </div>
    </>
  );
}
