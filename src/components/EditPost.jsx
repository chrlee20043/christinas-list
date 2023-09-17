import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectCurrentUser, selectCurrentToken } from "../Redux/authSlice";
// import { useLocation } from "react-router-dom";
import { editPost, myData } from "../API";

export default function EditPost({ id, token, posts, post }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(null);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(true);

  const user = useSelector(selectCurrentUser);
  const authToken = useSelector(selectCurrentToken);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const editPostData = await myData(authToken);

        // Assuming the data structure is editPostData.data.posts
        const postsData = editPostData.data.posts;

        // Find the post you want to edit based on some criteria (e.g., post ID)
        const postToEdit = postsData.find((post) => post._id === id);

        if (postToEdit) {
          // Set the state variables with the values from the post to edit
          setTitle(postToEdit.title);
          setDescription(postToEdit.description);
          setPrice(postToEdit.price);
          setLocation(postToEdit.location);
          setWillDeliver(postToEdit.willDeliver);
        }
      } catch (error) {
        setError("An error occurred while fetching post data");
        console.error(error);
      }
    };

    fetchPost();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    async function updatePost() {
      const updatedPost = {
        title,
        description,
        price,
        location,
        willDeliver,
      };

      const editedPost = await editPost(
        id,
        // updatedPost,
        updatedPost.title,
        updatedPost.description,
        updatedPost.price,
        updatedPost.location,
        updatedPost.willDeliver,
        authToken
      );
      setIsFormOpen(false);

      //   console.log("auth token when editing: ", authToken);
      return editedPost;
    }

    updatePost();
  };

  return (
    <>
      {isFormOpen ? (
        <form onSubmit={handleSubmit} className="post-form-container">
          {error && <p>{error}</p>}
          <h4>Edit Post</h4>

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
      ) : (
        <></>
      )}
    </>
  );
}
