const count = 25;
const padding = 5;
const border = 50;
const gridSize = 10;
const objectSize = 10;

const locationOffset = (gridSize === objectSize) ? 0 : (gridSize - objectSize) / 2;
const canvasSize = (gridSize + padding) * count + (border * 2);

function setup() {
  colorMode(HSB, 360, 100, 100, 100);
  init();
}

function init() {
  createCanvas(canvasSize, canvasSize);
  frameRate(10);
}

function draw() {
  noStroke();
  fill(0, 0, 20, 100);
  rect(0, 0, canvasSize, canvasSize);

  for (let y = 0; y < count; y++) {
    for (let x = 0; x < count; x++) {
      fill(random(200, 360), random(10, 70), 100)
      let locX = x * gridSize + x * padding + border + locationOffset + objectSize / 2;
      let locY = y * gridSize + y * padding + border + locationOffset + objectSize / 2;

      circle(locX, locY, objectSize);
    }
  }

  console.log(canvasSize)

  noLoop();
}
