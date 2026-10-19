import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SEO from "../../components/SEO";
import { categories } from "../../content/marketplace";
import { supabase } from "../../lib/supabase";
import { useAccountUser } from "../../lib/useAccountUser";
import type { CreatorOffer } from "../../types/marketplace";
import { currencyDigits, parseMoney } from "../../types/marketplace";
import OfferSamples from "./OfferSamples";

interface OfferForm {
  kind: CreatorOffer["kind"];
  category_slug: string;
  title: string;
  description: string;
  deliverable: string;
  tags: string;
  language_code: string;
  country_code: string;
  city: string;
  is_remote: boolean;
  price: string;
  currency: string;
  delivery_days: string;
  revisions: string;
  buyer_requirements: string;
  usage_rights: string;
}

const emptyForm: OfferForm = {
  kind: "custom", category_slug: categories[0].slug, title: "", description: "",
  deliverable: "", tags: "", language_code: "", country_code: "", city: "",
  is_remote: true, price: "", currency: "USD", delivery_days: "7", revisions: "1",
  buyer_requirements: "", usage_rights: "",
};

export default function OfferEditor() {
  const user = useAccountUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<OfferForm>(() => {
    if (id) return emptyForm;
    try { return { ...emptyForm, ...JSON.parse(localStorage.getItem("scriptsplay-offer-draft") || "{}") }; }
    catch { return emptyForm; }
  });
  const [loading, setLoading] = useState(Boolean(id));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [currentStatus, setCurrentStatus] = useState<CreatorOffer["status"]>("draft");

  useEffect(() => {
    if (!id) return;
    let active = true;
    void supabase.from("creator_offers").select("*").eq("id", id).eq("creator_id", user.id).single().then(({ data, error: queryError }) => {
      if (!active) return;
      if (queryError || !data) setError("This offer could not be found in your account.");
      else {
        const offer = data as CreatorOffer;
        setCurrentStatus(offer.status);
        setForm({ kind: offer.kind, category_slug: offer.category_slug, title: offer.title,
          description: offer.description, deliverable: offer.deliverable, tags: offer.tags.join(", "),
          language_code: offer.language_code || "", country_code: offer.country_code || "", city: offer.city || "",
          is_remote: offer.is_remote, price: String(offer.price_minor / 10 ** currencyDigits(offer.currency)),
          currency: offer.currency, delivery_days: String(offer.delivery_days), revisions: String(offer.revisions),
          buyer_requirements: offer.buyer_requirements, usage_rights: offer.usage_rights });
      }
      setLoading(false);
    });
    return () => { active = false; };
  }, [id, user.id]);

  useEffect(() => {
    if (id) return;
    const timer = window.setTimeout(() => localStorage.setItem("scriptsplay-offer-draft", JSON.stringify(form)), 500);
    return () => window.clearTimeout(timer);
  }, [form, id]);

  function change<K extends keyof OfferForm>(key: K, value: OfferForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setNotice("");
  }

  async function save(status: "draft" | "review") {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      if (status === "draft" && (!form.title.trim() || !form.description.trim() || !form.deliverable.trim() || !form.price.trim() || !form.usage_rights.trim())) {
        localStorage.setItem("scriptsplay-offer-draft", JSON.stringify(form));
        setNotice("Your unfinished draft is saved on this device. Complete the required fields to save it to your account.");
        return;
      }
      const currency = form.currency.trim().toUpperCase();
      if (!/^[A-Z]{3}$/.test(currency)) throw new Error("Enter a three-letter currency code, such as USD or NGN.");
      const priceMinor = parseMoney(form.price, currency);
      if (priceMinor === null) throw new Error("Enter a valid price for the selected currency.");
      if (!form.title.trim() || !form.description.trim() || !form.deliverable.trim() || !form.usage_rights.trim()) throw new Error("Complete the title, description, deliverable, and usage rights.");
      const values = {
        creator_id: user.id, kind: form.kind, category_slug: form.category_slug,
        title: form.title.trim(), description: form.description.trim(), deliverable: form.deliverable.trim(),
        tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        language_code: form.language_code.trim() || null, country_code: form.country_code.trim().toUpperCase() || null,
        city: form.city.trim() || null, is_remote: form.is_remote, price_minor: priceMinor, currency,
        delivery_days: Number(form.delivery_days), revisions: Number(form.revisions),
        buyer_requirements: form.buyer_requirements.trim(), usage_rights: form.usage_rights.trim(),
        status, updated_at: new Date().toISOString(),
      };
      const result = id
        ? await supabase.from("creator_offers").update(values).eq("id", id).eq("creator_id", user.id)
        : await supabase.from("creator_offers").insert({ ...values, slug: `${form.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80) || "offer"}-${crypto.randomUUID().slice(0, 8)}` });
      if (result.error) throw result.error;
      localStorage.removeItem("scriptsplay-offer-draft");
      if (status === "review") navigate("/account/offers", { replace: true });
      else if (!id) navigate("/account/offers", { replace: true });
      else { setCurrentStatus(status); setNotice("Your draft has been saved."); }
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not save this offer.");
    } finally {
      setBusy(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); void save("review"); }

  return (
    <>
      <SEO title={id ? "Edit creator offer" : "Create a creator offer"} description="Create and manage a private ScriptsPlay creator offer." noindex />
      <div className="market-account-panel market-editor">
        <Link className="sp-text-link" to="/account/offers"><ArrowLeft size={17} /> My offers</Link>
        <div className="market-account-panel-heading"><div><h2>{id ? "Edit your offer" : "Create a creator offer"}</h2><p>Explain the exact work a buyer receives. Drafts stay private; submitted offers need review before they appear in search.</p></div></div>
        {loading ? <p role="status">Loading offer…</p> : (
          <form className="market-editor-form" onSubmit={submit}>
            {error && <p className="sp-form-error" role="alert">{error}</p>}
            {notice && <p className="market-form-notice" role="status">{notice}</p>}
            <fieldset><legend>1. What you offer</legend>
              <div className="sp-form-grid"><div className="form-group"><label className="form-label" htmlFor="offer-kind">Offer type</label><select className="form-control" id="offer-kind" value={form.kind} onChange={(event) => change("kind", event.target.value as OfferForm["kind"])}><option value="custom">Custom work</option><option value="ready_made">Ready-made video or audio</option><option value="physical_role">In-person role or performance</option></select></div><div className="form-group"><label className="form-label" htmlFor="offer-category">Category</label><select className="form-control" id="offer-category" value={form.category_slug} onChange={(event) => change("category_slug", event.target.value)}>{categories.map((category) => <option value={category.slug} key={category.slug}>{category.name}</option>)}</select></div></div>
              <div className="form-group"><label className="form-label" htmlFor="offer-title">Offer title *</label><input className="form-control" id="offer-title" value={form.title} onChange={(event) => change("title", event.target.value)} minLength={15} maxLength={120} required placeholder="I will act in a short comedy skit for your brand" /></div>
              <div className="form-group"><label className="form-label" htmlFor="offer-description">Describe the work *</label><textarea className="form-control" id="offer-description" rows={6} value={form.description} onChange={(event) => change("description", event.target.value)} minLength={40} maxLength={10000} required placeholder="What style do you bring? What can a buyer expect?" /></div>
              <div className="form-group"><label className="form-label" htmlFor="offer-tags">Skills and style tags</label><input className="form-control" id="offer-tags" value={form.tags} onChange={(event) => change("tags", event.target.value)} placeholder="Comedy, acting, product video" /><small>Separate tags with commas.</small></div>
            </fieldset>
            <fieldset><legend>2. Deliverable and terms</legend>
              <div className="form-group"><label className="form-label" htmlFor="offer-deliverable">What will the buyer receive? *</label><textarea className="form-control" id="offer-deliverable" rows={3} value={form.deliverable} onChange={(event) => change("deliverable", event.target.value)} minLength={10} maxLength={1500} required placeholder="One edited 30-second vertical MP4 with captions" /></div>
              <div className="sp-form-grid"><div className="form-group"><label className="form-label" htmlFor="offer-price">Price *</label><input className="form-control" id="offer-price" inputMode="decimal" value={form.price} onChange={(event) => change("price", event.target.value)} required placeholder="100.00" /></div><div className="form-group"><label className="form-label" htmlFor="offer-currency">Currency *</label><input className="form-control" id="offer-currency" value={form.currency} onChange={(event) => change("currency", event.target.value.toUpperCase())} minLength={3} maxLength={3} required placeholder="USD" /></div></div>
              <div className="sp-form-grid"><div className="form-group"><label className="form-label" htmlFor="offer-days">Delivery time in days</label><input className="form-control" id="offer-days" type="number" min={0} max={180} value={form.delivery_days} onChange={(event) => change("delivery_days", event.target.value)} required /></div><div className="form-group"><label className="form-label" htmlFor="offer-revisions">Included revisions</label><input className="form-control" id="offer-revisions" type="number" min={0} max={20} value={form.revisions} onChange={(event) => change("revisions", event.target.value)} required /></div></div>
              <div className="form-group"><label className="form-label" htmlFor="offer-rights">Usage rights *</label><textarea className="form-control" id="offer-rights" rows={4} value={form.usage_rights} onChange={(event) => change("usage_rights", event.target.value)} minLength={10} maxLength={3000} required placeholder="Where can the buyer publish it? Is paid advertising or exclusive use included?" /></div>
              <div className="form-group"><label className="form-label" htmlFor="offer-needs">What do you need from the buyer?</label><textarea className="form-control" id="offer-needs" rows={3} value={form.buyer_requirements} onChange={(event) => change("buyer_requirements", event.target.value)} placeholder="Script, product details, brand assets, location…" /></div>
            </fieldset>
            <fieldset><legend>3. Where and how you work</legend>
              <div className="sp-form-grid"><div className="form-group"><label className="form-label" htmlFor="offer-language">Main language</label><input className="form-control" id="offer-language" value={form.language_code} onChange={(event) => change("language_code", event.target.value)} placeholder="English" /></div><div className="form-group"><label className="form-label" htmlFor="offer-country">Country code</label><input className="form-control" id="offer-country" value={form.country_code} onChange={(event) => change("country_code", event.target.value.toUpperCase())} maxLength={2} placeholder="NG" /></div></div>
              <div className="form-group"><label className="form-label" htmlFor="offer-city">City, if relevant</label><input className="form-control" id="offer-city" value={form.city} onChange={(event) => change("city", event.target.value)} /></div>
              <label className="market-check-row"><input type="checkbox" checked={form.is_remote} onChange={(event) => change("is_remote", event.target.checked)} /><span>This work can be done remotely</span></label>
            </fieldset>
            {id && currentStatus === "draft" && <OfferSamples offerId={id} userId={user.id} />}
            {id && currentStatus !== "draft" && <p className="sp-small">Save this offer as a draft to change its samples. Changes will need review before they appear publicly.</p>}
            {!id && <p className="sp-small">Save the offer as a draft before adding samples of your work.</p>}
            <p className="sp-small">Keep your offer accurate and only promise rights you can grant. Payments are not available yet.</p>
            <div className="sp-actions"><button type="button" className="btn btn-outline" onClick={() => void save("draft")} disabled={busy}>{busy ? "Saving…" : "Save draft"}</button><button type="submit" className="btn btn-primary" disabled={busy}>Submit for review <ArrowRight size={18} /></button></div>
          </form>
        )}
      </div>
    </>
  );
}
