import React, { useState } from "react";
import "../styles/MessageInput.scss";

function MessageInput({ onSend, loading }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim() || loading) return;
    onSend(text);
    setText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="message-input-container">
      <div className="input-wrapper">
        <div className="input-field">
          <input
            type="text"
            placeholder="Ask me anything..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            maxLength={512}
          />
          <div className="char-count">
            {text.length}/512
          </div>
        </div>
        <button
          className="send-btn"
          onClick={handleSubmit}
          disabled={loading || !text.trim()}
        >
          {loading ? (
            <div className="spinner"></div>
          ) : (
            <span className="send-icon">➤</span>
          )}
          <span className="send-text">Send</span>
        </button>
      </div>
    </div>
  );
}

export default MessageInput;