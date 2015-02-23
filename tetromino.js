(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Tetromino = Tetris.Tetromino = function (board) {
    this.board = board;
    this.generateShape();
    this.colorize();
  };

  Tetromino.prototype.generateShape = function () {
    var r = Math.round(Math.random() * 6)
    switch (r) {
      case 0: //S
      this.pos = [ [1, 4], [1, 5], [0, 5], [0, 6] ];
      this.color = 'DarkGreen';
      console.log('S')
      break;

      case 1: //Z
      this.pos = [ [1, 6], [1, 5], [0, 5], [0, 4] ];
      this.color = 'DarkCyan';
      console.log('Z')
      break;

      case 2: //T
      this.pos = [ [0, 4], [0, 5], [0, 6], [1, 5] ];
      this.color = '#AA5500';
      console.log('T')
      break;

      case 3: //L
      this.pos = [ [1, 4], [0, 4], [0, 5], [0, 6] ];
      this.color = 'DarkMagenta';
      console.log('L')
      break;

      case 4: //J
      this.pos = [ [0, 4], [0, 5], [0, 6], [1, 6] ];
      this.color = 'LightGray';
      console.log('J')
      break;

      case 5: //l
      this.pos = [ [0, 3], [0, 4], [0, 5], [0, 6] ];
      this.color = 'DarkRed';
      console.log('l')
      break;

      case 6: //O
      this.pos = [ [0, 4], [0, 5], [1, 4], [1, 5] ];
      this.color = 'DarkBlue';
      console.log('o')
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

  Tetromino.prototype.rotateLeft = function () {
  }

  Tetromino.prototype.rotateRight = function () {
  }
})();
