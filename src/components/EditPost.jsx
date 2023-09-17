import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "../Redux/authSlice";
// import { useLocation } from "react-router-dom";
import { editPost, myData } from "../API";

export default function EditPost({ token, posts, post }) {
  const [name, setName] = useState("");
  const [selectedPostId, setSelectedPostId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(null);
  const [error, setError] = useState(null);

  const user = useSelector(selectCurrentUser);
  const authToken = useSelector(selectCurrentToken);

  //   const loc = useLocation();

  useEffect(() => {
    const fetchPost = async () => {
      // SET THE STATE to the current info, this will show up in the form
      const editPostData = await myData(token);
      console.log("post i want to edit:", editPostData);
      setName(editPostData.data.username);
    };
    fetchPost();
  }, []);

  const handlePostSelect = (postId) => {
    setSelectedPostId(postId);

    const selectedPost = posts.find((post) => post._id === postId);
    if (selectedPost) {
      setTitle(selectedPost.title);
      setDescription(selectedPost.description);
      setPrice(selectedPost.price);
      setLocation(selectedPost.location);
      setWillDeliver(selectedPost.willDeliver);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    async function updatePost() {
      const updatedPost = {
        post: { title, description, price, location, willDeliver },
      };
      const editedPost = await editPost(selectedPostId, updatedPost, token);
      return editedPost;
    }

    updatePost();
  };

  return (
    <form onSubmit={handleSubmit} className="post-form-container">
      {/* <select
        value={selectedPostId}
        onChange={(e) => handlePostSelect(e.target.value)}
      >
        <option value="">Select a Post</option>
        {posts.map((post) => (
          <option key={post._id} value={post._id}>
            {post.title}
          </option>
        ))}
      </select> */}
      {error && <p>{error}</p>}
      <h4>Edit Post</h4>
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

      <button type="submit">Submit</button>
    </form>
  );
}
