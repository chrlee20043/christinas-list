import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "../Redux/authSlice";
import { myData, postMessage } from "../API"; // Import the postMessage API function

export default function Profile() {
  const [userPosts, setUserPosts] = useState([]);
  const [userMessages, setUserMessages] = useState([]);

  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const authToken = useSelector(selectCurrentToken);

  useEffect(() => {
    async function fetchUserData() {
      if (authToken) {
        try {
          const response = await myData(authToken);
          setUserPosts(response.posts || []);
          setUserMessages(response.messages || []);
        } catch (error) {
          console.error(error);
        }
      }
    }

    fetchUserData();
  }, [authToken]);

  const handlePostMessage = async () => {
    try {
      const response = await postMessage(authToken); // Use the authToken here
      console.log(response);
    } catch (error) {
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

      <h2>My Posts:</h2>
      {userPosts ? (
        <p>No posts available.</p>
      ) : (
        userPosts.map((post) => (
          <div key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <button onClick={() => navigate(`/posts/${post._id}`)}>
              See Full Post
            </button>
          </div>
        ))
      )}
      <h2>My Messages:</h2>
      {userMessages ? (
        <p>You have no messages</p>
      ) : (
        userMessages.map((message) => (
          <div key={message._id}>
            <p>From: {message.fromUser.username}</p>
            <p>Content: {message.content}</p>
          </div>
        ))
      )}

      <button onClick={handlePostMessage}>See Message</button>
    </section>
  );
}
