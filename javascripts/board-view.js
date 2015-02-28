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
    var nextShapeName = board.nextShapeName;
    var nextColor = board.nextColor;
    var previousPos = board.currentTetromino.previousPos || [];
    var currentPos = board.currentTetromino.pos || [];
    var currentColor = board.currentTetromino.color || 'black';
    //do not render the top-most line; it exists for rotation on top of board
    //change this to toggle class
    //only render moving piece somehow
    // for (var i = 0; i < previousPos.length; i++){
    //   var previousY = previousPos[i][0]
    //   var previousX = previousPos[i][1]
    //   var currentY = currentPos[i][0]
    //   var currentX = currentPos[i][1]
    //   var $previousSquare = $('#board [x='+previousX+'][y='+previousY+']')
    //   var $currentSquare = $('#board [x='+currentX+'][y='+currentY+']')
    //   $previousSquare.css('color', 'black');
    //   $currentSquare.css('color', currentColor);
    //   debugger
    // }

    // this re-renders everything
    for(var y = 1; y <= 15; y++) {
      for(var x = 0; x < 10; x++) {
        var $square = $('#board [x='+x+'][y='+y+']')

        var tetroType = grid[y][x];
        if (!tetroType) { tetroType = 'empty' };

        $square.removeClass();
        $square.addClass(tetroType);
      }
    }

    //update stats
    this.renderStats();

    //render next piece
    this.clearNext();
    this.renderNext(nextShape, nextColor, nextShapeName);
  }

  BoardView.prototype.renderStats = function () {
    $('#stats .score').html(this.stats.score);
    $('#stats .lines').html(this.stats.lines);
    $('#stats .level').html(this.stats.level);
  }

  BoardView.prototype.clearNext = function () {
    for (var y = 1; y <= 2; y++) {
      for (var x = 3; x <= 6; x++) {
        $('#next-tetromino [x='+x+'][y='+y+']').removeClass();
      }
    }
  }

  BoardView.prototype.renderNext = function (nextShape, nextColor, nextShapeName) {
    this.previous == nextShape;
    if (this.previous == nextShape) {
      return;
    }
    //reset hidden divs if necessary
    $('#next-tetromino').removeClass();
    $('#next-tetromino div').removeClass();
    $('#next-tetromino [x=3][y=1]').show();
    $('#next-tetromino [x=3][y=2]').show();
    $('#next-tetromino [x=3][y=2]').show();
    $('#next-tetromino [x=4][y=2]').show();
    $('#next-tetromino [x=5][y=2]').show();
    $('#next-tetromino [x=6][y=2]').show();

    for (var i = 0; i < nextShape.length; i++) {
      var pos = nextShape[i]
      $('#next-tetromino [x='+pos[1]+'][y='+pos[0]+']').addClass(nextShapeName);
    }

    this.adjustCentering(nextColor);
  }

  BoardView.prototype.adjustCentering = function (nextColor) {
    if (nextColor !== 'DarkRed' && nextColor !== 'DarkBlue') {
      $('#next-tetromino').addClass('small')
      $('#next-tetromino [x=3][y=1]').hide();
      $('#next-tetromino [x=3][y=2]').hide();
    } else if (nextColor === 'DarkRed') {
      $('#next-tetromino div').addClass('long')
      $('#next-tetromino [x=3][y=2]').hide();
      $('#next-tetromino [x=4][y=2]').hide();
      $('#next-tetromino [x=5][y=2]').hide();
      $('#next-tetromino [x=6][y=2]').hide();
    }
  }

  BoardView.prototype.levelChange = function () {
    var color = this.randomColor();
    $('html').css('background', color);
    $('body').css('background', color);
  }

  BoardView.prototype.flashRows = function (rows, callback) {
    var that = this;
    for (var i = 0; i < rows.length; i++) {
      var y = rows[i];
      $row = $('#board div[y='+y+']');
      $row.addClass('clearing');

      var counter = 0;
      $row.addClass('explode1')
      var explode = setInterval(function () {
        counter += 1;
        switch(counter) {
          case 1:
            $row.addClass('explode2')
            break;
          case 2:
            $row.addClass('explode3')
            break;
          case 3:
            clearInterval(explode);
            $row.removeClass();
            $row.addClass('empty');
            callback();
          }
      }, 75);
    }
  }

  BoardView.prototype.randomColor = function () {
    return '#'+ Math.floor(Math.random()*16777215).toString(16);
  }
})();

