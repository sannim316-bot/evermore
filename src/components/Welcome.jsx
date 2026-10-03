import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { finishOnboarding } from "../lib/progress";

/** First-run screen. No account, no email: just an optional name. */
export default function Welcome() {
  const [name, setName] = useState("");

  const submit = (e) => {
    e.preventDefault();
    finishOnboarding(name);
  };

  return (
    <div className="welcome" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
      <div className="glow glow-a" />
      <div className="glow glow-b" />
      <form className="welcome-inner" onSubmit={submit}>
        <div className="logo logo-lg">
          evermore<span>.</span>
        </div>
        <h1 id="welcome-title">Keep showing up.</h1>
        <p className="welcome-lead">
          Small daily moments, a streak that keeps you going, and a community
          waiting on Telegram. No sign-up. Everything stays on your device.
        </p>

        <label className="field-label" htmlFor="welcome-name">
          What should we call you? <span>(optional)</span>
        </label>
        <input
          id="welcome-name"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your first name"
          maxLength={30}
          autoComplete="off"
          enterKeyHint="go"
        />

        <button type="submit" className="btn btn-primary btn-block">
          Get started <ArrowRight size={18} />
        </button>
      </form>
    </div>
  );
}
