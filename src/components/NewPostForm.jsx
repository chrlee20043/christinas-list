// Form where user can add new post

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../API";

export default function NewPostForm({ post, setPost }) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [willDeliver, setWillDeliver] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await createPost(
      name,
      title,
      description,
      price,
      willDeliver
    );
    if (response.success) {
      console.log("New Post: ", response.data.newPost);

      const newPosts = [...post, response.data.newPost];
      setPost(newPosts);

      setTitle("");
      setDescription("");
      setPrice("");
      setWillDeliver(false);
    } else {
      setError(response.error.message);
    }
  }

  //name, title, description, price
  return (
    <form onSubmit={handleSubmit} className="post-form-container">
      {error && <p>{error}</p>}
      <h4>Create New Post</h4>
      <label htmlFor="name">Seller Name</label>
      <input
        value={name}
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

      <label htmlFor="delivery">Are you willing to deliver?</label>
      <input
        value={willDeliver}
        type="checkbox"
        name="Deliver"
        onChange={(event) => setWillDeliver(event.target.value)}
      />

      <button>Submit</button>
      <div>
        <button onClick={() => navigate("/posts")}>Return to All Posts</button>
      </div>
    </form>
  );
}
