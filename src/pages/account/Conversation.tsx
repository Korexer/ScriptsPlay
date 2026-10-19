import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import SEO from "../../components/SEO";
import { supabase } from "../../lib/supabase";
import { useAccountUser } from "../../lib/useAccountUser";

interface ConversationRow {
  id: string;
  buyer_id: string;
  creator_id: string;
  offer_id: string;
}
interface MessageRow {
  id: string;
  sender_id: string;
  body: string;
  created_at: string;
}

export default function Conversation() {
  const { id = "" } = useParams();
  const user = useAccountUser();
  const [conversation, setConversation] = useState<ConversationRow | null>(null);
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [otherName, setOtherName] = useState("ScriptsPlay member");
  const [offerTitle, setOfferTitle] = useState("Offer");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    const { data, error: messageError } = await supabase.from("conversation_messages")
      .select("id,sender_id,body,created_at").eq("conversation_id", id)
      .order("created_at", { ascending: false }).limit(200);
    if (messageError) { setError("Messages could not load. Please refresh the page."); return; }
    setMessages(((data || []) as MessageRow[]).reverse());
  }, [id]);

  useEffect(() => {
    let active = true;
    async function load() {
      const { data, error: threadError } = await supabase.from("marketplace_conversations")
        .select("id,buyer_id,creator_id,offer_id").eq("id", id).maybeSingle();
      if (!active) return;
      if (threadError || !data) { setError("This conversation is not available to your account."); setLoading(false); return; }
      const row = data as ConversationRow;
      setConversation(row);
      const otherId = row.buyer_id === user.id ? row.creator_id : row.buyer_id;
      const [profile, offer] = await Promise.all([
        supabase.from("marketplace_profiles").select("display_name").eq("id", otherId).maybeSingle(),
        supabase.from("creator_offers").select("title").eq("id", row.offer_id).maybeSingle(),
      ]);
      if (!active) return;
      if (profile.data) setOtherName(profile.data.display_name);
      if (offer.data) setOfferTitle(offer.data.title);
      await refresh();
      if (active) setLoading(false);
    }
    void load();
    return () => { active = false; };
  }, [id, refresh, user.id]);

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = body.trim();
    if (!conversation || busy || !message) return;
    setBusy(true);
    setError("");
    const { error: sendError } = await supabase.from("conversation_messages")
      .insert({ conversation_id: conversation.id, sender_id: user.id, body: message });
    if (sendError) setError("Your message was not sent. Please try again.");
    else { setBody(""); await refresh(); }
    setBusy(false);
  }

  return (
    <>
      <SEO title="Conversation" description="Private ScriptsPlay messages." noindex />
      <div className="market-account-panel">
        <Link className="sp-text-link" to="/account/messages"><ArrowLeft size={17} /> All messages</Link>
        {loading ? <p role="status">Loading conversation…</p> : conversation ? <>
          <div className="market-account-panel-heading market-message-heading"><div><h2>{offerTitle}</h2><p>Conversation with {otherName}</p></div><button className="sp-text-link market-inline-button" type="button" onClick={() => void refresh()}>Refresh messages</button></div>
          {error && <p className="sp-form-error" role="alert">{error}</p>}
          <div className="market-message-list" aria-label="Conversation messages">
            {messages.length ? messages.map((message) => <article className={"market-message " + (message.sender_id === user.id ? "market-message-own" : "")} key={message.id}>
              <strong>{message.sender_id === user.id ? "You" : otherName}</strong>
              <p>{message.body}</p>
              <time dateTime={message.created_at}>{new Date(message.created_at).toLocaleString()}</time>
            </article>) : <p>No messages yet. Ask a clear question about the offer to get started.</p>}
          </div>
          <form className="market-message-form" onSubmit={send}>
            <label className="form-label" htmlFor="message-body">Your message</label>
            <textarea className="form-control" id="message-body" rows={4} maxLength={3000} required value={body} onChange={(event) => setBody(event.target.value)} placeholder="Tell them what you need and when you need it." />
            <p className="sp-small">Keep payment details and private files out of messages. Checkout is not available yet.</p>
            <button className="btn btn-primary" type="submit" disabled={busy || !body.trim()}>{busy ? "Sending…" : "Send message"} <Send size={17} /></button>
          </form>
        </> : <p className="sp-form-error" role="alert">{error}</p>}
      </div>
    </>
  );
}
