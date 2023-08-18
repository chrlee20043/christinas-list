import React from "react";
import { useState, useEffect } from "react";
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
  // const navigate = useNavigate();

  const postsToDisplay = searchParam
    ? posts.filter((post) =>
        post.author.username.toLowerCase().includes(searchParam)
      )
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
      </div>
      <NewPostForm posts={posts} setPosts={setPosts} />
      {error && <p>{error}</p>}
      {postsToDisplay.map((post) => {
        return <SinglePost key={post._id} post={post} />;
      })}
    </div>
  );

  // return post.map(
  //   (post) => {
  //     return (
  //       <div id="container" key={post._id}>
  //         <div id="post-card">
  //           <h2>{post.title}</h2>
  //           <h4>Seller: {post.author.username}</h4>
  //           <p>Description: {post.description}</p>
  //           <p>Price: {post.price}</p>
  //         </div>
  //         {/* <button onClick={() => navigate(`/players/${puppy.id}`)}>
  //         See Details
  //       </button> */}
  //       </div>
  //     );
  //   },
  //   <div id="post-form">
  //     <NewPostForm />
  //   </div>
  // );
}
