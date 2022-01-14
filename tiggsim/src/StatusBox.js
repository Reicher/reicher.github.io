StatusBox = function (game, x, y, moneyGoal, maxLife) {
  Phaser.Group.call(this, game);
  this.x = x;
  this.y = y;

  this.moneyGoal = moneyGoal;
  this.maxLife = maxLife;

  var back = this.create(0, 0, 'statusBox');
  back.alpha = 0.90;
  back.scale.setTo(1.5, 1);

  this.moneyText = game.add.text(75, 5, '0 / ' + moneyGoal + ' kr', { font: "22px Arial", fill: "#000000" });
  this.moneyText.anchor.setTo(0.5, 0);
  this.add (this.moneyText);

  this.health = game.add.graphics(0, 0);
  this.health.lineStyle(2, 0x000000, 1);
  this.health.beginFill(0x00FF00, 1);
  this.health.drawRect(10, 30, 130, 20);

  this.add(this.health);
};

StatusBox.prototype = Object.create(Phaser.Group.prototype);
StatusBox.prototype.constructor = StatusBox;

StatusBox.prototype.setMoney = function(money) {
  this.moneyText.text = money + ' / ' + this.moneyGoal + ' kr';
};

StatusBox.prototype.setHealth = function(health) {
  // Is this really needed?
  this.health.destroy();
  this.health = this.game.add.graphics(0, 0);
  this.health.lineStyle(2, 0x000000, 1);
  this.health.beginFill(0x00FF00, 1);
  this.health.drawRect(10, 30, 130*(health/this.maxLife), 20);

  this.add(this.health);
};
