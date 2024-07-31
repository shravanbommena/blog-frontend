import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

const EditPost = ({ match, history }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const { id } = match.params;

  useEffect(() => {
    fetch(`/api/blogposts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
        setStatus(data.status);
      })
      .catch((err) => console.error("Error fetching post:", err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/blogposts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, content, status }),
    })
      .then((res) => res.json())
      .then(() => history.push("/")) // Redirect to home on successful update
      .catch((err) => console.error("Failed to update post:", err));
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default withRouter(EditPost);
