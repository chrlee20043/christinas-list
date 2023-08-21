import { useState } from "react";
// import { Link } from "react-router-dom";

export default function MessageForm() {
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  const [author, setAuthor] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

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
            <label className="message-author">From</label>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              type="text"
              placeholder="Sender"
              id="author"
              name="author"
              required
            />
            <label className="label">To</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              id="username"
              name="username"
              required
            />
            <label className="label">Description</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              type="text"
              placeholder="Write your message here..."
              id="content"
              name="message"
              required
            ></textarea>
            <button type="button">edit</button>
            <button type="button">delete</button>

            {/* need to complete this routing to render a specific message by id */}
            <p>
              <Link to="/posts/${id}">See all posts</Link>
            </p>
          </form>
        </div>
      </>
    );
  }
}
