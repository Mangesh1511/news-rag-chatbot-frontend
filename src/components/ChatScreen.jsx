import React, { useState, useRef, useEffect } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import "../styles/ChatScreen.scss";

function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async (text) => {
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    setMessages((prev) => [...prev, { type: "user", text }]);
    try {
      const response = await fetch("https://news-rag-chatbot-server.onrender.com/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: data.answer || "",
          answer: data.answer || "",
          references: data.References || []
        }
      ]);
    } catch (e) {
      console.error("Chat error:", e);
      setError("Failed to get response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setError("");
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <header className="chat-header">
        <div className="header-info">
          <div className="logo">🤖</div>
          <div className="header-text">
            <h1>Voosh AI</h1>
            <p>Intelligent Assistant</p>
          </div>
        </div>
        
        <button
          className="reset-btn"
          onClick={handleReset}
          disabled={loading}
        >
          <span className="reset-icon">↻</span>
          Reset
        </button>
      </header>

      {/* Error Display */}
      {error && (
        <div className="error-msg">
          <span className="error-icon">⚠</span>
          {error}
        </div>
      )}

      {/* Messages */}
      <MessageList messages={messages} isLoading={loading} />

      {/* Input */}
      <MessageInput onSend={handleSend} loading={loading} />
    </div>
  );
}

export default ChatScreen;