import React from "react";
import { useState, useEffect } from "react";
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
        <SinglePost
          key={post._id}
          post={post}
          postId={post._id}
          token={token}
        />
      ))}
    </div>
  );
}
