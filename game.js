(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Game = Tetris.Game = function () {
    this.board = new Tetris.Board();
    this.view = new Tetris.BoardView();
    this.controller = new Tetris.Controller(this.board);
    this.counter = 0
    this.fps = 60;
  };

  Game.prototype.play = function() {
    var grid = this.board.grid;
    this.view.render(grid);

    that = this;

    setInterval(function () {
      that.view.render(grid);
      that.counter += 1;
      if (that.counter % 10 === 0) {
        that.board.moveTetromino('down');
      }

    }, 1000/this.fps);

  };
})();
