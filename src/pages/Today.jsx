import { Link } from "react-router-dom";
import { Check, Flame, Settings, Sparkles } from "lucide-react";
import { useStore } from "../lib/store";
import { addDays, dateKey, greeting, weekdayLetter } from "../lib/dates";
import { checkIn, completeSpark, dailyState, getLevel, liveStreak, POINTS } from "../lib/progress";
import { sparkForDay } from "../lib/sparks";
import { announce } from "../lib/announce";
import TelegramCard from "../components/TelegramCard";

export default function Today() {
  const state = useStore();
  const today = dateKey();
  const daily = dailyState(state, today);
  const streak = liveStreak(state, today);
  const level = getLevel(state.points);
  const spark = sparkForDay(today);
  const longest = Math.max(state.longestStreak, streak);

  const week = Array.from({ length: 7 }, (_, i) => addDays(today, i - 6));

  return (
    <>
      <header className="page-header">
        <div>
          <p className="eyebrow">{greeting()}</p>
          <h1>{state.name || "Welcome back"}</h1>
        </div>
        <Link to="/about" className="icon-btn" aria-label="About and settings">
          <Settings size={20} />
        </Link>
      </header>

      <section className="card streak-card" aria-labelledby="streak-title">
        <div className="streak-top">
          <div className="flame" aria-hidden="true">
            <Flame size={30} />
          </div>
          <div>
            <p className="big-number" id="streak-title">
              {streak}
              <span> day{streak === 1 ? "" : "s"}</span>
            </p>
            <p className="muted">
              {streak === 0
                ? "Start your streak today."
                : `Longest: ${longest} day${longest === 1 ? "" : "s"}`}
            </p>
          </div>
        </div>

        <ol className="week" aria-label="Last 7 days">
          {week.map((day) => {
            const active = state.activeDays.includes(day);
            return (
              <li key={day} className={`dot ${active ? "on" : ""} ${day === today ? "today" : ""}`}>
                <span className="dot-mark" aria-hidden="true">
                  {active && <Check size={14} strokeWidth={3} />}
                </span>
                <span className="dot-label">{weekdayLetter(day)}</span>
                <span className="sr-only">{active ? "active" : "inactive"}</span>
              </li>
            );
          })}
        </ol>

        <button
          className="btn btn-primary btn-block"
          disabled={daily.checkIn}
          onClick={() => announce(checkIn())}
        >
          {daily.checkIn ? (
            <>
              <Check size={18} /> Checked in today
            </>
          ) : (
            <>Check in · +{POINTS.checkIn}</>
          )}
        </button>
      </section>

      <section className="card level-card" aria-label="Level">
        <div className="level-row">
          <div>
            <p className="eyebrow">Level {level.level}</p>
            <p className="level-title">{level.title}</p>
          </div>
          <p className="points">
            <strong>{state.points.toLocaleString()}</strong> pts
          </p>
        </div>
        <div
          className="bar"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(level.progress * 100)}
          aria-label="Progress to next level"
        >
          <div className="bar-fill" style={{ width: `${Math.round(level.progress * 100)}%` }} />
        </div>
        <p className="muted small">
          {level.toNext} points to level {level.level + 1}
        </p>
      </section>

      <section className="card spark-card" aria-labelledby="spark-title">
        <div className="spark-head">
          <span className="chip">
            <Sparkles size={14} aria-hidden="true" /> Today's spark · {spark.cat}
          </span>
        </div>
        <h2 id="spark-title">{spark.text}</h2>
        <button
          className="btn btn-ghost btn-block"
          disabled={daily.spark}
          onClick={() => announce(completeSpark())}
        >
          {daily.spark ? (
            <>
              <Check size={18} /> Done. Nice work
            </>
          ) : (
            <>I did it · +{POINTS.spark}</>
          )}
        </button>
      </section>

      <TelegramCard />
    </>
  );
}
