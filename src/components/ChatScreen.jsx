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
    try {
      const response = await fetch("https://news-rag-chatbot-server.onrender.com/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text }),
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // After sending, fetch updated history from backend
      const historyRes = await fetch("https://news-rag-chatbot-server.onrender.com/api/ask/history", {
        method: "GET",
        credentials: "include"
      });
      if (historyRes.ok) {
        const historyData = await historyRes.json();
        if (Array.isArray(historyData.history)) {
          setMessages(
            historyData.history.map((msg) => ({
              type: msg.type,
              text: msg.type === "user" ? msg.content : msg.content,
              answer: msg.type === "bot" ? msg.content : undefined,
              references: msg.references || []
            }))
          );
        }
      }
    } catch (e) {
      console.error("Chat error:", e);
      setError("Failed to get response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch history on mount (refresh)
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("https://news-rag-chatbot-server.onrender.com/api/ask/history", {
          method: "GET",
          credentials: "include"
        });
        if (!response.ok) return;
        const data = await response.json();
        console.log("/api/ask/history response:", data); // Debug print
        if (Array.isArray(data.history)) {
          // Map history to messages format
          setMessages(
            data.history.map((msg) => ({
              type: msg.type,
              text: msg.type === "user" ? msg.content : msg.content,
              answer: msg.type === "bot" ? msg.content : undefined,
              references: msg.references || []
            }))
          );
        }
      } catch (e) {
        // Ignore history fetch errors
      }
    };
    fetchHistory();
  }, []);

  const handleReset = async () => {
    setLoading(true);
    setError("");
    try {
      await fetch("https://news-rag-chatbot-server.onrender.com/api/ask/reset", {
        method: "POST",
        credentials: "include"
      });
    } catch (e) {
      // Ignore reset errors
    }
    setMessages([]);
    setLoading(false);
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