import { Lock } from "lucide-react";
import { useStore } from "../lib/store";
import { BADGES } from "../lib/badges";
import { getLevel, liveStreak } from "../lib/progress";

export default function Journey() {
  const state = useStore();
  const level = getLevel(state.points);
  const streak = liveStreak(state);
  const earned = BADGES.filter((b) => b.test(state));

  const stats = [
    { label: "Points", value: state.points.toLocaleString() },
    { label: "Current streak", value: streak },
    { label: "Longest streak", value: Math.max(state.longestStreak, streak) },
    { label: "Active days", value: state.activeDays.length },
  ];

  return (
    <>
      <header className="page-header">
        <div>
          <p className="eyebrow">Your progress</p>
          <h1>Journey</h1>
        </div>
      </header>

      <section className="card journey-hero">
        <div className="lvl-badge" aria-hidden="true">
          {level.level}
        </div>
        <div>
          <p className="level-title">{level.title}</p>
          <p className="muted">
            Level {level.level} · {level.toNext} pts to go
          </p>
        </div>
      </section>

      <section className="stats" aria-label="Stats">
        {stats.map((s) => (
          <div className="card stat" key={s.label}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </section>

      <div className="section-title">
        <h2>Badges</h2>
        <span className="muted small">
          {earned.length} / {BADGES.length}
        </span>
      </div>

      <ul className="badge-grid">
        {BADGES.map((b) => {
          const on = b.test(state);
          return (
            <li className={`card badge ${on ? "on" : "off"}`} key={b.id}>
              <span className="badge-emoji" aria-hidden="true">
                {on ? b.emoji : <Lock size={20} />}
              </span>
              <strong>{b.title}</strong>
              <span>{b.desc}</span>
              <span className="sr-only">{on ? "Unlocked" : "Locked"}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
