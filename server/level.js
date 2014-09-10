var fs = require('fs'),
    path = require('path'),
//  Sync because we need that data before we can provide level info.
    levelData = fs.readFileSync(path.resolve(__dirname + '/../shared/level.json'));

module.exports = JSON.parse(levelData);
