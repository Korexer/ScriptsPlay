import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import SEO from "../components/SEO";
import { supabase } from "../lib/supabase";

export default function AuthPage({ mode }: { mode: "sign-in" | "join" }) {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const isJoin = mode === "join";
  const requestedNext = params.get("next") || "/account/profile";
  const next = requestedNext.startsWith("/") && !requestedNext.startsWith("//") ? requestedNext : "/account/profile";
  const profileAfterJoin = "/account/profile?next=" + encodeURIComponent(next);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      if (isJoin) {
        const { data, error: authError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { emailRedirectTo: window.location.origin + profileAfterJoin },
        });
        if (authError) throw authError;
        if (data.session) navigate(profileAfterJoin, { replace: true });
        else setNotice("Check your email for a confirmation link. After confirming, sign in and complete your profile.");
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (authError) throw authError;
        navigate(next, { replace: true });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not complete this request. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <SEO title={isJoin ? "Join ScriptsPlay" : "Sign in to ScriptsPlay"} description={isJoin ? "Create a ScriptsPlay account to show your creative work or find talent." : "Sign in to manage your ScriptsPlay account."} noindex />
      <section className="market-auth-section">
        <div className="container market-auth-grid">
          <div className="market-auth-story"><p className="sp-eyebrow">ScriptsPlay accounts</p><h1>{isJoin ? "Your next creative step starts here." : "Welcome back."}</h1><p>One account can be used to find talent and to offer creative work. The marketplace is opening in stages, so payments and public listings are not available yet.</p></div>
          <div className="sp-form-card market-auth-card">
            <h2>{isJoin ? "Create an account" : "Sign in"}</h2>
            <p className="sp-small">Use an email address you can access. Fields marked * are required.</p>
            {error && <p className="sp-form-error" role="alert">{error}</p>}
            {notice && <p className="market-form-notice" role="status">{notice}</p>}
            <form onSubmit={submit}>
              <div className="form-group"><label className="form-label" htmlFor="auth-email"><Mail size={16} /> Email address *</label><input className="form-control" id="auth-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></div>
              <div className="form-group"><label className="form-label" htmlFor="auth-password"><LockKeyhole size={16} /> Password *</label><input className="form-control" id="auth-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={8} autoComplete={isJoin ? "new-password" : "current-password"} required /></div>
              <button className="btn btn-primary" type="submit" disabled={busy}>{busy ? "Please wait…" : isJoin ? "Create account" : "Sign in"} <ArrowRight size={18} /></button>
            </form>
            <p className="market-auth-switch">{isJoin ? "Already have an account?" : "New to ScriptsPlay?"} <Link to={(isJoin ? "/sign-in" : "/join") + "?next=" + encodeURIComponent(next)}>{isJoin ? "Sign in" : "Create an account"}</Link></p>
            <p className="sp-small">By creating an account, you agree to our <Link to="/terms-of-service">terms</Link> and <Link to="/privacy-policy">privacy policy</Link>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
