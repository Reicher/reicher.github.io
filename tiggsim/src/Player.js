Player = function (game) {
  this.money = 0;
  this.moneyGoal = 150;
  this.wellbeing = 5;
  this.maxHealth = 5;

  this.cursors = game.input.keyboard.createCursorKeys();
  this.game = game; // is this needed?

  Phaser.Sprite.call(this, game, 400, game.world.height - 90, 'player');
  this.scale.setTo(3, 3);
  this.anchor.setTo(0.5);
  game.physics.arcade.enable(this);
  this.body.collideWorldBounds = true;
  this.animations.add('run', [0, 1, 2, 3, 4], 8, true);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
   //  Reset the players velocity (movement)
  this.body.velocity.x = 0;

  if (this.cursors.left.isDown
    || (this.game.input.activePointer.isDown
        && this.game.input.x < this.x-20))
  {
      //  Move to the left
      this.body.velocity.x = -180;
      this.animations.play('run');
      this.scale.setTo(-3, 3);
  }
  else if (this.cursors.right.isDown
    || (this.game.input.activePointer.isDown
        && this.game.input.x > this.x+20))
  {
      //  Move to the right
      this.body.velocity.x = 180;
      this.animations.play('run');
      this.scale.setTo(3, 3);
  }
  else
  {
      // Stand still
      this.animations.stop();
      this.frame = 5;
      this.scale.setTo(2.5, 2.5);
  }
};
