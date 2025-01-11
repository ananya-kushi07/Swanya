import React, { useState } from 'react';
import './ChatBotIcon.css'; // External CSS for styling

const ChatBotIcon = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the chatbot pop-up

  const toggleChatBot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Floating Chatbot Icon */}
      <div className="chatbot-icon-button" onClick={toggleChatBot}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png" // Replace with your chatbot icon URL
          alt="Chat Bot"
          className="chatbot-icon-image"
        />
      </div>

      {/* Pop-Up Chatbot (shown when isOpen is true) */}
      {isOpen && (
        <div className="chatbot-popup">
          <div className="chatbot-popup-header">
            <h3>Chat with us</h3>
            <button onClick={toggleChatBot} className="close-button">
              &times;
            </button>
          </div>
          <iframe
            src="https://console.dialogflow.com/api-client/demo/embedded/a98a78e6-4f84-4413-84ca-878a5ff114ab"
            width="350"
            height="500"
            style={{ border: 'none' }}
            title="Dialogflow Chatbot"
          />
        </div>
      )}
    </div>
  );
};

export default ChatBotIcon;
