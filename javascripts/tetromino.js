(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Tetromino = Tetris.Tetromino = function (board) {
    this.board = board;
    this.generateShape();

    // this.colorize();
    this.rotation = 0;
  };

  Tetromino.prototype.generateShape = function () {
    //TO DO: refactor!!
    //refactor next shape
    //refactor storage of all defaults

    SHAPE_DEFAULTS = [
      [ [1, 4], [1, 5], [2, 5], [2, 6] ], //Z
      [ [2, 4], [2, 5], [1, 5], [1, 6] ], //S
      [ [1, 4], [1, 5], [1, 6], [2, 5] ], //T
      [ [2, 4], [1, 4], [1, 5], [1, 6] ], //L
      [ [1, 4], [1, 5], [1, 6], [2, 6] ], //J
      [ [1, 3], [1, 4], [1, 5], [1, 6] ], //l
      [ [1, 4], [1, 5], [2, 4], [2, 5] ]  //O
      ]

    COLOR_DEFAULTS = [
      'DarkCyan',
      'DarkGreen',
      '#AA5500',
      'DarkMagenta',
      'LightGray',
      'DarkRed',
      'DarkBlue'
    ]

    SHAPE_NAMES = ["Z", "S", "T", "L", "J", "l", "O"]

    this.color = COLOR_DEFAULTS[this.board.next];
    this.pos = SHAPE_DEFAULTS[this.board.next];
    this.shape = SHAPE_NAMES[this.board.next];

    this.board.next = Math.round(Math.random() * 6);

    this.board.nextColor = COLOR_DEFAULTS[this.board.next];
    this.board.nextShape = SHAPE_DEFAULTS[this.board.next];
    this.board.nextShapeName = SHAPE_NAMES[this.board.next];
  };

  // Tetromino.prototype.colorize = function () {
  //   var that = this;
  //   this.pos.forEach(function (pos) {
  //     debugger
  //     that.board.set(pos, that.shape);
  //   });
  // }

  Tetromino.prototype.move = function (newPosition) {
    for (var i = 0; i < this.pos.length; i++) {
      this.board.set(this.pos[i], false);
    }
    this.previousPos = this.pos;
    this.pos = newPosition;
    for (var i = 0; i < this.pos.length; i++) {
      this.board.set(this.pos[i], this.shape);
    }
  }

  Tetromino.prototype.potentialPos = function (direction) {
    var potentialPos = [];

    if (direction === 'rotate') {
      return this.potentialRotatePos();
    }

    this.pos.forEach(function (pos) {
      switch (direction) {
        case 'down':
        potentialPos.push([ pos[0] + 1, pos[1] ])
        break;

        case 'left':
        potentialPos.push([ pos[0], pos[1] - 1 ])
        break;

        case 'right':
        potentialPos.push([ pos[0], pos[1] + 1 ])
        break;
      }
    });

    return potentialPos;
  }

  Tetromino.prototype.potentialRotatePos = function () {
    var newPos = [];
    switch (this.shape) {
      case "S":
        if (this.rotation === 0 || this.rotation === 2) {
          newPos[0] = [ this.pos[0][0] - 1, this.pos[0][1] + 1 ]
          newPos[1] = [ this.pos[1][0]    , this.pos[1][1]     ]
          newPos[2] = [ this.pos[2][0] + 1, this.pos[2][1] + 1 ]
          newPos[3] = [ this.pos[3][0] + 2, this.pos[3][1]     ]
        } else {
          newPos[0] = [ this.pos[0][0] + 1, this.pos[0][1] - 1 ]
          newPos[1] = [ this.pos[1][0]    , this.pos[1][1]     ]
          newPos[2] = [ this.pos[2][0] - 1, this.pos[2][1] - 1 ]
          newPos[3] = [ this.pos[3][0] - 2, this.pos[3][1]     ]
        }
      break;
      case "Z":
        if (this.rotation === 0 || this.rotation === 2) {
          newPos[0] = [ this.pos[0][0]    , this.pos[0][1] + 2 ]
          newPos[1] = [ this.pos[1][0] + 1, this.pos[1][1] + 1 ]
          newPos[2] = [ this.pos[2][0]    , this.pos[2][1]     ]
          newPos[3] = [ this.pos[3][0] + 1, this.pos[3][1] - 1 ]
        } else {
          newPos[0] = [ this.pos[0][0]    , this.pos[0][1] - 2 ]
          newPos[1] = [ this.pos[1][0] - 1, this.pos[1][1] - 1 ]
          newPos[2] = [ this.pos[2][0]    , this.pos[2][1]     ]
          newPos[3] = [ this.pos[3][0] - 1, this.pos[3][1] + 1 ]
        }
      break;
      case "J":
        if (this.rotation === 0) {
          newPos[0] = [ this.pos[0][0] - 1, this.pos[0][1] + 1 ]
          newPos[1] = [ this.pos[1][0]    , this.pos[1][1]     ]
          newPos[2] = [ this.pos[2][0] + 1, this.pos[2][1] - 1 ]
          newPos[3] = [ this.pos[3][0]    , this.pos[3][1] - 2 ]
        } else if (this.rotation === 1) {
          newPos[0] = [ this.pos[0][0] + 1, this.pos[0][1] + 1 ]
          newPos[1] = [ this.pos[1][0]    , this.pos[1][1]     ]
          newPos[2] = [ this.pos[2][0] - 1, this.pos[2][1] - 1 ]
          newPos[3] = [ this.pos[3][0] - 2, this.pos[3][1]     ]
        } else if (this.rotation === 2) {
          newPos[0] = [ this.pos[0][0] + 1, this.pos[0][1] - 1 ]
          newPos[1] = [ this.pos[1][0]    , this.pos[1][1]     ]
          newPos[2] = [ this.pos[2][0] - 1, this.pos[2][1] + 1 ]
          newPos[3] = [ this.pos[3][0]    , this.pos[3][1] + 2 ]
        } else if (this.rotation === 3) {
          newPos[0] = [ this.pos[0][0] - 1, this.pos[0][1] - 1 ]
          newPos[1] = [ this.pos[1][0]    , this.pos[1][1]     ]
          newPos[2] = [ this.pos[2][0] + 1, this.pos[2][1] + 1 ]
          newPos[3] = [ this.pos[3][0] + 2, this.pos[3][1]     ]
        }
      break;
      case "T":
        if (this.rotation === 0) {
          newPos[0] = [ this.pos[0][0] - 1, this.pos[0][1] + 1 ]
          newPos[1] = [ this.pos[1][0]    , this.pos[1][1]     ]
          newPos[2] = [ this.pos[2][0] + 1, this.pos[2][1] - 1 ]
          newPos[3] = [ this.pos[3][0] - 1, this.pos[3][1] - 1 ]
        } else if (this.rotation === 1) {
          newPos[0] = [ this.pos[0][0] + 1, this.pos[0][1] + 1 ]
          newPos[1] = [ this.pos[1][0]    , this.pos[1][1]     ]
          newPos[2] = [ this.pos[2][0] - 1, this.pos[2][1] - 1 ]
          newPos[3] = [ this.pos[3][0] - 1, this.pos[3][1] + 1 ]
        } else if (this.rotation === 2) {
          newPos[0] = [ this.pos[0][0] + 1, this.pos[0][1] - 1 ]
          newPos[1] = [ this.pos[1][0]    , this.pos[1][1]     ]
          newPos[2] = [ this.pos[2][0] - 1, this.pos[2][1] + 1 ]
          newPos[3] = [ this.pos[3][0] + 1, this.pos[3][1] + 1 ]
        } else if (this.rotation === 3) {
          newPos[0] = [ this.pos[0][0] - 1, this.pos[0][1] - 1 ]
          newPos[1] = [ this.pos[1][0]    , this.pos[1][1]     ]
          newPos[2] = [ this.pos[2][0] + 1, this.pos[2][1] + 1 ]
          newPos[3] = [ this.pos[3][0] + 1, this.pos[3][1] - 1 ]
        }
      break;
      case "L": //TO DO: this has a problem sometimes
        if (this.rotation === 0) {
          newPos[0] = [ this.pos[0][0] - 2, this.pos[0][1]     ]
          newPos[1] = [ this.pos[1][0] - 1, this.pos[1][1] + 1 ]
          newPos[2] = [ this.pos[2][0]    , this.pos[2][1]     ]
          newPos[3] = [ this.pos[3][0] + 1, this.pos[3][1] - 1 ]
        } else if (this.rotation === 1) {
          newPos[0] = [ this.pos[0][0]    , this.pos[0][1] + 2 ]
          newPos[1] = [ this.pos[1][0] + 1, this.pos[1][1] + 1 ]
          newPos[2] = [ this.pos[2][0]    , this.pos[2][1]     ]
          newPos[3] = [ this.pos[3][0] - 1, this.pos[3][1] - 1 ]
        } else if (this.rotation === 2) {
          newPos[0] = [ this.pos[0][0] + 2, this.pos[0][1]     ]
          newPos[1] = [ this.pos[1][0] + 1, this.pos[1][1] - 1 ]
          newPos[2] = [ this.pos[2][0]    , this.pos[2][1]     ]
          newPos[3] = [ this.pos[3][0] - 1, this.pos[3][1] + 1 ]
        } else if (this.rotation === 3) {
          newPos[0] = [ this.pos[0][0]    , this.pos[0][1] - 2 ]
          newPos[1] = [ this.pos[1][0] - 1, this.pos[1][1] - 1 ]
          newPos[2] = [ this.pos[2][0]    , this.pos[2][1]     ]
          newPos[3] = [ this.pos[3][0] + 1, this.pos[3][1] + 1 ]
        }
      break;
      case "l":
        if (this.rotation === 0 || this.rotation === 2) {
          newPos[0] = [ this.pos[0][0] - 1, this.pos[0][1] + 1 ]
          newPos[1] = [ this.pos[1][0]    , this.pos[1][1]     ]
          newPos[2] = [ this.pos[2][0] + 1, this.pos[2][1] - 1 ]
          newPos[3] = [ this.pos[3][0] + 2, this.pos[3][1] - 2 ]
        } else {
          newPos[0] = [ this.pos[0][0] + 1, this.pos[0][1] - 1 ]
          newPos[1] = [ this.pos[1][0]    , this.pos[1][1]     ]
          newPos[2] = [ this.pos[2][0] - 1, this.pos[2][1] + 1 ]
          newPos[3] = [ this.pos[3][0] - 2, this.pos[3][1] + 2 ]
        }
      break;
      case "O":
        return this.pos;
      break;
    }
    return newPos;
  }

  Tetromino.prototype.rotateLeft = function () {
  }

  Tetromino.prototype.rotateRight = function () {
  }
})();
