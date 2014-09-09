var express = require('express'),
    _ = require ('lodash'),
    path = require('path'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    clients = {}
    colors = ['blue', 'red', 'green'];

var generateRects = function() {
  return _.map(clients);
};

app.use('/js', express.static(path.resolve(__dirname + '/../app/js')));

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../app/index.html'));
});

io.set('transports', ['polling', 'websocket', 'xhr-polling']);

io.sockets.on('connection', function(socket) {
  console.log("Connection Received");
  clients[socket.id] = {
    x: _.random(500),
    y: _.random(500),
    width: _.random(100),
    height: _.random(100),
    fillStyle: colors[_.random(2)]
  };
  io.sockets.emit('position', generateRects());

	socket.on('disconnect', function() {
    console.log("Connection Terminated");
    delete clients[socket.id];
    io.sockets.emit('position', generateRects());
	});
});

server.listen(8080, function() {
  console.log("Listenting on port 8080...");
});
