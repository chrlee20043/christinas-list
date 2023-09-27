import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "../Redux/authSlice";
import EditPost from "./EditPost";
import { myData, deletePost } from "../API";

export default function Profile({ posts, token }) {
  const [userPosts, setUserPosts] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [profileUser, setProfileUser] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);

  const navigate = useNavigate();

  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    async function fetchUserData() {
      if (!token) {
        setError("No authentication token available");
        return;
      }

      try {
        const myAPIData = await myData(token);
        // console.log("Response from myData API:", myAPIData);
        setUserPosts(myAPIData.data.posts || []);
        setUserMessages(myAPIData.data.messages || []);
        setProfileUser(myAPIData.data.username);
      } catch (error) {
        setError("An error occurred while fetching user data");
        console.error(error);
      }
    }

    fetchUserData();
  }, [token]);

  async function updateEditedPost(postId, editedData) {
    console.log("edited data:", editedData);
    setUserPosts((originalPosts) => {
      return originalPosts.map((post) =>
        post._id === postId ? { ...post, ...editedData } : post
      );
    });
  }

  async function handleDetails() {
    setIsOpen(!isOpen);
  }

  async function handleDelete(id, token) {
    try {
      const result = await deletePost(id, token);
      console.log(result);
      setUserPosts((prevUserPosts) =>
        prevUserPosts.filter((post) => post._id !== id)
      );

      navigate("./", { replace: true });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="welcome">
      {token && <h1>Welcome {profileUser}!</h1>}
      <p>Browse our collection!</p>
      <p>
        <button className="link-btn" onClick={() => navigate("/posts")}>
          See All Posts
        </button>
      </p>
      <br />
      <p>
        <button className="link-btn" onClick={() => navigate("/newpost")}>
          Submit New Post
        </button>
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
                    <p>Description: {post.description}</p>
                    <p>Price: {post.price}</p>
                    <p>Location: {post.location}</p>
                    <p>Deliver? {post?.willDeliver ? "Yes" : "No"}</p>
                  </div>
                )}
                <div className="buttons">
                  <button className="form-btn" onClick={handleDetails}>
                    {isOpen ? "See Less" : "See Details"}
                  </button>
                  <button
                    className="form-btn"
                    onClick={() => handleDelete(post._id, token)}
                  >
                    Delete
                  </button>

                  <button
                    className="form-btn"
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
                      token={token}
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
          <h2>My Sent Messages:</h2>
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
