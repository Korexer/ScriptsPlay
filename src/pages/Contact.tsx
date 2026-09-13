import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, Loader2, Mail } from "lucide-react";
import SEO from "../components/SEO";
import { PageIntro, Checklist } from "../components/public/PublicUI";
import { supabase } from "../lib/supabase";

const projectTypes = [
  "Business explainer",
  "Training video",
  "Agency project",
  "Video series",
  "Not sure yet",
];
export default function Contact() {
  const [params] = useSearchParams();
  const preset = params.get("project") || "";
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
      setError("Please add your name, email, and a short project brief.");
      return;
    }
    busy.current = true;
    setStatus("submitting");
    setError("");
    const message = [
      "Whiteboard video quote request",
      "Project: " + form.get("project"),
      "Company / website: " + (form.get("company") || "Not provided"),
      "Length: " + form.get("length"),
      "Deadline: " + (form.get("deadline") || "Flexible"),
      "Budget: " + (form.get("budget") || "Please advise"),
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
        "We could not confirm your request was saved. Please retry or email your brief to hello@scriptsplay.com.",
      );
      setStatus("idle");
    } finally {
      busy.current = false;
    }
  }
  return (
    <>
      <SEO
        title="Request a Whiteboard Video Quote"
        description="Tell ScriptsPlay about your audience, idea, and deadline. Request a custom quote for a business explainer, training video, or agency project."
      />
      <PageIntro
        eyebrow="Let’s talk about your video"
        title="Bring the idea. We’ll help shape the story."
      >
        <p>
          Tell us what you want to explain, who it is for, and where you will
          use it. We’ll get back to you to discuss the scope and quote.
        </p>
      </PageIntro>
      <section className="sp-section">
        <div className="container sp-contact-grid">
          <aside>
            <p className="sp-eyebrow">A good brief can be short</p>
            <h2>What should your viewer understand?</h2>
            <p>
              A website link and a few sentences are enough to start. A finished
              script is welcome, but not required.
            </p>
            <Checklist
              items={[
                "Your audience and the problem you help them solve",
                "The one action you want the viewer to take",
                "Where the video will appear",
                "Your preferred length, deadline, and budget",
              ]}
            />
            <div className="sp-email-box">
              <Mail size={24} />
              <h3>Prefer email?</h3>
              <a href="mailto:hello@scriptsplay.com">hello@scriptsplay.com</a>
              <p>
                Already received a sample from Korex? Reply to that email or
                mention it in your brief.
              </p>
            </div>
          </aside>
          <div className="sp-form-card">
            {status === "success" ? (
              <div className="sp-success" role="status">
                <CheckCircle2 size={46} />
                <h2>Your brief is saved.</h2>
                <p>
                  Thank you for contacting ScriptsPlay. We’ll review your idea
                  and follow up by email to discuss your video.
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
                <h2>Request a quote</h2>
                <p className="sp-small">
                  No payment is taken here. Fields marked * are required.
                </p>
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
                    Company or website
                  </label>
                  <input
                    className="form-control"
                    id="company"
                    name="company"
                    autoComplete="organization"
                    maxLength={300}
                    placeholder="Your business name or website link"
                  />
                </div>
                <div className="sp-form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="project">
                      Type of video
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
                    <label className="form-label" htmlFor="length">
                      Preferred length
                    </label>
                    <select className="form-control" id="length" name="length">
                      <option>Not sure yet</option>
                      <option>Under 45 seconds</option>
                      <option>45–90 seconds</option>
                      <option>Over 90 seconds</option>
                      <option>Multiple videos</option>
                    </select>
                  </div>
                </div>
                <div className="sp-form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="deadline">
                      Deadline
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
                      Budget and currency
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
                    Tell us about the video *
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows={5}
                    maxLength={6000}
                    required
                    placeholder="Who is watching? What should they understand? What should they do next?"
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
                      brief…
                    </>
                  ) : (
                    <>
                      Send my brief <ArrowRight size={18} />
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
