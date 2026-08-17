import {
  ArrowLeft,
  Edit3,
  LogOut,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Profile() {
  const navigate = useNavigate();

 const [profile, setProfile] = useState(null);
const [userEmail, setUserEmail] = useState("");
const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const [saving, setSaving] = useState(false);

  // =========================
  // LOAD PROFILE
  // =========================
  useEffect(() => {
    const loadProfile = async () => {
     const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  navigate("/login");
  return;
}

setUserEmail(user.email || "");

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Profile error:", error);
      } else {
        setProfile(data);
        setFullName(data.full_name || "");
        setUsername(data.username || "");
        setBio(data.bio || "");
      }

      setLoading(false);
    };

    loadProfile();
  }, [navigate]);

  // =========================
  // SAVE PROFILE
  // =========================
  const handleSave = async () => {
    if (!profile) return;

    setSaving(true);

    const { data, error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName.trim(),
        username: username.trim(),
        bio: bio.trim(),
      })
      .eq("id", profile.id)
      .select()
      .single();

    if (error) {
      console.error("Update profile error:", error);
      alert(error.message);
    } else {
      setProfile(data);
      setEditing(false);
    }

    setSaving(false);
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="profile-loading">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="profile-page">

      {/* HEADER */}
      <header className="profile-header">

        <button
          className="profile-back"
          onClick={() => navigate("/home")}
        >
          <ArrowLeft size={19} />
          Back
        </button>

        <h1>My Profile</h1>

        <button
          className="profile-edit-btn"
          onClick={() => setEditing(!editing)}
        >
          <Edit3 size={17} />
          {editing ? "Cancel" : "Edit"}
        </button>

      </header>

      {/* CONTENT */}
      <main className="profile-content">

        {/* PROFILE CARD */}
        <section className="profile-main-card">

          <div className="profile-big-avatar">
            <User size={45} />
          </div>

          {!editing ? (
            <>
              <h2>
                {profile?.full_name ||
                  "Evermore User"}
              </h2>

              <p className="profile-username">
                @{profile?.username || "user"}
              </p>

              <p className="profile-bio">
                {profile?.bio ||
                  "Welcome to my Evermore profile."}
              </p>
            </>
          ) : (
            <div className="profile-edit-form">

              <label>
                Full name
              </label>

              <input
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                placeholder="Your full name"
              />

              <label>
                Username
              </label>

              <input
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                placeholder="Username"
              />

              <label>
                Bio
              </label>

              <textarea
                value={bio}
                onChange={(e) =>
                  setBio(e.target.value)
                }
                placeholder="Tell people about yourself..."
                rows="4"
              />

              <button
                className="save-profile-btn"
                onClick={handleSave}
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Save changes"}
              </button>

            </div>
          )}

          {/* STATS */}
          <div className="profile-page-stats">

            <div>
              <strong>
                {profile?.points ?? 0}
              </strong>
              <span>Points</span>
            </div>

            <div>
              <strong>
                {profile?.streak_count ?? 0}
              </strong>
              <span>Streak</span>
            </div>

          </div>

        </section>

        {/* ACCOUNT */}
        <section className="account-card">

          <h2>Account</h2>

          <div className="account-row">
            <div>
              <span>Email</span>
             <strong>
  {userEmail || "No email found"}
</strong>
            </div>
          </div>

          <button
            className="profile-logout"
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

export default Profile;