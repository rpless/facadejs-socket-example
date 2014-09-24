var fs = require('fs'),
    path = require('path'),
    _ = require('lodash'),
    levelData = JSON.parse(fs.readFileSync(path.resolve(__dirname + '/../shared/level.json'))),
    Scale = 30;

module.exports.metadata = {
    width: levelData.width,
    height: levelData.height,
};

module.exports.create = function() {
  var b2d = require('box2dnode'),
      world = new b2d.b2World(new b2d.b2Vec2(0, -10), true),
      fixtureDef = new b2d.b2FixtureDef(),
      bodyDef = new b2d.b2BodyDef(),
      players = {};

  fixtureDef.density = 1.0;
  fixtureDef.friction = 0.5;
  fixtureDef.restitution = 0.2;

  var helpers = {
    blockMaxWidth: 100,
    blockMaxHeight: 100,
    colors: ['blue', 'red', 'green'],

    createFloor: function() {
      bodyDef.type = b2d.b2Body.b2_staticBody;
      bodyDef.position.x = (levelData.width / 2) / Scale;
      bodyDef.position.y = (10) / Scale;

      fixtureDef.shape = new b2d.b2PolygonShape();
      fixtureDef.shape.SetAsBox((levelData.width / 2) / Scale, (5) / Scale);
      world.CreateBody(bodyDef).CreateFixture(fixtureDef);
    },

    createPlayer: function() {
      var p = this.randomPlayer();
      bodyDef.type = b2d.b2Body.b2_dynamicBody;
      fixtureDef.shape = new b2d.b2PolygonShape();
      fixtureDef.shape.SetAsBox((p.width / 2) / Scale, (p.height / 2) / Scale);
      bodyDef.position.x = (p.x) / Scale;
      bodyDef.position.y = (p.y) / Scale;
      var body = world.CreateBody(bodyDef);
      body.CreateFixture(fixtureDef);
      return {
        physics: body,
        width: p.width,
        height: p.height,
        fillstyle: p.fillstyle
      };
    },

    randomPlayer: function() {
      return {
        x: _.random(levelData.width),
        y: _.random(levelData.height),
        width: _.random(this.blockMaxWidth),
        height: _.random(this.blockMaxHeight),
        fillStyle: this.colors[_.random(2)]
      };
    }
  };

  helpers.createFloor();

  return {
    width: levelData.width,
    height: levelData.height,

    update: function() {
      world.Step(1/30, 10, 10);
      var playerData = _.map(players, function(player) {
        var position = player.physics.GetPosition();
        return {
          fillStyle: player.fillstyle,
          x: position.x * Scale,
          y: position.y * Scale,
          width: player.width,
          height: player.height
        };
      });
      return playerData;
    },

    addPlayer: function(id) {
      players[id] = helpers.createPlayer();
    },

    removePlayer: function(id) {
      world.DestroyBody(players[id].physics);
      delete players[id];
    }
  };
};
