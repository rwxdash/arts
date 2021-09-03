// By Roni Kaufman
// https://ronikaufman.github.io/

// palette from Chromotome: https://kgolid.github.io/chromotome-site/ (dt02)
let colors = [[48, 41, 86], [243, 197, 7], [238, 227, 211]];
let colVert, colHori;
let s;
let probFactor = 0.75;
let margin;
let rects = [];

function setup() {
  createCanvas(600, 600);
  noStroke();
  noLoop();
}

function draw() {
  shuffle(colors, true);
  background(colors[0]);
  colVert = random([1, 2]);
  colHori = random([1, 2]);
  const N = random([32, 64]);
  s = width / (N + 1);
  margin = s;
  divide(width - margin, margin, margin, N, 1);
  divide(width - margin, margin, margin, N, 1);
  if (random() < 0.8) shuffle(rects, true);
  drawRects();
}

function divide(size, x, y, n, probDivide) {
  if ((random() < probDivide) && (n > 8)) {
    let newProbDivide = probDivide * probFactor;
    if ((n > 4) && (random() < 0.5)) {
      divide(size / 2, x + size / 4, y + size / 4, n / 2, newProbDivide);
      divide(size / 4, x, y, n / 4, newProbDivide * probFactor);
      divide(size / 4, x + size / 4, y, n / 4, newProbDivide * probFactor);
      divide(size / 4, x + 2 * size / 4, y, n / 4, newProbDivide * probFactor);
      divide(size / 4, x + 3 * size / 4, y, n / 4, newProbDivide * probFactor);
      divide(size / 4, x, y + size / 4, n / 4, newProbDivide * probFactor);
      divide(size / 4, x + 3 * size / 4, y + size / 4, n / 4, newProbDivide * probFactor);
      divide(size / 4, x, y + 2 * size / 4, n / 4, newProbDivide * probFactor);
      divide(size / 4, x + 3 * size / 4, y + 2 * size / 4, n / 4, newProbDivide * probFactor);
      divide(size / 4, x, y + 3 * size / 4, n / 4, newProbDivide * probFactor);
      divide(size / 4, x + size / 4, y + 3 * size / 4, n / 4, newProbDivide * probFactor);
      divide(size / 4, x + 2 * size / 4, y + 3 * size / 4, n / 4, newProbDivide * probFactor);
      divide(size / 4, x + 3 * size / 4, y + 3 * size / 4, n / 4, newProbDivide * probFactor);
    } else {
      divide(size / 2, x, y, n / 2, newProbDivide);
      divide(size / 2, x + size / 2, y, n / 2, newProbDivide);
      divide(size / 2, x, y + size / 2, n / 2, newProbDivide);
      divide(size / 2, x + size / 2, y + size / 2, n / 2, newProbDivide);
    }
  } else {
    makeSquare(n, x, y);
  }
}

function makeSquare(n, x0, y0) {
  let lastCol = -1;
  let col = -1;
  let d = s * n - margin;
  let vertical = (random() < 0.5);
  for (let i = 1; i < n; i += 2) {
    if (!vertical) {
      //fill(colors[0]);
      //rect(x0, y0+i*s-margin, d, s);
      rects.push({
        x: x0,
        y: y0 + i * s - margin,
        w: d,
        h: s,
        col: colHori
      });
    } else {
      //fill(colors[1]);
      //rect(x0+i*s-margin, y0, s, d);
      rects.push({
        x: x0 + i * s - margin,
        y: y0,
        w: s,
        h: d,
        col: colVert
      });
    }
  }
}

function drawRects() {
  for (let r of rects) {
    fill(colors[r.col]);
    rect(r.x, r.y, r.w, r.h);
  }
}

function keyPressed() {
  if (key === " ") {
    rects = [];
    draw();
  }
}
