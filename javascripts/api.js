(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Api = Tetris.Api = function () {
  }

  Api.getLeaderboard = function () {
    $.ajax({
     url: 'https://tetris-api.herokuapp.com',
     type: 'GET',
     crossDomain: true,

     success: function(data) {
        console.log(data)
     }
    });
  }

  Api.postStats = function () {
    $.ajax({
     url: 'https://tetris-api.herokuapp.com/api/games',
     type: 'POST',
     crossDomain: true,
     data: {
      'game[username]': 'barnes',
      'game[score]': '3434'
     },

     success: function(data) {
        console.log(data)
     }
    });
  }
})();
