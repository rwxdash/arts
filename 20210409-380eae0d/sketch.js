const palette = ["#3B3247", "#006D8E", "#EEDCC4", "#B53021", "#421717"]
let lines = [];
let linesNum = 60;

const DIST = 10;
let MAX;
const GEN = 30;

let stColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  MAX = width > height ? width : height;
  stColor = random(palette);

  for (let i = 0; i < linesNum; i++) {
    lines.push(new MyLine());
  }
}

function draw() {
  background(235);

  noStroke();
  for (let i = 0; i < lines.length; i++) {
    push();
    translate(width / 2, height / 2);
    rotate(360 * i / lines.length);
    lines[i].display();
    pop();
  }

  fill(235);
  stroke(stColor);
  strokeWeight(10);
  circle(width / 2, height / 2, MAX * 0.2);
}

class MyLine {
  constructor() {
    this.objs = [];
    this.speed = random(3, 6);
    this.h = random(2, 10);
  }

  display() {
    if (random(100) < GEN) {
      if ((this.objs.length == 0) ||
        (this.objs.length > 0 && this.objs[this.objs.length - 1].hasDistance())) {
        this.objs.push((new Obj(this.speed, this.h)));
      }
    }

    for (let i = 0; i < this.objs.length; i++) {
      this.objs[i].move();
      this.objs[i].display();
    }

    if (this.objs.length > 0) {
      for (let j = this.objs.length - 1; j >= 0; j--) {
        if (this.objs[j].isFinished()) {
          this.objs.splice(j, 1);
        }
      }
    }
  }
}

class Obj {
  constructor(tmpSpeed, tmpH) {
    this.x = 0;
    this.y = 0;
    this.speed = tmpSpeed;
    this.w = random(10, 100);
    this.h = tmpH;
    this.c = color(random(palette));
  }

  move() {
    this.x -= this.speed;
  }

  isFinished() {
    if (this.x < -MAX * 0.6 - this.w) {
      return true;
    } else {
      return false;
    }
  }

  hasDistance() {
    if (this.x < -(this.w + DIST)) {
      return true;
    } else {
      return false;
    }
  }

  display() {
    fill(this.c);
    rect(this.x, this.y, this.w, this.h, this.h / 2);
  }
}
