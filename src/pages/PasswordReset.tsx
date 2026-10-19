import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import SEO from "../components/SEO";
import { supabase } from "../lib/supabase";

export default function PasswordReset({ mode }: { mode: "request" | "update" }) {
  const isRequest = mode === "request";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sessionReady, setSessionReady] = useState(isRequest);
  const [hasSession, setHasSession] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isRequest) return;
    let active = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) { setHasSession(Boolean(session)); setSessionReady(true); }
    });
    void supabase.auth.getSession().then(({ data }) => {
      if (active) { setHasSession(Boolean(data.session)); setSessionReady(true); }
    }).catch(() => { if (active) setSessionReady(true); });
    return () => { active = false; subscription.unsubscribe(); };
  }, [isRequest]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      if (isRequest) {
        const { error: authError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: "https://www.scriptsplay.com/reset-password",
        });
        if (authError) throw authError;
        setSuccess(true);
      } else {
        if (password !== confirmPassword) throw new Error("The passwords do not match.");
        const { error: authError } = await supabase.auth.updateUser({ password });
        if (authError) throw authError;
        setSuccess(true);
        await supabase.auth.signOut();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not complete this request. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return <>
    <SEO title={isRequest ? "Forgot password | ScriptsPlay" : "Set a new password | ScriptsPlay"} description="Reset your ScriptsPlay account password." noindex />
    <section className="market-auth-section">
      <div className="container market-auth-grid">
        <div className="market-auth-story">
          <p className="sp-eyebrow">ScriptsPlay accounts</p>
          <h1>{isRequest ? "Get back to your account." : "Choose a new password."}</h1>
          <p>{isRequest ? "Enter your email address and we will send a password-reset link." : "Use a new password to keep your ScriptsPlay account secure."}</p>
        </div>
        <div className="sp-form-card market-auth-card">
          <h2>{isRequest ? "Reset your password" : "New password"}</h2>
          {error && <p className="sp-form-error" role="alert">{error}</p>}
          {success ? <p className="market-form-notice" role="status">{isRequest ? "If an account exists for that address, a reset link is on its way. Check your inbox and spam folder." : "Your password has been updated. You can now sign in."}</p> : !sessionReady ? <p role="status">Checking your reset link…</p> : !isRequest && !hasSession ? <p className="sp-form-error" role="alert">This reset link is invalid or has expired. Request a new one.</p> : <form onSubmit={submit}>
            {isRequest ? <div className="form-group"><label className="form-label" htmlFor="reset-email"><Mail size={16} /> Email address *</label><input className="form-control" id="reset-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></div> : <>
              <div className="form-group"><label className="form-label" htmlFor="reset-password"><LockKeyhole size={16} /> New password *</label><input className="form-control" id="reset-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" minLength={8} required /></div>
              <div className="form-group"><label className="form-label" htmlFor="reset-password-confirm">Confirm new password *</label><input className="form-control" id="reset-password-confirm" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" minLength={8} required /></div>
            </>}
            <button className="btn btn-primary" type="submit" disabled={busy}>{busy ? "Please wait…" : isRequest ? "Send reset link" : "Save new password"} <ArrowRight size={18} /></button>
          </form>}
          <p className="market-auth-switch"><Link to={isRequest ? "/sign-in" : success ? "/sign-in" : "/forgot-password"}>{isRequest || success ? "Back to sign in" : "Request a new link"}</Link></p>
        </div>
      </div>
    </section>
  </>;
}
