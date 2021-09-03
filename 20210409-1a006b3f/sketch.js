function setup() {
  createCanvas(800, 800);
  background('white');
  noLoop();
}

function draw() {
  xgrid(25, 1)
  //how big between each line
  ygrid(25, 1)
}

function xgrid(scale1, scaleWeight) {
  strokeWeight(scaleWeight)
  for (var step = 0; step <= 800; step = step + scale1)
    line(step, 0, step, 800);
}

function ygrid(scale2, scale2Weight) {
  strokeWeight(scale2Weight)
  for (var step1 = 0; step1 <= 800; step1 = step1 + scale2)
    line(0, step1, 800, step1);
}
