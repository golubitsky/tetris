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

  Game.prototype.play = function(level) {

    var grid = this.board.grid;
    var counter = 0;
    var graceCounter = 0;
    var gracePeriod;
    var that = this;

    this.view.render(grid);

    if (this.currentLoop) {
      clearInterval(this.currentLoop);
    }

    this.currentLoop = setInterval(function () {
      var currentLevel = that.stats.level;

      that.view.render(grid);
      counter += 1;

      if (counter - graceCounter === 7 && gracePeriod) {
          graceCounter = 0;
          gracePeriod = false
          //check if grace-period rotation has allowed further descent
          if (!that.board.checkMove('down')) {
            that.board.generateTetromino();

            //change speed to reflect current level
            if (currentLevel !== that.stats.level) {
              that.restartPlayLoop().bind(that);
            }
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

  Game.prototype.restartPlayLoop = function () {
    this.play();
  }

  Game.prototype.speed = function () {
    var levelModifier = (this.stats.level + 1) * 1.5;
    return 1000/(this.fps + levelModifier);
  }
})();
