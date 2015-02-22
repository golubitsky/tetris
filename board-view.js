(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var BoardView = Tetris.BoardView = function () {
    this.build();
  };

  BoardView.prototype.build = function () {
    for(var y = 0; y < 15; y++) {
      for(var x = 0; x < 10; x++) {
        var $square = $('<div>');
        $square.attr('x', x);
        $square.attr('y', y);
        $('#board').append($square)
      }
    }
  }

  BoardView.prototype.render = function (grid) {
    for(var y = 0; y < 15; y++) {
      for(var x = 0; x < 10; x++) {
        var $square = $('[x='+x+'][y='+y+']')

        var color = grid[y][x];
        if (!color) { color = 'black' };

        $square.css('background-color', color)
      }
    }
  }
})();
