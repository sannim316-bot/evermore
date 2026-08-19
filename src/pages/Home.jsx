import {
  Bell,
  Flag,
  Home as HomeIcon,
  LogOut,
  Menu,
  Plus,
  Send,
  Settings,
  Trophy,
  User,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import CreatePost from "../components/CreatePost";

function Home() {
  const navigate = useNavigate();

  // =========================
  // BASIC STATES
  // =========================
  const [showCreatePost, setShowCreatePost] = useState(false);

  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const [likedPosts, setLikedPosts] = useState([]);

  const [mobileMenu, setMobileMenu] = useState(false);

  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // =========================
  // COMMENT STATES
  // =========================
  const [showComments, setShowComments] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  // =========================
  // REPORT STATES
  // =========================
  const [showReport, setShowReport] = useState(false);
  const [reportedPost, setReportedPost] = useState(null);
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [submittingReport, setSubmittingReport] = useState(false);

  // =========================
  // FETCH POSTS
  // =========================
  const fetchPosts = async () => {
    setLoadingPosts(true);

    const { data, error } = await supabase
      .from("posts")
      .select(`
        id,
        content,
        image_url,
        likes_count,
        comments_count,
        created_at,
        user_id,
        profiles (
          full_name,
          username,
          avatar_url
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      setPosts(data || []);
    }

    setLoadingPosts(false);
  };

  // =========================
  // FETCH USER'S LIKES
  // =========================
  const fetchLikedPosts = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("post_likes")
      .select("post_id")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching likes:", error);
      return;
    }

    setLikedPosts(
      (data || []).map((like) => like.post_id)
    );
  };

  // =========================
  // LIKE / UNLIKE
  // =========================
  const toggleLike = async (postId) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    const alreadyLiked = likedPosts.includes(postId);

    if (alreadyLiked) {
      const { error } = await supabase
        .from("post_likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", user.id);

      if (error) {
        console.error("Unlike error:", error);
        return;
      }

      setLikedPosts((current) =>
        current.filter((id) => id !== postId)
      );
    } else {
      const { error } = await supabase
        .from("post_likes")
        .insert({
          post_id: postId,
          user_id: user.id,
        });

      if (error) {
        console.error("Like error:", error);
        return;
      }

      setLikedPosts((current) => [
        ...current,
        postId,
      ]);
    }

    await fetchPosts();
  };

  // =========================
  // FETCH COMMENTS
  // =========================
  const fetchComments = async (postId) => {
    setLoadingComments(true);

    const { data, error } = await supabase
      .from("comments")
      .select(`
        id,
        content,
        created_at,
        user_id,
        profiles (
          full_name,
          username,
          avatar_url
        )
      `)
      .eq("post_id", postId)
      .order("created_at", {
        ascending: true,
      });

    if (error) {
      console.error(
        "Error fetching comments:",
        error
      );
    } else {
      setComments(data || []);
    }

    setLoadingComments(false);
  };

  // =========================
  // OPEN COMMENTS
  // =========================
  const openComments = async (post) => {
    setSelectedPost(post);
    setShowComments(true);
    setCommentText("");

    await fetchComments(post.id);
  };

  // =========================
  // CLOSE COMMENTS
  // =========================
  const closeComments = () => {
    setShowComments(false);
    setSelectedPost(null);
    setComments([]);
    setCommentText("");
  };

  // =========================
  // ADD COMMENT
  // =========================
  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) return;

    if (!selectedPost) return;

    setSubmittingComment(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      setSubmittingComment(false);
      return;
    }

    const { error } = await supabase
      .from("comments")
      .insert({
        post_id: selectedPost.id,
        user_id: user.id,
        content: commentText.trim(),
      });

    if (error) {
      console.error(
        "Error adding comment:",
        error
      );

      setSubmittingComment(false);
      return;
    }

    setCommentText("");

    await fetchComments(selectedPost.id);

    await fetchPosts();

    setSelectedPost((current) =>
      current
        ? {
            ...current,
            comments_count:
              (current.comments_count || 0) + 1,
          }
        : current
    );

    setSubmittingComment(false);
  };

  // =========================
  // OPEN REPORT
  // =========================
  const openReport = (post) => {
    setReportedPost(post);
    setReportReason("");
    setReportDetails("");
    setShowReport(true);
  };

  // =========================
  // CLOSE REPORT
  // =========================
  const closeReport = () => {
    setShowReport(false);
    setReportedPost(null);
    setReportReason("");
    setReportDetails("");
  };

  // =========================
  // SUBMIT REPORT
  // =========================
  const handleReport = async (e) => {
    e.preventDefault();

    if (!reportReason || !reportedPost) return;

    setSubmittingReport(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      setSubmittingReport(false);
      return;
    }

    const { error } = await supabase
      .from("reports")
      .insert({
        reporter_id: user.id,
        post_id: reportedPost.id,
        reason: reportReason,
        details: reportDetails.trim() || null,
      });

    if (error) {
      console.error("Report error:", error);

      alert(
        "Unable to submit report. Please try again."
      );

      setSubmittingReport(false);
      return;
    }

    alert(
      "Thank you. Your report has been submitted and will be reviewed."
    );

    setSubmittingReport(false);
    closeReport();
  };

  // =========================
  // GET PROFILE
  // =========================
  useEffect(() => {
    const getProfile = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          navigate("/login");
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error(
            "Profile error:",
            error
          );
          return;
        }

        setProfile(data);
      } catch (error) {
        console.error(
          "Error loading profile:",
          error
        );
      } finally {
        setLoadingProfile(false);
      }
    };

    getProfile();
  }, [navigate]);

  // =========================
  // LOAD POSTS + LIKES
  // =========================
  useEffect(() => {
    fetchPosts();
    fetchLikedPosts();
  }, []);

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="home-page">

      {/* =========================
          MOBILE OVERLAY
      ========================= */}
      {mobileMenu && (
        <div
          className="mobile-overlay"
          onClick={() =>
            setMobileMenu(false)
          }
        ></div>
      )}

      {/* =========================
          SIDEBAR
      ========================= */}
      <aside
        className={`sidebar ${
          mobileMenu
            ? "sidebar-open"
            : ""
        }`}
      >
        <div className="sidebar-top">

          <div className="home-logo">
            evermore<span>.</span>
          </div>

          <button
            className="mobile-close"
            onClick={() =>
              setMobileMenu(false)
            }
          >
            <X size={21} />
          </button>

        </div>

        <nav className="sidebar-nav">

          <button className="nav-item active">
            <HomeIcon size={19} />
            <span>Home</span>
          </button>

          <button
            className="nav-item"
            onClick={() => navigate("/profile")}
          >
            <User size={19} />
            <span>Profile</span>
          </button>

          <button
            className="nav-item"
            onClick={() =>
              navigate("/leaderboard")
            }
          >
            <Trophy size={19} />
            <span>Leaderboard</span>
          </button>

          <button
            className="nav-item"
            onClick={() =>
              navigate("/settings")
            }
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>

        </nav>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span>Log out</span>
        </button>

      </aside>

      {/* =========================
          MAIN
      ========================= */}
      <main className="home-main">

        {/* HEADER */}
        <header className="home-header">

          <button
            className="mobile-menu"
            onClick={() =>
              setMobileMenu(true)
            }
          >
            <Menu size={22} />
          </button>

          <div className="mobile-title">
            evermore<span>.</span>
          </div>

          <div className="header-actions">

            <button className="header-icon">
              <Bell size={19} />
            </button>

            <button className="header-avatar">
              <User size={18} />
            </button>

          </div>

        </header>

        <div className="home-content">

          {/* =========================
              FEED
          ========================= */}
          <section className="feed-section">

            {/* WELCOME */}
            <div className="welcome-section">

              <div>

                <p className="eyebrow">
                  YOUR COMMUNITY
                </p>

                <h1>
                  Welcome to Evermore.
                </h1>

                <p>
                  Share your thoughts, connect
                  with people, and keep your
                  streak alive.
                </p>

              </div>

              <button
                className="create-post-btn"
                onClick={() =>
                  setShowCreatePost(true)
                }
              >
                <Plus size={18} />
                Create post
              </button>

            </div>

            {/* =========================
                POSTS
            ========================= */}
            {loadingPosts ? (

              <div className="feed-placeholder">

                <div className="placeholder-icon">
                  ✦
                </div>

                <h2>
                  Loading your feed...
                </h2>

                <p>
                  Getting the latest posts
                  from Evermore.
                </p>

              </div>

            ) : posts.length === 0 ? (

              <div className="feed-placeholder">

                <div className="placeholder-icon">
                  ✦
                </div>

                <h2>
                  Your feed is waiting.
                </h2>

                <p>
                  Be the first person to share
                  something with your community.
                </p>

                <button
                  className="create-post-btn"
                  onClick={() =>
                    setShowCreatePost(true)
                  }
                >
                  <Plus size={18} />
                  Create your first post
                </button>

              </div>

            ) : (

              <div className="posts-list">

                {posts.map((post) => (

                  <article
                    className="post-card"
                    key={post.id}
                  >

                    {/* POST HEADER */}
                    <div className="post-card-header">

                      <div className="post-user-avatar">
                        <User size={18} />
                      </div>

                      <div>

                        <h3>
                          {post.profiles
                            ?.full_name ||
                            "Evermore User"}
                        </h3>

                        <p>
                          @
                          {post.profiles
                            ?.username ||
                            "user"}
                        </p>

                      </div>

                    </div>

                    {/* POST CONTENT */}
                    <div className="post-content">
                      {post.content}
                    </div>

                    {/* POST ACTIONS */}
                    <div className="post-actions">

                      {/* LIKE */}
                      <button
                        className={
                          likedPosts.includes(
                            post.id
                          )
                            ? "liked"
                            : ""
                        }
                        onClick={() =>
                          toggleLike(post.id)
                        }
                      >
                        {likedPosts.includes(
                          post.id
                        )
                          ? "❤️"
                          : "♡"}{" "}
                        {post.likes_count || 0}
                      </button>

                      {/* COMMENT */}
                      <button
                        onClick={() =>
                          openComments(post)
                        }
                      >
                        💬{" "}
                        {post.comments_count ||
                          0}
                      </button>

                      {/* REPORT */}
                      <button
                        onClick={() =>
                          openReport(post)
                        }
                        title="Report this post"
                      >
                        <Flag size={16} />
                        Report
                      </button>

                    </div>

                  </article>

                ))}

              </div>

            )}

          </section>

          {/* =========================
              RIGHT PANEL
          ========================= */}
          <aside className="home-right">

            <div className="profile-card">

              <div className="profile-avatar">
                <User size={25} />
              </div>

              <h3>
                {profile
                  ? profile.full_name
                  : "No profile found"}
              </h3>

              <p>
                {profile
                  ? `@${profile.username}`
                  : "No username found"}
              </p>

              <div className="profile-stats">

                <div>

                  <strong>
                    {profile?.points ?? 0}
                  </strong>

                  <span>
                    Points
                  </span>

                </div>

                <div>

                  <strong>
                    {profile?.streak_count ?? 0}
                  </strong>

                  <span>
                    Streak
                  </span>

                </div>

              </div>

              <button
                className="view-profile-btn"
                onClick={() =>
                  navigate("/profile")
                }
              >
                View profile
              </button>

            </div>

            <div className="streak-card">

              <div className="streak-icon">
                🔥
              </div>

              <div>

                <strong>
                  Start your streak
                </strong>

                <p>
                  Be active today and start
                  building momentum.
                </p>

              </div>

            </div>

          </aside>

        </div>

      </main>

      {/* =========================
          CREATE POST MODAL
      ========================= */}
      {showCreatePost && (
        <CreatePost
          onClose={() =>
            setShowCreatePost(false)
          }
          onPostCreated={() => {
            fetchPosts();
          }}
        />
      )}

      {/* =========================
          COMMENTS MODAL
      ========================= */}
      {showComments && selectedPost && (

        <div className="comments-overlay">

          <div className="comments-modal">

            <div className="comments-header">

              <div>
                <h2>
                  Comments
                </h2>

                <p>
                  {selectedPost.comments_count ||
                    0}{" "}
                  comments
                </p>
              </div>

              <button
                className="comments-close"
                onClick={closeComments}
              >
                <X size={22} />
              </button>

            </div>

            <div className="comments-body">

              {loadingComments ? (

                <div className="comments-loading">
                  Loading comments...
                </div>

              ) : comments.length === 0 ? (

                <div className="no-comments">

                  <div className="no-comments-icon">
                    💬
                  </div>

                  <h3>
                    No comments yet
                  </h3>

                  <p>
                    Be the first person to
                    comment on this post.
                  </p>

                </div>

              ) : (

                comments.map((comment) => (

                  <div
                    className="comment-item"
                    key={comment.id}
                  >

                    <div className="comment-avatar">
                      <User size={16} />
                    </div>

                    <div className="comment-content">

                      <div className="comment-user">

                        <strong>
                          {comment.profiles
                            ?.full_name ||
                            "Evermore User"}
                        </strong>

                        <span>
                          @
                          {comment.profiles
                            ?.username ||
                            "user"}
                        </span>

                      </div>

                      <p>
                        {comment.content}
                      </p>

                    </div>

                  </div>

                ))

              )}

            </div>

            <form
              className="comment-form"
              onSubmit={handleAddComment}
            >

              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) =>
                  setCommentText(
                    e.target.value
                  )
                }
                disabled={submittingComment}
              />

              <button
                type="submit"
                disabled={
                  submittingComment ||
                  !commentText.trim()
                }
              >
                <Send size={17} />

                {submittingComment
                  ? "Sending..."
                  : "Send"}
              </button>

            </form>

          </div>

        </div>

      )}

      {/* =========================
          REPORT MODAL
      ========================= */}
      {showReport && reportedPost && (

        <div className="comments-overlay">

          <div className="comments-modal">

            <div className="comments-header">

              <div>
                <h2>
                  Report post
                </h2>

                <p>
                  Help us keep Evermore safe.
                </p>
              </div>

              <button
                className="comments-close"
                onClick={closeReport}
              >
                <X size={22} />
              </button>

            </div>

            <form
              onSubmit={handleReport}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                padding: "20px",
              }}
            >

              <div>

                <label
                  htmlFor="report-reason"
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: 600,
                  }}
                >
                  Why are you reporting this post?
                </label>

                <select
                  id="report-reason"
                  value={reportReason}
                  onChange={(e) =>
                    setReportReason(
                      e.target.value
                    )
                  }
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid #ddd",
                  }}
                >

                  <option value="">
                    Select a reason
                  </option>

                  <option value="Child safety">
                    Child safety / suspected CSAE
                  </option>

                  <option value="Sexual content">
                    Sexual or inappropriate content
                  </option>

                  <option value="Harassment">
                    Harassment or bullying
                  </option>

                  <option value="Hate speech">
                    Hate speech
                  </option>

                  <option value="Violence">
                    Violence or dangerous content
                  </option>

                  <option value="Spam">
                    Spam or scam
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

              <div>

                <label
                  htmlFor="report-details"
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: 600,
                  }}
                >
                  Additional details
                </label>

                <textarea
                  id="report-details"
                  placeholder="Tell us more about the problem..."
                  value={reportDetails}
                  onChange={(e) =>
                    setReportDetails(
                      e.target.value
                    )
                  }
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid #ddd",
                    resize: "vertical",
                  }}
                />

              </div>

              <button
                type="submit"
                disabled={
                  submittingReport ||
                  !reportReason
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >

                <Flag size={17} />

                {submittingReport
                  ? "Submitting..."
                  : "Submit report"}

              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Home;