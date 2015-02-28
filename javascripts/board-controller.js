(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Controller = Tetris.Controller = function (board) {
    this.board = board;
  }

  Controller.prototype.bindEvents = function () {
    var that = this;
    $(document).keydown(function(e) {
      e.preventDefault();

      switch(e.which) {
        case 65: // A
        case 37: // left
        that.board.moveTetromino('left');
        break;

        case 87: // W
        case 38: // up
        that.board.moveTetromino('rotate');
        break;

        case 68: // D
        case 39: // right
        that.board.moveTetromino('right')
        break;

        case 83: // S
        case 40: // down
        //pass true as second argument to score points for descending faster
        that.board.moveTetromino('down', true);
        break;

        default: return; // exit this handler for other keys
      }
    });
  }

  Controller.prototype.clearEvents = function () {
    $(document).off('keydown')
  }

})();
