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
            <p>Whiteboard videos for ideas worth understanding.</p>
            <a className="sp-footer-email" href="mailto:hello@scriptsplay.com">
              hello@scriptsplay.com <ArrowUpRight size={17} />
            </a>
          </div>
          <div>
            <h2>Explore</h2>
            <Link to="/services">Whiteboard video services</Link>
            <Link to="/about">About ScriptsPlay</Link>
            <Link to="/contact">Request a quote</Link>
          </div>
          <div>
            <h2>Useful links</h2>
            <Link to="/blog">The journal</Link>
            <Link to="/jobs">Creative collaboration</Link>
            <Link to="/privacy-policy">Privacy policy</Link>
            <Link to="/terms-of-service">Terms of service</Link>
          </div>
        </div>
        <div className="sp-footer-bottom">
          <p>© {new Date().getFullYear()} ScriptsPlay. All rights reserved.</p>
          <p>Big ideas. Simply explained.</p>
        </div>
      </div>
    </footer>
  );
}
