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
        that.board.moveTetromino('left');
        console.log('left')
        break;

        case 38: // up\
        console.log('rotate')
        that.board.moveTetromino('rotate');
        break;

        case 39: // right
        that.board.moveTetromino('right')
        console.log('right')
        break;

        case 40: // down
        console.log('down')
        //pass true as second argument to score points for descending faster
        that.board.moveTetromino('down', true);
        break;

        default: return; // exit this handler for other keys
      }
    });
  }

})();
