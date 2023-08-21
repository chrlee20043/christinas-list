import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import NewPostForm from "./NewPostForm";
import SinglePost from "./SinglePost";
import fetchAllPosts from "../API";

// User will see all posts and be able to click on one to see more details
// include search bar
export default function AllPosts({ token }) {
  const [posts, setPosts] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [error, setError] = useState(null);

  async function renderPosts() {
    try {
      const postArray = await fetchAllPosts();
      setPosts(postArray);
    } catch (error) {
      setError("No posts to see here");
    }
  }

  useEffect(() => {
    renderPosts();
  }, []);
  const navigate = useNavigate();

  const postsToDisplay = searchParam
    ? posts.filter((post) => post.title.toLowerCase().includes(searchParam))
    : posts;
  return (
    <div>
      <div id="search-bar">
        <label>
          Search:{" "}
          <input
            type="text"
            placeholder="search"
            onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
          />
        </label>
      </div>
      {postsToDisplay.map((post) => (
        <div key={post._id} id="post-card">
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <button
            id="single-btn"
            onClick={() => navigate(`/posts/${post._id}`)}
          >
            See Details
          </button>
        </div>
      ))}
    </div>
  );
}
