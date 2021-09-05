// const palette = [
//   ["#dfd6a7", "#f7ce5b", "#f7b05b", "#af9b46", "#1f1300"],
//   ["#4e598c", "#ffffff", "#f9c784", "#fcaf58", "#ff8c42"],
//   ["#e09f7d", "#ef5d60", "#ec4067", "#a01a7d", "#311847"],
//   ["#5603ad", "#8367c7", "#b3e9c7", "#c2f8cb", "#f0fff1"],
//   ["#fcde9c", "#ffa552", "#ba5624", "#381d2a", "#c4d6b0"],
//   ["#f5e3e0", "#e8b4bc", "#d282a6", "#6e4555", "#3a3238"],
//   ["#df2935", "#86ba90", "#f5f3bb", "#dfa06e", "#412722"],
//   ["#087e8b", "#ff5a5f", "#3c3c3c", "#f5f5f5", "#c1839f"],
//   ["#f7fff6", "#bcebcb", "#87d68d", "#93b48b", "#8491a3"],
//   ["#7a7a7a", "#ecf8f8", "#00171f", "#a5a29b", "#f7f3f2"],
// ]

let outsideRadius = 150;
let insideRadius = 100;


function setup() {
  // put setup code here
  createCanvas(1200, 1200);
  // colorMode(RGB, 255, 255, 255, 1)
  background(40);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  // frameRate(10)
  // rect(0, 0, width, height)
}

function draw() {
  // const colorPalette = palette[floor(random(0, palette.length - 1))]
  translate(width / 2, height / 2)

  // push()
  // fill(colorPalette[floor(random(0, 4))])
  // rotate(-TWO_PI / 4)
  // polygon(0, 0, 200, 5);
  // pop()

  // push();
  // fill(colorPalette[floor(random(0, 4))])
  // rotate(-TWO_PI / 4)
  // star(0, 0, 50, 70, 5);
  // pop();
  // push()
  // fill(colorPalette[floor(random(0, 4))])
  // polygon(0, 0, 220, 4);
  // pop()
  // let p = floor(random(3, 8))
  let p = 6
  for (let i = 0; i < 18; i++) {
    push()
    let c = color(random(random(0, 300), 360), random(10, 70), 90)
    noFill()
    rotate(-PI / (i + 8))
    strokeWeight(12)
    // strokeWeight(i)
    strokeCap(ROUND)
    stroke(c)
    rotate(PI / 4)
    polygon(0, 0, 360 - (i * 20), p);
    pop()
  }

  // push()
  // fill(colorPalette[floor(random(0, 4))])
  // polygon(0, 0, 150, 4);
  // pop()
  // fill(colorPalette[floor(random(0, 4))])
  // rotate(-PI / 2)
  // polygon(200, 0, 220, 3);
  // circle(0, 0, 300)
  // fill(colorPalette[floor(random(0, 4))])
  // circle(0, 0, 150)

  noLoop()
}

function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function edgeStar() {
  let numPoints = int(20);
  let angle = 0;
  let angleStep = 180.0 / numPoints;
  fill(colorPalette[floor(random(0, 4))])

  strokeWeight(0.1);
  stroke(colorPalette[floor(random(0, 4))]);
  beginShape();
  for (let i = 0; i <= numPoints; i++) {
    let px = cos(radians(angle)) * outsideRadius;
    let py = sin(radians(angle)) * outsideRadius;
    angle += angleStep;
    vertex(px, py);
    px = cos(radians(angle)) * insideRadius;
    py = sin(radians(angle)) * insideRadius;
    vertex(px, py);
    angle += angleStep;
  }
  endShape();
}
