Castle = function(game, PhysicsGroup) {

   this.game = game;

   this.centerFloor = { x: this.game.width/2, y: 100 };

   var dholm = PhysicsGroup.create(0, 0, 'castle');
   dholm.body.immovable = true;

   this.leftGate = PhysicsGroup.create(this.centerFloor.x-21, this.centerFloor.y, 'left_gate');
   this.leftGate.anchor.setTo(0.0, 1.0);
   this.leftGate.body.immovable = true;

   this.rightGate = PhysicsGroup.create(this.centerFloor.x+21, this.centerFloor.y, 'right_gate');
   this.rightGate.anchor.setTo(1.0, 1.0);
   this.rightGate.body.immovable = true;
}

Castle.prototype.openGate = function() {
   this.game.add.tween(this.leftGate.scale).to({x: 0.05}, 1000, Phaser.Easing.Quadratic.In, true);
   this.game.add.tween(this.rightGate.scale).to({x: 0.05}, 1000, Phaser.Easing.Quadratic.In, true);
}

Castle.prototype.closeGate = function() {
   this.game.add.tween(this.leftGate.scale).to({x: 1.0}, 1000, Phaser.Easing.Quadratic.In, true);
   this.game.add.tween(this.rightGate.scale).to({x: 1.0}, 1000, Phaser.Easing.Quadratic.In, true);
}
