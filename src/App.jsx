import React from "react";
import ChatScreen from "./components/ChatScreen";
import "./styles/App.scss";


function App() {
  return (
    <div className="app-container">
      {/* <div style={{textAlign: 'center', marginBottom: '1.5rem', color: '#ececf1', fontSize: '1rem'}}>
        <p>Welcome to Voosh AI Chat! This AI assistant helps answer your questions and provide information.</p>
        <p><strong>Note:</strong> AI responses may not always be accurate. Please verify important information independently.</p>
      </div> */}
      <ChatScreen />
    </div>
  );
}

export default App;
