// Form where user can add new post

import React from "react";
import { useState } from "react";
import { createPost } from "../API";

export default function NewPostForm({ post, setPost }) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await createPost(name, title, description, price);
    if (response.success) {
      console.log("New Post: ", response.data.newPost);

      const newPosts = [...post, response.data.newPost];
      setPost(newPosts);

      setName("");
      setTitle("");
      setDescription("");
      setPrice("");
    } else {
      setError(response.error.message);
    }
  }

  //name, title, description, price
  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <input
        value={name}
        type="text"
        name="name"
        placeholder="Seller"
        onChange={(event) => setName(event.target.value)}
      />
      <input
        value={title}
        type="text"
        name="title"
        placeholder="Title"
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        value={description}
        type="text"
        name="description"
        placeholder="Description"
        onChange={(event) => setDescription(event.target.value)}
      />
      <input
        value={price}
        type="text"
        name="price"
        placeholder="Price"
        onChange={(event) => setPrice(event.target.value)}
      />
      <button>Submit</button>
    </form>
  );
}
