
// import React, { useState, useEffect } from 'react';

// const ChatApp = () => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const socket = new WebSocket("ws://127.0.0.1:8000/ws");

//   useEffect(() => {
//     socket.onmessage = (event) => {
//       setMessages((prev) => [...prev, event.data]);
//     };
//   }, []);

//   const sendMessage = () => {
//     if (message) {
//       socket.send(message);
//       setMessages((prev) => [...prev, `You: ${message}`]);
//       setMessage("");
//     }
//   };

//   return (
//     <div>
//       <h1>Real-Time Chat</h1>
//       <div>
//         {messages.map((msg, idx) => (
//           <p key={idx}>{msg}</p>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type your message"
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default ChatApp;
import React, { useState, useEffect } from "react";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const user = localStorage.getItem("user");
  const user_id = JSON.parse(user).user_id;
  const socket = new WebSocket("ws://localhost:8000/ws");

  useEffect(() => {
    // Handle incoming messages from the server
    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const formattedMessage = `${user_id}:::${message}`;
      socket.send(formattedMessage);
      setMessages((prev) => [...prev]); // Add the sent message locally
      setMessage(""); // Clear the input field
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Real-Time Chat</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "400px",
          overflowY: "scroll",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, idx) => {
          const [senderId, content] = msg.split(":::"); // Extract senderId and message
          return (
            <p
              key={idx}
              style={{
                textAlign: senderId === user_id ? "right" : "left", // Align messages
                margin: "5px 0",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: senderId === user_id ? "#d1e7dd" : "#f8d7da", // Different colors
                color: senderId === user_id ? "#0f5132" : "#842029",
                wordWrap: "break-word",
                display: "block",
              }}
            >
              {content}
            </p>
          );
        })}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
        style={{
          width: "80%",
          padding: "10px",
          marginRight: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <button
        onClick={sendMessage}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0d6efd",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </div>
  );
};

export default ChatApp;
