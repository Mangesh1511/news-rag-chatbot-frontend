import React, { useState, useRef, useEffect } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import "../styles/ChatScreen.scss";

function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cleanStreamData = (chunk) => {
    // Remove 'data: ' prefix and clean up the chunk
    return chunk
      .replace(/^data:\s*/gm, '') // Remove 'data: ' prefix
      .replace(/^"|"$/g, '') // Remove leading/trailing quotes
      .replace(/\\n/g, '\n') // Convert \n to actual newlines
      .replace(/\\"/g, '"'); // Convert \" to actual quotes
  };

  const handleSend = async (text) => {
    if (!text.trim()) return;
    
    setLoading(true);
    setError("");
    
    // Add user message
    setMessages((prev) => [...prev, { type: "user", text }]);
    
    let botText = "";
    let botMessageIndex = null;

    try {
      const response = await fetch("https://news-rag-chatbot-server.onrender.com/api/ask/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const cleanedChunk = cleanStreamData(chunk);
        
        // Skip empty chunks
        if (!cleanedChunk.trim()) continue;
        
        botText += cleanedChunk;

        setMessages((prev) => {
          if (botMessageIndex === null) {
            // Add new bot message
            botMessageIndex = prev.length;
            return [...prev, { type: "bot", text: botText }];
          } else {
            // Update existing bot message
            return prev.map((msg, idx) =>
              idx === botMessageIndex ? { ...msg, text: botText } : msg
            );
          }
        });
      }
    } catch (e) {
      console.error("Chat error:", e);
      setError("Failed to get response. Please try again.");
      
      // Remove the loading message if it was added
      setMessages((prev) => {
        if (botMessageIndex !== null && prev[botMessageIndex]?.text === "") {
          return prev.slice(0, -1);
        }
        return prev;
      });
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