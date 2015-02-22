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
    // var r = Math.round(Math.random() * 6)
    var r = 6;
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

  Tetromino.prototype.descend = function () {
    var that = this;
    var changed = [];
    var pos = this.pos;
    for (var i = 0; i < pos.length; i++) {
      debugger
      if (changed.indexOf(pos[i]) !== -1) { continue }
      changed.push(pos[i]);

      that.board.set(pos[i], false);
      pos[i][0] += 1;
      that.board.set(pos[i], that.color);
    }
  }

  Tetromino.prototype.left = function () {
  }

  Tetromino.prototype.right = function () {
  }

  Tetromino.prototype.spaceEmpty = function (direction) {
    var that = this;
    this.pos.forEach(function (pos) {
      switch (direction) {
        case 'down':
        if (that.board.get([ pos[0] + 1, pos[1] ])) {
          console.log('ok');
          return false
        }
        break;
        case 'left':

        break;
        case 'right':

        break;
      };
    });
    return true;
  }

  Tetromino.prototype.place = function () {
  }
})();
