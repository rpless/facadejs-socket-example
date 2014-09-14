var _ = require('lodash'),
    level = require('./level').create(),
    FRAME_RATE = 1000 / 60;

module.exports = function(network) {
  var players = {};

  return {
    start: function() {
      setInterval(function() {
        var mailbox = network.getMail();
        _.each(mailbox, function(mail) {
          if (mail.type === 'make') {
            level.addPlayer(mail.id);
          } else if (mail.type === 'delete') {
            level.removePlayer(mail.id);
          }
        });
        network.broadcastMessage('position', level.update());
      }, FRAME_RATE);
    }
  }
};
