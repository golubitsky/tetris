(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  X_DIM = 10;
  Y_DIM = 15;

  var Board = Tetris.Board = function () {
    this.grid = [];
    this.buildGrid();
    this.generateTetromino();
  };

  Board.prototype.buildGrid = function () {
  grid = this.grid;
    for (var i = 0; i < Y_DIM; i++) {
      grid[i] = [];
      for (var j = 0; j < X_DIM; j++) {
        grid[i].push(false);
      };
    };
  };

  Board.prototype.get = function (pos) {
    return this.grid[ pos[0] ][ pos[1] ];
  }

  Board.prototype.set = function (pos, value) {
    this.grid[ pos[0] ][ pos[1] ] = value;
    return true;
  }

  Board.prototype.generateTetromino = function () {
    this.currentTetromino = new Tetris.Tetromino(this);
  };

  Board.prototype.spaceEmpty = function (tetromino, direction) {
    return tetromino.spaceEmpty(direction)
  };

  Board.prototype.descendTetromino = function () {
    if (this.spaceEmpty(this.currentTetromino, 'down')) {
      this.currentTetromino.descend();
    }
  };

  Board.prototype.destroyTetromino = function () {
  };
})();
