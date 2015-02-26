(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var BoardView = Tetris.BoardView = function (stats) {
    this.stats = stats;
  };

  BoardView.prototype.renderNewForm = function (playAgain) {
    //TO DO logic to display play again

    var templateCode = $("#new_game_form").html();
    var templateFn = _.template(templateCode);
    var renderedContent = templateFn();

    $('#main-display').html(renderedContent);
  }

  BoardView.prototype.renderPostForm = function () {
    var templateCode = $("#post_game_form").html();
    var templateFn = _.template(templateCode);
    var renderedContent = templateFn({
      startLevel: this.stats.startLevel,
      endLevel: this.stats.endLevel,
      lines: this.stats.lines,
      score: this.stats.score
    });

    $('#main-display').html(renderedContent);

  }

  BoardView.prototype.buildBoard = function () {
    $('#main-display').empty();

    $board = $('<div>');
    $board = $('<div>').attr('id', 'board');
    for(var y = 1; y <= 15; y++) {
      for(var x = 0; x < 10; x++) {
        var $square = $('<div>');
        $square.attr('x', x);
        $square.attr('y', y);
        $board.append($square)
      }
    }

    $('#main-display').append($board);
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
    this.renderStats();

    //render next piece
    this.clearNext();
    this.renderNext(nextShape, nextColor);
  }

  BoardView.prototype.renderStats = function () {
    $('.score > span').html(this.stats.score);
    $('.lines > span').html(this.stats.lines);
    $('.level > span').html(this.stats.level);
  }

  BoardView.prototype.clearNext = function () {
    for (var y = 1; y <= 2; y++) {
      for (var x = 3; x <= 6; x++) {
        $('#next-tetromino [x='+x+'][y='+y+']').css('background', 'black')
      }
    }
  }

  BoardView.prototype.renderNext = function (nextShape, nextColor) {
    //reset hidden divs if necessary
    $('#next-tetromino').removeClass('small')
    $('#next-tetromino [x=3][y=1]').show();
    $('#next-tetromino [x=3][y=2]').show();

    for (var i = 0; i < nextShape.length; i++) {
      var pos = nextShape[i]

      $('#next-tetromino [x='+pos[1]+'][y='+pos[0]+']').css('background', nextColor)
    }

    this.adjustCentering(nextColor);
  }

  BoardView.prototype.adjustCentering = function (nextColor) {
    if (nextColor !== 'DarkRed' && nextColor !== 'DarkBlue') {
      $('#next-tetromino').addClass('small')
      $('#next-tetromino [x=3][y=1]').hide();
      $('#next-tetromino [x=3][y=2]').hide();
    }
  }
})();

