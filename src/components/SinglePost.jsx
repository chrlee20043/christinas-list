import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "../Redux/authSlice";

export default function SinglePost({ post, id, token }) {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [willDeliver, setWillDeliver] = useState("");

  const authToken = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);

  const navigate = useNavigate();

  async function handleClick() {
    setIsOpen(!isOpen);
  }

  async function handleSubmit() {
    <p>handle submit</p>;
  }

  return (
    <div id="container" key={post._id}>
      <div id="post-card">
        <h2>{post.title}</h2>
        <h4>Seller: {post.author.username}</h4>
        <p>Description: {post.description}</p>
        <p>Price: {post.price}</p>
        <p>Deliver? {post?.willDeliver ? "Yes" : "No"}</p>
        {/* <button
          onClick={() =>
            navigate(`/posts/${post._id}`, { state: { post, token } })
          }
        >
          See Details
        </button> */}
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
