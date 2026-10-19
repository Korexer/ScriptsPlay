import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { Link, NavLink, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function AccountLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    void supabase.auth.getUser().then(({ data }) => {
      if (active) { setUser(data.user); setLoading(false); }
    }).catch(() => { if (active) setLoading(false); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) { setUser(session?.user ?? null); setLoading(false); }
    });
    return () => { active = false; subscription.unsubscribe(); };
  }, []);

  if (loading) return <div className="container market-account-loading" role="status">Loading your account…</div>;
  if (!user) return <Navigate to={`/sign-in?next=${encodeURIComponent(location.pathname + location.search)}`} replace />;
  if (!user.email_confirmed_at) return <Navigate to={`/verify-email?next=${encodeURIComponent(location.pathname + location.search)}`} replace />;

  async function signOut() {
    await supabase.auth.signOut();
    navigate("/", { replace: true });
  }

  return (
    <section className="market-account-section">
      <div className="container">
        <div className="market-account-heading"><div><p className="sp-eyebrow">Your workspace</p><h1>Make your next move.</h1><p>{user?.email}</p></div><button type="button" className="sp-text-link" onClick={signOut}>Sign out</button></div>
        <nav className="market-account-nav" aria-label="Account navigation">
          <NavLink to="/account/profile">Profile</NavLink>
          <NavLink to="/account/offers">My offers</NavLink>
          <NavLink to="/account/casting">My casting calls</NavLink>
          <NavLink to="/account/applications">My applications</NavLink>
          <NavLink to="/account/messages">Messages</NavLink>
          <NavLink to="/account/saved">Saved offers</NavLink>
          {user.app_metadata?.scriptsplay_admin === true && <NavLink to="/account/review">Review queue</NavLink>}
          <Link to="/discover">Explore talent</Link>
        </nav>
        <Outlet context={{ user }} />
      </div>
    </section>
  );
}
