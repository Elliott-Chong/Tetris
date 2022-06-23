//tetris rotation https://www.google.com/search?q=tetris+rotation&sxsrf=ALiCzsZ8uUVj5DbAALenUleqMxfZZkCf3Q:1655869690250&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjb0bmlk8D4AhUcRmwGHSclCx4Q_AUoAXoECAEQAw&biw=1680&bih=946&dpr=1#imgrc=tglakVq9I8OU5M

class Shape {
  constructor(shape) {
    this.shape = shape;
    this.blocks;
    this.initial_position = Math.floor(Math.random() * 10);
    this.color;
    this.should_update = true;
    this.state = 0;
    switch (this.shape) {
      case "s":
        this.color = color(0, 240, 0);
        break;
      case "z":
        this.color = color(240, 0, 0);
        break;
      case "vert":
        this.color = color(0, 240, 240);
        break;
      case "t":
        this.color = color(160, 0, 240);
        break;
      case "L":
        this.color = color(240, 160, 0);
        break;
      case "square":
        this.color = color(240, 240, 0);
        break;
      case "inverseL":
        this.color = color(0, 0, 240);
        break;
    }
    switch (this.shape) {
      case "s":
        while (this.initial_position == 0 || this.initial_position == 9) {
          this.initial_position = Math.floor(Math.random() * 10);
        }

        this.blocks = [
          new Block(this.initial_position, 0, this.color),
          new Block(this.initial_position, -1, this.color),
          new Block(this.initial_position + 1, -1, this.color),
          new Block(this.initial_position - 1, 0, this.color),
        ];
        break;
      case "vert":
        while (this.initial_position <= 2 || this.initial_position >= 8) {
          this.initial_position = Math.floor(Math.random() * 10);
        }

        this.blocks = [
          new Block(this.initial_position, 0, this.color),
          new Block(this.initial_position - 1, 0, this.color),
          new Block(this.initial_position + 1, 0, this.color),
          new Block(this.initial_position + 2, 0, this.color),
        ];
        break;
      case "z":
        while (this.initial_position == 0 || this.initial_position == 9) {
          this.initial_position = Math.floor(Math.random() * 10);
        }

        this.blocks = [
          new Block(this.initial_position, 0, this.color),
          new Block(this.initial_position, -1, this.color),
          new Block(this.initial_position - 1, -1, this.color),
          new Block(this.initial_position + 1, 0, this.color),
        ];
        break;
      case "t":
        while (this.initial_position == 0 || this.initial_position == 9) {
          this.initial_position = Math.floor(Math.random() * 10);
        }

        this.blocks = [
          new Block(this.initial_position, 0, this.color),
          new Block(this.initial_position - 1, 0, this.color),
          new Block(this.initial_position + 1, 0, this.color),
          new Block(this.initial_position, -1, this.color),
        ];
        break;
      case "L":
        while (this.initial_position == 0 || this.initial_position == 9) {
          this.initial_position = Math.floor(Math.random() * 10);
        }

        this.blocks = [
          new Block(this.initial_position, 0, this.color),
          new Block(this.initial_position - 1, 0, this.color),
          new Block(this.initial_position + 1, 0, this.color),
          new Block(this.initial_position + 1, -1, this.color),
        ];
        break;
      case "inverseL":
        while (this.initial_position == 0 || this.initial_position == 9) {
          this.initial_position = Math.floor(Math.random() * 10);
        }

        this.blocks = [
          new Block(this.initial_position, 0, this.color),
          new Block(this.initial_position - 1, 0, this.color),
          new Block(this.initial_position + 1, 0, this.color),
          new Block(this.initial_position - 1, -1, this.color),
        ];
        break;
      case "square":
        while (this.initial_position == 0) {
          this.initial_position = Math.floor(Math.random() * 10);
        }

        this.blocks = [
          new Block(this.initial_position, 0, this.color),
          new Block(this.initial_position, -1, this.color),
          new Block(this.initial_position - 1, -1, this.color),
          new Block(this.initial_position - 1, 0, this.color),
        ];
        break;
    }
  }

  generateTransformationMatrix(a, b) {
    let res = new Matrix(3, 3);
    res.data = [
      [0, -1, b + a],
      [1, 0, b - a],
      [0, 0, 1],
    ];
    return res;
  }

  matrixForm() {
    let res = new Matrix(3, this.blocks.length);
    for (let i = 0; i < res.rows; i++) {
      for (let j = 0; j < res.cols; j++) {
        if (i == 0) {
          res.data[i][j] = this.blocks[j].x;
        } else if (i == 1) {
          res.data[i][j] = this.blocks[j].y;
        } else if (i == 2) {
          res.data[i][j] = 1;
        }
      }
    }
    return res;
  }

  rotate(all_shapes) {
    if (this.shape == "square") return;
    let pivot_block = this.blocks[0];
    let pivot_coords = { x: null, y: null };
    switch (this.shape) {
      case "vert":
        if (this.state == 0) {
          pivot_coords.x = pivot_block.x + 1 / 2;
          pivot_coords.y = pivot_block.y + 1 / 2;
        } else if (this.state == 1) {
          pivot_coords.x = pivot_block.x - 1 / 2;
          pivot_coords.y = pivot_block.y + 1 / 2;
        } else if (this.state == 2) {
          pivot_coords.x = pivot_block.x - 1 / 2;
          pivot_coords.y = pivot_block.y - 1 / 2;
        } else if (this.state == 3) {
          pivot_coords.x = pivot_block.x + 1 / 2;
          pivot_coords.y = pivot_block.y - 1 / 2;
        }
        this.state++;
        this.state %= 4;
        break;
      default:
        pivot_coords.x = pivot_block.x;
        pivot_coords.y = pivot_block.y;
        break;
    }
    let t = this.generateTransformationMatrix(pivot_coords.x, pivot_coords.y);
    let resulting_matrix = Matrix.multiply(t, this.matrixForm());

    let { rows, cols } = resulting_matrix;
    let future_pos = [];
    for (let j = 0; j < cols; j++) {
      future_pos[j] = { x: null, y: null };
      future_pos[j].x = resulting_matrix.data[0][j];
      future_pos[j].y = resulting_matrix.data[1][j];
    }
    for (let other_shape of all_shapes) {
      if (!this.equals(other_shape) && this.collide(other_shape, future_pos)) {
        return;
      }
    }
    for (let pos of future_pos) {
      if (pos.x >= wide || pos.x < 0 || pos.y >= high || pos.y < 0) return;
    }
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (i == 0) {
          this.blocks[j].x = resulting_matrix.data[i][j];
        } else if (i == 1) {
          this.blocks[j].y = resulting_matrix.data[i][j];
        }
      }
    }
  }

  move({ x, y }, all_shapes) {
    let should_move = true;
    let new_x;
    let new_y;
    for (let block of this.blocks) {
      new_x = block.x + x;
      new_y = block.y + y;
      //check boundaries
      if (new_x < 0 || new_x >= wide || new_y < 0 || new_y >= high) {
        should_move = false;
        break;
      }
    }

    for (let other_shape of all_shapes) {
      if (
        !this.equals(other_shape) &&
        this.collide(other_shape, this.getNewPos({ x, y }))
      ) {
        should_move = false;
      }
    }

    if (should_move) {
      for (let block of this.blocks) {
        new_x = block.x + x;
        new_y = block.y + y;
        block.x = new_x;
        block.y = new_y;
      }
    }
  }

  reachedBottom() {
    if (!this.should_update) {
      return true;
    }
    return false;
  }

  equals(other_shape) {
    if (other_shape.blocks.length !== this.blocks.length) return false;
    for (let i = 0; i < this.blocks.length; i++) {
      if (other_shape.blocks[i].x != this.blocks[i].x) return false;
      if (other_shape.blocks[i].y != this.blocks[i].y) return false;
    }
    return true;
  }
  collide(other_shape, new_pos) {
    for (let other_block of other_shape.blocks) {
      for (let pos of new_pos) {
        if (other_block.y == pos.y && other_block.x == pos.x) {
          return true;
        }
      }
    }
    return false;
  }
  getNewPos(delta) {
    let { x, y } = delta;
    return this.blocks.map((block) => {
      return { x: block.x + x, y: block.y + y };
    });
  }

  offScreen() {
    for (let block of this.blocks) {
      if (block.y + 1 >= high) {
        return true;
      }
    }
    return false;
  }
  update(all_shapes) {
    for (let shape of all_shapes) {
      if (
        !this.equals(shape) &&
        this.collide(shape, this.getNewPos({ x: 0, y: 1 })) &&
        !shape.should_update
      ) {
        this.should_update = false;
      }
      if (this.offScreen()) {
        this.should_update = false;
      }
    }

    if (this.should_update) {
      for (let block of this.blocks) {
        block.update();
      }
    } else if (
      !this.should_update &&
      this.blocks.find((block) => block.y == -1)
    ) {
      game_over = true;
    }
  }

  show(all_shapes) {
    for (let block of this.blocks) {
      block.show();
    }

    if (this.should_update) {
      let faux_shape = new Shape(this.shape);
      faux_shape.blocks.length = this.blocks.length;
      for (let i = 0; i < faux_shape.blocks.length; i++) {
        faux_shape.blocks[i].x = this.blocks[i].x;
        faux_shape.blocks[i].y = this.blocks[i].y;
      }

      while (!faux_shape.reachedBottom()) {
        faux_shape.update(all_shapes);
      }

      for (let block of faux_shape.blocks) {
        block.show(true);
      }
    }
  }
}
