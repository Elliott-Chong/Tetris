let board;
const shape_options = ["s", "vert", "z", "t", "L", "inverseL", "square"];
const offset_x = 50;
const offset_y = 50;
const block_size = 35;
const wide = 10;
const high = 20;
let game_over = false;
let score = 0;

let images = {};
let space_mono = {};

function preload() {
  images["square"] = loadImage("./images/square.png");
  images["L"] = loadImage("./images/L.png");
  images["s"] = loadImage("./images/s.png");
  images["z"] = loadImage("./images/z.png");
  images["vert"] = loadImage("./images/vert.png");
  images["inverseL"] = loadImage("./images/inverseL.png");
  images["t"] = loadImage("./images/t.png");

  space_mono["bold"] = loadFont("./Space_Mono/SpaceMono-Bold.ttf");
}

function setup() {
  let cnv = createCanvas(min(800, 0.9 * window.innerWidth), 800);
  cnv.parent(select("#canvas"));
  board = new Board(wide, high);
}

function draw() {
  textFont(space_mono.bold);
  background(255);
  frameRate(1);
  board.show();
  board.run();
  board.clearLine();
  if (game_over) {
    noLoop();
  }
  textSize(32);
  textAlign(CENTER);
  text("Lines cleared: " + score, 600, 100);
  rectMode(CENTER);
  strokeWeight(4);
  //next
  text("Next", 600, 190);
  rect(600, 300, 200, 200);
  //hold
  text("Hold", 600, 490);
  rect(600, 600, 200, 200);

  imageMode(CENTER);
  if (board.held) {
    image(images[board.held.shape], 600, 600);
  }
  if (board.next) {
    image(images[board.next], 600, 300);
  }
}

function keyPressed() {
  push();
  frameRate(60);
  if (key == "d" || key == "ArrowRight") {
    board.move("right");
  } else if (key == "a" || key == "ArrowLeft") {
    board.move("left");
  } else if (key == "s" || key == "ArrowDown") {
    board.move("down");
  } else if (key == " ") {
    board.move("instant_down");
  } else if (key == "w" || key == "ArrowUp") {
    board.rotate();
  } else if (key == "c" || key == "h") {
    board.hold();
  }
  pop();
}
