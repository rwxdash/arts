const subCount = 7;
const mainCount = 7;
const padding = 25;
const border = 50;
const gridSize = 10;
const objectSize = 10;

const locationOffset = (gridSize === objectSize) ? 0 : (gridSize - objectSize) / 2;
const canvasSize = ((gridSize * subCount) + padding) * mainCount + (border * 2) - padding;

const palette = [
  ["#dfd6a7", "#f7ce5b", "#f7b05b", "#af9b46", "#1f1300"],
  ["#4e598c", "#ffffff", "#f9c784", "#fcaf58", "#ff8c42"],
  ["#e09f7d", "#ef5d60", "#ec4067", "#a01a7d", "#311847"],
  ["#5603ad", "#8367c7", "#b3e9c7", "#c2f8cb", "#f0fff1"],
  ["#fcde9c", "#ffa552", "#ba5624", "#381d2a", "#c4d6b0"],
  ["#f5e3e0", "#e8b4bc", "#d282a6", "#6e4555", "#3a3238"],
  ["#df2935", "#86ba90", "#f5f3bb", "#dfa06e", "#412722"],
  ["#087e8b", "#ff5a5f", "#3c3c3c", "#f5f5f5", "#c1839f"],
  ["#f7fff6", "#bcebcb", "#87d68d", "#93b48b", "#8491a3"],
  ["#7a7a7a", "#ecf8f8", "#00171f", "#a5a29b", "#f7f3f2"],
]

function setup() {
  createCanvas(canvasSize, canvasSize);
  colorMode(RGB, 255, 255, 255, 1);
  // frameRate(5);
}

function draw() {
  noStroke();
  fill(40);
  rect(0, 0, canvasSize, canvasSize);

  for (let y = 0; y < mainCount; y++) {
    for (let x = 0; x < mainCount; x++) {
      let locX = x * gridSize * subCount + x * padding + border + locationOffset;
      let locY = y * gridSize * subCount + y * padding + border + locationOffset;
      fillCells(locX, locY, palette[floor(random(0, palette.length - 1))]);
    }
  }

  noLoop();
}

function fillCells(x, y, colorPalette) {
  strokeWeight(1);
  stroke(40);
  noFill();
  rect(x, y, subCount * gridSize);
  noStroke();
  // if (x > 50 && random(0, 1) > 0.75) {
  //   return;
  // }

  for (let j = 0; j < subCount; j++) {
    for (let i = 0; i < subCount; i++) {

      if (random(0, 1) > 0.5) {
        fill(colorPalette[floor(random(0, 4))]);
      } else {
        fill(40);
      }

      let subLocX = x + i * gridSize + locationOffset;
      let subLocY = y + j * gridSize + locationOffset;

      rect(
        subLocX, subLocY,
        gridSize, gridSize,
      );
    }
  }
}


function hexToRgba(hex) {
  hex = hex.replace('#', '');

  let bigint = parseInt(hex, 16);

  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  let a = random(0.5, 1);
  return color(r, g, b, a);
}
