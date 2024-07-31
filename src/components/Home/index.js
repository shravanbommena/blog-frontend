import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://blog-backend-0wcr.onrender.com/api/blogposts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-80px)] mt-20 p-5 bg-slate-50">
        <h1 className="text-3xl text-center mb-3">All Posts</h1>
        <div className="flex justify-end items-center mb-3">
          <button className="h-9 w-40 border border-stone-950 rounded ">
            <Link to="/create-post">+ Create New Post</Link>
          </button>
        </div>
        <ul className="list-none p-0 flex flex-wrap">
          {posts.map((post) => (
            <li
              className="bg-white w-full sm:w-96 h-96  border border-slate-400 p-4 rounded-md"
              key={post._id}
            >
              <Link to={`/post/${post._id}`}>
                <h4 className="text-lg text-black font-medium mb-3">
                  {post.title}
                </h4>
                <p className="h-72 overflow-hidden text-ellipsis  text-slate-600">
                  {post.content}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
