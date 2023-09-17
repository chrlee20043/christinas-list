import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { selectCurrentToken, selectCurrentUser } from "../Redux/authSlice";

export default function PostCard({ post, token }) {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [content, setContent] = useState("");

  const authToken = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);

  const { postId } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const singlePost = location.state.post;
  const myToken = location.state.token;

  async function handleClick() {
    setIsOpen(!isOpen);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const myMessage = {
      message,
      content,
    };

    const sendMessage = await postMessage(postId, authToken, myMessage);
    return sendMessage;
  }

  return (
    <div id="container" key={singlePost._id}>
      <div id="post-card">
        <h2>{singlePost.title}</h2>
        <h4>Seller: {singlePost.author.username}</h4>
        <p>Description: {singlePost.description}</p>
        <p>Price: {singlePost.price}</p>
        <p>Deliver? {singlePost?.willDeliver ? "Yes" : "No"}</p>

        <button onClick={() => navigate("/posts")}>Return to Posts</button>
        <button className="card-toggle-button" onClick={handleClick}>
          {isOpen ? "Cancel" : "Send Message"}
        </button>
        {isOpen && (
          <form onSubmit={handleSubmit}>
            <h2>Message Seller</h2>
            <div className="form-row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your username"
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Message"
                  onChange={(event) => setContent(event.target.value)}
                />
              </div>
            </div>

            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
}
