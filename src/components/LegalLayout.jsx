import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/** Shared light, print-friendly layout for public policy pages. */
export default function LegalLayout({ title, updated, intro, children }) {
  return (
    <div className="legal">
      <header className="legal-hero">
        <Link to="/" className="legal-back">
          <ArrowLeft size={16} aria-hidden="true" /> Back to Evermore
        </Link>
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
        <p className="legal-updated">Last updated: {updated}</p>
      </header>
      <main className="legal-body">{children}</main>
      <footer className="legal-footer">© 2026 Evermore. All rights reserved.</footer>
    </div>
  );
}
