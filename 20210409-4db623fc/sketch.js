const count = 15;
const padding = 0;
const border = 50;
const gridSize = 30;
const objectSize = 30;

const locationOffset = (gridSize === objectSize) ? 0 : (gridSize - objectSize) / 2;
const canvasSize = (gridSize + padding) * count + (border * 2);

const backgroundColor = '#232946';
const chars = [
  // '⧄', '⧅', '⧆',
  '⊞', '⊟', '⊡',
  // '◸', '◹', '◺', '◿',
  // '◰', '◱', '◲', '◳',
  // '◰', '◱', '◲', '◳',
  // '◩', '◪',
  // '∽', '≀', '≁',
  // '◇', '◆', '◈',
  // '◉', '◎',
  // '◜', '◝', '◞', '◟',
  // '⨴', '⨵', '⨉',
  // '⧊', '⧋',
  // '⧑', '⧒', '⧔', '⧕',
  // '⧺',
  // '⩄', '⩌', '⩍',
  // 'ᒥ', 'ᒣ', 'ᒧ', 'ᒪ',
  // 'ᗡ', 'ᗞ', 'ᗤ', 'ᗧ',
  // '⊢', '⊣', '⊤', '⊥', '⊏', '⊐', '⊓', '⊔',
  '⊕', '⊖', '⊗', '⊘', '⊙', '⊚', '○',
];

const palette = [
  "#294984", "#6ca0a7", "#ffc789", "#df5f50", "#5a3034", "#fff1dd",
  "#044e9e", "#6190d3", "#fcf7ed", "#fcd494", "#f4b804",
  "#1c1c1c", "#f47a9d", "#f4ea7a", "#f2f2f2",
  "#ffe140", "#ffa922", "#1bc0c6", "#2484ae", "#134e6e",
];

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
  fill(backgroundColor);
  rect(0, 0, canvasSize, canvasSize);

  for (let y = 0; y < count; y++) {
    for (let x = 0; x < count; x++) {
      fill(palette[floor(random(0, palette.length))]);
      // fill(random(200, 320), random(10, 70), 100);
      let locX = x * gridSize + x * padding + border + locationOffset;
      let locY = y * gridSize + y * padding + border + locationOffset;
      textSize(objectSize);
      textAlign(CENTER, CENTER);
      text(
        chars[floor(random(0, chars.length))],
        locX + objectSize / 2,
        locY + objectSize / 2);
    }
  }

  noLoop();
  // saveCanvas()
}
