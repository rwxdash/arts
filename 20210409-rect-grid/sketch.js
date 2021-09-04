const count = 25;
const padding = 0;
const border = 50;
const gridSize = 25;
const objectSize = 25;

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
      fill(random(80, 240), random(30, 60), random(75, 90));
      // fill(random(240, 320), random(10, 70), 100)

      let locX = x * gridSize + x * padding + border + locationOffset;
      let locY = y * gridSize + y * padding + border + locationOffset;

      roundTopLeft = random(0, random(abs(y - count), (abs(y - count) / 10) * objectSize));
      roundTopRight = random(0, random(abs(y - count), (abs(y - count) / 10) * objectSize));
      roundBottomLeft = random(0, random(abs(y - count), (abs(y - count) / 10) * objectSize));
      roundBottomRight = random(0, random(abs(y - count), (abs(y - count) / 10) * objectSize));

      rect(
        locX, locY,
        objectSize, objectSize,
        // roundTopLeft,
        // roundTopRight,
        // roundBottomLeft,
        // roundBottomRight
      );

    }
  }

  noLoop();

  // saveCanvas();
}
