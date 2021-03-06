(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  X_DIM = 10; //non-inclusive of 10 (affects inBounds function)
  Y_DIM = 15; //inclusive of 15

  var Board = Tetris.Board = function (stats) {
    this.stats = stats;
    this.grid = [];
    this.initializeGrid();
    this.next = Math.round(Math.random() * 6);
    this.generateTetromino();
  };

  Board.prototype.initializeGrid = function () {
  grid = this.grid;
    for (var i = 0; i <= Y_DIM; i++) {
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
  }

  Board.prototype.moveTetromino = function (direction, score) {
    var newPosition = this.checkMove(direction);
    if (newPosition) {
      this.currentTetromino.move(newPosition);

      if (direction === 'rotate') {
        //keep track of rotation to know how to next rotate
        this.currentTetromino.rotation += 1;
        if (this.currentTetromino.rotation === 4) {
          this.currentTetromino.rotation = 0
        }
      }

      if (score) {
        this.stats.scoreSpeedPoints();
      }
    }

  }

  Board.prototype.checkToRegenerate = function () {
    nextDownPosition = this.currentTetromino.potentialPos('down');
    for (var i = 0; i < nextDownPosition.length; i++) {
      if (!this.inBounds(nextDownPosition[i])) {
        return true;
        break;
      }

      if (this.get(nextDownPosition[i]) &&
        !this.currentTetrominoOccupies(this.currentTetromino.pos, nextDownPosition[i])) {
        return true;
        break;
      }
    }
    return false;
  }

  Board.prototype.checkMove = function (direction) {
    //returns either false (illegal move) or new position of tetromino

    if (this.unableToMove) {
      //there is no active piece after row clearing
      return false;
    }

    var potentialPos = this.currentTetromino.potentialPos(direction);
    var currentPos = this.currentTetromino.pos;

    for (var i = 0; i < potentialPos.length; i++) {
      //potential is out of bounds => illegal
      if (!this.inBounds(potentialPos[i])) { return false }
      //potential is occupied by current tetromino => legal
      if (this.currentTetrominoOccupies(currentPos, potentialPos[i])) { continue }
      //board contains a tetromino at potentialPos => illegal
      if (this.get(potentialPos[i])) { return false }
    }

    return potentialPos;
  }

  Board.prototype.inBounds = function (pos) {
    if (pos[0] < 0 || pos[0] > Y_DIM) { return false }
    if (pos[1] < 0 || pos[1] >= X_DIM) { return false }

    return true;
  }

  Board.prototype.currentTetrominoOccupies = function (currentPos, potential) {
    for (var i = 0; i < currentPos.length; i++) {
      if (currentPos[i][0] === potential[0] && currentPos[i][1] === potential[1]) { return true }
    }
    return false;
  }

  Board.prototype.checkToClearRows = function () {
    var rowsToClear = [];

    for (var y = 1; y <= Y_DIM; y++) {
      if (this.checkToClearRow(y)) {
        rowsToClear.push(y);
      }
    }

    return rowsToClear;
  }

  Board.prototype.checkToClearRow = function (y) {
    for (var x = 0; x < X_DIM; x++) {
      if (!this.get([y,x])) {
        return false;
      }
    }
    return true;
  }

  Board.prototype.clearRows = function (rows) {
    for (var i = 0; i < rows.length; i++) {
      var y = rows[i];
      this.clearRow(y);
      this.shiftRowsDown(y);
    }
  }

  Board.prototype.clearRow = function (y) {
    for (var x = 0; x < X_DIM; x++) {
      this.set([y, x], false)
    }
  }

  Board.prototype.shiftRowsDown = function (row) {
    for (var y = row; y > 0; y--) {
      for (var x = 0; x < X_DIM; x++) {
        this.set([y, x], this.get([y - 1, x]))
      }
    }
  }

  Board.prototype.lost = function () {
    for (var x = 0; x < X_DIM; x++) {
      if (this.get([1,x]) !== false) {
        return true;
      }
    }

    return false;
  }
})();
