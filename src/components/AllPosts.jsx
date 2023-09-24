import React from "react";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import NewPostForm from "./NewPostForm";
import SinglePost from "./SinglePost";
import fetchAllPosts from "../API";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../Redux/authSlice";

// User will see all posts and be able to click on one to see more details
// include search bar
export default function AllPosts({ token }) {
  const [posts, setPosts] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [error, setError] = useState(null);
  // const navigate = useNavigate();

  const authToken = useSelector(selectCurrentToken);
  // console.log("my auth token: ", authToken);
  const user = useSelector(selectCurrentUser);
  console.log("user", user);

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
