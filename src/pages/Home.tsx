import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowUpRight, MapPin, Search, ShieldCheck } from "lucide-react";
import SEO from "../components/SEO";
import { categories, processSteps } from "../content/marketplace";

export default function Home() {
  const [query, setQuery] = useState("");
  const [showHeroVideo, setShowHeroVideo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 761px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateVideo = () => setShowHeroVideo(desktop.matches && !reducedMotion.matches);
    updateVideo();
    desktop.addEventListener("change", updateVideo);
    reducedMotion.addEventListener("change", updateVideo);
    return () => {
      desktop.removeEventListener("change", updateVideo);
      reducedMotion.removeEventListener("change", updateVideo);
    };
  }, []);

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/discover${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`);
  };

  return (
    <>
      <SEO
        title="Find creators for video, audio and performance"
        description="ScriptsPlay connects buyers with actors, video creators, voice talent, musicians, dancers and performers. Explore talent, ready-made content and casting calls."
      />
      <section className="market-hero">
        {showHeroVideo && (
          <video className="market-hero-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
            <source src="/videos/marketplace-hero.mp4" type="video/mp4" />
          </video>
        )}
        <div className="container market-hero-grid">
          <div className="market-hero-copy">
            <p className="sp-eyebrow"><span className="sp-dot" /> A place for talent to get paid</p>
            <h1>Find the talent.<br /><span>Make the moment.</span></h1>
            <p className="market-hero-lead">
              Your next actor, voice, beat, dance, or creator is here. Find people
              who can make the video or audio you need, and give great talent a
              real way to earn.
            </p>
            <form className="market-search" role="search" onSubmit={search}>
              <Search aria-hidden="true" size={22} />
              <label className="sr-only" htmlFor="home-talent-search">Search creator skills</label>
              <input id="home-talent-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try voice actor, comedy skit, or product video" />
              <button type="submit">Explore <ArrowRight size={18} /></button>
            </form>
            <div className="market-hero-links">
              <Link to="/discover">Explore talent <ArrowRight size={17} /></Link>
              <Link to="/become-a-creator">Earn as a creator <ArrowRight size={17} /></Link>
            </div>
          </div>
        </div>
      </section>

      <div className="market-promise-strip">
        <div className="container">
          <span><Search size={18} /> Find by what they do</span>
          <span><MapPin size={18} /> Discover local or remote talent</span>
          <span><ShieldCheck size={18} /> Know the work and rights before you buy</span>
        </div>
      </div>

      <section className="sp-section market-categories" id="categories">
        <div className="container">
          <div className="sp-heading-row">
            <div className="sp-section-heading">
              <p className="sp-eyebrow">Find your creative match</p>
              <h2>Whatever the idea needs, find someone who can do it.</h2>
              <p>Explore real skills, clear offers, and the people behind the work.</p>
            </div>
            <Link className="sp-text-link" to="/discover">All categories <ArrowRight size={18} /></Link>
          </div>
          <div className="market-category-grid">
            {categories.map(({ slug, name, description, examples, icon: Icon }) => (
              <Link className="market-category" key={slug} to={`/discover?category=${slug}`}>
                <span className="market-category-icon"><Icon size={26} strokeWidth={1.7} /></span>
                <h3>{name}</h3>
                <p>{description}</p>
                <small>{examples}</small>
                <ArrowUpRight className="market-category-arrow" size={20} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sp-section market-ways">
        <div className="container">
          <div className="sp-section-heading">
            <p className="sp-eyebrow">Three ways to create together</p>
            <h2>Find the right path for your project.</h2>
          </div>
          <div className="market-way-grid">
            <article className="market-way-card market-way-card-dark">
              <span>01 / Custom work</span>
              <h3>Hire a creator</h3>
              <p>Choose a creator offer for a script, role, performance, video, or audio made for you.</p>
              <Link to="/discover">Explore talent <ArrowRight size={18} /></Link>
            </article>
            <article className="market-way-card market-way-card-orange">
              <span>02 / Ready to use</span>
              <h3>Buy finished content</h3>
              <p>Find a finished piece you love and choose clear rights for how you want to use it.</p>
              <Link to="/content">Explore content <ArrowRight size={18} /></Link>
            </article>
            <article className="market-way-card market-way-card-blue">
              <span>03 / Open opportunities</span>
              <h3>Post a casting call</h3>
              <p>Describe the role or project and hear from creators who fit your brief.</p>
              <Link to="/casting">Explore casting <ArrowRight size={18} /></Link>
            </article>
          </div>
        </div>
      </section>

      <section className="sp-section market-process">
        <div className="container market-process-grid">
          <div>
            <p className="sp-eyebrow">Made for the whole project</p>
            <h2>From first idea to final file.</h2>
            <p>Know who you are working with, what you will receive, when it is due, and how you can use it.</p>
            <Link className="sp-text-link" to="/how-it-works">See how ScriptsPlay works <ArrowRight size={18} /></Link>
          </div>
          <ol className="market-steps">
            {processSteps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{step.title}</h3><p>{step.description}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="market-creator-cta">
        <div className="container market-creator-cta-inner">
          <div>
            <p className="sp-eyebrow">Your talent is worth more than views</p>
            <h2>Put what you do in front of people ready to pay for it.</h2>
            <p>Show your work, set your terms, and turn your skills into creator offers.</p>
          </div>
          <Link className="btn btn-primary" to="/become-a-creator">Become a creator <ArrowRight size={18} /></Link>
        </div>
      </section>
    </>
  );
}
