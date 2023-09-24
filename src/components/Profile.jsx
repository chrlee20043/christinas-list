import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "../Redux/authSlice";
import EditPost from "./EditPost";
import { myData, deletePost } from "../API";

export default function Profile({ posts, token }) {
  const [userPosts, setUserPosts] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);

  const navigate = useNavigate();

  const user = useSelector(selectCurrentUser);
  const authToken = useSelector(selectCurrentToken);

  useEffect(() => {
    async function fetchUserData() {
      if (!authToken) {
        setError("No authentication token available");
        return;
      }

      try {
        const myAPIData = await myData(authToken);
        // console.log("Response from myData API:", myAPIData);

        setUserPosts(myAPIData.data.posts || []);
        setUserMessages(myAPIData.data.messages || []);
      } catch (error) {
        setError("An error occurred while fetching user data");
        console.error(error);
      }
    }

    fetchUserData();
  }, [authToken]);

  async function updateEditedPost(postId, editedData) {
    console.log("edited data: ", editedData);
    setUserPosts((originalPosts) => {
      console.log("PROFILE POSTS:", originalPosts);
      return originalPosts.map((post) =>
        post._id === postId ? { ...post, ...editedData } : post
      );
    });
  }

  async function handleDetails() {
    setIsOpen(!isOpen);
  }

  async function handleDelete(id, authToken) {
    try {
      const result = await deletePost(id, authToken);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="welcome">
      {authToken && <h1>Welcome {user}!</h1>}
      <p>Browse our collection!</p>
      <p>
        <button onClick={() => navigate("/posts")}>See All Posts</button>
      </p>
      <br />
      <p>
        <button onClick={() => navigate("/newpost")}>Submit New Post</button>
      </p>

      <div id="my-post-container">
        <h2>My Posts:</h2>

        {userPosts
          .filter((post) => post.active === true)
          .map((post) => {
            return (
              <div key={post._id} className="my-single-post">
                <h3>{post.title}</h3>
                {isOpen && (
                  <div className="expanded-content">
                    <p>{post.description}</p>
                    <p>{post.price}</p>
                    <p>{post.location}</p>
                    <p>{post?.willDeliver ? "Yes" : "No"}</p>
                  </div>
                )}
                <div className="buttons">
                  <button className="details-button" onClick={handleDetails}>
                    {isOpen ? "See Less" : "See Details"}
                  </button>
                  <button onClick={() => handleDelete(post._id, authToken)}>
                    Delete me
                  </button>

                  <button
                    onClick={() =>
                      setEditingPostId(
                        editingPostId === post._id ? null : post._id
                      )
                    }
                  >
                    Edit
                  </button>
                  {editingPostId === post._id && (
                    <EditPost
                      id={post._id}
                      token={authToken}
                      posts={posts}
                      post={post}
                      onUpdateEditedPost={updateEditedPost}
                      setEditingPostId={setEditingPostId}
                    />
                  )}
                </div>
              </div>
            );
          })}

        <div id="my-messages">
          <h2>My Messages:</h2>
          {userMessages.map((message) => {
            return (
              <div className="message-card" key={message._id}>
                <p>Seller: {message.post.author.username}</p>
                <p>Description: {message.post.title}</p>
                <p>My Message: {message.content}</p>
              </div>
            );
          })}
        </div>

        {error && <p>{error}</p>}
      </div>
    </section>
  );
}
