import React, { useRef, useEffect } from "react";
import "../styles/MessageList.scss";

function MessageList({ messages, isLoading }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="message-list">
      {messages.length === 0 && !isLoading && (
        <div className="empty-state">
          <div className="empty-icon">💬</div>
          <h3 className="empty-title">Ask me anything About News And articles</h3>
          <p className="empty-subtitle">AI can be wrong, we encourage you to verify information.</p>
        </div>
      )}
      
      {messages.map((msg, idx) => (
        <div key={idx} className={`message ${msg.type}`}>
          <div className="message-content">
            {msg.type === "bot" ? (
              <div className="bot-text">
                {msg.text.split('\n').map((line, i) => (
                  <div key={i} className={i > 0 ? "line-break" : ""}>
                    {line}
                  </div>
                ))}
              </div>
            ) : (
              <div className="user-text">{msg.text}</div>
            )}
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="typing-indicator">
          <div className="typing-content">
            <div className="typing-dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <span className="typing-text">AI is thinking...</span>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;