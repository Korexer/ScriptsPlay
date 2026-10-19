import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "../components/SEO";
import { feeExample } from "../content/marketplace";

export default function Fees() {
  return (
    <>
      <SEO title="ScriptsPlay fees" description="Understand ScriptsPlay's 6% buyer fee and 20% creator fee with a simple price example before placing or accepting an order." />
      <section className="market-page-hero"><div className="container"><p className="sp-eyebrow">Clear pricing</p><h1>Everyone sees the numbers before an order starts.</h1><p>Creators choose the price of their work. ScriptsPlay shows the buyer total and creator earnings before payment.</p></div></section>
      <section className="sp-section"><div className="container market-fee-grid"><div><p className="sp-eyebrow">A simple example</p><h2>Start with a creator price of {feeExample.price}.</h2><p>The same calculation applies in any supported currency. The final checkout will show any applicable payment charges or taxes before you pay.</p></div><div className="market-fee-card"><div><span>Creator offer price</span><strong>{feeExample.price}</strong></div><div><span>Buyer fee · 6%</span><strong>+ {feeExample.buyerFee}</strong></div><div className="market-fee-total"><span>Buyer pays</span><strong>{feeExample.buyerTotal}</strong></div><div><span>Creator fee · 20%</span><strong>− {feeExample.creatorFee}</strong></div><div className="market-fee-total"><span>Creator earns</span><strong>{feeExample.creatorEarns}</strong></div></div></div></section>
      <section className="sp-section sp-soft"><div className="container market-simple-cta"><div><p className="sp-eyebrow">Payment and completion</p><h2>Delivery is reviewed before the project closes.</h2><p>The creator submits the finished work and the buyer is notified. The buyer can accept it or request a revision that is included in the order. If the buyer takes no action for three full days after delivery, the order can complete automatically unless a dispute or another hold is open.</p><p>Creator payout follows the payment provider's supported process after completion. The exact timing and available countries will appear at checkout.</p></div><Link className="sp-text-link" to="/how-it-works">How orders work <ArrowRight size={18} /></Link></div></section>
    </>
  );
}
