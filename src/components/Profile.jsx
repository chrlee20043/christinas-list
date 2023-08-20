// profile where user can see messages and edit or delete their posts (they are the author)

import { useState } from "react";
import { useDispatch, useNavigate } from "react-redux";
import { postMessage } from "../API";

export default function Profile() {
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const currentUser = useSelector((state) => state.authenticate.user);

  async function handleMessage(event) {
    event.preventDefault();
    try {
      const response = await fetch(postMessage);
      const result = await response.json();
      console.log(result);
      if (result.success) {
        setSuccessMessage("You have a new message");
        setError("");
      } else {
        setSuccessMessage("");
        setError("No messages");
        console.log("You have no messages");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="message-container">
        {successMessage || error ? (
          <p className={successMessage ? "success" : "error"}>
            {successMessage || error}
          </p>
        ) : null}
        <form className="message-card" onSubmit={handleMessage}>
          <h2>Message</h2>
          <label className="label">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            required
          />
          <label className="label">content</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type="text"
            placeholder="Content"
            id="content"
            name="message"
            required
          />
          <button type="button">edit</button>
          <button type="button">delete</button>

          {/* need to complete this routing to render a specific message by id */}
          <button type="button" onClick={() => navigate(`/post/id`)}>
            See full post
          </button>
        </form>
      </div>
    </>
  );
}
