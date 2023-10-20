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
        // console.log("Response from myData API:", myAPIData);
        setUsername(myAPIData.data.username);
      } catch (error) {
        setError("An error occurred while fetching user data");
        console.error(error);
      }
    }

    fetchUserData();
  }, [token]);

  async function handleClick() {
    setIsOpen(!isOpen);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(content);

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
  }

  return (
    <div id="container" key={post._id}>
      <div id="post-card">
        <h2>{post.title}</h2>
        <h4>Seller: {post.author.username}</h4>
        <p>Description: {post.description}</p>
        <p>Price: {post.price}</p>
        <p>Deliver? {post?.willDeliver ? "Yes" : "No"}</p>

        {username !== post.author.username && (
          <div>
            <button
              className="single-post-btn"
              id="open-popup"
              onClick={handleClick}
            >
              Send Message
              {isOpen && (
                <div>
                  <MessagePopup
                    onSend={handleSubmit}
                    onClose={() => setIsOpen(false)}
                  />
                </div>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
