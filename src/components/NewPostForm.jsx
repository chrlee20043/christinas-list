import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../API";

export default function NewPostForm({ token, onNewPost, profileUser }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(null);
  const [isPostCreated, setIsPostCreated] = useState(false);
  const [error, setError] = useState(null);

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
      const newPost = response.data.post;
      console.log("New Post: ", response.data.post);

      navigate("./", { replace: true });
      onNewPost(newPost);
      setIsPostCreated(true);

      // reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setLocation("");
      setWillDeliver(null);
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
        <label htmlFor="name">My Username</label>
        <input value={profileUser} type="text" name="name" disabled />
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
            value="true"
            type="radio"
            name="Deliver"
            onChange={(event) => setWillDeliver(event.target.value)}
            checked
          />
          <label className="delivery-button" htmlFor="delivery-no">
            No
          </label>
          <input
            value="false"
            type="radio"
            name="Deliver"
            onChange={(event) => setWillDeliver(event.target.value)}
          />
        </fieldset>
        <button type="submit">Submit</button>
        <div>
          {isPostCreated && (
            <p className="success-message">Post created successfully!</p>
          )}
        </div>
      </div>
    </form>
  );
}
