var stage = new Facade(document.querySelector('canvas')),
    group = new Facade.Group();

stage.draw(function () {
    stage.clear();
    this.addToStage(group);
});

var socket = io();
socket.on('position', function(rects) {
  group = new Facade.Group()
  for (var i = 0; i < rects.length; i++) {
    group.addToGroup(new Facade.Rect(rects[i]))
  }
});
