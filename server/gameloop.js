var _ = require('lodash');

module.exports = function(network) {
  var players = {};


  return {
    start: function() {
      setInterval(function() {
        var mailbox = network.getMail();
        _.each(mailbox, function(mail) {
          if (mail.type === 'make') {
            players[mail.id] = mail.data;
          } else if (mail.type === 'delete') {
            delete players[mail.id];
          }
        });
        network.broadcastMessage('position', _.map(players));
      }, 50);
    }
  }
};
