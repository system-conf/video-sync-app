import React from 'react';
import './App.css';
import ReactPlayer from 'react-player';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Senkronizasyon Uygulaması</h1>
        <div className="video-container">
          <ReactPlayer
            url="https://firebasestorage.googleapis.com/v0/b/sulocloud-535a5.appspot.com/o/files%2FGibi%205.1.mp4?alt=media&token=c690b6be-f10d-4e7c-96e0-b280832464e6"
            playing={true} // Videoyu otomatik oynatmak için
            controls={true} // Video kontrol düğmelerini göstermek için
            width="50%" // Video genişliği
            height="auto" // Video yüksekliği
          />
          <ReactPlayer
            url="https://www.example.com/video2.mp4"
            playing={true}
            controls={true}
            width="50%"
            height="auto"
          />
        </div>
      </header>
    </div>
  );
}

export default App;
