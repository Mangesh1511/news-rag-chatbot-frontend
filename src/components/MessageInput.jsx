import React, { useState } from "react";
import "../styles/MessageInput.scss";

const MAX_LENGTH = 512;
function MessageInput({ onSend, loading }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    if (value.length > MAX_LENGTH) {
      setError("Length exceeds maximum allowed characters.");
    } else {
      setError("");
    }
  };

  const handleSubmit = () => {
    if (!text.trim() || loading || text.length > MAX_LENGTH) return;
    onSend(text);
    setText("");
    setError("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isTooLong = text.length > MAX_LENGTH;

  return (
    <div className="message-input-container">
      <div className="input-wrapper">
        <div className="input-field">
          <input
            id="main-input"
            type="text"
            placeholder="Ask me anything..."
            value={text}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            disabled={loading}
            maxLength={MAX_LENGTH + 1}
            className={isTooLong ? "input-error" : ""}
          />
          <div className="char-count">
            {text.length}/{MAX_LENGTH}
          </div>
        </div>
        <button
          className="send-btn"
          onClick={handleSubmit}
          disabled={loading || !text.trim() || isTooLong}
        >
          {loading ? (
            <div className="spinner"></div>
          ) : (
            <span className="send-icon">➤</span>
          )}
          <span className="send-text">Send</span>
        </button>
      </div>
      {isTooLong && (
        <div className="input-error-msg">Length exceeds maximum allowed characters.</div>
      )}
    </div>
  );
}

export default MessageInput;