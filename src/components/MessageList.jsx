import React, { useRef, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "../styles/MessageList.scss";

function MessageList({ messages, isLoading }) {
  const [showRefs, setShowRefs] = useState({});
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
          <div className="sample-questions">
            <span>Try these:</span>
            <a
              href="#"
              className="sample-link"
              onClick={e => {
                e.preventDefault();
                const input = document.getElementById('main-input');
                if (input) {
                  input.value = "China's developments in ai race?";
                  input.focus();
                  // Trigger input event for React state
                  const event = new Event('input', { bubbles: true });
                  input.dispatchEvent(event);
                }
              }}
            >
              China's developments in ai race?
            </a>
            <a
              href="#"
              className="sample-link"
              onClick={e => {
                e.preventDefault();
                const input = document.getElementById('main-input');
                if (input) {
                  input.value = "what is dolby flexatmos ?";
                  input.focus();
                  // Trigger input event for React state
                  const event = new Event('input', { bubbles: true });
                  input.dispatchEvent(event);
                }
              }}
            >
              what is dolby flexatmos ?
            </a>
          </div>
          <p className="empty-subtitle">AI can be wrong, we encourage you to verify information.</p>
        </div>
      )}
      
      {messages.map((msg, idx) => {
        // Check if bot message contains answer and references
        let answer = msg.text;
        let references = null;
        if (msg.type === "bot" && msg.answer) {
          answer = msg.answer;
          references = msg.references;
        }
        return (
          <div key={idx} className={`message ${msg.type}`}>
            <div className="message-content">
              {msg.type === "bot" ? (
                <>
                  <div className="bot-text">
                    <ReactMarkdown>{answer}</ReactMarkdown>
                  </div>
                  {references && references.length > 0 && (
                    <div className="references-section">
                      <button
                        className="refs-toggle"
                        onClick={() => setShowRefs((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                      >
                        <span style={{paddingRight: '8px', paddingLeft: '2px'}}>References</span>
                        <span className={`refs-arrow ${showRefs[idx] ? 'open' : 'closed'}`}>▶</span>
                      </button>
                      {showRefs[idx] && (
                        <ol className="refs-list">
                          {references.map((ref, i) => (
                            <li key={i}>
                              <a href={ref.url} target="_blank" rel="noopener noreferrer">
                                {ref.title}
                              </a>
                            </li>
                          ))}
                        </ol>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="user-text">{msg.text}</div>
              )}
            </div>
          </div>
        );
      })}
      
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