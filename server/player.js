var _ = require('lodash'),
    level = require('./level'),
    BlockMaxWidth = 100,
    BlockMaxHeight = 100,
    colors = ['blue', 'red', 'green'];

module.exports = {
  makeRandomPlayer: function() {
    return {
      x: _.random(level.width),
      y: _.random(level.height),
      width: _.random(BlockMaxWidth),
      height: _.random(BlockMaxHeight),
      fillStyle: colors[_.random(2)]
    };
  }
};
