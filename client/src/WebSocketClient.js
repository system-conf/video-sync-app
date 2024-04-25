import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://localhost:8080/", "echo-protocol");

function VideoPlayer() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    client.onclose = () => {
      console.log("Connection Closed");
    };

    client.onmessage = (message) => {
      if (typeof message.data === "string") {
        // Gelen mesaj bir metinse, bu durumu ele alabiliriz
        console.log("Received string message: '" + message.data + "'");
      } else {
        // Gelen mesaj bir byte dizisi ise, bu video verisi olabilir
        const videoBlob = new Blob([message.data]);
        const videoUrl = URL.createObjectURL(videoBlob);
        setVideoUrl(videoUrl);
        setVideoPlaying(true);
      }
    };

    client.onerror = (error) => {
      console.error("Connection Error: " + error);
    };

    return () => {
      client.close();
    };
  }, []);

  return (
    <div>
      {videoPlaying ? (
        <video controls autoPlay>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Waiting for video stream...</p>
      )}
    </div>
  );
}

export default VideoPlayer;
