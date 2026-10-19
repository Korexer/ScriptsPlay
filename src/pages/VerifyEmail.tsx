import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import SEO from "../components/SEO";
import { supabase } from "../lib/supabase";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const mode = params.get("mode") === "signin" ? "signin" : "signup";
  const requestedNext = params.get("next") || "/account/profile";
  const next = requestedNext.startsWith("/") && !requestedNext.startsWith("//") ? requestedNext : "/account/profile";
  const [email, setEmail] = useState(() => sessionStorage.getItem("scriptsplay_verification_email") || "");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function verify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const address = email.trim();
    if (!/^\d{6}$/.test(code)) {
      setError("Enter the six-digit code from your email.");
      return;
    }
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const { data, error: authError } = await supabase.auth.verifyOtp({
        email: address,
        token: code,
        type: mode === "signin" ? "email" : "signup",
      });
      if (authError) throw authError;
      sessionStorage.removeItem("scriptsplay_verification_email");
      if (data.session) {
        navigate(mode === "signup" ? "/account/profile?next=" + encodeURIComponent(next) : next, { replace: true });
      } else {
        setNotice("Your email is confirmed. Please sign in to continue.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "That code did not work. Please check it and try again.");
    } finally {
      setBusy(false);
    }
  }

  async function resend() {
    if (busy) return;
    const address = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
      setError("Enter your email address to get a new code.");
      return;
    }
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const { error: authError } = mode === "signup"
        ? await supabase.auth.resend({ type: "signup", email: address })
        : await supabase.auth.signInWithOtp({ email: address, options: { shouldCreateUser: false } });
      if (authError) throw authError;
      sessionStorage.setItem("scriptsplay_verification_email", address);
      setCode("");
      setNotice("A new code has been requested. Check your inbox and spam folder.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not send a new code. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return <>
    <SEO title="Confirm your email | ScriptsPlay" description="Enter the email code to access your ScriptsPlay account." noindex />
    <section className="market-auth-section">
      <div className="container market-auth-grid">
        <div className="market-auth-story">
          <p className="sp-eyebrow">One more step</p>
          <h1>Check your inbox.</h1>
          <p>{mode === "signup" ? "Confirm your email before entering your new ScriptsPlay account." : "Use the code we sent to sign in to ScriptsPlay."}</p>
        </div>
        <div className="sp-form-card market-auth-card">
          <h2>Enter your six-digit code</h2>
          <p className="sp-small">Enter the code from your email. If you do not have one, request a new code below. Check your spam folder too.</p>
          {error && <p className="sp-form-error" role="alert">{error}</p>}
          {notice && <p className="market-form-notice" role="status">{notice}</p>}
          <form onSubmit={verify}>
            <div className="form-group"><label className="form-label" htmlFor="verify-email"><Mail size={16} /> Email address *</label><input className="form-control" id="verify-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></div>
            <div className="form-group"><label className="form-label" htmlFor="verify-code">Verification code *</label><input className="form-control market-auth-code-input" id="verify-code" type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={6} pattern="[0-9]{6}" value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} required /></div>
            <button className="btn btn-primary" type="submit" disabled={busy}>{busy ? "Please wait…" : "Confirm and continue"} <ArrowRight size={18} /></button>
          </form>
          <button className="sp-text-link market-auth-code-link" type="button" onClick={resend} disabled={busy}>Send a new code</button>
          <p className="market-auth-switch"><Link to="/sign-in">Back to sign in</Link></p>
        </div>
      </div>
    </section>
  </>;
}
