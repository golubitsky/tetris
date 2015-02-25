(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var BoardView = Tetris.BoardView = function (stats) {
    this.stats = stats;
    this.build();
  };

  BoardView.prototype.build = function () {
    for(var y = 1; y <= 15; y++) {
      for(var x = 0; x < 10; x++) {
        var $square = $('<div>');
        $square.attr('x', x);
        $square.attr('y', y);
        $('#board').append($square)
      }
    }
  }

  BoardView.prototype.render = function (board) {
    var grid = board.grid;
    var nextShape = board.nextShape;
    var nextColor = board.nextColor;

    //do not render the top-most line; it exists for rotation on top of board
    for(var y = 1; y <= 15; y++) {
      for(var x = 0; x < 10; x++) {
        var $square = $('#board [x='+x+'][y='+y+']')
        var color = grid[y][x];
        if (!color) { color = 'black' };

        $square.css('background-color', color)
      }
    }
    //update stats
    $('#score > span').html(this.stats.score);
    $('#lines > span').html(this.stats.lines);
    $('#level > span').html(this.stats.level);

    //render next piece
    this.clearNext();
    this.renderNext(nextShape, nextColor);


  }

  BoardView.prototype.clearNext = function () {
    for (var y = 1; y <= 2; y++) {
      for (var x = 3; x <= 6; x++) {
        $('#next-tetromino [x='+x+'][y='+y+']').css('background', 'black')
      }
    }
  }

  BoardView.prototype.renderNext = function (nextShape, nextColor) {
    for (var i = 0; i < nextShape.length; i++) {
      var pos = nextShape[i]

      $('#next-tetromino [x='+pos[1]+'][y='+pos[0]+']').css('background', nextColor)
    }
  }
})();
