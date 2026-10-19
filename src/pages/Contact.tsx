import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, Loader2, Mail } from "lucide-react";
import SEO from "../components/SEO";
import { PageIntro, Checklist } from "../components/public/PublicUI";
import { supabase } from "../lib/supabase";

const projectTypes = [
  "I need a creator",
  "I want to buy finished content",
  "I want to post a casting call",
  "I am a creator",
  "Partnership or support",
  "Not sure yet",
];
export default function Contact() {
  const [params] = useSearchParams();
  const preset = params.get("project") || "";
  const offerSlug = params.get("offer")?.slice(0, 100) || "";
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [error, setError] = useState("");
  const busy = useRef(false);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const brief = String(form.get("message") || "").trim();
    if (!name || !email || !brief) {
      setError("Please add your name, email, and a short message.");
      return;
    }
    busy.current = true;
    setStatus("submitting");
    setError("");
    const message = [
      "ScriptsPlay marketplace enquiry",
      "Interest: " + form.get("project"),
      ...(offerSlug ? ["Creator offer: " + offerSlug] : []),
      "Company / profile / website: " + (form.get("company") || "Not provided"),
      "Location: " + (form.get("location") || "Not provided"),
      "Timing: " + (form.get("deadline") || "Flexible"),
      "Budget and currency: " + (form.get("budget") || "Not provided"),
      "",
      brief,
    ].join("\n");
    try {
      const { error: saveError } = await supabase
        .from("contact_submissions")
        .insert([{ name, email, message }])
        .abortSignal(AbortSignal.timeout(15000));
      if (saveError) throw saveError;
      // The brief is saved even when the existing email notification service is unavailable.
      void supabase.functions
        .invoke("send-contact-email", { body: { name, email, message } })
        .catch(() => {
          /* Saved brief remains available. */
        });
      setStatus("success");
    } catch {
      setError(
        "We could not confirm your message was saved. Please retry or email hello@scriptsplay.com.",
      );
      setStatus("idle");
    } finally {
      busy.current = false;
    }
  }
  return (
    <>
      <SEO
        title="Contact ScriptsPlay"
        description="Tell ScriptsPlay about a creative project, a casting need, finished content, or the skills you want to offer as a creator."
      />
      <PageIntro
        eyebrow="Get in touch"
        title="Tell us what you want to make."
        tone="dark"
      >
        <p>
          Looking for talent or ready to show your own work? Send a short note.
          We are speaking with buyers and creators as the marketplace takes shape.
        </p>
      </PageIntro>
      <section className="sp-section sp-soft">
        <div className="container sp-contact-grid">
          <aside>
            <p className="sp-eyebrow">A good message can be short</p>
            <h2>What are you looking for?</h2>
            <p>
              A few sentences and a link to your project or portfolio are enough
              to start. There is no order or payment on this form.
            </p>
            <Checklist
              items={[
                "For a project: the role, deliverable, and audience",
                "For your talent: your skill, samples, and location",
                "Any deadline, budget, or currency you have in mind",
                "How you would like the finished work to be used",
              ]}
            />
            <div className="sp-email-box">
              <Mail size={24} />
              <h3>Prefer email?</h3>
              <a href="mailto:hello@scriptsplay.com">hello@scriptsplay.com</a>
              <p>
                You can also send a portfolio link or a short project outline
                directly to our inbox.
              </p>
            </div>
          </aside>
          <div className="sp-form-card">
            {status === "success" ? (
              <div className="sp-success" role="status">
                <CheckCircle2 size={46} />
                <h2>Your message is saved.</h2>
                <p>
                  Thank you for contacting ScriptsPlay. We’ll review your message
                  and follow up by email.
                </p>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setStatus("idle")}
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2>Send us a message</h2>
                <p className="sp-small">
                  No payment is taken here. Fields marked * are required.
                </p>
                {offerSlug && <p className="market-form-notice">Your message will mention the offer “{offerSlug}”.</p>}
                {error && (
                  <p className="sp-form-error" role="alert">
                    {error}
                  </p>
                )}
                <div className="sp-form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">
                      Your name *
                    </label>
                    <input
                      className="form-control"
                      id="name"
                      name="name"
                      autoComplete="name"
                      maxLength={150}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      Email address *
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      maxLength={254}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="company">
                    Company, profile, or website
                  </label>
                  <input
                    className="form-control"
                    id="company"
                    name="company"
                    autoComplete="organization"
                    maxLength={300}
                    placeholder="Optional link or name"
                  />
                </div>
                <div className="sp-form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="project">
                      I am interested in
                    </label>
                    <select
                      className="form-control"
                      id="project"
                      name="project"
                      defaultValue={
                        projectTypes.includes(preset) ? preset : "Not sure yet"
                      }
                    >
                      {projectTypes.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="location">
                      Your location
                    </label>
                    <input className="form-control" id="location" name="location" maxLength={150} placeholder="City and country, or remote" />
                  </div>
                </div>
                <div className="sp-form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="deadline">
                      Timing
                    </label>
                    <input
                      className="form-control"
                      id="deadline"
                      name="deadline"
                      maxLength={100}
                      placeholder="A date, or flexible"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="budget">
                      Budget and currency, if relevant
                    </label>
                    <input
                      className="form-control"
                      id="budget"
                      name="budget"
                      maxLength={100}
                      placeholder="Optional, or ask us to advise"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="message">
                    Your message *
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows={5}
                    maxLength={6000}
                    required
                    placeholder="What do you want to make, buy, or offer? Include a link to your work if you have one."
                  />
                </div>
                <p className="sp-small">
                  We use your details to respond to this enquiry. See our{" "}
                  <Link to="/privacy-policy">privacy policy</Link>. Please do
                  not include sensitive information in your first brief.
                </p>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="sp-spin" size={18} /> Sending your
                      message…
                    </>
                  ) : (
                    <>
                      Send message <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
