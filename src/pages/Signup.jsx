import {
  ArrowLeft,
  ArrowRight,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../lib/supabase";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Check passwords
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Basic password check
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            username: formData.username,
          },
        },
      });

      if (error) {
        throw error;
      }

      console.log("Signup successful:", data);

      setSuccess(
        "Account created successfully! Check your email to verify your account."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2500);
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

            <h1>Join Evermore.</h1>

            <p>
              Create your account and start your journey.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSignup}>
            {/* Full name */}
            <div className="input-group">
              <label>Full name</label>

              <div className="input-wrapper">
                <User size={18} />

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </div>
            </div>

            {/* Username */}
            <div className="input-group">
              <label>Username</label>

              <div className="input-wrapper">
                <User size={18} />

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="@username"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="input-group">
              <label>Email address</label>

              <div className="input-wrapper">
                <Mail size={18} />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="input-group">
              <label>Password</label>

              <div className="input-wrapper">
                <Lock size={18} />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>

            {/* Confirm password */}
            <div className="input-group">
              <label>Confirm password</label>

              <div className="input-wrapper">
                <Lock size={18} />

                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            {/* Messages */}
            {error && (
              <div className="auth-message auth-error">
                {error}
              </div>
            )}

            {success && (
              <div className="auth-message auth-success">
                {success}
              </div>
            )}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}

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
            Already have an account?{" "}
            <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Signup;