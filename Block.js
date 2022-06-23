class Block {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  show(faux = false) {
    push();
    strokeWeight(3);
    stroke(0);
    if (!faux) {
      fill(this.color);
    } else {
      let [r, g, b, a] = this.color.levels;
      fill(r, g, b, 80);
      stroke(0, 0, 0, 80);
    }
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
