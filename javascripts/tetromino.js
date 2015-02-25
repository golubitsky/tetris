(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Tetromino = Tetris.Tetromino = function (board) {
    this.board = board;
    this.generateShape();
    this.colorize();
    this.rotation = 0;
  };

  Tetromino.prototype.generateShape = function () {
    //TO DO: refactor!!
    //refactor next shape
    //refactor storage of all defaults

    SHAPE_DEFAULTS = [
      [ [2, 4], [2, 5], [1, 5], [1, 6] ],
      [ [1, 4], [1, 5], [2, 5], [2, 6] ],
      [ [1, 4], [1, 5], [1, 6], [2, 5] ],
      [ [2, 4], [1, 4], [1, 5], [1, 6] ],
      [ [1, 4], [1, 5], [1, 6], [2, 6] ],
      [ [1, 3], [1, 4], [1, 5], [1, 6] ],
      [ [1, 4], [1, 5], [2, 4], [2, 5] ]
      ]

    COLOR_DEFAULTS = [
      'DarkGreen',
      'DarkCyan',
      '#AA5500',
      'DarkMagenta',
      'LightGray',
      'DarkRed',
      'DarkBlue'
    ]

    SHAPE_NAMES = ["S", "Z", "T", "L", "J", "l", "O"]

    var random = this.board.next || Math.round(Math.random() * 6);
    this.board.next = Math.round(Math.random() * 6);
    this.board.nextColor = COLOR_DEFAULTS[this.board.next];
    this.board.nextShape = SHAPE_DEFAULTS[this.board.next];

    // var r = 2;

    this.pos = SHAPE_DEFAULTS[random];
    this.color = COLOR_DEFAULTS[random];
    this.shape = SHAPE_NAMES[random];
  };

  Tetromino.prototype.colorize = function () {
    var that = this;
    this.pos.forEach(function (pos) {
      that.board.set(pos, that.color);
    });
  }

  Tetromino.prototype.move = function (newPosition) {
    for (var i = 0; i < this.pos.length; i++) {
      this.board.set(this.pos[i], false);
    }
    this.pos = newPosition;

    for (var i = 0; i < this.pos.length; i++) {
      this.board.set(this.pos[i], this.color);
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
