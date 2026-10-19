import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Play, ArrowUpRight } from "lucide-react";
const links = [
  ["/discover", "Find talent"],
  ["/content", "Ready-made content"],
  ["/casting", "Casting calls"],
  ["/how-it-works", "How it works"],
];
export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sp-nav">
      <a href="#main-content" className="sp-skip">
        Skip to content
      </a>
      <div className="container sp-nav-inner">
        <Link
          to="/"
          className="sp-logo"
          onClick={() => setOpen(false)}
          aria-label="ScriptsPlay home"
        >
          <span>
            <Play size={19} fill="currentColor" />
          </span>
          ScriptsPlay<span className="sp-logo-period">.</span>
        </Link>
        <nav className="sp-desktop-nav" aria-label="Main navigation">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === "/"}>
              {label}
            </NavLink>
          ))}
        </nav>
        <Link className="sp-nav-signin" to="/sign-in">Sign in</Link>
        <Link className="sp-nav-cta" to="/become-a-creator">
          Become a creator <ArrowUpRight size={17} />
        </Link>
        <button
          type="button"
          className="sp-menu-toggle"
          aria-expanded={open}
          aria-controls="public-mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="public-mobile-menu"
          className="sp-mobile-nav"
          aria-label="Mobile navigation"
        >
          {[...links, ["/become-a-creator", "Become a creator"], ["/sign-in", "Sign in"]].map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
