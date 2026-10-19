import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SEO from "../../components/SEO";
import { categories } from "../../content/marketplace";
import { supabase } from "../../lib/supabase";
import { useAccountUser } from "../../lib/useAccountUser";
import type { CastingCall } from "../../types/marketplace";
import { currencyDigits, parseMoney } from "../../types/marketplace";

interface CastingForm { title: string; description: string; category_slug: string; country_code: string; city: string; is_remote: boolean; budget: string; currency: string; deadline: string }
const emptyForm: CastingForm = { title: "", description: "", category_slug: categories[0].slug, country_code: "", city: "", is_remote: true, budget: "", currency: "USD", deadline: "" };

export default function CastingEditor() {
  const user = useAccountUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<CastingForm>(() => {
    if (id) return emptyForm;
    try { return { ...emptyForm, ...JSON.parse(localStorage.getItem("scriptsplay-casting-draft") || "{}") }; }
    catch { return emptyForm; }
  });
  const [loading, setLoading] = useState(Boolean(id));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!id) return;
    let active = true;
    void supabase.from("casting_calls").select("*").eq("id", id).eq("buyer_id", user.id).single().then(({ data, error: queryError }) => {
      if (!active) return;
      if (queryError || !data) setError("This casting call could not be found in your account.");
      else {
        const call = data as CastingCall;
        setForm({ title: call.title, description: call.description, category_slug: call.category_slug,
          country_code: call.country_code || "", city: call.city || "", is_remote: call.is_remote,
          budget: call.budget_minor && call.currency ? String(call.budget_minor / 10 ** currencyDigits(call.currency)) : "",
          currency: call.currency || "USD", deadline: call.application_deadline ? call.application_deadline.slice(0, 10) : "" });
      }
      setLoading(false);
    });
    return () => { active = false; };
  }, [id, user.id]);

  useEffect(() => {
    if (id) return;
    const timer = window.setTimeout(() => localStorage.setItem("scriptsplay-casting-draft", JSON.stringify(form)), 500);
    return () => window.clearTimeout(timer);
  }, [form, id]);

  function change<K extends keyof CastingForm>(key: K, value: CastingForm[K]) { setForm((current) => ({ ...current, [key]: value })); setNotice(""); }

  async function save(status: "draft" | "review") {
    if (busy) return;
    setBusy(true); setError("");
    try {
      if (status === "draft" && (!form.title.trim() || !form.description.trim())) {
        localStorage.setItem("scriptsplay-casting-draft", JSON.stringify(form));
        setNotice("Your unfinished draft is saved on this device. Complete the required fields to save it to your account.");
        return;
      }
      if (form.budget.trim() && !/^[A-Z]{3}$/.test(form.currency.trim().toUpperCase())) throw new Error("Enter a valid three-letter currency code.");
      const budgetMinor = form.budget.trim() ? parseMoney(form.budget, form.currency.trim().toUpperCase()) : null;
      if (form.budget.trim() && budgetMinor === null) throw new Error("Enter a valid budget for the selected currency.");
      const values = { buyer_id: user.id, status, title: form.title.trim(), description: form.description.trim(),
        category_slug: form.category_slug, country_code: form.country_code.trim().toUpperCase() || null,
        city: form.city.trim() || null, is_remote: form.is_remote, budget_minor: budgetMinor,
        currency: budgetMinor === null ? null : form.currency.trim().toUpperCase(),
        application_deadline: form.deadline ? new Date(`${form.deadline}T23:59:59.000Z`).toISOString() : null,
        updated_at: new Date().toISOString() };
      const result = id
        ? await supabase.from("casting_calls").update(values).eq("id", id).eq("buyer_id", user.id)
        : await supabase.from("casting_calls").insert(values);
      if (result.error) throw result.error;
      localStorage.removeItem("scriptsplay-casting-draft");
      if (!id || status === "review") navigate("/account/casting", { replace: true });
      else setNotice("Your draft has been saved.");
    } catch (err) { setError(err instanceof Error ? err.message : "We could not save this casting call."); }
    finally { setBusy(false); }
  }

  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); void save("review"); }

  return (
    <>
      <SEO title={id ? "Edit casting call" : "Create a casting call"} description="Prepare a ScriptsPlay casting call or creative project brief." noindex />
      <div className="market-account-panel market-editor"><Link className="sp-text-link" to="/account/casting"><ArrowLeft size={17} /> My casting calls</Link><div className="market-account-panel-heading"><div><h2>{id ? "Edit casting call" : "Create a casting call"}</h2><p>Describe the work clearly so the right creators know when and how to apply.</p></div></div>
        {loading ? <p role="status">Loading call…</p> : <form className="market-editor-form" onSubmit={submit}>
          {error && <p className="sp-form-error" role="alert">{error}</p>}{notice && <p className="market-form-notice" role="status">{notice}</p>}
          <div className="form-group"><label className="form-label" htmlFor="casting-title">Role or project title *</label><input className="form-control" id="casting-title" value={form.title} onChange={(event) => change("title", event.target.value)} minLength={10} maxLength={150} required placeholder="Actor needed for a short comedy scene" /></div>
          <div className="form-group"><label className="form-label" htmlFor="casting-desc">Describe the role and project *</label><textarea className="form-control" id="casting-desc" rows={7} value={form.description} onChange={(event) => change("description", event.target.value)} minLength={40} maxLength={10000} required placeholder="Tell creators about the role, deliverable, audition steps, and project dates." /></div>
          <div className="sp-form-grid"><div className="form-group"><label className="form-label" htmlFor="casting-category">Category</label><select className="form-control" id="casting-category" value={form.category_slug} onChange={(event) => change("category_slug", event.target.value)}>{categories.map((category) => <option key={category.slug} value={category.slug}>{category.name}</option>)}</select></div><div className="form-group"><label className="form-label" htmlFor="casting-deadline">Application deadline</label><input className="form-control" id="casting-deadline" type="date" value={form.deadline} onChange={(event) => change("deadline", event.target.value)} /></div></div>
          <div className="sp-form-grid"><div className="form-group"><label className="form-label" htmlFor="casting-budget">Budget</label><input className="form-control" id="casting-budget" inputMode="decimal" value={form.budget} onChange={(event) => change("budget", event.target.value)} placeholder="Optional" /></div><div className="form-group"><label className="form-label" htmlFor="casting-currency">Currency</label><input className="form-control" id="casting-currency" value={form.currency} onChange={(event) => change("currency", event.target.value.toUpperCase())} minLength={3} maxLength={3} /></div></div>
          <div className="sp-form-grid"><div className="form-group"><label className="form-label" htmlFor="casting-country">Country code</label><input className="form-control" id="casting-country" value={form.country_code} onChange={(event) => change("country_code", event.target.value.toUpperCase())} maxLength={2} placeholder="NG" /></div><div className="form-group"><label className="form-label" htmlFor="casting-city">City</label><input className="form-control" id="casting-city" value={form.city} onChange={(event) => change("city", event.target.value)} /></div></div>
          <label className="market-check-row"><input type="checkbox" checked={form.is_remote} onChange={(event) => change("is_remote", event.target.checked)} /><span>Creators can complete this remotely</span></label>
          <p className="sp-small">Casting calls are reviewed before they become public. Do not ask applicants to pay to audition.</p>
          <div className="sp-actions"><button type="button" className="btn btn-outline" disabled={busy} onClick={() => void save("draft")}>{busy ? "Saving…" : "Save draft"}</button><button type="submit" className="btn btn-primary" disabled={busy}>Submit for review <ArrowRight size={18} /></button></div>
        </form>}
      </div>
    </>
  );
}
