class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.shapes = [new Shape(random(shape_options))];
    this.held = null;
    this.next = random(shape_options);
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

  clearLine() {
    let state = [];
    for (let i = 0; i < high; i++) {
      state[i] = [];
    }
    for (let shape of this.shapes) {
      for (let block of shape.blocks) {
        if (block.y < high && block.y >= 0) {
          if (!state[block.y].includes(block.x)) {
            state[block.y].push(block.x);
          }
        }
      }
    }
    let completed_lines = [];
    for (let i = 0; i < high; i++) {
      if (state[i].length == wide) {
        for (let shape of this.shapes) {
          shape.blocks = shape.blocks.filter((block) => block.y != i);
        }
        completed_lines.push(i);
      }
    }

    //completed_lines [16,17,18,19]
    for (let i = 0; i < completed_lines.length; i++) {
      for (let shape of this.shapes) {
        for (let block of shape.blocks) {
          if (block.y < completed_lines[i]) {
            block.y++;
          }
        }
      }
      score++;
    }
  }

  hold() {
    if (!this.held) {
      this.held = this.shapes[this.shapes.length - 1];
      this.shapes[this.shapes.length - 1] = new Shape(this.next);
      this.next = random(shape_options);
    } else {
      let temp_shape = this.shapes[this.shapes.length - 1];
      this.shapes[this.shapes.length - 1] = new Shape(this.held.shape);
      this.held = temp_shape;
    }
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
      shape.show(this.shapes);
    }
    if (this.shapes[this.shapes.length - 1].reachedBottom()) {
      frameRate(60);
      hold_timer = true;
      this.shapes.push(new Shape(this.next));
      this.next = random(shape_options);
    }
  }
}
