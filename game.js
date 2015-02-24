(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Game = Tetris.Game = function () {
    this.stats = new Tetris.Stats();
    this.board = new Tetris.Board(this.stats);
    this.view = new Tetris.BoardView(this.stats);
    this.controller = new Tetris.Controller(this.board);
    this.fps = 60;
  };

  Game.prototype.play = function() {
    var grid = this.board.grid;
    var counter = 0;
    var graceCounter = 0;
    var gracePeriod;
    var that = this;

    this.view.render(grid);

    setInterval(function () {
      that.view.render(grid);
      counter += 1;

      if (counter - graceCounter === 7 && gracePeriod) {
          graceCounter = 0;
          gracePeriod = false;
          if (!that.board.checkMove('down')) {
            that.board.generateTetromino();
          }
      }

      if (counter % 10 === 0) {
        that.board.moveTetromino('down');
        if (that.board.checkToRegenerate()) {
          gracePeriod = true;
          graceCounter = counter;
        }
      }
    }, 1000/this.fps);

  };

  Game.prototype.speed = function () {
    this.stats.level
  }
})();
