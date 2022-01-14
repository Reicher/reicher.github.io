Clock = function (game, x, y, gameTime) {
  Phaser.Group.call(this, game);
  this.x = x;
  this.y = y;

  var timeUp = false;

  var timer = game.time.create(game);
  timer.add(gameTime, function () { this.timeUp = true; }, this);
  timer.start();

  var base = this.create(0, 0, 'clock');
  base.anchor.setTo(0.5);

  var hourHand = this.create(0, 0, 'clock_h');
  hourHand.anchor.setTo(0.5);
  hourHand.angle = 210; // 7 in the morning

  var minuteHand = this.create(0, 0, 'clock_m');
  minuteHand.anchor.setTo(0.5);

  game.add.tween(minuteHand).to({angle: '+360'}, gameTime/12, Phaser.Easing.Linear.None, true, 0, 12);
  game.add.tween(hourHand).to({angle: '+360'}, gameTime, Phaser.Easing.Linear.None, true, 0);
};

Clock.prototype = Object.create(Phaser.Group.prototype);
Clock.prototype.constructor = Clock;
