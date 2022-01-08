Rocket = function (game, from, to, speed) {
    Phaser.Sprite.call(this, game, from.x, from.y, 'sprites', 'firework1')

    this.anchor.setTo(0.5)

    this.sound = this.game.add.audio('firework')

    var fly_frames = Phaser.Animation.generateFrameNames("firework", 1, 3)
    var boom_frames = Phaser.Animation.generateFrameNames("firework-explode", 1, 7)
    this.fly = this.animations.add('fly', fly_frames, 10, true);
    this.boom = this.animations.add('boom', boom_frames, 10, false);


    var fly_tween = this.game.add.tween(this).to({x: to.x,
						  y: to.y},
						 speed,
						 Phaser.Easing.Quadratic.In,
						 true)

    fly_tween.onComplete.add(this.goBoom, this)
    this.animations.play('fly')

    game.add.existing(this)
}

Rocket.prototype = Object.create(Phaser.Sprite.prototype);
Rocket.prototype.constructor = Rocket;

Rocket.prototype.goBoom = function () {
    this.animations.stop()

    var emitter = this.game.add.emitter(this.x,this.y, 40);
    emitter.makeParticles('sprites', ['confetti-blue',
				      'confetti-red',
				      'confetti-green',
				      'confetti-yellow'])
    emitter.start(true, 5000, null, 40);

    this.animations.play('boom')
    if(!this.game.masterMute)
	this.sound.play()

    this.boom.onComplete.add(function () {this.destroy()}, this)
}
