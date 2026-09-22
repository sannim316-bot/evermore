import {
  ArrowRight,
  Flame,
  Users,
  Trophy,
  MessageCircle,
  Star,
} from "lucide-react";

import { Link } from "react-router-dom";

function Landing() {
  return (
    <main className="landing-page">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          evermore<span>.</span>
        </div>

        <div className="nav-links">
          <a href="#community">Community</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </div>

        <div className="nav-actions">
        <Link to="/login" className="login-btn">
  Log in
</Link>

          <Link to="/signup" className="join-btn">
  Join Evermore
</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span>✦</span>
            A community that keeps you moving
          </div>

          <h1>
            Connect.
            <br />
            <span>Grow together.</span>
          </h1>

          <p>
            Evermore is a modern community where your connections,
            conversations, and everyday participation actually count.
          </p>

          <div className="hero-actions">
            <button className="primary-btn">
              Join Evermore
              <ArrowRight size={18} />
            </button>

            <button className="secondary-btn">
              Explore community
            </button>
          </div>

          <div className="member-preview">
            <div className="avatars">
              <div className="avatar">A</div>
              <div className="avatar">M</div>
              <div className="avatar">J</div>
              <div className="avatar">S</div>
              <div className="avatar">K</div>
            </div>

            <span>
              Join <strong>10,000+</strong> members already growing
              together
            </span>
          </div>
        </div>

        {/* PROGRESS CARD */}
        <div className="hero-card">
          <div className="card-header">
            <div>
              <span className="small-label">YOUR PROGRESS</span>
              <h3>Keep showing up.</h3>
            </div>

            <div className="level">LVL 08</div>
          </div>

          <div className="streak-card">
            <div className="icon-box flame">
              <Flame size={24} />
            </div>

            <div>
              <span>Current streak</span>
              <strong>12 days</strong>
            </div>
          </div>

          <div className="stats">
            <div className="stat">
              <Users size={21} />

              <div>
                <strong>248</strong>
                <span>Connections</span>
              </div>
            </div>

            <div className="stat">
              <Trophy size={21} />

              <div>
                <strong>1,840</strong>
                <span>Points</span>
              </div>
            </div>
          </div>

          <div className="progress-area">
            <div className="progress-text">
              <span>Next level</span>
              <span>72%</span>
            </div>

            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section" id="features">
        <div className="section-heading">
          <span>WHY EVERMORE</span>

          <h2>
            More than just another
            <br />
            social app.
          </h2>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Users size={22} />
            </div>

            <span className="feature-number">01</span>

            <h3>Connect</h3>

            <p>
              Meet people, build meaningful connections, and become
              part of something bigger.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <MessageCircle size={22} />
            </div>

            <span className="feature-number">02</span>

            <h3>Participate</h3>

            <p>
              Share your thoughts, join conversations, and make your
              presence count.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Star size={22} />
            </div>

            <span className="feature-number">03</span>

            <h3>Keep growing</h3>

            <p>
              Earn points, maintain streaks, and unlock achievements
              as you stay active.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="community">
        <div className="cta-icon">
          <Users size={24} />
        </div>

        <div className="cta-content">
          <span>YOUR COMMUNITY AWAITS</span>

          <h2>Show up. Make it count.</h2>
        </div>

        <button className="cta-btn">
          Get started
          <ArrowRight size={18} />
        </button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-brand">
          <div className="logo">
            evermore<span>.</span>
          </div>

          <p>Connect. Engage. Keep the streak alive.</p>
        </div>

        <div className="footer-links">
          <span>Quick links</span>

          <div>
            <a href="#community">Community</a>
            <a href="#features">Features</a>
            <a href="#about">About</a>
          </div>
        </div>

      <div className="social-links">
  <span>Follow us</span>

  <div>
    <button>IG</button>
    <button>YT</button>
  </div>
</div>

        <span className="copyright">
          © 2026 Evermore. All rights reserved.
        </span>
      </footer>
    </main>
  );
}

export default Landing;