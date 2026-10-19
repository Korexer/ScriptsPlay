import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "../../components/SEO";
import { supabase } from "../../lib/supabase";
import { useAccountUser } from "../../lib/useAccountUser";

interface Conversation {
  id: string;
  buyer_id: string;
  creator_id: string;
  offer_id: string;
  created_at: string;
}

export default function Inbox() {
  const user = useAccountUser();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [names, setNames] = useState<Record<string, string>>({});
  const [titles, setTitles] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      const { data, error: listError } = await supabase.from("marketplace_conversations")
        .select("id,buyer_id,creator_id,offer_id,created_at")
        .or("buyer_id.eq." + user.id + ",creator_id.eq." + user.id)
        .order("created_at", { ascending: false });
      if (!active) return;
      if (listError) {
        setError("Your messages could not load. Please try again.");
        setLoading(false);
        return;
      }
      const rows = (data || []) as Conversation[];
      setConversations(rows);
      if (rows.length) {
        const profileIds = [...new Set(rows.map((row) => row.buyer_id === user.id ? row.creator_id : row.buyer_id))];
        const offerIds = [...new Set(rows.map((row) => row.offer_id))];
        const [profiles, offers] = await Promise.all([
          supabase.from("marketplace_profiles").select("id,display_name").in("id", profileIds),
          supabase.from("creator_offers").select("id,title").in("id", offerIds),
        ]);
        if (!active) return;
        setNames(Object.fromEntries((profiles.data || []).map((row) => [row.id, row.display_name])));
        setTitles(Object.fromEntries((offers.data || []).map((row) => [row.id, row.title])));
      }
      setLoading(false);
    }
    void load();
    return () => { active = false; };
  }, [user.id]);

  return (
    <>
      <SEO title="Messages" description="Your private ScriptsPlay conversations." noindex />
      <div className="market-account-panel">
        <div className="market-account-panel-heading"><div><h2>Messages</h2><p>Talk with buyers and creators about published offers.</p></div><Link className="sp-text-link" to="/discover">Find creators <ArrowRight size={17} /></Link></div>
        {error && <p className="sp-form-error" role="alert">{error}</p>}
        {loading ? <p role="status">Loading messages…</p> : conversations.length ? (
          <div className="market-manage-list">{conversations.map((row) => {
            const otherId = row.buyer_id === user.id ? row.creator_id : row.buyer_id;
            return <article className="market-manage-row" key={row.id}><div><span className="market-status">{row.buyer_id === user.id ? "Buyer" : "Creator"}</span><h3>{titles[row.offer_id] || "Offer conversation"}</h3><p>With {names[otherId] || "ScriptsPlay member"}</p></div><Link className="sp-text-link" to={"/account/messages/" + row.id}>Open conversation <ArrowRight size={17} /></Link></article>;
          })}</div>
        ) : !error && <div className="market-account-empty"><h3>No conversations yet</h3><p>Open a published offer and choose “Message creator” to start talking.</p><Link className="sp-text-link" to="/discover">Explore offers <ArrowRight size={17} /></Link></div>}
      </div>
    </>
  );
}
