class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.shapes = [new Shape(random(shape_options))];
  }

  show() {
    push();
    rectMode(CENTER);
    noFill();
    strokeWeight(2);
    stroke(180);
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        rect(
          j * block_size + offset_x,
          i * block_size + offset_y,
          block_size,
          block_size
        );
      }
    }
    stroke(0);
    strokeWeight(4);
    rectMode(CENTER);
    rect(
      (wide / 2) * block_size + offset_x - block_size / 2,
      (high / 2) * block_size + offset_y - block_size / 2,
      block_size * 10,
      block_size * 20
    );
    pop();
  }

  rotate() {
    let current_shape = this.shapes[this.shapes.length - 1];
    current_shape.rotate(this.shapes);
  }

  move(direction) {
    let current_shape = this.shapes[this.shapes.length - 1];
    switch (direction) {
      case "right":
        current_shape.move({ x: 1, y: 0 }, this.shapes);
        break;
      case "left":
        current_shape.move({ x: -1, y: 0 }, this.shapes);
        break;
      case "down":
        current_shape.move({ x: 0, y: 1 }, this.shapes);
        break;
      case "instant_down":
        while (!current_shape.reachedBottom()) {
          current_shape.update(this.shapes);
        }
        break;
    }
  }

  run() {
    for (let shape of this.shapes) {
      shape.update(this.shapes);
      shape.show();
    }
    if (this.shapes[this.shapes.length - 1].reachedBottom()) {
      this.shapes.push(new Shape(random(shape_options)));
      frameRate(60);
    }
  }
}
