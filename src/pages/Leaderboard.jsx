import {
  ArrowLeft,
  LogOut,
  Trophy,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Leaderboard() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const loadLeaderboard = async () => {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      setCurrentUserId(user.id);

      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, username, avatar_url, points, streak_count")
        .order("points", { ascending: false });

      if (error) {
        console.error("Leaderboard error:", error);
      } else {
        setUsers(data || []);
      }

      setLoading(false);
    };

    loadLeaderboard();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="leaderboard-page">

      {/* Header */}
      <header className="leaderboard-header">

        <button
          className="leaderboard-back"
          onClick={() => navigate("/home")}
        >
          <ArrowLeft size={19} />
          Back
        </button>

        <div className="leaderboard-title">
          <Trophy size={22} />
          <h1>Leaderboard</h1>
        </div>

        <button
          className="leaderboard-logout"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Log out
        </button>

      </header>

      {/* Content */}
      <main className="leaderboard-content">

        <div className="leaderboard-intro">
          <p className="eyebrow">EVERMORE COMMUNITY</p>

          <h2>
            Community Leaders 🏆
          </h2>

          <p>
            Stay active, earn points, and climb the leaderboard.
          </p>
        </div>

        {loading ? (

          <div className="leaderboard-empty">
            <Trophy size={35} />
            <h3>Loading leaderboard...</h3>
            <p>Getting the latest rankings.</p>
          </div>

        ) : users.length === 0 ? (

          <div className="leaderboard-empty">
            <Trophy size={35} />
            <h3>No rankings yet</h3>
            <p>Be the first person to earn points.</p>
          </div>

        ) : (

          <div className="leaderboard-list">

            {users.map((person, index) => {

              const isCurrentUser =
                person.id === currentUserId;

              return (
                <div
                  className={`leaderboard-row ${
                    isCurrentUser
                      ? "leaderboard-current"
                      : ""
                  }`}
                  key={person.id}
                >

                  {/* Rank */}
                  <div className="leaderboard-rank">
                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : index === 2
                      ? "🥉"
                      : index + 1}
                  </div>

                  {/* Avatar */}
                  <div className="leaderboard-avatar">
                    <User size={20} />
                  </div>

                  {/* User */}
                  <div className="leaderboard-user">

                    <strong>
                      {person.full_name ||
                        "Evermore User"}

                      {isCurrentUser && (
                        <span className="you-badge">
                          You
                        </span>
                      )}
                    </strong>

                    <span>
                      @{person.username || "user"}
                    </span>

                  </div>

                  {/* Stats */}
                  <div className="leaderboard-stats">

                    <strong>
                      {person.points ?? 0}
                    </strong>

                    <span>
                      points
                    </span>

                  </div>

                </div>
              );
            })}

          </div>

        )}

      </main>

    </div>
  );
}

export default Leaderboard;