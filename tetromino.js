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
    var r = Math.round(Math.random() * 6)
    // var r = 4;
    switch (r) {
      case 0: //S
      this.pos = [ [1, 4], [1, 5], [0, 5], [0, 6] ];
      this.color = 'DarkGreen';
      this.shape = "S";
      console.log('S')
      break;

      case 1: //Z
      this.pos = [ [0, 4], [0, 5], [1, 5], [1, 6] ];
      this.color = 'DarkCyan';
      this.shape = "Z";
      console.log('Z')
      break;

      case 2: //T
      this.pos = [ [0, 4], [0, 5], [0, 6], [1, 5] ];
      this.color = '#AA5500';
      this.shape = "T";
      console.log('T')
      break;

      case 3: //L
      this.pos = [ [1, 4], [0, 4], [0, 5], [0, 6] ];
      this.color = 'DarkMagenta';
      this.shape = "L";
      console.log('L')
      break;

      case 4: //J
      this.pos = [ [0, 4], [0, 5], [0, 6], [1, 6] ];
      this.color = 'LightGray';
      this.shape = "J";
      console.log('J')
      break;

      case 5: //l
      this.pos = [ [0, 3], [0, 4], [0, 5], [0, 6] ];
      this.color = 'DarkRed';
      this.shape = "l";
      console.log('l')
      break;

      case 6: //O
      this.pos = [ [0, 4], [0, 5], [1, 4], [1, 5] ];
      this.color = 'DarkBlue';
      this.shape = "O";
      console.log('O')
      break;
    };
  };

  Tetromino.prototype.colorize = function () {
    var that = this;
    this.pos.forEach(function (pos) {
      that.board.set(pos, that.color);
    });
  }

  Tetromino.prototype.move = function (newPosition) {
    for (var i = 0; i < this.pos.length; i++) {
      that.board.set(this.pos[i], false);
    }
    this.pos = newPosition;

    for (var i = 0; i < this.pos.length; i++) {
      that.board.set(this.pos[i], this.color);
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
          newPos[2] = [ this.pos[1][0]    , this.pos[1][1]     ]
          newPos[1] = [ this.pos[2][0] + 1, this.pos[2][1] + 1 ]
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
      case "l": //TO DO: this also has a problem sometimes
        if (this.rotation === 0 || this.rotation === 2) {
          newPos[0] = [ this.pos[0][0] + 1, this.pos[0][1] - 1 ]
          newPos[1] = [ this.pos[1][0]    , this.pos[1][1]     ]
          newPos[2] = [ this.pos[2][0] - 1, this.pos[2][1] + 1 ]
          newPos[3] = [ this.pos[3][0] - 2, this.pos[3][1] + 2 ]
        } else {
          newPos[0] = [ this.pos[0][0] - 1, this.pos[0][1] + 1 ]
          newPos[1] = [ this.pos[1][0]    , this.pos[1][1]     ]
          newPos[2] = [ this.pos[2][0] + 1, this.pos[2][1] - 1 ]
          newPos[3] = [ this.pos[3][0] + 2, this.pos[3][1] - 2 ]
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
