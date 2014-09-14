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
    console.log(rects);
    var rect = rects[i];
    rect.x = rect.x - (rect.width / 2);
    rect.y = 600 - (rect.y - (rect.height / 2));
    group.addToGroup(new Facade.Rect(rect));
  }
});
