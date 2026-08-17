import { Image, Send, X } from "lucide-react";
import { useState } from "react";
import { supabase } from "../lib/supabase";

function CreatePost({ onClose, onPostCreated }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      setError("Write something before posting.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("You must be logged in to post.");
        return;
      }

      const { data, error } = await supabase
        .from("posts")
        .insert({
          user_id: user.id,
          content: content.trim(),
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      setContent("");

      if (onPostCreated) {
        onPostCreated(data);
      }

      onClose();
    } catch (error) {
      console.error("Create post error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-modal-overlay" onClick={onClose}>
      <div
        className="post-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="post-modal-header">
          <div>
            <h2>Create a post</h2>
            <p>Share something with your community.</p>
          </div>

          <button
            className="close-modal"
            onClick={onClose}
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            maxLength={500}
            autoFocus
          />

          <div className="post-modal-bottom">
            <div className="post-tools">
              <button type="button" disabled>
                <Image size={18} />
              </button>

              <span>{content.length}/500</span>
            </div>

            <button
              type="submit"
              className="publish-btn"
              disabled={loading}
            >
              {loading ? "Posting..." : "Publish"}
              {!loading && <Send size={16} />}
            </button>
          </div>

          {error && (
            <div className="auth-message auth-error">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreatePost;