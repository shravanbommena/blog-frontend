import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Header from "../Header";

const CreatePost = ({ history }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://blog-backend-0wcr.onrender.com/api/blogposts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, content, status }),
    })
      .then((res) => res.json())
      .then(() => history.push("/")) // Redirect to home on successful post creation
      .catch((err) => console.error("Failed to create post:", err));
  };

  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-80px)] mt-20 p-5 bg-slate-50 flex flex-col items-center">
        <h1 className="text-3xl text-center mb-3">Create New Post</h1>
        <form
          className=" bg-white flex flex-col w-[95%] max-w-2xl p-4 rounded shadow-lg "
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="h-11 border border-solid border-slate-400 rounded py-2 px-3 outline-none mb-4"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="h-72 border border-solid border-slate-400 rounded py-2 px-3 outline-none mb-4"
          />
          <select
            className="w-28 h-9 p-2 mb-3 outline-none cursor-pointer"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <button
            className="self-start h-9 w-28 rounded cursor-pointer bg-blue-400 font-bold text-white"
            type="submit"
          >
            Create Post
          </button>
        </form>
      </div>
    </>
  );
};

export default withRouter(CreatePost);
