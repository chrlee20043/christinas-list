import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "../Redux/authSlice";
import { myData, postMessage, deletePost, editPost } from "../API";

export default function Profile(id) {
  const [userPosts, setUserPosts] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);

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
        console.log("Response from myData API:", myAPIData);

        setUserPosts(myAPIData.data.posts || []);
        setUserMessages(myAPIData.data.messages || []);
      } catch (error) {
        setError("An error occurred while fetching user data");
        console.error(error);
      }
    }

    fetchUserData();
  }, [authToken]);

  async function handleDetails() {
    setIsOpen(!isOpen);
  }

  async function handleDelete() {
    try {
      const result = await deletePost(authToken, id);
      console.log(result);

      navigate("/posts");
    } catch (error) {
      console.error(error);
    }
  }

  async function handleEdit() {
    try {
      const result = await editPost(authToken, id);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  const handlePostMessage = async () => {
    try {
      const response = await postMessage(authToken); // Use the authToken here
      console.log("Response from postMessage API:", response);
    } catch (error) {
      setError("An error occurred while posting a message");
      console.error(error);
    }
  };

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

        {userPosts.map((post) => {
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
                <button onClick={handleDelete}>Delete me</button>
                <button onClick={handleEdit}>Edit me</button>
              </div>
            </div>
          );
        })}

        <div id="my-messages">
          <h2>My Messages:</h2>
          {userMessages.map((post) => {
            return (
              <div key={post._id}>
                <h3>{post.content}</h3>
              </div>
            );
          })}
        </div>

        {error && <p>{error}</p>}
        <button onClick={handlePostMessage}>See Message</button>
      </div>
    </section>
  );
}
