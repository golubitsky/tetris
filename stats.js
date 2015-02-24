(function () {
  if (typeof Tetris === "undefined") {
    window.Tetris = {};
  }

  var Stats = Tetris.Stats = function () {
    this.score = 0;
    this.level = 0;
    this.lines = 0;
  };

  Stats.prototype.levelUp = function () {
    this.level += 1;
  }

  Stats.prototype.handleLineScoring = function (lineCount) {
    this.lineCountUp(lineCount);
    this.scoreLinePoints(lineCount);
  }
  Stats.prototype.lineCountUp = function (lineCount) {
    this.lines += lineCount;

    if (this.lines % 10 === 0) {
      this.level += 1;
    }
  }

  Stats.prototype.scoreLinePoints = function (lineCount) {
    var n = this.level;

    switch (lineCount) {
      case 1:
      this.score += (40 * (n + 1));
      break;

      case 2:
      this.score += (100 * (n + 1));
      break;

      case 3:
      this.score += (300 * (n + 1));
      break;

      case 4:
      this.score += (1200 * (n + 1));
      break;
    }
  }

  Stats.prototype.scoreSpeedPoints = function () {
    this.score += (5 * (this.level + 1));
  }
})();
