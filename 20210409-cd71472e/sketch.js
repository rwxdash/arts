let layer1, layer2, layer3;
let colors = ["#4165DA", "#FF38D6", "#ff9373", "#761DB0", "#00E2BA"];

function setup() {
  createCanvas(800, 800);
  imageMode(CENTER);
  rectMode(CENTER);
  generate();
}

function draw() {
}

function generate() {
  background(random(colors));
  noStroke();
  fill(30);
  rect(width / 2, height / 2, width * 0.9, width * 0.9);


  noStroke();
  for (let i = 0; i < 200; i++) {
    let x = randomGaussian(0.5, 0.16) * width;
    let y = randomGaussian(0.5, 0.16) * height;
    let s = (random(100) * random(random())) + 1;
    let rnd = int(random(-2, 5));
    let ang = int(random(4)) * (TAU / 4);
    push();
    translate(x, y);
    rotate(ang);
    noStroke();
    fill(random(colors));
    if (random() < 0.5) {
      stroke(random(colors));
      if (random() < 0.5) {
        noFill();
      }
    }
    if (rnd <= 0) {
      circle(0, 0, s);
    }
    if (rnd == 1) {
      rect(0, 0, (s + 20) * 10, 1 + random(4));
    }
    if (rnd == 2) {
      if (random() < 0.5) {
        square(0, 0, s);
      } else {
        rect(0, 0, s, s * random(0.5, 1.5));
      }
    }
    if (rnd == 3) {
      organicShape(0, 0, s)
    }
    if (rnd == 4) {
      noiseCurve(0, 0, s * 0.5);
    }
    pop();
  }
}

function organicShape(x, y, s) {
  let pos = [];
  num = 7;
  for (let a = 0; a < TAU; a += (TAU / num)) {
    pos.push({
      x: x + s * 0.5 * cos(a) + (random(-1, 1) * random() * s * 0.15),
      y: y + s * 0.5 * sin(a) + (random(-1, 1) * random() * s * 0.15)
    });
  }
  beginShape();
  curveVertex(pos[pos.length - 1].x, pos[pos.length - 1].y);
  for (let i = 0; i < pos.length; i++) {
    curveVertex(pos[i].x, pos[i].y);
  }
  curveVertex(pos[0].x, pos[0].y);
  curveVertex(pos[1].x, pos[1].y);
  endShape();
}

function noiseCurve(x, y, w) {
  let c = int(random(20, 200));
  let px = x;
  let py = y;
  let rr = random(1000000);
  for (let i = 0; i < c; i++) {
    let scl = 0.0003;
    let angle = noise(x * scl, y * scl, rr) * 100;
    let ww = map(i, 0, c - 1, w, 0);
    strokeWeight(ww);
    line(x, y, px, py);
    px = x;
    py = y;
    x += cos(angle) * 2;
    y += sin(angle) * 2;
  }
}
