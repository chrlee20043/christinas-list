import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postMessage, myData } from "../API";

export default function SinglePost({ post, postId, token }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      if (!token) {
        setError("No authentication token available");
        return;
      }

      try {
        const myAPIData = await myData(token);
        // console.log("Response from myData API:", myAPIData);
        setUsername(myAPIData.data.username);
      } catch (error) {
        setError("An error occurred while fetching user data");
        console.error(error);
      }
    }

    fetchUserData();
  }, [token]);

  async function handleClick() {
    setIsOpen(!isOpen);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(content);

    const postObj = {
      message: {
        content: content,
      },
    };

    try {
      const response = await postMessage(postId, token, postObj);
      console.log("Response from postMessage API:", response);

      setContent("");
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div id="container" key={post._id}>
      <div id="post-card">
        <h2>{post.title}</h2>
        <h4>Seller: {post.author.username}</h4>
        <p>Description: {post.description}</p>
        <p>Price: {post.price}</p>
        <p>Deliver? {post?.willDeliver ? "Yes" : "No"}</p>

        {/* <button className="form-btn" onClick={handleClick}>
          {isOpen ? "Cancel" : "Send Message"}
        </button> */}

        {username && username !== post.author.username ? (
          <form onSubmit={handleSubmit}>
            <h2>Message Seller</h2>
            <div className="form-row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Message"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                />
              </div>
            </div>

            <button className="form-btn" type="submit">
              Submit
            </button>
          </form>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

{
  /* //  {isOpen && (  */
}
{
  /* // <form onSubmit={handleSubmit}>
          //   <h2>Message Seller</h2>
          //   <div className="form-row">
          //     <div className="col">
          //       <input */
}
{
  /* //         type="text"
          //         className="form-control"
          //         placeholder="Message"
          //         value={content}
          //         onChange={(event) => setContent(event.target.value)}
          //       />
          //     </div>
          //   </div> */
}

{
  /* //   <button className="form-btn" type="submit">
          //     Submit
          //   </button>
          // </form>
        // )}} */
}
