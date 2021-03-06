(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Api = Tetris.Api = function () {
  }

  Api.prototype.getLeaderboard = function () {
    var that = this;

    $.ajax({
     url: 'https://tetris-api.herokuapp.com',
     type: 'GET',
     crossDomain: true,

     success: function(data) {
        that.parseAndInsert(data);
     }
    });
  }

  Api.prototype.postStats = function (event) {
    var that = this;
    var params = $(event.target).serializeJSON();

    $.ajax({
     url: 'https://tetris-api.herokuapp.com/api/games',
     type: 'POST',
     crossDomain: true,
     data: params,

     success: function(data) {
      that.parseAndInsert(data);
     }
    });
  }

  Api.prototype.parseAndInsert = function (data) {
    var $highScores = $('#high-scores');
    $highScores.empty();

    var $header = $('<span>');
    $header.html('HALL OF FAME');
    $header.addClass('header');
    $highScores.append($header);

    data.forEach(function (entry) {
      var $entry = $('<span>');
      var $name = $('<span>');
      var $score = $('<span>');
      $name.html(entry.username);
      $name.addClass('name');
      $score.html(entry.score);
      $score.addClass('score');
      $entry.append($name);
      $entry.append($score);
      $highScores.append($entry);
    });
  }

})();
