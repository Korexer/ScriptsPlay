import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import SEO from "../components/SEO";
import { categories, categoryFromSlug } from "../content/marketplace";
import { supabase } from "../lib/supabase";
import type { CreatorOffer, MarketplaceProfile } from "../types/marketplace";
import { formatMoney } from "../types/marketplace";

export default function Discover() {
  const [params, setParams] = useSearchParams();
  const [searchText, setSearchText] = useState(params.get("q") || "");
  const selectedCategory = categoryFromSlug(params.get("category"));
  const selectedSlug = selectedCategory?.slug;
  const searchTerm = params.get("q")?.trim() || "";
  const [offers, setOffers] = useState<CreatorOffer[]>([]);
  const [profiles, setProfiles] = useState<Record<string, MarketplaceProfile>>({});
  const [loading, setLoading] = useState(true);
  const [catalogueError, setCatalogueError] = useState(false);

  useEffect(() => {
    let active = true;
    async function loadOffers() {
      setLoading(true);
      setCatalogueError(false);
      let query = supabase.from("creator_offers").select("*").eq("status", "published").order("published_at", { ascending: false }).limit(30);
      if (selectedSlug) query = query.eq("category_slug", selectedSlug);
      if (searchTerm) query = query.ilike("title", `%${searchTerm.replace(/[%_]/g, "").slice(0, 100)}%`);
      const { data, error } = await query;
      if (!active) return;
      if (error) { setCatalogueError(true); setOffers([]); setLoading(false); return; }
      const rows = (data || []) as CreatorOffer[];
      setOffers(rows);
      const ids = [...new Set(rows.map((offer) => offer.creator_id))];
      if (ids.length) {
        const { data: people } = await supabase.from("marketplace_profiles").select("*").in("id", ids);
        if (active) setProfiles(Object.fromEntries(((people || []) as MarketplaceProfile[]).map((profile) => [profile.id, profile])));
      } else setProfiles({});
      if (active) setLoading(false);
    }
    void loadOffers();
    return () => { active = false; };
  }, [selectedSlug, searchTerm]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = new URLSearchParams(params);
    if (searchText.trim()) next.set("q", searchText.trim());
    else next.delete("q");
    setParams(next);
  };

  const chooseCategory = (slug?: string) => {
    const next = new URLSearchParams(params);
    if (slug) next.set("category", slug);
    else next.delete("category");
    setParams(next);
  };

  return (
    <>
      <SEO
        title={selectedCategory ? `${selectedCategory.name} creators` : "Discover creative talent"}
        description="Explore creators for acting, scripted ads, voice work, music, dance and live collaboration. Find a creative match by skill, style and location."
      />
      <section className="market-page-hero">
        <div className="container">
          <p className="sp-eyebrow">Discover creators</p>
          <h1>{selectedCategory ? selectedCategory.name : "Find the right person for your idea."}</h1>
          <p>{selectedCategory ? selectedCategory.description : "Explore the skills behind great video, audio, and live creative work."}</p>
          <form className="market-search market-search-page" role="search" onSubmit={submit}>
            <Search aria-hidden="true" size={21} />
            <label className="sr-only" htmlFor="discover-search">Search creator skills</label>
            <input id="discover-search" value={searchText} onChange={(event) => setSearchText(event.target.value)} placeholder="Search a skill, style or service" />
            <button type="submit">Search <ArrowRight size={18} /></button>
          </form>
        </div>
      </section>
      <section className="sp-section">
        <div className="container">
          <div className="market-discover-heading">
            <div><SlidersHorizontal size={20} /><strong>Explore a category</strong></div>
            {(selectedCategory || searchTerm) && <button type="button" onClick={() => { setSearchText(""); setParams({}); }}>Clear filters</button>}
          </div>
          <div className="market-chip-row" role="group" aria-label="Creator categories">
            <button type="button" className={!selectedCategory ? "active" : ""} onClick={() => chooseCategory()}>All talents</button>
            {categories.map((category) => <button type="button" key={category.slug} className={selectedCategory?.slug === category.slug ? "active" : ""} onClick={() => chooseCategory(category.slug)}>{category.name}</button>)}
          </div>
          {loading ? <p role="status">Looking for matching creators…</p> : offers.length ? (
            <div className="market-offer-grid">{offers.map((offer) => <article className="market-offer-card" key={offer.id}>
              <div className="market-offer-art"><span>{categories.find((item) => item.slug === offer.category_slug)?.name || "Creative work"}</span></div>
              <div className="market-offer-body"><p className="sp-eyebrow">{profiles[offer.creator_id]?.display_name || "ScriptsPlay creator"}</p><h2><Link to={`/offer/${offer.slug}`}>{offer.title}</Link></h2><p>{offer.deliverable}</p><div><span>{formatMoney(offer.price_minor, offer.currency)}</span><Link className="sp-text-link" to={`/offer/${offer.slug}`}>View offer <ArrowRight size={16} /></Link></div></div>
            </article>)}</div>
          ) : <div className="market-discovery-empty">
            <p className="sp-eyebrow">Creator catalogue</p>
            <h2>{catalogueError ? "We are preparing the creator catalogue." : searchTerm ? `No offers found for “${searchTerm}” yet.` : "A new home for creative talent is taking shape."}</h2>
            <p>Have a project in mind? Tell us what you need. If you are a creator, introduce your work and prepare your profile.</p>
            <div className="sp-actions"><Link className="btn btn-primary" to="/contact">Tell us about your project <ArrowRight size={18} /></Link><Link className="sp-text-link" to="/join">Join as a creator <ArrowRight size={18} /></Link></div>
          </div>}
        </div>
      </section>
    </>
  );
}
