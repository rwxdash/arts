/** OPC START **/
OPC.slider('seed', Math.floor(Math.random() * 1000), 0, 1000);
OPC.slider('tile_count', 7, 3, 14, 1);
OPC.slider('margin', 60, 20, 200, 20);
OPC.slider('speed', 2, 1, 5, 1);
/** OPC END**/

let pSeed = seed;
let pMargin = margin;
let pTile_count = tile_count;
let pSpeed = tile_count;

let colors = ["#000000", "#ED4141", "#FECA16", "#2B8BDF", "#159670"];
let wdt;
let forms;
let lines;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  init();
}

function draw() {
  randomSeed(seed);
  noiseSeed(seed);
  translate((width - wdt) / 2, (height - wdt) / 2);
  background(255);
  for (let l of lines) {
    drawLines(l.x, l.y, l.z);
  }
  for (let f of forms) {
    f.run();
  }

  if (seed != pSeed || margin != pMargin || pTile_count != tile_count || pSpeed != speed) {
    pSeed = seed;
    pTile_count = tile_count;
    pMargin = margin;
    pSpeed = speed;
    init();
  }
}

function init() {
  randomSeed(seed);
  noiseSeed(seed);
  if (windowWidth < windowHeight) {
    wdt = width;
  } else {
    wdt = height;
  }
  wdt -= margin * 2;
  addForms();
}

function addForms() {
  forms = [];
  lines = [];
  let w = wdt / tile_count;
  for (let i = 0; i < tile_count; i++) {
    for (let j = 0; j < tile_count; j++) {
      let x = i * w;
      let y = j * w;
      let rnd = int(random(5));
      if (rnd == 0) lines.push(createVector(x, y, w));
      if (rnd == 1) forms.push(new Wave(x, y, w));
      if (rnd == 2) forms.push(new Stairs(x, y, w));
      if (rnd == 3) forms.push(new Pins(x, y, w));
      if (rnd == 4) forms.push(new PIZZA(x, y, w));
    }
  }
}

function drawLines(x, y, w) {
  push();
  translate(x + w / 2, y + w / 2);
  rotate(int(random(4)) * (TAU / 4));
  line(w / 2, w / 2, -w / 2, w / 2);
  pop();
}

function easeOutQuint(t) {
  return 1 + (--t) * t * t * t * t;
}

function easeInOutCubic(t) {
  if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t;
  return 1 / 2 * ((t -= 2) * t * t + 2);
}

//☆-------------------------------------------------------------------------------------------------------------------------------------☆

class Wave {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.ang = int(random(4)) * TAU / 4;
    this.col = random(colors);
    this.mv = 0;
    this.init();
    this.pn = random() < 0.5 ? -1 : 1;
  }

  show() {
    push();
    translate(this.x + this.w / 2, this.y + this.w / 2);
    scale(this.pn, 1);
    rotate(this.ang);
    translate(-this.w / 2, -this.w / 2);
    noFill();
    stroke(0);
    line(0, 0, this.w, 0);
    let nn = int(this.w * 0.9);
    beginShape();
    for (let i = 0; i < nn; i++) {
      let theta = map(i, 0, nn - 1, 0, TAU * 2);
      let sw = map(i, 0, nn - 1, 0, this.w * 0.45);
      let xx = (this.w / 2) + sw * sin(theta - this.mv);
      vertex(xx, i);
    }
    endShape();
    fill(this.col);
    circle((this.w / 2) + this.w * 0.45 * sin(TAU * 2 - this.mv), this.w * 0.9, this.w * 0.1);
    pop();
  }

  move() {
    if (0 <= this.t && this.t < this.t1) {
      let nrm = norm(this.t, 0, this.t1 - 1);
      this.mv = lerp(0, TAU, easeOutQuint(nrm));
    }
    if (this.t1 < this.t) {
      this.init();
    }
    this.t++;
  }

  init() {
    this.t = -int(random(map(speed, 1, 5, 3500, 100)));
    this.t1 = map(speed, 1, 5, 220, 60);
  }

  run() {
    this.show();
    this.move();
  }
}

//☆-------------------------------------------------------------------------------------------------------------------------------------☆

class Stairs extends Wave {
  constructor(x, y, w) {
    super(x, y, w);
    this.sw = this.w / 3
    this.sx = this.sw;
    this.sy = this.sw;
    this.tog = 0;
  }

  show() {
    push();
    translate(this.x + this.w / 2, this.y + this.w / 2);
    scale(this.pn, 1);
    rotate(this.ang);
    stroke(0);
    fill(this.col);
    square(0, 0, this.w / 3);
    square(this.sx, this.sy, this.w / 3);
    square(-this.sx, -this.sy, this.w / 3);
    pop();
  }

  move() {

    if (0 <= this.t && this.t < this.t1) {
      let nrm = norm(this.t, 0, this.t1 - 1);
      this.sx = lerp(-1, 1, easeInOutCubic(nrm)) * this.sw * ((this.tog * 2) - 1);
    }
    if (this.t1 < this.t) {
      if (this.tog) this.tog = 0;
      else this.tog = 1;
      this.init();
    }
    this.t++;
  }
}

//☆-------------------------------------------------------------------------------------------------------------------------------------☆

class Pins extends Wave {
  constructor(x, y, w) {
    super(x, y, w);
    this.mv = random(123123);
  }

  show() {
    push();
    translate(this.x + this.w / 2, this.y + this.w / 2);
    rotate(this.ang);
    translate(-this.w / 2, -this.w / 2);

    stroke(0);
    fill(this.col);
    line(0, this.w, this.w, this.w);
    for (let i = 0; i < 3; i++) {
      let xx = map(i, -1, 3, 0, this.w);
      let h = this.w * noise(i, this.mv * 0.2);
      line(xx, this.w, xx, h);
      circle(xx, h, this.w * 0.1);
    }
    pop();
  }

  move() {
    if (0 <= this.t && this.t < this.t1) {
      this.mv += 0.05;
    }
    if (this.t1 < this.t) {
      this.init();
    }
    this.t++;
  }
}

//☆-------------------------------------------------------------------------------------------------------------------------------------☆

class PIZZA extends Stairs {
  constructor(x, y, w) {
    super(x, y, w);
    this.rot = 0;
    this.d = this.w * 0.25
  }

  show() {
    push();
    translate(this.x + this.w / 2, this.y + this.w / 2);
    rotate(this.ang);
    line(this.w * 0.15, this.w * 0.15, this.w * 0.5, this.w * 0.5);
    line(-this.w * 0.15, -this.w * 0.15, -this.w * 0.5, -this.w * 0.5);
    rotate(this.rot + (PI / 4));
    fill(this.col);
    for (let i = 0; i < 4; i++) {
      rotate(PI / 2);
      arc(this.w * 0.02, this.w * 0.02, this.d, this.d, 0, PI / 2, PIE);
    }
    pop();
  }

  move() {
    if (0 <= this.t && this.t < this.t1) {
      let nrm = norm(this.t, 0, this.t1 - 1);
      this.rot = lerp(0, TAU * this.pn, easeOutQuint(nrm));
    }
    if (this.t1 < this.t) {
      this.init();
    }
    this.t++;
  }
}
