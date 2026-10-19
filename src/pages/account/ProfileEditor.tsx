import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SEO from "../../components/SEO";
import { supabase } from "../../lib/supabase";
import { useAccountUser } from "../../lib/useAccountUser";
import type { MarketplaceProfile } from "../../types/marketplace";

interface ProfileForm {
  handle: string;
  display_name: string;
  bio: string;
  country_code: string;
  city: string;
  languages: string;
  portfolio_url: string;
  is_creator: boolean;
  is_public: boolean;
}

export default function ProfileEditor() {
  const user = useAccountUser();
  const [params] = useSearchParams();
  const requestedNext = params.get("next") || "";
  const continueTo = requestedNext.startsWith("/account/messages/new?offer=") || requestedNext.startsWith("/offer/") ? requestedNext : "";
  const [form, setForm] = useState<ProfileForm>({ handle: "", display_name: "", bio: "", country_code: "", city: "", languages: "", portfolio_url: "", is_creator: false, is_public: false });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    void supabase.from("marketplace_profiles").select("*").eq("id", user.id).maybeSingle().then(({ data, error: queryError }) => {
      if (!active) return;
      if (queryError) setError("Your profile cannot load yet. Please try again soon.");
      if (data) {
        const profile = data as MarketplaceProfile;
        setForm({
          handle: profile.handle,
          display_name: profile.display_name,
          bio: profile.bio,
          country_code: profile.country_code || "",
          city: profile.city || "",
          languages: profile.languages.join(", "),
          portfolio_url: profile.portfolio_url || "",
          is_creator: profile.is_creator,
          is_public: profile.is_public,
        });
      }
      setLoading(false);
    });
    return () => { active = false; };
  }, [user.id]);

  function change<K extends keyof ProfileForm>(key: K, value: ProfileForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setSaved(false);
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    const handle = form.handle.trim().toLowerCase();
    if (!/^[a-z0-9][a-z0-9_-]{2,39}$/.test(handle)) {
      setError("Your public handle needs 3–40 letters, numbers, underscores, or hyphens.");
      setBusy(false);
      return;
    }
    if (form.portfolio_url.trim()) {
      try {
        const url = new URL(form.portfolio_url.trim());
        if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error();
      } catch {
        setError("Enter a full http:// or https:// portfolio link.");
        setBusy(false);
        return;
      }
    }
    const { error: saveError } = await supabase.from("marketplace_profiles").upsert({
      id: user.id,
      handle,
      display_name: form.display_name.trim(),
      bio: form.bio.trim(),
      country_code: form.country_code.trim().toUpperCase() || null,
      city: form.city.trim() || null,
      languages: form.languages.split(",").map((item) => item.trim()).filter(Boolean),
      portfolio_url: form.portfolio_url.trim() || null,
      is_creator: form.is_creator,
      is_public: form.is_creator && form.is_public,
      updated_at: new Date().toISOString(),
    }, { onConflict: "id" });
    if (saveError) setError(saveError.code === "23505" ? "That handle is already in use. Try another one." : saveError.message);
    else setSaved(true);
    setBusy(false);
  }

  return (
    <>
      <SEO title="Your profile" description="Manage your ScriptsPlay buyer and creator profile." noindex />
      <div className="market-account-panel">
        <div className="market-account-panel-heading"><div><h2>Your profile</h2><p>Tell people who you are and, if you create, what you do. You can keep your profile private while you prepare it.</p></div><Link className="sp-text-link" to="/account/offers">My offers <ArrowRight size={17} /></Link></div>
        {loading ? <p role="status">Loading profile…</p> : (
          <form onSubmit={save} className="market-editor-form">
            {error && <p className="sp-form-error" role="alert">{error}</p>}
            {saved && <p className="market-form-notice" role="status"><CheckCircle2 size={18} /> Profile saved. {continueTo && <Link to={continueTo}>Continue to the offer</Link>}</p>}
            <div className="sp-form-grid"><div className="form-group"><label className="form-label" htmlFor="profile-name">Display name *</label><input className="form-control" id="profile-name" minLength={2} maxLength={100} required value={form.display_name} onChange={(event) => change("display_name", event.target.value)} /></div><div className="form-group"><label className="form-label" htmlFor="profile-handle">Public handle *</label><input className="form-control" id="profile-handle" minLength={3} maxLength={40} required value={form.handle} onChange={(event) => change("handle", event.target.value.toLowerCase())} placeholder="your-name" /></div></div>
            <div className="form-group"><label className="form-label" htmlFor="profile-bio">About you</label><textarea className="form-control" id="profile-bio" rows={4} maxLength={2000} value={form.bio} onChange={(event) => change("bio", event.target.value)} placeholder="What work do you make? What should a buyer know?" /></div>
            <div className="sp-form-grid"><div className="form-group"><label className="form-label" htmlFor="profile-country">Country code</label><input className="form-control" id="profile-country" value={form.country_code} onChange={(event) => change("country_code", event.target.value)} maxLength={2} placeholder="NG, GB, US…" /></div><div className="form-group"><label className="form-label" htmlFor="profile-city">City</label><input className="form-control" id="profile-city" value={form.city} onChange={(event) => change("city", event.target.value)} maxLength={120} /></div></div>
            <div className="sp-form-grid"><div className="form-group"><label className="form-label" htmlFor="profile-languages">Languages</label><input className="form-control" id="profile-languages" value={form.languages} onChange={(event) => change("languages", event.target.value)} placeholder="English, Yoruba" /><small>Separate languages with commas.</small></div><div className="form-group"><label className="form-label" htmlFor="profile-portfolio">Portfolio link</label><input className="form-control" id="profile-portfolio" type="url" value={form.portfolio_url} onChange={(event) => change("portfolio_url", event.target.value)} placeholder="https://…" /></div></div>
            <label className="market-check-row"><input type="checkbox" checked={form.is_creator} onChange={(event) => change("is_creator", event.target.checked)} /><span>I want to offer creative work</span></label>
            {form.is_creator && <label className="market-check-row"><input type="checkbox" checked={form.is_public} onChange={(event) => change("is_public", event.target.checked)} /><span>Show my profile publicly when creator listings open</span></label>}
            <button className="btn btn-primary" type="submit" disabled={busy}>{busy ? "Saving…" : "Save profile"} <ArrowRight size={18} /></button>
          </form>
        )}
      </div>
    </>
  );
}
