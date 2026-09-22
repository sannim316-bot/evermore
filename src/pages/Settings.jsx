import {
  ArrowLeft,
  LogOut,
  Settings as SettingsIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Settings() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="settings-page">
      <header className="settings-header">
        <button
          className="settings-back"
          onClick={() => navigate("/home")}
        >
          <ArrowLeft size={19} />
          Back
        </button>

        <div className="settings-title">
          <SettingsIcon size={22} />
          <h1>Settings</h1>
        </div>
      </header>

      <main className="settings-content">
        <section className="settings-card">
          <div className="settings-card-title">
            <SettingsIcon size={20} />
            <div>
              <h2>App Settings</h2>
              <p>Manage your Evermore experience.</p>
            </div>
          </div>

          <div className="settings-option">
            <div>
              <strong>Account</strong>
              <p>Manage your profile and account information.</p>
            </div>

            <button onClick={() => navigate("/profile")}>
              View profile
            </button>
          </div>

          <div className="settings-option">
            <div>
              <strong>Notifications</strong>
              <p>Notification preferences will be available soon.</p>
            </div>

            <span>Coming soon</span>
          </div>

          <div className="settings-option">
            <div>
              <strong>Privacy</strong>
              <p>Your Evermore account and community data.</p>
            </div>

            <span>Coming soon</span>
          </div>

          <button
            className="settings-logout"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Log out
          </button>
        </section>
      </main>
    </div>
  );
}

export default Settings;