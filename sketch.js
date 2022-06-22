let board;
const shape_options = ["s", "vert", "z", "t", "L", "inverseL", "square"];
const offset_x = 50;
const offset_y = 50;
const block_size = 35;
const wide = 10;
const high = 20;
let game_over = false;

function setup() {
  let cnv = createCanvas(min(800, 0.9 * window.innerWidth), 800);
  cnv.parent(select("#canvas"));
  board = new Board(wide, high);
}

function draw() {
  background(255);
  frameRate(4);
  board.show();
  board.run();
  board.clearLine();
  if (game_over) {
    noLoop();
  }
}

function keyPressed() {
  push();
  frameRate(60);
  switch (key) {
    case "d":
      board.move("right");
      break;
    case "a":
      board.move("left");
      break;
    case "s":
      board.move("down");
      break;
    case " ":
      board.move("instant_down");
      break;
    case "w":
      board.rotate();
      break;
    default:
      break;
  }
  pop();
}
