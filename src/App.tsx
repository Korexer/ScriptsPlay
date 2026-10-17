import React, { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
  Navigate,
  Link,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SEO from "./components/SEO";
import "./public.css";

// Pages
import Home from "./pages/Home";
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost1 = lazy(() => import("./pages/BlogPost1"));
const BlogPost2 = lazy(() => import("./pages/BlogPost2"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Discover = lazy(() => import("./pages/Discover"));
const ReadyMade = lazy(() => import("./pages/ReadyMade"));
const Casting = lazy(() => import("./pages/Casting"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const BecomeCreator = lazy(() => import("./pages/BecomeCreator"));
const Fees = lazy(() => import("./pages/Fees"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const OfferDetail = lazy(() => import("./pages/OfferDetail"));
const CreatorProfile = lazy(() => import("./pages/CreatorProfile"));
const CastingDetail = lazy(() => import("./pages/CastingDetail"));
const AccountLayout = lazy(() => import("./pages/account/AccountLayout"));
const ProfileEditor = lazy(() => import("./pages/account/ProfileEditor"));
const OffersList = lazy(() => import("./pages/account/OffersList"));
const OfferEditor = lazy(() => import("./pages/account/OfferEditor"));
const CastingList = lazy(() => import("./pages/account/CastingList"));
const CastingEditor = lazy(() => import("./pages/account/CastingEditor"));

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Suspense fallback={<div className="route-loading" role="status">Loading page…</div>}><Routes>
          {/* Public Website Routes */}
          <Route
            element={
              <div className="public-site flex flex-col min-h-screen">
                <Header />
                <main
                  id="main-content"
                  tabIndex={-1}
                  style={{ flex: 1, display: "flex", flexDirection: "column" }}
                >
                  <Outlet />
                </main>
                <Footer />
              </div>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/content" element={<ReadyMade />} />
            <Route path="/casting" element={<Casting />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/become-a-creator" element={<BecomeCreator />} />
            <Route path="/fees" element={<Fees />} />
            <Route path="/join" element={<AuthPage mode="join" />} />
            <Route path="/sign-in" element={<AuthPage mode="sign-in" />} />
            <Route path="/offer/:slug" element={<OfferDetail />} />
            <Route path="/creator/:handle" element={<CreatorProfile />} />
            <Route path="/casting/:id" element={<CastingDetail />} />
            <Route path="/account" element={<AccountLayout />}>
              <Route index element={<Navigate replace to="profile" />} />
              <Route path="profile" element={<ProfileEditor />} />
              <Route path="offers" element={<OffersList />} />
              <Route path="offers/new" element={<OfferEditor />} />
              <Route path="offers/:id/edit" element={<OfferEditor />} />
              <Route path="casting" element={<CastingList />} />
              <Route path="casting/new" element={<CastingEditor />} />
              <Route path="casting/:id/edit" element={<CastingEditor />} />
            </Route>
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<Navigate replace to="/discover" />} />
            <Route path="/jobs" element={<Navigate replace to="/become-a-creator" />} />
            <Route path="/blog" element={<Blog />} />
            <Route
              path="/blog/how-to-brief-a-video-creator"
              element={<BlogPost1 />}
            />
            <Route
              path="/blog/turn-creative-skill-into-an-offer"
              element={<BlogPost2 />}
            />
            <Route
              path="/blog/why-accurate-video-transcription-matters"
              element={
                <Navigate
                  replace
                  to="/blog/how-to-brief-a-video-creator"
                />
              }
            />
            <Route
              path="/blog/how-professional-captioning-improves-engagement"
              element={
                <Navigate
                  replace
                  to="/blog/turn-creative-skill-into-an-offer"
                />
              }
            />
            <Route path="/blog/how-to-plan-a-whiteboard-explainer-video" element={<Navigate replace to="/blog/how-to-brief-a-video-creator" />} />
            <Route path="/blog/whiteboard-videos-for-training-and-onboarding" element={<Navigate replace to="/blog/turn-creative-skill-into-an-offer" />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route
              path="*"
              element={
                <>
                  <SEO
                    title="Page not found"
                    description="Explore creators, ready-made content and casting calls on ScriptsPlay."
                    noindex
                  />
                  <section className="sp-intro">
                    <div className="container">
                      <p className="sp-eyebrow">404 / Page not found</p>
                      <h1>Let’s get you back to the story.</h1>
                      <p>
                        This page is not available. Find creative talent or start a conversation.
                      </p>
                      <Link className="btn btn-primary" to="/discover">
                        Explore creators
                      </Link>
                    </div>
                  </section>
                </>
              }
            />
          </Route>

        </Routes></Suspense>
      </div>
    </Router>
  );
};

export default App;
