// Form where user can add new post

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createPost } from "../API";
import { selectCurrentUser } from "../Redux/authSlice";

export default function NewPostForm({ post, setPost, token }) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(null);
  const [error, setError] = useState(null);

  const user = useSelector(selectCurrentUser);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await createPost(
      title,
      description,
      price,
      willDeliver,
      token
    );

    console.log(response.data.post);
    if (response.success) {
      console.log("New Post: ", response.data.post);
      navigate("/profile");
    } else {
      setError("Unauthorized token. Please register or log in");
    }
  }

  //name, title, description, price
  return (
    <form onSubmit={handleSubmit} className="post-form-container">
      <div className="post-form">
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
            value={willDeliver}
            type="radio"
            name="Deliver"
            onChange={(event) => setWillDeliver(event.target.value)}
            checked
          />
          <label className="delivery-button" htmlFor="delivery-no">
            No
          </label>
          <input
            value={!willDeliver}
            type="radio"
            name="Deliver"
            onChange={(event) => setWillDeliver(event.target.value)}
          />
        </fieldset>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
