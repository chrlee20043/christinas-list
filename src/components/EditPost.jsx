import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { editPost, myData } from "../API";

export default function EditPost({
  postId,
  onUpdateEditedPost,
  setEditingPostId,
  token,
}) {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newWillDeliver, setNewWillDeliver] = useState(false);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const editPostData = await myData(token);

        const postsData = editPostData.data.posts;

        const postToEdit = postsData.find((post) => post._id === postId);

        if (postToEdit) {
          setNewTitle(postToEdit.title);
          setNewDescription(postToEdit.description);
          setNewPrice(postToEdit.price);
          setNewLocation(postToEdit.location);
          setNewWillDeliver(postToEdit.willDeliver);
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
      const updatedPost = await editPost(
        postId,
        newTitle,
        newDescription,
        newPrice,
        newLocation,
        newWillDeliver,
        token
      );
      navigate("./", { replace: true });

      onUpdateEditedPost(updatedPost, postId);

      setIsFormOpen(false);
    }
    updatePost();
  };

  return (
    <>
      {isFormOpen ? (
        <div className="post-form-container">
          <form onSubmit={handleSubmit} className="post-form">
            {error && <p>{error}</p>}
            <h4>Edit Post</h4>

            <label htmlFor="title">Title</label>
            <input
              value={newTitle}
              type="text"
              name="title"
              placeholder="Title"
              onChange={(event) => setNewTitle(event.target.value)}
            />

            <label htmlFor="description">Description</label>
            <input
              value={newDescription}
              type="text"
              name="description"
              placeholder="Description"
              onChange={(event) => setNewDescription(event.target.value)}
            />

            <label htmlFor="price">Price</label>
            <input
              value={newPrice}
              type="text"
              name="price"
              placeholder="Price"
              onChange={(event) => setNewPrice(event.target.value)}
            />
            <label htmlFor="location">Location</label>
            <input
              value={newLocation}
              type="text"
              name="location"
              placeholder="Location"
              onChange={(event) => setNewLocation(event.target.value)}
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
                onChange={(event) => setNewWillDeliver(event.target.value)}
                checked
              />
              <label className="delivery-button" htmlFor="delivery-no">
                No
              </label>
              <input
                value="false"
                type="radio"
                name="Deliver"
                onChange={(event) => setNewWillDeliver(event.target.value)}
              />
            </fieldset>

            <button className="form-btn" type="submit">
              Submit
            </button>
            <button
              className="form-btn"
              onClick={() => setEditingPostId(null)}
              type="button"
            >
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
