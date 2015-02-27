(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Game = Tetris.Game = function () {
    var that = this;
    this.stats = new Tetris.Stats();
    this.board = new Tetris.Board(this.stats);
    this.view = new Tetris.BoardView(this.stats);

    this.view.renderNewForm();
    this.controller = new Tetris.Controller(this.board);

    this.api = new Tetris.Api();
    this.api.getLeaderboard();

    this.fps = 60;
  };

  Game.prototype.beginGame = function (event) {
    event.preventDefault();

    var level = parseInt($(event.target).serializeJSON().level)

    this.stats.level = level;
    this.stats.startLevel = level;

    this.controller.bindEvents();

    this.view.buildBoard();
    this.play(level);
    this.view.levelChange();
  }

  Game.prototype.play = function(level) {
    var speed = this.speedModulo(level);

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
            if (that.board.lost()) {
              that.gameOver();
            }

            var rowsToClear = that.board.checkToClearRows()
            if (rowsToClear.length) {
              that.view.flashRows(rowsToClear);
              that.board.clearRows(rowsToClear);
              that.stats.handleLineScoring(rowsToClear.length);
            }
            that.board.generateTetromino();

            //change speed to reflect current level
            if (currentLevel !== that.stats.level) {
              that.restartPlayLoop();
              that.view.levelChange();
            }
          }
      } else {
        if (counter % speed === 0 && !gracePeriod) {
          that.board.moveTetromino('down');
          if (that.board.checkToRegenerate()) {
            gracePeriod = true;
            graceCounter = counter;
            }
          }
        }
    }, 1000/this.fps);

  }

  Game.prototype.restartPlayLoop = function () {
    this.play(this.stats.level);
  }

  Game.prototype.speedModulo = function (level) {
    var speedModulo = 10 - level;
    if (speedModulo > 0) { return speedModulo }
    return 1;
  }

  Game.prototype.gameOver = function () {
    clearInterval(this.currentLoop);

    this.controller.clearEvents();
    this.view.renderPostForm();
    $('#post-stats').one('submit', this.endGame.bind(this));
  }

  Game.prototype.endGame = function (event) {
    event.preventDefault();

    this.api.postStats(event)
    this.view.renderNewForm(true);

    this.board.initializeGrid();
    $('#new-game').one('submit', this.beginGame.bind(this));
  }

})();
