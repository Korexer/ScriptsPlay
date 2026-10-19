import { Link } from "react-router-dom";
import { Play, ArrowUpRight } from "lucide-react";
export default function Footer() {
  return (
    <footer className="sp-footer">
      <div className="container">
        <div className="sp-footer-grid">
          <div>
            <Link to="/" className="sp-logo">
              <span>
                <Play size={19} fill="currentColor" />
              </span>
              ScriptsPlay.
            </Link>
            <p>Where creative talent meets the people ready to pay for it.</p>
            <a className="sp-footer-email" href="mailto:hello@scriptsplay.com">
              hello@scriptsplay.com <ArrowUpRight size={17} />
            </a>
          </div>
          <div>
            <h2>Explore</h2>
            <Link to="/discover">Find talent</Link>
            <Link to="/content">Ready-made content</Link>
            <Link to="/casting">Casting calls</Link>
            <Link to="/become-a-creator">Become a creator</Link>
          </div>
          <div>
            <h2>Useful links</h2>
            <Link to="/how-it-works">How it works</Link>
            <Link to="/fees">Fees</Link>
            <Link to="/about">About ScriptsPlay</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy-policy">Privacy policy</Link>
            <Link to="/terms-of-service">Terms of service</Link>
          </div>
        </div>
        <div className="sp-footer-bottom">
          <p>© {new Date().getFullYear()} ScriptsPlay. All rights reserved.</p>
          <p>Make the moment.</p>
        </div>
      </div>
    </footer>
  );
}
