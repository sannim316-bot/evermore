import { Link } from "react-router-dom";
import { Megaphone, MessagesSquare, Send, ShieldCheck } from "lucide-react";
import { TelegramLink } from "../components/TelegramCard";
import { CONTACT_EMAIL } from "../lib/links";

const RULES = [
  "Be kind. Disagree without attacking people.",
  "No harassment, hate speech or threats.",
  "No spam, scams or unsolicited promotion.",
  "Zero tolerance for anything that sexualises or endangers children.",
  "Don't share private information about others.",
];

export default function Community() {
  return (
    <>
      <header className="page-header">
        <div>
          <p className="eyebrow">Together</p>
          <h1>Community</h1>
        </div>
      </header>

      <section className="card tg-hero">
        <span className="tg-icon tg-icon-lg" aria-hidden="true">
          <Send size={30} />
        </span>
        <h2>The conversation lives on Telegram</h2>
        <p className="muted">
          Join the Evermore channel for announcements, updates and to meet the
          people behind the streaks.
        </p>
        <TelegramLink className="btn btn-telegram btn-block">
          <Send size={18} /> Open in Telegram
        </TelegramLink>
        <p className="muted small">Opens the Telegram app or website. You'll need a free Telegram account.</p>
      </section>

      <ul className="feature-list">
        <li className="card">
          <Megaphone size={20} aria-hidden="true" />
          <div>
            <strong>News &amp; updates</strong>
            <span>Be first to hear about new features and challenges.</span>
          </div>
        </li>
        <li className="card">
          <MessagesSquare size={20} aria-hidden="true" />
          <div>
            <strong>Real conversation</strong>
            <span>Share wins, ask questions and cheer each other on.</span>
          </div>
        </li>
      </ul>

      <section className="card rules">
        <h2>
          <ShieldCheck size={18} aria-hidden="true" /> Community rules
        </h2>
        <ul>
          {RULES.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <p className="muted small">
          See something that breaks these rules? Report it inside Telegram, and
          email us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Read
          our <Link to="/child-safety">Child Safety Standards</Link>.
        </p>
      </section>
    </>
  );
}
