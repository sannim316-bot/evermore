import {
  ArrowLeft,
  ArrowRight,
  Lock,
  Mail,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../lib/supabase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      console.log("Login successful:", data);

      navigate("/home");
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-glow auth-glow-one"></div>
      <div className="auth-glow auth-glow-two"></div>

      <Link to="/" className="auth-logo">
        evermore<span>.</span>
      </Link>

      <div className="auth-container">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon">✦</div>

            <h1>Welcome back.</h1>

            <p>
              Log in to continue your Evermore journey.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email address</label>

              <div className="input-wrapper">
                <Mail size={18} />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <div className="password-label">
                <label>Password</label>
                <a href="#forgot">Forgot password?</a>
              </div>

              <div className="input-wrapper">
                <Lock size={18} />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="auth-message auth-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}

              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <button className="google-btn" type="button">
            <span className="google-icon">G</span>
            Continue with Google
          </button>

          <p className="auth-footer">
            Don't have an account?{" "}
            <Link to="/signup">Create one</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;