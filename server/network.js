var _ = require ('lodash'),
    player = require('./player');

module.exports = function(server) {
  var io = require('socket.io').listen(server);
  io.set('transports', ['polling', 'websocket', 'xhr-polling']);

  var mailbox = [];

  io.sockets.on('connection', function(socket) {
    console.log("Connection Received");
    mailbox.push({
      id: socket.id,
      type: 'make',
      data: player.makeRandomPlayer()
    });

    socket.on('disconnect', function() {
      console.log("Connection Terminated");
      mailbox.push({
        id: socket.id,
        type: 'delete',
      });
    });
  });

  return {

    getMail: function() {
      var mail = _.map(mailbox);
      mailbox = [];
      return mail;
    },

    broadcastMessage: function(id, msg) {
      io.sockets.emit(id, msg);
    }
  };
};
