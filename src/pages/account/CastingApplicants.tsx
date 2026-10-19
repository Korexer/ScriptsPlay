import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import SEO from "../../components/SEO";
import { supabase } from "../../lib/supabase";
import { useAccountUser } from "../../lib/useAccountUser";
import type { CastingCall, MarketplaceProfile } from "../../types/marketplace";

interface Application {
  id: string;
  creator_id: string;
  message: string;
  sample_url: string | null;
  status: "submitted" | "shortlisted" | "declined" | "withdrawn";
  created_at: string;
}

export default function CastingApplicants() {
  const { id } = useParams();
  const user = useAccountUser();
  const [call, setCall] = useState<CastingCall | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [people, setPeople] = useState<Record<string, MarketplaceProfile>>({});
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      const { data: ownedCall, error: callError } = await supabase.from("casting_calls")
        .select("*").eq("id", id).eq("buyer_id", user.id).maybeSingle();
      if (!active) return;
      if (callError || !ownedCall) {
        setError("This casting call was not found in your account.");
        setLoading(false);
        return;
      }
      setCall(ownedCall as CastingCall);
      const { data: rows, error: listError } = await supabase.from("casting_applications")
        .select("id,creator_id,message,sample_url,status,created_at")
        .eq("casting_id", id).order("created_at", { ascending: false });
      if (!active) return;
      if (listError) {
        setError("Applications could not load. Please try again.");
        setLoading(false);
        return;
      }
      const entries = (rows || []) as Application[];
      setApplications(entries);
      const ids = [...new Set(entries.map((entry) => entry.creator_id))];
      if (ids.length) {
        const { data: profiles } = await supabase.from("marketplace_profiles").select("*").in("id", ids);
        if (active) setPeople(Object.fromEntries(((profiles || []) as MarketplaceProfile[]).map((profile) => [profile.id, profile])));
      }
      if (active) setLoading(false);
    }
    void load();
    return () => { active = false; };
  }, [id, user.id]);

  async function changeStatus(applicationId: string, status: "shortlisted" | "declined") {
    if (!call || busyId) return;
    setBusyId(applicationId);
    setError("");
    const { data, error: updateError } = await supabase.from("casting_applications")
      .update({ status }).eq("id", applicationId).eq("casting_id", call.id).select("id").maybeSingle();
    if (updateError || !data) setError("The application could not be updated. Please try again.");
    else setApplications((current) => current.map((entry) => entry.id === applicationId ? { ...entry, status } : entry));
    setBusyId("");
  }

  return (
    <>
      <SEO title="Casting applicants" description="Review applicants for your ScriptsPlay casting call." noindex />
      <div className="market-account-panel">
        <Link className="sp-text-link" to="/account/casting"><ArrowLeft size={17} /> My casting calls</Link>
        <div className="market-account-panel-heading market-review-heading"><div>
          <p className="sp-eyebrow">Your project</p>
          <h2>{call?.title || "Casting applicants"}</h2>
          <p>Read each application and sample before making a decision. Shortlisting does not create a paid order.</p>
        </div></div>
        {error && <p className="sp-form-error" role="alert">{error}</p>}
        {loading ? <p role="status">Loading applicants…</p> : !error && applications.length === 0 ? (
          <div className="market-account-empty"><h3>No applications yet</h3><p>When creators apply, their messages will appear here.</p></div>
        ) : <div className="market-manage-list">{applications.map((entry) => {
          const person = people[entry.creator_id];
          return <article className="market-application-card" key={entry.id}>
            <div className="market-application-top"><div><span className="market-status">{entry.status}</span><h3>{person?.display_name || "Creator"}</h3><p>Applied {new Date(entry.created_at).toLocaleDateString()}</p></div>
              {person?.is_public && <Link className="sp-text-link" to={"/creator/" + person.handle}>View profile</Link>}</div>
            {person?.bio && <p>{person.bio}</p>}
            <p className="market-application-message">{entry.message}</p>
            {entry.sample_url && <a className="sp-text-link" href={entry.sample_url} target="_blank" rel="noopener noreferrer">Open sample <ExternalLink size={16} /></a>}
            {(entry.status === "submitted" || entry.status === "shortlisted") && <div className="sp-actions">
              {entry.status === "submitted" && <button className="btn btn-primary" type="button" disabled={Boolean(busyId)} onClick={() => void changeStatus(entry.id, "shortlisted")}>Shortlist</button>}
              <button className="btn btn-outline" type="button" disabled={Boolean(busyId)} onClick={() => void changeStatus(entry.id, "declined")}>Decline</button>
            </div>}
          </article>;
        })}</div>}
      </div>
    </>
  );
}
