// Form where user can add new post

import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createPost } from "../API";
import { selectCurrentToken, selectCurrentUser } from "../Redux/authSlice";

export default function NewPostForm({ post, setPost }) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  const [error, setError] = useState(null);

  const authToken = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!authToken) {
      // Redirect to login or show an error message
      navigate("/login");
      return;
    }

    const response = await createPost(
      { token: authToken },
      title,
      description,
      price,
      location,
      willDeliver
    );
    if (response.success) {
      console.log("New Post: ", response.data.newPost);

      const newPosts = [...post, response.data.newPost];
      setPost(newPosts);

      setTitle("");
      setDescription("");
      setPrice("");
      setLocation("");
      setWillDeliver(false);
    } else {
      setError("Unauthorized token. Please register or log in");
    }
  }

  useEffect(() => {
    // Clear form fields when the component mounts or when post changes
    setName("");
    setTitle("");
    setDescription("");
    setPrice("");
    setLocation("");
    setWillDeliver(false);
  }, [post]);

  //name, title, description, price
  return (
    <form onSubmit={handleSubmit} className="post-form-container">
      {error && <p>{error}</p>}
      <h4>Create New Post</h4>
      <label htmlFor="name">Seller Name</label>
      <input
        value={user}
        type="text"
        name="name"
        placeholder="Name"
        onChange={(event) => setName(event.target.value)}
      />
      <label htmlFor="title">Title</label>
      <input
        value={title}
        type="text"
        name="title"
        placeholder="Title"
        onChange={(event) => setTitle(event.target.value)}
      />

      <label htmlFor="description">Description</label>
      <input
        value={description}
        type="text"
        name="description"
        placeholder="Description"
        onChange={(event) => setDescription(event.target.value)}
      />

      <label htmlFor="price">Price</label>
      <input
        value={price}
        type="text"
        name="price"
        placeholder="Price"
        onChange={(event) => setPrice(event.target.value)}
      />
      <label htmlFor="location">Location</label>
      <input
        value={location}
        type="text"
        name="location"
        placeholder="Location"
        onChange={(event) => setLocation(event.target.value)}
      />
      <fieldset>
        <legend>Are you willing to deliver?</legend>
        <label className="delivery-button" htmlFor="delivery-yes">
          Yes
        </label>
        <input
          value={true}
          type="radio"
          name="Deliver"
          onChange={(event) => setWillDeliver(event.target.value)}
          checked
        />
        <label className="delivery-button" htmlFor="delivery-no">
          No
        </label>
        <input
          value={false}
          type="radio"
          name="Deliver"
          onChange={(event) => setWillDeliver(event.target.value)}
        />
      </fieldset>
      <button>Submit</button>
      <div>
        <button onClick={() => navigate("/posts")}>Return to All Posts</button>
      </div>
    </form>
  );
}
