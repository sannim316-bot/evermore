import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight, Mail, ShieldCheck, FileText } from "lucide-react";
import { useStore, resetAll } from "../lib/store";
import { setName } from "../lib/progress";
import { showToast } from "../lib/toast";
import { APP_VERSION, CONTACT_EMAIL } from "../lib/links";

export default function About() {
  const { name } = useStore();
  const [draft, setDraft] = useState(name);
  const [confirming, setConfirming] = useState(false);

  const saveName = (e) => {
    e.preventDefault();
    setName(draft);
    showToast("Saved");
  };

  const reset = () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    resetAll();
    setConfirming(false);
    setDraft("");
    showToast("All data cleared from this device");
  };

  return (
    <>
      <header className="page-header">
        <div>
          <Link to="/" className="back-link">
            <ArrowLeft size={16} aria-hidden="true" /> Today
          </Link>
          <h1>About</h1>
        </div>
      </header>

      <form className="card" onSubmit={saveName}>
        <label className="field-label" htmlFor="name">Your name</label>
        <div className="inline-field">
          <input
            id="name"
            className="input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Optional"
            maxLength={30}
            autoComplete="off"
          />
          <button className="btn btn-ghost" disabled={draft.trim() === name}>Save</button>
        </div>
      </form>

      <section className="card about-note">
        <h2>Your data stays with you</h2>
        <p className="muted">
          Evermore has no accounts and no servers. Your name, points, streak and
          moments are stored only on this device, and we don't collect them.
        </p>
      </section>

      <ul className="link-list">
        <li>
          <Link to="/privacy-policy" className="card link-row">
            <FileText size={19} aria-hidden="true" /> Privacy Policy <ChevronRight size={18} aria-hidden="true" />
          </Link>
        </li>
        <li>
          <Link to="/child-safety" className="card link-row">
            <ShieldCheck size={19} aria-hidden="true" /> Child Safety Standards <ChevronRight size={18} aria-hidden="true" />
          </Link>
        </li>
        <li>
          <a href={`mailto:${CONTACT_EMAIL}`} className="card link-row">
            <Mail size={19} aria-hidden="true" /> Contact us <ChevronRight size={18} aria-hidden="true" />
          </a>
        </li>
      </ul>

      <section className="card danger-zone">
        <h2>Reset</h2>
        <p className="muted">Erase your name, streak, points and all moments from this device. This can't be undone.</p>
        <button className={`btn ${confirming ? "btn-danger" : "btn-ghost"} btn-block`} onClick={reset}>
          {confirming ? "Tap again to erase everything" : "Erase my data"}
        </button>
        {confirming && (
          <button className="btn btn-link" onClick={() => setConfirming(false)}>
            Cancel
          </button>
        )}
      </section>

      <p className="muted small center">Evermore v{APP_VERSION} · © 2026 Evermore</p>
    </>
  );
}
