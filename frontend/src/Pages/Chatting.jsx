// import React, { useEffect, useRef, useState } from 'react';

// function Chatting() {
//   const inputTextRef = useRef(null);
//   const socketRef = useRef(null); // To store WebSocket instance
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     function getRandomInt(min, max) {
//       return Math.floor(Math.random() * (max - min + 1)) + min;
//     }

//     const id = getRandomInt(1, 1000);
//     const socket = new WebSocket(`ws://127.0.0.1:8000/ws/${id}`);
//     socketRef.current = socket;

//     function showMessage(message) {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     }

//     socket.addEventListener('open', () => {
//       showMessage('Connected to server.');
//     });

//     socket.addEventListener('message', (event) => {
//       showMessage(`${event.data}`);
//     });

//     socket.addEventListener('close', () => {
//       showMessage('Connection closed.');
//     });

//     return () => {
//       // Cleanup WebSocket connection on unmount
//       socket.close();
//     };
//   }, []);

//   const sendMessage = () => {
//     const inputValue = inputTextRef.current.value;
//     if (socketRef.current && inputValue) {
//       socketRef.current.send(inputValue);
//       setMessages((prevMessages) => [...prevMessages /*, `You: ${inputValue}`*/]);
//       inputTextRef.current.value = ''; // Clear input
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         ref={inputTextRef}
//         placeholder="Type something..."
//       />
//       <button onClick={sendMessage}>Send</button>
//       <div id="container">
//         {messages.map((message, index) => (
//           <div key={index}>{message}</div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Chatting;


import React, { useEffect, useRef, useState } from 'react';
import './Chatting.css'; // Import the CSS file

function Chatting() {
  const inputTextRef = useRef(null);
  const socketRef = useRef(null); // To store WebSocket instance
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const id = getRandomInt(1, 1000);
    setUserId(id); // Store user ID for distinguishing messages
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/${id}`);
    socketRef.current = socket;

    function showMessage(message) {
      setMessages((prevMessages) => [...prevMessages, message]);
    }

    socket.addEventListener('open', () => {
      showMessage({ text: 'Connected to server.', sender: 'system' });
    });

    socket.addEventListener('message', (event) => {
      showMessage({ text: event.data, sender: 'other' });
    });

    socket.addEventListener('close', () => {
      showMessage({ text: 'Connection closed.', sender: 'system' });
    });

    return () => {
      // Cleanup WebSocket connection on unmount
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    const inputValue = inputTextRef.current.value;
    if (socketRef.current && inputValue) {
      socketRef.current.send(inputValue);
      setMessages((prevMessages) => [
        ...prevMessages /*,
        { text: inputValue, sender: 'self' }*/,
      ]);
      inputTextRef.current.value = ''; // Clear input
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${
              message.sender === 'self' ? 'self' : 'other'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          ref={inputTextRef}
          placeholder="Type something..."
          className="chat-input"
        />
        <button onClick={sendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatting;
