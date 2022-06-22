class Block {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  show() {
    push();
    strokeWeight(3);
    stroke(0);
    fill(this.color);
    rectMode(CENTER);
    rect(
      this.x * block_size + offset_x,
      this.y * block_size + offset_y,
      block_size
    );
    pop();
  }
  update() {
    this.y += 1;
  }
}
