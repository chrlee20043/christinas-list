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
            &#215;
          </button>
          <form onSubmit={onSubmit}>
            <h2>Message Seller</h2>
            <div className="form-row">
              <div className="col">
                <textarea
                  type="text"
                  className="new-content"
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
