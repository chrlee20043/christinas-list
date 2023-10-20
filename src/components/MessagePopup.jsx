import React, { useState } from "react";

export default function MessagePopup({ onSend, onClose }) {
  const [content, setContent] = useState("");

  const handleTextareaClick = (e) => {
    e.stopPropagation();
  };

  const handleKeyPress = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    if (!content.trim()) {
      e.preventDefault();
      return;
    }
    onSend(content, e);
  };

  return (
    <div className="popup" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Message Seller</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="col">
              <textarea
                className="form-control"
                placeholder="Message"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                onClick={handleTextareaClick}
                onKeyPress={handleKeyPress}
                rows="10"
              ></textarea>
            </div>
          </div>

          <button className="form-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
