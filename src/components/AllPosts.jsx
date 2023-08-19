import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewPostForm from "./NewPostForm";
import SinglePost from "./SinglePost";
import fetchAllPosts from "../API";

// User will see all posts
// include search bar, navigate to form
export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [error, setError] = useState(null);

  async function renderPosts() {
    try {
      const postArray = await fetchAllPosts();
      setPosts(postArray);
    } catch {
      setError(error);
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
      <div>
        <label>
          Search:{" "}
          <input
            type="text"
            placeholder="search"
            onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
          />
        </label>
        <button className="link-btn" onClick={() => navigate("/newpost")}>
          Create New Post
        </button>
      </div>
      {/* <NewPostForm posts={posts} setPosts={setPosts} />
      {error && <p>{error}</p>} */}
      {postsToDisplay.map((post) => {
        return <SinglePost key={post._id} post={post} />;
      })}
    </div>
  );
}
