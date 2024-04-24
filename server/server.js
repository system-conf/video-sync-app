const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('Yeni bir bağlantı kuruldu.');

  ws.on('message', function incoming(message) {
    console.log('Mesaj alındı:', message);
    
    // Gelen mesajı diğer bağlantılara göndermek için:
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});
