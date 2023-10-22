import React from "react";

export default function MessagePopup({
  onSubmit,
  content,
  setContent,
  onClose,
}) {
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     onSubmit();
  //   };

  return (
    <div className="message-card">
      <div className="popup">
        <div className="popup-content">
          <button className="close" onClick={onClose}>
            Close
          </button>
          <form onSubmit={onSubmit}>
            <h2>Message Seller</h2>
            <div className="form-row">
              <div className="col">
                <textarea
                  rows="10"
                  cols="30"
                  type="text"
                  className="form-control"
                  placeholder="Message"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                ></textarea>
              </div>
            </div>

            <button className="form-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
