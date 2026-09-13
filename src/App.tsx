import React, { useEffect } from "react";
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
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Jobs from "./pages/Jobs";
import Blog from "./pages/Blog";
import BlogPost1 from "./pages/BlogPost1";
import BlogPost2 from "./pages/BlogPost2";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

// Portal Components
import Login from "./pages/portal/Login";
import Signup from "./pages/portal/Signup";
import Dashboard from "./pages/portal/Dashboard";
import ProfileSetup from "./pages/portal/ProfileSetup";
import TaskBoard from "./pages/portal/TaskBoard";
import TaskDetail from "./pages/portal/TaskDetail";
import Earnings from "./pages/portal/Earnings";
import Support from "./pages/portal/Support";
import UnlockAccess from "./pages/portal/UnlockAccess";
import { PortalLayout } from "./components/portal/PortalLayout";
import { ProtectedRoute } from "./components/portal/ProtectedRoute";
import { AccessGrantedRoute } from "./components/portal/AccessGrantedRoute";

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
        <Routes>
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
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/blog" element={<Blog />} />
            <Route
              path="/blog/how-to-plan-a-whiteboard-explainer-video"
              element={<BlogPost1 />}
            />
            <Route
              path="/blog/whiteboard-videos-for-training-and-onboarding"
              element={<BlogPost2 />}
            />
            <Route
              path="/blog/why-accurate-video-transcription-matters"
              element={
                <Navigate
                  replace
                  to="/blog/how-to-plan-a-whiteboard-explainer-video"
                />
              }
            />
            <Route
              path="/blog/how-professional-captioning-improves-engagement"
              element={
                <Navigate
                  replace
                  to="/blog/whiteboard-videos-for-training-and-onboarding"
                />
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route
              path="*"
              element={
                <>
                  <SEO
                    title="Page not found"
                    description="Find ScriptsPlay whiteboard video services or request a quote."
                    noindex
                  />
                  <section className="sp-intro">
                    <div className="container">
                      <p className="sp-eyebrow">404 / Page not found</p>
                      <h1>Let’s get you back to the story.</h1>
                      <p>
                        This page is not available. Explore our whiteboard video
                        services or start a conversation.
                      </p>
                      <Link className="btn btn-primary" to="/services">
                        Explore our services
                      </Link>
                    </div>
                  </section>
                </>
              }
            />
          </Route>

          {/* Unauthenticated Portal Routes */}
          <Route path="/spworkersportal101" element={<Login />} />
          <Route path="/spworkersportal101/login" element={<Login />} />
          <Route path="/spworkersportal101/signup" element={<Signup />} />

          {/* Protected Portal Routes */}
          <Route element={
            <ProtectedRoute>
              <PortalLayout>
                <Outlet />
              </PortalLayout>
            </ProtectedRoute>
          }>
            <Route path="/spworkersportal101/dashboard" element={<Dashboard />} />
            <Route path="/spworkersportal101/profile" element={<ProfileSetup />} />
            <Route path="/spworkersportal101/support" element={<Support />} />
            <Route path="/spworkersportal101/unlock-access" element={<UnlockAccess />} />
            
            {/* Strict Access Required Routes */}
            <Route path="/spworkersportal101/tasks" element={<AccessGrantedRoute><TaskBoard /></AccessGrantedRoute>} />
            <Route path="/spworkersportal101/task/:id" element={<AccessGrantedRoute><TaskDetail /></AccessGrantedRoute>} />
            <Route path="/spworkersportal101/earnings" element={<AccessGrantedRoute><Earnings /></AccessGrantedRoute>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
