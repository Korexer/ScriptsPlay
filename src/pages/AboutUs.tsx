import SEO from "../components/SEO";
import { PageIntro, CTA, Checklist } from "../components/public/PublicUI";

export default function AboutUs() {
  return (
    <>
      <SEO title="About ScriptsPlay" description="ScriptsPlay is building a place where creators can earn from their talent and buyers can find the right people for video, audio and performance." />
      <PageIntro eyebrow="About ScriptsPlay" title="Talent should be easier to find. And easier to earn from.">
        <p>ScriptsPlay is a home for people who make video, audio, and live creative work, and for the people who need that work made.</p>
      </PageIntro>
      <section className="sp-section">
        <div className="container sp-split">
          <div>
            <p className="sp-eyebrow">Why we are building this</p>
            <h2>Good work can get lost in a crowded feed.</h2>
            <p>A creator may have the right voice, acting style, music, or local knowledge for a project, yet never appear in a buyer’s search. A buyer may know exactly what they need but have no clear way to find that person.</p>
            <p>We want to make creative skills easier to show, search, and buy. The work matters more than the size of someone’s following.</p>
          </div>
          <div className="sp-note-card">
            <p className="sp-eyebrow">A note from Korex</p>
            <h3>“Show people what you can do.”</h3>
            <p>I started ScriptsPlay because creators should have more ways to earn from their work. Buyers should be able to find the right person for a role, a piece of content, or a collaboration without searching through endless posts.</p>
            <p className="sp-signature">Korex / ScriptsPlay</p>
          </div>
        </div>
      </section>
      <section className="sp-section sp-soft">
        <div className="container">
          <div className="sp-section-heading"><p className="sp-eyebrow">What we are making possible</p><h2>More than one way to turn an idea into something real.</h2></div>
          <div className="sp-grid-three">
            <div className="sp-card"><h3>Find a creator</h3><p>Search by skill, style, language, and location. Review original samples and a clear offer before starting a project.</p></div>
            <div className="sp-card"><h3>Buy finished content</h3><p>Find video or audio already made, with the intended use and rights explained before purchase.</p></div>
            <div className="sp-card"><h3>Open a role</h3><p>Describe a character, collaboration, or creative brief so suitable creators can put themselves forward.</p></div>
          </div>
        </div>
      </section>
      <section className="sp-section">
        <div className="container sp-split">
          <div><p className="sp-eyebrow">Our approach</p><h2>Clear terms help people make better work.</h2><p>We are designing offers around the details that matter: the deliverable, deadline, revisions, price, and usage rights. The marketplace is being built in stages. Until buying and selling opens, you can tell us about your project or introduce your work.</p></div>
          <Checklist items={["Creators of all audience sizes can show their skills", "Buyers can brief custom video, audio, and performance work", "Ready-made content has clear usage terms", "Fees and order steps are explained before payment"]} />
        </div>
      </section>
      <CTA />
    </>
  );
}
