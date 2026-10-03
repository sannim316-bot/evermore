import { Send, ArrowUpRight } from "lucide-react";
import { TELEGRAM_URL } from "../lib/links";
import { announce } from "../lib/announce";
import { markCommunityVisited } from "../lib/progress";

/** Opens the Telegram channel in the Telegram app (or browser) and records the visit. */
export function TelegramLink({ className = "", children }) {
  return (
    <a
      className={className}
      href={TELEGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => announce(markCommunityVisited())}
    >
      {children}
    </a>
  );
}

export default function TelegramCard() {
  return (
    <TelegramLink className="card tg-card">
      <span className="tg-icon" aria-hidden="true">
        <Send size={22} />
      </span>
      <span className="tg-text">
        <strong>Join the Evermore community</strong>
        <span>Chat, share and stay in the loop on Telegram.</span>
      </span>
      <ArrowUpRight size={20} className="tg-arrow" aria-hidden="true" />
    </TelegramLink>
  );
}
