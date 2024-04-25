// const { server: WebSocketServer } = require("websocket");
// const http = require("http");
// const fs = require("fs");

// const server = http.createServer(function (request, response) {
//   console.log(new Date() + " Received request for " + request.url);
//   response.writeHead(404);
//   response.end();
// });
// server.listen(8080, function () {
//   console.log(new Date() + " Server is listening on port 8080");
// });

// const wsServer = new WebSocketServer({
//   httpServer: server,
//   autoAcceptConnections: false,
// });

// function originIsAllowed(origin) {
//   // Köken kontrolü
//   return true;
// }

// wsServer.on("request", function (request) {
//   if (!originIsAllowed(request.origin)) {
//     request.reject();
//     console.log(new Date() + " Connection from origin " + request.origin + " rejected.");
//     return;
//   }

//   const connection = request.accept("echo-protocol", request.origin);
//   console.log(new Date() + " Connection accepted.");

//   // Video dosyasını oku ve istemcilere gönder
//   const videoPath = "./asd.mp4"; // Video dosyasının yerel yolu
//   const videoStream = fs.createReadStream(videoPath);

//   videoStream.on("data", (chunk) => {
//     connection.sendBytes(chunk);
//   });

//   videoStream.on("end", () => {
//     connection.close();
//     console.log(new Date() + " Video stream sent to client.");
//   });
// });

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app); // Express uygulamasını HTTP sunucusuna bağla
const io = socketIO(server); // Socket.IO'yu HTTP sunucusuna bağla

io.on('connection', (socket) => {
  console.log('Bir istemci bağlandı');

  // İstemciden gelen 'message' olayını dinle
  socket.on('message', (data) => {
    console.log('İstemciden gelen mesaj:', data);
    
    // Tüm istemcilere mesajı yayınla
    io.emit('message', data);
  });
});

server.listen(3000, () => {
  console.log('Sunucu çalışıyor. Port: 3000');
});


