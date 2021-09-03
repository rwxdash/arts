var cellsize = 10;
var gridsize = 10;
var size = 0;

var count = 5;

var snakes = [];

function setup() {
  background(40);
  colorMode(HSB, 360, 100, 100, 100);
  init();
}

function init() {
  size = gridsize * cellsize;

  var padding = 30;
  var border = 50;

  createCanvas((size * count) + ((count - 1) * padding) + border * 2, (size * count) + ((count - 1) * padding) + border * 2);

  noFill();
  strokeWeight(cellsize / 2);
  strokeCap(ROUND);
  frameRate(15);

  for (var y = 0; y < count; y++)
    for (var x = 0; x < count; x++)
      for (var i = 0; i < 3; i++)
        snakes.push(new Snake(x * size + x * padding + border, y * size + y * padding + border));
}

function draw() {
  noStroke();
  fill(0, 0, 20, 50);
  rect(0, 0, width, height, 30);

  for (var i = 0; i < snakes.length; i++) {
    snakes[i].update();
    snakes[i].draw();
    if (snakes[i].dead) snakes[i] = new Snake(snakes[i].x, snakes[i].y);
  }
}

function Snake(x, y) {
  this.dead = false;
  this.x = x;
  this.y = y;

  var segCount = random(2, 10);
  var segs = [];

  var dir = p5.Vector.fromAngle(floor(random(4)) * (TWO_PI / 4)).mult(cellsize);

  //var size = gridsize*cellsize;

  var pos = createVector(Math.ceil(random(size) / cellsize) * cellsize, Math.ceil(random(size) / cellsize) * cellsize);

  var newPos = createVector(0, 0);

  segs.push(pos);

  this.update = function () {
    if (random() < 0.3) {
      dir.rotate(random() < 0.5 ? -PI / 2 : PI / 2);
    }

    //move
    newPos = p5.Vector.add(pos, dir);

    segs.unshift(newPos);
    pos = newPos;

    if (segs.length > segCount) segs.pop();
  };

  var c = color(random(360), random(10, 70), 100);

  this.draw = function () {
    stroke(c);
    this.dead = true;

    for (var i = 0; i < segs.length - 1; i++) {
      var s = segs[i];
      var e = segs[i + 1];

      if (s.x >= 0 && s.x <= size && s.y >= 0 && s.y <= size) {
        if (e.x >= 0 && e.x <= size && e.y >= 0 && e.y <= size) {

          line(s.x + this.x, s.y + this.y, e.x + this.x, e.y + this.y);
          line(s.y + this.x, s.x + this.y, e.y + this.x, e.x + this.y);

          line(size - s.x + this.x, s.y + this.y, size - e.x + this.x, e.y + this.y);
          line(size - s.y + this.x, s.x + this.y, size - e.y + this.x, e.x + this.y);

          line(s.x + this.x, size - s.y + this.y, e.x + this.x, size - e.y + this.y);
          line(s.y + this.x, size - s.x + this.y, e.y + this.x, size - e.x + this.y);

          line(size - s.x + this.x, size - s.y + this.y, size - e.x + this.x, size - e.y + this.y);
          line(size - s.y + this.x, size - s.x + this.y, size - e.y + this.x, size - e.x + this.y);

          this.dead = false;
        }
      }
    }

    stroke(0, 0, 75);
    noFill();
    rect(this.x, this.y, size, size, 5, 5, 5, 5);
  };
}
