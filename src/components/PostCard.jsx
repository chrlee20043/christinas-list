import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { selectCurrentToken, selectCurrentUser } from "../Redux/authSlice";

export default function PostCard({ post, token }) {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [itemLocation, setItemLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState("");

  const [message, setMessage] = useState("");
  const [content, setContent] = useState("");

  const authToken = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);

  const { postId } = useParams();
  const navigate = useNavigate();

  async function handleClick() {
    setIsOpen(!isOpen);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    async function updatePost() {
      const updatedPost = {
        post: { title, description, price, location, willDeliver },
      };
      const editedPost = await editPost(
        location.state.post._id,
        updatedPost,
        token
      );
      return editedPost;
    }

    updatePost();
  }

  return (
    <div id="container" key={post._id}>
      <div id="post-card">
        <h2>{post.title}</h2>
        <h4>Seller: {post.author.username}</h4>
        <p>Description: {post.description}</p>
        <p>Price: {post.price}</p>
        <p>Deliver? {post?.willDeliver ? "Yes" : "No"}</p>

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
