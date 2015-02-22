(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Game = Tetris.Game = function () {
    this.board = new Tetris.Board();
    this.view = new Tetris.BoardView();
    this.controller = new Tetris.Controller(this.board);
  };

  Game.prototype.play = function() {
    var grid = this.board.grid;
    this.view.render(grid);

    that = this;

    setInterval(function () {
      that.view.render(grid);
    }, 20);

    setInterval(function () {
      that.board.moveTetromino('down');
    }, 700);
  };
})();
