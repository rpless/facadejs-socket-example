var express = require('express'),
    _ = require ('lodash'),
    path = require('path'),
    app = express(),
    server = require('http').createServer(app),
    network = require('./network')(server),
    gameloop = require('./gameloop')(network),
    clients = {};

app.use('/js', express.static(path.resolve(__dirname + '/../app/js')));
app.use('/css', express.static(path.resolve(__dirname + '/../app/css')));

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../app/index.html'));
});

server.listen(8080, function() {
  console.log("Listenting on port 8080...");
});

gameloop.start();
