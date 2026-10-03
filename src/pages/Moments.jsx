import { useEffect, useRef, useState } from "react";
import { Lock, Trash2 } from "lucide-react";
import { useStore } from "../lib/store";
import { addMoment, deleteMoment, POINTS } from "../lib/progress";
import { announce } from "../lib/announce";
import { formatMoment } from "../lib/dates";

const MOODS = ["😄", "🙂", "😐", "😔", "😤"];
const MAX = 280;

export default function Moments() {
  const { moments } = useStore();
  const [text, setText] = useState("");
  const [mood, setMood] = useState(MOODS[1]);
  const [pendingDelete, setPendingDelete] = useState(null);
  const timer = useRef();

  useEffect(() => () => clearTimeout(timer.current), []);

  const save = (e) => {
    e.preventDefault();
    const result = addMoment(text, mood);
    if (result) {
      announce(result);
      setText("");
    }
  };

  const askDelete = (id) => {
    if (pendingDelete === id) {
      deleteMoment(id);
      setPendingDelete(null);
      return;
    }
    setPendingDelete(id);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setPendingDelete(null), 3000);
  };

  return (
    <>
      <header className="page-header">
        <div>
          <p className="eyebrow">Your space</p>
          <h1>Moments</h1>
        </div>
      </header>

      <form className="card composer" onSubmit={save}>
        <label className="sr-only" htmlFor="moment-text">
          Write a moment
        </label>
        <textarea
          id="moment-text"
          className="input textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind today?"
          maxLength={MAX}
          rows={4}
        />
        <div className="composer-row">
          <div className="moods" role="radiogroup" aria-label="Mood">
            {MOODS.map((m) => (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={mood === m}
                className={`mood ${mood === m ? "on" : ""}`}
                onClick={() => setMood(m)}
              >
                {m}
              </button>
            ))}
          </div>
          <span className="muted small">
            {text.length}/{MAX}
          </span>
        </div>
        <button className="btn btn-primary btn-block" disabled={!text.trim()}>
          Save moment · +{POINTS.moment}
        </button>
        <p className="privacy-note">
          <Lock size={13} aria-hidden="true" /> Private. Stored only on this device. First moment each day earns points.
        </p>
      </form>

      {moments.length === 0 ? (
        <div className="empty">
          <div className="empty-icon" aria-hidden="true">📝</div>
          <h2>No moments yet</h2>
          <p className="muted">Capture a thought, a win, or how today feels. Only you can see it.</p>
        </div>
      ) : (
        <ul className="moment-list">
          {moments.map((m) => (
            <li className="card moment" key={m.id}>
              <span className="moment-mood" aria-hidden="true">{m.mood}</span>
              <div className="moment-body">
                <p>{m.text}</p>
                <time className="muted small" dateTime={m.createdAt}>
                  {formatMoment(m.createdAt)}
                </time>
              </div>
              <button
                className={`icon-btn danger ${pendingDelete === m.id ? "armed" : ""}`}
                onClick={() => askDelete(m.id)}
                aria-label={pendingDelete === m.id ? "Tap again to confirm delete" : "Delete moment"}
              >
                {pendingDelete === m.id ? <span className="small">Sure?</span> : <Trash2 size={17} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
