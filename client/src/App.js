// import React from "react";
// import "./App.css";
// import ReactPlayer from "react-player";
// import WebSocketClient from "./WebSocketClient";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>sulo watch party</h1>
//         <div className="video-container">
//           <ReactPlayer
//             url="https://firebasestorage.googleapis.com/v0/b/sulocloud-535a5.appspot.com/o/files%2FGibi%205.1.mp4?alt=media&token=c690b6be-f10d-4e7c-96e0-b280832464e6"
//             playing={true} // Videoyu otomatik oynatmak için
//             controls={true} // Video kontrol düğmelerini göstermek için
//             width="50%" // Video genişliği
//             height="auto" // Video yüksekliği
//           />
//           <WebSocketClient />
//         </div>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

function App() {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const socket = socketIOClient('http://localhost:3000');

  useEffect(() => {
    socket.on('message', (data) => {
      console.log('Sunucudan gelen mesaj:', data);
      setReceivedMessages(prevMessages => [...prevMessages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    socket.emit('message', message, (response) => {
      console.log('Sunucudan gelen yanıt:', response);
      // Sunucudan gelen yanıtı işleyin
    });
    setMessage('');
  };
  
  return (
    <div>
      <h1>Socket.IO Chat Uygulaması</h1>
      <div>
        <h2>Alınan Mesajlar</h2>
        <ul>
          {receivedMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Mesaj Gönder</h2>
        <input type="text" value={message} onChange={handleMessageChange} />
        <button onClick={sendMessage}>Gönder</button>
      </div>
    </div>
  );
}

export default App;
