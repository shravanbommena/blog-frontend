import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://blog-backend-0wcr.onrender.com/api/blogposts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error("Error fetching post:", err));
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ post: id, content: comment }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle successful comment submission
        setComment("");
        // Optionally, fetch the updated list of comments
      })
      .catch((err) => console.error("Error posting comment:", err));
  };

  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-80px)] mt-20 p-5 bg-slate-50">
        {post ? (
          <>
            <div className="bg-white border border-slate-400 p-5 rounded">
              <h1 className="text-2xl mb-2">{post.title}</h1>
              <p className="text-lg text-slate-700">{post.content}</p>
            </div>
            <div className="bg-slate-100 border border-slate-400 p-5">
              <h3 className="text-xl mb-3 ">Comments:</h3>
              {/* Render comments here */}
              <form
                className="bg-white flex flex-col "
                onSubmit={handleCommentSubmit}
              >
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  className="border border-solid border-slate-400 h-44 rounded outline-none p-3 text-base"
                />

                <div className="flex justify-end bg-slate-100 pt-4">
                  <button
                    className="h-10 w-32 bg-blue-400 rounded text-white font-bold"
                    type="submit"
                  >
                    Add Comment
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default PostDetail;
