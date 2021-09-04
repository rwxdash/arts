// By Roni Kaufman
// https://ronikaufman.github.io/

let colors = ["#f7f3f2", "#0a0a0a"];

function setup() {
  createCanvas(500, 500);
  imageMode(CENTER);
  noLoop();
}

function draw() {
  background(colors[0]);

  let n = floor(random(1, 5));
  let s = width / n;
  let d = s / 3;
  let sw = s / 25;

  let tiles = [];

  let tile1 = createGraphics(s, s);
  tile1.noFill();
  tile1.stroke(colors[1]);
  tile1.strokeWeight(sw);
  tile1.arc(d, 0, d, d, 0, PI / 2);
  tile1.arc(d, d, d, d, PI, 3 * PI / 2);
  tile1.arc(0, d, d, d, 0, PI / 2);
  tile1.arc(2 * d, d, d, d, PI, PI / 2);
  tile1.arc(d, d, d, d, 0, PI / 2);
  tile1.arc(d, 2 * d, d, d, 0, 3 * PI / 2);
  tile1.arc(2 * d, 2 * d, d, d, PI, 3 * PI / 2);
  tile1.arc(2 * d, 2 * d, d, d, 0, PI / 2);
  tile1.arc(3 * d, 2 * d, d, d, PI, 3 * PI / 2);
  tile1.arc(2 * d, 3 * d, d, d, PI, 3 * PI / 2);
  tiles.push(tile1);

  let tile2 = createGraphics(s, s);
  tile2.noFill();
  tile2.stroke(colors[1]);
  tile2.strokeWeight(sw);
  tile2.arc(d, 0, d, d, 0, PI / 2);
  tile2.arc(d, d, d, d, PI / 2, 3 * PI / 2);
  tile2.arc(d, 2 * d, d, d, 3 * PI / 2, PI);
  tile2.arc(0, 2 * d, d, d, 3 * PI / 2, 0);
  tile2.arc(2 * d, 3 * d, d, d, PI, 3 * PI / 2);
  tile2.arc(2 * d, 2 * d, d, d, 3 * PI / 2, PI / 2);
  tile2.arc(2 * d, d, d, d, PI / 2, 0);
  tile2.arc(3 * d, d, d, d, PI / 2, PI);
  tiles.push(tile2);

  let tile3 = createGraphics(s, s);
  tile3.noFill();
  tile3.stroke(colors[1]);
  tile3.strokeWeight(sw);
  //tile3.arc(d, d, d, d, 0, 2*PI);
  tile3.arc(2 * d, 0, d, d, PI / 2, PI);
  tile3.arc(2 * d, d, d, d, 3 * PI / 2, PI / 2);
  tile3.arc(2 * d, 2 * d, d, d, PI, 3 * PI / 2);
  tile3.arc(d, 2 * d, d, d, 0, PI);
  tile3.arc(0, 2 * d, d, d, 3 * PI / 2, 0);
  tile3.arc(2 * d, 2 * d, d, d, 0, PI / 2);
  tile3.arc(3 * d, 2 * d, d, d, PI, 3 * PI / 2);
  tile3.arc(2 * d, 3 * d, d, d, PI, 3 * PI / 2);
  tiles.push(tile3);

  let tile4 = createGraphics(s, s);
  tile4.noFill();
  tile4.stroke(colors[1]);
  tile4.strokeWeight(sw);
  tile4.arc(2 * d, 0, d, d, PI / 2, PI);
  tile4.arc(2 * d, d, d, d, 3 * PI / 2, PI);
  tile4.arc(d, d, d, d, PI / 2, 2 * PI);
  tile4.arc(d, 2 * d, d, d, 3 * PI / 2, PI);
  tile4.arc(0, 2 * d, d, d, 3 * PI / 2, 0);
  tile4.arc(2 * d, 2 * d, d, d, 0, PI / 2);
  tile4.arc(3 * d, 2 * d, d, d, PI, 3 * PI / 2);
  tile4.arc(2 * d, 3 * d, d, d, PI, 3 * PI / 2);
  tiles.push(tile4);

  let tile5 = createGraphics(s, s);
  tile5.noFill();
  tile5.stroke(colors[1]);
  tile5.strokeWeight(sw);
  tile5.arc(d, 0, d, d, 0, PI / 2);
  tile5.arc(d, d, d, d, PI / 2, 3 * PI / 2);
  tile5.arc(d, 2 * d, d, d, 3 * PI / 2, PI);
  tile5.arc(0, 2 * d, d, d, 3 * PI / 2, 0);
  tile5.arc(2 * d, d, d, d, 0, 2 * PI);
  tile5.arc(2 * d, 2 * d, d, d, 0, PI / 2);
  tile5.arc(3 * d, 2 * d, d, d, PI, 3 * PI / 2);
  tile5.arc(2 * d, 3 * d, d, d, PI, 3 * PI / 2);
  tiles.push(tile5);

  let nRemove = floor(random(tiles.length));
  for (let i = 0; i < nRemove; i++) {
    tiles.splice(floor(random(tiles.length)), 1);
  }

  noStroke();
  for (let x = s / 2; x < width; x += s) {
    for (let y = s / 2; y < height; y += s) {
      if (random() < 0.3) {
        fill(random(["#0077e1", "#f5d216", "#fc3503"]));
        circle(x + random([-d / 2, d / 2]), y + random([-d / 2, d / 2]), random([d / 2, d, d * 3 / 2]));
      }
      push();
      translate(x, y);
      rotate(random([HALF_PI, PI, 3 * HALF_PI]));
      image(random(tiles), 0, 0);
      pop();
    }
  }
}

function keyPressed() {
  if (key === " ") {
    draw();
  }

  if (key === "s") {
    saveCanvas('20210409-2a2fb6ca');
  }
}
