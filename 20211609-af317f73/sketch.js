let coord = {}
let gridSize = 50
let rectSize = 20
let margin = 50
let padding = 10
let rectRadius = rectSize / 5
let jump = rectSize + padding;
let w = jump * gridSize + (margin * 2);
let h = jump * gridSize + (margin * 2);

let colors = [
  // "#FF6663",
  // "#B75D69",
  "#BFD7EA",
  // "#59F8E8",
  // "#F5EE9E",
  "#FFC482",
  "#20A4F3",

  // "#FDFFFC",
  // "#FDFFFC",
  // "#FDFFFC",
  // "#FDFFFC",
  // "#FDFFFC",
  // "#FDFFFC",
  // "#C7EFCF",
  // "#C7EFCF",
  // "#C7EFCF",
  // "#C7EFCF",
  // "#E2E1B9",
  // "#D3D2C7",
  "#37515F",
  "#edf67d",

  // "#f896d8",
  // "#ca7df9",
  // "#724cf9",
  // "#564592",
]
let bgs = [
  "#0B3954",
  // "#37515F",
  // "#03191E",
  // "#333745",
];


function setup() {
  createCanvas(w, h);
  // noStroke();
  noFill();
  strokeWeight(2)
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  let bg = random(bgs)
  background(bg)
  let surrounding;
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      let c = random(colors);
      // let c = color(floor(random(100, 360)), 70, 100);
      // fill(c);
      stroke(c);
      // stroke(color(random(360), random(10, 70), 100))
      rect(x * jump + (margin), y * jump + (margin), rectSize, rectSize, rectRadius);
      coord[`co_${y}_${x}`] = c;
    }
  }

  console.log(coord)
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      surrounding = checkSurrounding(x, y)
      // fill(surrounding[4])
      stroke(surrounding[4])
      // console.log(`surrounding for y:${y} x:${x} => ${surrounding}`)

      if (surrounding[0]) {
        rect(x * jump + (margin), y * jump + (margin) - (rectSize / 2), rectSize, rectSize, rectRadius);
      }

      if (surrounding[1]) {
        rect(x * jump + (margin) + (rectSize / 2), y * jump + (margin), rectSize, rectSize, rectRadius);
      }

      if (surrounding[2]) {
        rect(x * jump + (margin), y * jump + (margin) + (rectSize / 2), rectSize, rectSize, rectRadius);
      }

      if (surrounding[3]) {
        rect(x * jump + (margin) - (rectSize / 2), y * jump + (margin), rectSize, rectSize, rectRadius);
      }
      // fill(surrounding[4])
      // if (surrounding[0] && surrounding[1]) {
      //   rect((x * jump + (margin)) + rectSize, y * jump + (margin) - padding, padding, padding);
      //   fill(bg)
      //   rect(
      //     (x * jump + (margin)) + rectSize, y * jump + (margin) - padding, padding, padding,
      //     0, 0, 0, padding,
      //   );
      //   fill(surrounding[4])
      // }
      // if (surrounding[0] && surrounding[3]) {
      //   rect((x * jump + (margin)) - padding, y * jump + (margin) - padding, padding, padding);
      //   fill(bg)
      //   rect(
      //     (x * jump + (margin)) - padding, y * jump + (margin) - padding, padding, padding,
      //     0, 0, padding, 0,
      //   );
      //   fill(surrounding[4])
      // }
      // if (surrounding[2] && surrounding[1]) {
      //   rect((x * jump + (margin)) + rectSize, y * jump + (margin) + rectSize, padding, padding);
      //   fill(bg)
      //   rect(
      //     (x * jump + (margin)) + rectSize, y * jump + (margin) + rectSize, padding, padding,
      //     padding, 0, 0, 0,
      //   );
      //   fill(surrounding[4])
      // }

      // if (surrounding[2] && surrounding[3]) {
      //   rect((x * jump + (margin)) - padding, y * jump + (margin) + rectSize, padding, padding);
      //   fill(bg)
      //   rect(
      //     (x * jump + (margin)) - padding, y * jump + (margin) + rectSize, padding, padding,
      //     0, padding, 0, 0,
      //   );
      //   fill(surrounding[4])
      // }
    }
  }

  noLoop()
}

function checkSurrounding(x, y) {
  let up = false;
  let down = false;
  let left = false;
  let right = false;
  let c = coord[`co_${y}_${x}`]

  // check up
  if (y > 0) {
    if (coord[`co_${y - 1}_${x}`] == c) {
      up = true
    }
  }
  // check down
  if (y >= 0 && y < (gridSize - 1)) {
    if (coord[`co_${y + 1}_${x}`] == c) {
      down = true
    }
  }

  // check left
  if (x > 0) {
    if (coord[`co_${y}_${x - 1}`] == c) {
      left = true
    }
  }
  // check right
  if (x >= 0 && x < (gridSize - 1)) {
    if (coord[`co_${y}_${x + 1}`] == c) {
      right = true
    }
  }

  return [up, right, down, left, c]
}
