import React, { useState, useEffect } from "react";
import { postMessage, myData } from "../API";
import MessagePopup from "./MessagePopup";

export default function SinglePost({ post, postId, token }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      if (!token) {
        setError("No authentication token available");
        return;
      }

      try {
        const myAPIData = await myData(token);
        setUsername(myAPIData.data.username);
      } catch (error) {
        setError("An error occurred while fetching user data");
        console.error(error);
      }
    }

    fetchUserData();
  }, [token]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postObj = {
      message: {
        content: content,
      },
    };

    try {
      const response = await postMessage(postId, token, postObj);
      console.log("Response from postMessage API:", response);

      setContent("");
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="container" key={post._id}>
      <div id="post-card">
        <h2>{post.title}</h2>
        <h4>Seller: {post.author.username}</h4>
        <p>Description: {post.description}</p>
        <p>Price: {post.price}</p>
        <p>Deliver? {post?.willDeliver ? "Yes" : "No"}</p>

        <button className="form-btn" onClick={handleClick}>
          {isOpen ? "Cancel" : "Send Message"}
        </button>

        {isOpen && username && username !== post.author.username ? (
          <MessagePopup
            onSubmit={handleSubmit}
            content={content}
            setContent={setContent}
            onClose={handleClose}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
