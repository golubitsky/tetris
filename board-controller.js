(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Controller = Tetris.Controller = function (board) {
    this.board = board;
    this.grid = board.grid;

    this.bindEvents();
  }

  Controller.prototype.bindEvents = function () {
    var that = this;
    $(document).keydown(function(e) {
      e.preventDefault();
      switch(e.which) {
        case 37: // left
        that.board.currentTetromino.left();
        console.log('l')
        break;

        case 38: // up\
        console.log('u')
        break;

        case 39: // right
        that.board.currentTetromino.right();
        console.log('r')
        break;

        case 40: // down
        console.log('d')
        break;

        default: return; // exit this handler for other keys
      }
    });
  }

})();
