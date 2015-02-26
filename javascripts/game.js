(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Game = Tetris.Game = function () {
    this.stats = new Tetris.Stats();
    this.board = new Tetris.Board(this.stats);
    this.view = new Tetris.BoardView(this.stats);
    this.view.renderNewForm();
    this.controller = new Tetris.Controller(this.board);
    this.api = new Tetris.Api();
    this.fps = 60;
  };

  Game.prototype.beginGame = function (event) {
    event.preventDefault();

    var level = $(event.target).serializeJSON().level

    this.view.buildBoard();
    this.play(level);
  }

  Game.prototype.play = function(level) {
    var speed = this.speedModulo(level);

    this.api.getLeaderboard();

    var counter = 0;
    var graceCounter = 0;
    var gracePeriod;
    var that = this;

    this.view.render(this.board);

    if (this.currentLoop) {
      clearInterval(this.currentLoop);
    }

    this.currentLoop = setInterval(function () {
      var currentLevel = that.stats.level;

      that.view.render(that.board);
      counter += 1;
      if (counter - graceCounter === 4 && gracePeriod) {
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
      } else {
        if (counter % speed === 0 && !gracePeriod) {
          that.board.moveTetromino('down');
          if (that.board.checkToRegenerate()) {
            gracePeriod = true;
            graceCounter = counter;
            console.log(counter)
            }
          }
        }
    }, 1000/this.fps);

  };

  Game.prototype.restartPlayLoop = function () {
    this.play(this.stats.level);
  }

  Game.prototype.speedModulo = function (level) {
    var speedModulo = 10 - level;
    if (speedModulo > 0) { return speedModulo }
    return 1;
  }

  Game.prototype.gameOver = function () {
    if (this.board.lost()) {
      //display game over
      //enter name for high score
      //post score, default user= "anonymous"
    }
  }
})();
