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

  Api.prototype.parseAndInsert = function (data) {
    var $highScores = $('#high-scores');
    $highScores.empty();

    data.forEach(function (entry) {
      var $entry = $('<span>');
      var $name = $('<span>');
      var $score = $('<span>');
      $name.html(entry.username);
      $score.html(entry.score);
      $entry.append($name);
      $entry.append($score);
      $highScores.append($entry);
    });
  }

  Api.prototype.postStats = function () {
    $.ajax({
     url: 'https://tetris-api.herokuapp.com/api/games',
     type: 'POST',
     crossDomain: true,
     data: {
      'game[username]': 'barnes',
      'game[score]': '3434'
     },

     success: function(data) {
      debugger
     }
    });
  }
})();
