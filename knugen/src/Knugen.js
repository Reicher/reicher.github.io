Knugen = function (game) {

	this.knugen = true;

	if (this.isVickan())
		Phaser.Sprite.call(this, game, game.world.width / 2, game.world.height / 2, 'vickan');
	else
		Phaser.Sprite.call(this, game, game.world.width / 2, game.world.height / 2, 'knugen');

	game.add.existing(this);

	// Setting up super knug power things
	this.super = false;
	this.superSprite = game.add.sprite(0, 5, 'aura');
	this.superSprite.anchor.setTo(0.5, 1);
	this.superSprite.alpha = 0.0;
	this.superSprite.visible = false;
	this.addChild(this.superSprite);
	this.superSprite.animations.add('shine');
	this.superSprite.animations.play('shine', 10, true);

	game.physics.arcade.enable(this);

	this.superMusic = this.game.add.audio('superMusic');

	// All animations, frame 0 is "idle"
	this.animations.add('north', [4, 5, 6, 7, 8, 9, 10, 11], 15, true);
	this.animations.add('west', [12, 13, 14, 15, 16, 17, 18, 19], 15, true);
	this.animations.add('south', [20, 21, 22, 23, 24, 25, 26, 27], 15, true);
	this.animations.add('east', [28, 29, 30, 31, 32, 33, 34, 35], 15, true);
	this.frame = 2;

	this.inputEnabled = true;
	this.anchor.setTo(0.5, 0.9);
	this.body.collideWorldBounds = true;

	// Change Knug hitbox, only body, not head
	this.body.height = 17;
	this.body.width = 12;

	this.cursors = game.input.keyboard.createCursorKeys();
}

Knugen.prototype = Object.create(Phaser.Sprite.prototype);
Knugen.prototype.constructor = Knugen;

Knugen.prototype.update = function () {
	var distToKnug = this.game.physics.arcade.distanceBetween(this.game.input.activePointer, this);

	// Using mouse
	if (this.game.input.activePointer.isDown && distToKnug > 5) {
		var radToPointer = this.game.physics.arcade.angleToPointer(this, this.game.input.activePointer);
		this.body.velocity = this.game.physics.arcade.velocityFromRotation(radToPointer, 60);
		this.setAnimation(Phaser.Math.radToDeg(radToPointer));
	} else if (!this.usingKeyboard()) {
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;

		switch (this.animations.name) {
		case 'north':
			this.frame = 0;
			break;
		case 'west':
			this.frame = 1;
			break;
		case 'south':
			this.frame = 2;
			break;
		case 'east':
			this.frame = 3;
			break;
		}
		this.animations.stop();
	}
}

Knugen.prototype.usingKeyboard = function () {
	var direction = 0;

	if (this.cursors.down.isDown && this.cursors.right.isDown)
		direction = 45;
	else if (this.cursors.down.isDown && this.cursors.left.isDown)
		direction = 135;
	else if (this.cursors.up.isDown && this.cursors.left.isDown)
		direction = -135;
	else if (this.cursors.up.isDown && this.cursors.right.isDown)
		direction = -45;
	else if (this.cursors.right.isDown)
		direction = 0;
	else if (this.cursors.left.isDown)
		direction = 180;
	else if (this.cursors.up.isDown)
		direction = -90;
	else if (this.cursors.down.isDown)
		direction = 90;
	else
		return false;

	this.body.velocity = this.game.physics.arcade.velocityFromRotation(Phaser.Math.degToRad(direction), 60);
	this.setAnimation(direction);

	return true;
}

Knugen.prototype.setAnimation = function (deg) {
	if (deg <= -45.0 && deg >= -135.0)
		this.animations.play('north');
	else if (deg <= -135.0 || deg >= 145.0)
		this.animations.play('west');
	else if (deg <= 145.0 && deg >= 45.0)
		this.animations.play('south');
	else
		this.animations.play('east');
}

Knugen.prototype.activateSuperKnugPowers = function () {
	this.super = true;
	this.superSprite.visible = true;

	if (this.isVickan())
		this.loadTexture('superVickan');
	else
		this.loadTexture('superKnugen');

	this.superMusic.play();
	this.game.music.volume = 0.0;

	if (this.superTween)
		this.superTween.stop();

	this.superSprite.alpha = 0.0;
	this.superTween = this.game.add.tween(this.superSprite).to({
		alpha: 0.6
	}, 100, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);

	if (this.superTimer)
		this.game.time.events.remove(this.superTimer);

	this.superTimer = this.game.time.events.add(5000, this.superWarning, this);
}

Knugen.prototype.superWarning = function () {
	if (this.superTween)
		this.superTween.stop();

	this.superSprite.alpha = 0.0;
	this.superTween = this.game.add.tween(this.superSprite).to({
		alpha: 0.6
	}, 500, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);

	this.superTimer = this.game.time.events.add(Phaser.Timer.SECOND * 2, this.deactivateSuperKnugPowers, this);
}

Knugen.prototype.deactivateSuperKnugPowers = function () {
	this.super = false;
	this.superTween.stop();
	this.superSprite.visible = false;
	
	if (this.isVickan())
		this.loadTexture('vickan');
	else
		this.loadTexture('knugen');
	this.superMusic.stop();
	this.game.add.tween(this.game.music).to({
		volume: 1.0
	}, 2000, Phaser.Easing.Linear.none).start();
}


Knugen.prototype.isVickan = function () {
	if (!this.supports_html5_storage()) {
		console.log("NOO");
		return false;
	}
	
	var frogs =  JSON.parse(localStorage.getItem("Frogs"));

	return frogs && frogs.length == grodor.length;
}

Knugen.prototype.supports_html5_storage =  function () {
	try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e) {
		return false;
	}
}