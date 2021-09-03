// see also my implementation with p5 and shaders: https://www.openprocessing.org/sketch/1003996
//
// ffmpeg -framerate 20 -i myImg1597278733216_%02d.png -vf scale=300:300 output.gif
// This sine wave repeats every 240 frames: sin(TWO_PI*frameCount/240)

// noprotect

p5.disableFriendlyErrors = true;

const gridSize = 40;
let numLayers = 8;
let changePerPixel = 1 / 70;
let changePerLevel = 0.03;
let changePerFrame = 0.008;

let shouldRecord = false;

const [mainColor, secondColor, bgColor] = [
  "#e4844a",
  "#e8bf56",
  "#452632"
];

function setup() {
  createCanvas(600, 600);
  background(150);
  noSmooth(); //speed things up a bit- no antialiasing
}
const dateNow = Date.now();

function draw() {
  background(bgColor);
  translate(300, 370)
  for (i = 0; i < numLayers; i++) {
    const timeAndZOffset = shouldRecord ? map(cos(TWO_PI * frameCount / 240), -1, 1, 0, 100) : frameCount;
    makeNoiseLayer(i * changePerLevel, timeAndZOffset);
    translate(0, -30);
  }



  if (shouldRecord) {
    if (frameCount < 241) {
      save('myImg' + dateNow + '_' + pad(frameCount));
    } else {
      noLoop();
    }
  }

}


function pad(numN) {
  if (numN < 10) {
    return `0${numN}`;
  }
  return `${numN}`;
}

function makeNoiseLayer(zOffset, animFrame) {
  noStroke();
  const sF = width / gridSize / 3;
  // strokeWeight(sF);
  // noStroke();
  let alpha = 255;

  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      let zoomedX = x * sF;
      let zoomedY = y * sF;
      // isoX
      let pixelX = zoomedX - zoomedY;
      // isoY
      let pixelY = (zoomedX + zoomedY) / 2;

      if (x === 0 || x === gridSize - 1 || y === 0 || y === gridSize - 1) {
        fill(0);
        square(pixelX, pixelY, sF);
      } else {
        let perlinNoise = noise(x * changePerPixel, y * changePerPixel, (animFrame * changePerFrame) + zOffset);
        // fill(255, 100);
        // square(pixelX, pixelY, sF);
        if (between(perlinNoise, 0.4, 0.5)) {
          fill(mainColor);
          square(pixelX, pixelY, sF);

        } else if (between(perlinNoise, 0.6, 0.7)) {
          fill(secondColor);
          square(pixelX, pixelY, sF);
        } else if (between(perlinNoise, 0.396, 0.4) ||
          between(perlinNoise, 0.5, 0.504) ||
          between(perlinNoise, 0.596, 0.6) ||
          between(perlinNoise, 0.7, 0.704)) {
          fill(bgColor);
          square(pixelX, pixelY, sF);
        }
      }
    }
  }
}

function between(value, minimum, maximum) {
  return value > minimum && value < maximum;
}

function mouseDragged() {
  numLayers = floor(map(constrain(mouseY, 0, height), 0, height, 1, 12))
}
