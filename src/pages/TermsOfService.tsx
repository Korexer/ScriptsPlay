import SEO from "../components/SEO";
import { PageIntro } from "../components/public/PublicUI";

export default function TermsOfService() {
  return (
    <>
      <SEO title="Terms of Service" description="Terms for using ScriptsPlay's website, accounts, creator offers and casting calls during its staged launch." />
      <PageIntro eyebrow="Using ScriptsPlay" title="Terms of service"><p>Website and early marketplace features · Updated October 18, 2026</p></PageIntro>
      <div className="container sp-reading sp-article-body sp-legal">
        <section><h2>What these terms cover</h2><p>These terms cover the website and any account, profile, offer, sample, and casting features made available at scriptsplay.com during its staged launch. Orders, checkout, and payouts are not active. We will publish separate transaction terms before purchases become available.</p></section>
        <section><h2>Enquiries are not orders</h2><p>Sending a buyer brief, creator introduction, offer, or casting application does not place an order, guarantee a match, or authorise a charge. We may reply to discuss your needs or interest. A future paid project will need a separate agreement that states the work, price, currency, timing, payment method, review process, and usage rights.</p></section>
        <section><h2>Your materials</h2><p>You are responsible for the content, links, and samples you submit. Only share material you own or are allowed to use and show. Do not submit unlawful, misleading, infringing, abusive, or harmful content. We may review, reject, or remove listings and restrict accounts that misuse the service. Do not send sensitive personal data or payment card information through public forms.</p></section>
        <section><h2>Creative work and rights</h2><p>Creator samples and project examples remain the property of their owners. By choosing to make a profile or listing public, you allow ScriptsPlay to display the content you provide for that purpose. Private samples remain restricted until their offer is approved and published. For any future order, the parties must agree what the buyer receives and how the finished video, audio, or performance may be used. A listing or enquiry does not grant exclusivity or commercial usage rights.</p></section>
        <section><h2>Fees and future marketplace features</h2><p>Our fees page describes the planned 6% buyer fee and 20% creator fee. These are illustrative until checkout opens in a supported country and currency. Any final price, applicable taxes, processor charges, and payout terms must be shown before an order is accepted. We will publish the full order, revision, cancellation, dispute, and payment terms before live transactions begin.</p></section>
        <section><h2>Website use and availability</h2><p>Use the website lawfully. Do not interfere with its operation, attempt to access another person’s data, or misuse its forms. We may change or pause public features as the marketplace is developed. We do not promise that a creator will find work or that a buyer will find a particular talent.</p></section>
        <section><h2>Contact</h2><p>Questions about these terms or a possible project can be sent to <a href="mailto:hello@scriptsplay.com">hello@scriptsplay.com</a>.</p></section>
      </div>
    </>
  );
}
