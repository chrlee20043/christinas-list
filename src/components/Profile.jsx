import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EditPost from "./EditPost";
import NewPostForm from "./NewPostForm";
import { myData, deletePost } from "../API";

export default function Profile({ token }) {
  const [userPosts, setUserPosts] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [profileUser, setProfileUser] = useState("");
  const [openPostId, setOpenPostId] = useState(null);
  const [isNewPostFormOpen, setIsNewPostFormOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function fetchUserData() {
    if (!token) {
      setError("No authentication token available");
      return;
    }

    try {
      const myAPIData = await myData(token);
      // console.log("Response from myData API:", myAPIData);
      setUserPosts(myAPIData.data.posts || []);
      console.log("myAPIdata", myAPIData.data.posts);
      setUserMessages(myAPIData.data.messages || []);
      setProfileUser(myAPIData.data.username);
    } catch (error) {
      setError("An error occurred while fetching user data");
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleNewPost = (newPost) => {
    setUserPosts((prevUserPosts) => [newPost, ...prevUserPosts]);
    setIsNewPostFormOpen(false);
  };

  const updateEditedPost = (updatedPost, postId) => {
    console.log("postID:", postId);
    console.log("Updated post data:", updatedPost);

    setUserPosts((originalPosts) => {
      console.log(originalPosts);
      return originalPosts.map((post) =>
        post._id === postId ? { ...post, ...updatedPost } : post
      );
    });
    fetchUserData();
  };

  const handleDetails = (postId) => {
    setOpenPostId((prevId) => (prevId === postId ? null : postId));
  };

  const toggleNewPostForm = () => {
    setIsNewPostFormOpen(!isNewPostFormOpen);
  };

  async function handleDelete(postId, token) {
    try {
      const result = await deletePost(postId, token);
      console.log(result);
      setUserPosts((prevUserPosts) =>
        prevUserPosts.filter((post) => post._id !== postId)
      );

      navigate("./", { replace: true });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="profile-page">
      {token ? (
        <div>
          <h1 className="welcome">Welcome {profileUser}!</h1>
          <br />
          <button className="link-btn" onClick={toggleNewPostForm}>
            {isNewPostFormOpen ? "Cancel" : "Submit New Post"}
          </button>
          {isNewPostFormOpen && (
            <NewPostForm
              token={token}
              onNewPost={handleNewPost}
              profileUser={profileUser}
            />
          )}

          <div id="my-post-container">
            <h2>My Posts</h2>

            {userPosts
              .filter((post) => post.active === true)
              .map((post) => {
                const isPostOpen = post._id === openPostId;

                return (
                  <div key={post._id} className="my-single-post">
                    <h3>{post.title}</h3>
                    {isPostOpen && (
                      <div className="expanded-content">
                        <p>Description: {post.description}</p>
                        <p>Price: {post.price}</p>
                        <p>Location: {post.location}</p>
                        <p>Deliver? {post?.willDeliver ? "Yes" : "No"}</p>
                      </div>
                    )}
                    <div className="buttons">
                      <button
                        className="form-btn"
                        onClick={() => handleDetails(post._id)}
                      >
                        {isPostOpen ? "See Less" : "See More"}
                      </button>
                      <button
                        className="form-btn"
                        onClick={() => handleDelete(post._id, token)}
                      >
                        Delete
                      </button>

                      <button
                        className="form-btn"
                        onClick={() =>
                          setEditingPostId(
                            editingPostId === post._id ? null : post._id
                          )
                        }
                      >
                        Edit
                      </button>
                      {editingPostId === post._id && (
                        <EditPost
                          postId={post._id}
                          token={token}
                          onUpdateEditedPost={(updatedPost) => {
                            updateEditedPost(updatedPost, post._id);
                            fetchUserData();
                          }}
                          setEditingPostId={setEditingPostId}
                        />
                      )}
                    </div>
                  </div>
                );
              })}

            <div id="my-messages">
              <h2>My Sent Messages</h2>
              {userMessages.map((message) => {
                return (
                  <div className="message-card" key={message._id}>
                    <p className="message-detail">
                      Seller: {message.post.author.username}
                    </p>
                    <p className="message-detail">
                      Description: {message.post.title}
                    </p>
                    <p className="message-detail">Message: {message.content}</p>
                  </div>
                );
              })}
            </div>

            {error && <p>{error}</p>}
          </div>
        </div>
      ) : (
        <div>
          <button className="form-btn" onClick={() => navigate("/login")}>
            Please log in to view your profile
          </button>
        </div>
      )}
    </section>
  );
}
