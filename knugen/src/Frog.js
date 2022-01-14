Frog = function (game, pos, physicalGroup, knugen) {
	this.game = game;
	this.knugen = knugen;
	this.speed = 30;
	this.frog = true;
	this.physicalGroup = physicalGroup;
	this.croakSound = this.game.add.audio('croak', 0.9, false);

	var bmd = game.make.bitmapData(360, 16);
	bmd.load('frog');
	// Color tone
	var tonesList = [{
			r: 128,
			g: 255,
			b: 0
		},
		{
			r: 58,
			g: 205,
			b: 100
		},
		{
			r: 150,
			g: 150,
			b: 0
		}];
	this.tone = game.rnd.pick(tonesList);
	bmd.replaceRGB(255, 150, 255, 255,
		this.tone.r, this.tone.g, this.tone.b, 255);
	game.cache.addSpriteSheet('dynamicFrog', '', bmd.canvas, 15, 14, 24, 0, 0);
	Phaser.Sprite.call(this, game, pos.x, pos.y - 1, 'dynamicFrog');
	// All animations, frame 0 is "idle"
	this.animations.add('north', [4, 5, 6, 7, 8], 10, true);
	this.animations.add('west', [9, 10, 11, 12, 13], 10, true);
	this.animations.add('south', [14, 15, 16, 17, 18], 10, true);
	this.animations.add('east', [19, 20, 21, 22, 23], 10, true);
	this.frame = 2;

	// Death animation
	var bmd2 = game.make.bitmapData(448, 14);
	bmd2.load('explodingFrog');
	bmd2.replaceRGB(255, 150, 255, 255,
		this.tone.r, this.tone.g, this.tone.b, 255);
	game.cache.addSpriteSheet('dynamicFrogDeath', '', bmd2.canvas, 14, 14, 32, 0, 0);
	this.death = game.add.sprite(0, 0, 'dynamicFrogDeath');
	this.death.visible = false;
	this.death.anchor.setTo(0.5, 0.5);
	this.death.animations.add('north', [0, 1, 2, 3, 4, 5, 6, 7], 10, false, true);
	this.death.animations.add('west', [8, 9, 10, 11, 12, 13, 14, 16], 10, false, true);
	this.death.animations.add('south', [17, 18, 19, 20, 21, 22, 23, 24], 10, false, true);
	this.death.animations.add('east', [25, 26, 27, 28, 29, 30, 31, 32], 10, false, true);

	game.add.existing(this);
	game.physics.arcade.enable(this);

	this.anchor.setTo(0.5, 1);
	this.body.collideWorldBounds = true;
	this.body.height = 9;
	this.body.width = 14;

	this.allLines = [];

	this.physicalGroup.forEach(function (sprite) {
		if (!sprite.frog && !sprite.knugen) {

			topLeftCoord = Utils.getTopLeft(sprite);
			this.allLines.push(new Phaser.Line(topLeftCoord.x,
				topLeftCoord.y,
				topLeftCoord.x + sprite.body.width,
				topLeftCoord.y));
			this.allLines.push(new Phaser.Line(topLeftCoord.x,
				topLeftCoord.y,
				topLeftCoord.x,
				topLeftCoord.y + sprite.body.height));
			this.allLines.push(new Phaser.Line(topLeftCoord.x + sprite.body.width,
				topLeftCoord.y,
				topLeftCoord.x + sprite.body.width,
				topLeftCoord.y + sprite.body.height));
			this.allLines.push(new Phaser.Line(topLeftCoord.x,
				topLeftCoord.y + sprite.body.height,
				topLeftCoord.x + sprite.body.width,
				topLeftCoord.y + sprite.body.height));
		}
	}, this);

	this.line1 = new Phaser.Line(0, 0, 0, 0);
	this.line2 = new Phaser.Line(0, 0, 0, 0);

	this.game.time.events.add(1000, this.firstJump, this);
}

Frog.prototype = Object.create(Phaser.Sprite.prototype);
Frog.prototype.constructor = Frog;

Frog.prototype.update = function () {}

Frog.prototype.firstJump = function () {
	this.body.velocity.x = 0;
	this.body.velocity.y = 1 * this.speed;
	this.setAnimation(90);

	this.croak();
	this.idleTimer = this.game.time.events.add(1000, this.setIdle, this);
}

Frog.prototype.jump = function () {

	var degStep = 1;
	var rotStart = 0;
	var changeDir = false;
	var totalAdded = 0;
	var diff = 0;

	if (Phaser.Math.chanceRoll()) {
		rotStart = 1;
	} else {
		rotStart = -1;
	}

	this.angle = this.game.physics.arcade.angleBetween(Utils.getTopLeft(this),
		Utils.getTopLeft(this.knugen));

	if (this.knugen.super) {
		this.angle += Math.PI;
		diff = Phaser.Math.degToRad(45.0);
	}
	else {
		diff = Phaser.Math.degToRad(10.0);
	}
	
	// Add a bit of random
	this.angle += this.game.rnd.integerInRange(-diff/2, diff/2);

	this.updateLines(this.angle);

	while (this.checkIntersection() && totalAdded < (2 * Math.PI)) {
		if (changeDir) {
			changeDir = false;
			rotStart *= -1;
		} else {
			totalAdded += Phaser.Math.degToRad(degStep);
			changeDir = true;
		}

		this.updateLines(this.angle + (rotStart * totalAdded));
	}

	if (totalAdded >= (2 * Math.PI)) {
		totalAdded = Phaser.Math.degToRad(this.game.rnd.integerInRange(0, 360));
	}

	this.angle += rotStart * totalAdded;

	this.body.velocity.x = Math.cos(this.angle) * this.speed;
	this.body.velocity.y = Math.sin(this.angle) * this.speed;

	this.setAnimation(Phaser.Math.radToDeg(Phaser.Math.normalizeAngle(this.angle)));
	this.croak();
	this.idleTimer = this.game.time.events.add(1000, this.setIdle, this);
}

Frog.prototype.setIdle = function (forGood) {
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

	// setup next jump
	if (!forGood) {
		var nextJump = this.game.rnd.integerInRange(500, 2000);
		this.jumpTimer = this.game.time.events.add(nextJump, this.jump, this);
	}
}

Frog.prototype.explode = function () {
	this.body.enable = false;
	this.setIdle(true);

	this.game.time.events.remove(this.idleTimer);
	this.game.time.events.remove(this.jumpTimer);

	this.visible = false;
	this.death.visible = true;
	this.death.x = this.x;
	this.death.y = this.y;

	if (this.frame = 0)
		this.death.animations.play('north');
	else if (this.frame = 1)
		this.death.animations.play('west');
	else if (this.frame = 2)
		this.death.animations.play('south');
	else
		this.death.animations.play('east');

	// Give the animation time to play
	this.game.time.events.add(500, this.cleanFrogMush, this);
}

Frog.prototype.cleanFrogMush = function (deg) {
	this.destroy();
	this.death.destroy();
}

Frog.prototype.setAnimation = function (deg) {

	if (deg >= 225.0 && deg <= 315.0)
		this.animations.play('north');
	else if (deg >= 135.0 && deg <= 225.0)
		this.animations.play('west');
	else if (deg >= 45.0 && deg <= 135.0)
		this.animations.play('south');
	else
		this.animations.play('east');
}

Frog.prototype.croak = function () {
	if (this.game.rnd.integerInRange(0, 5) > 4)
		this.croakSound.play();
}

Frog.prototype.checkIntersection = function () {

	for (var i = 0, len = this.allLines.length; i < len; i++) {
		if (Phaser.Line.intersects(this.line1, this.allLines[i]) ||
			Phaser.Line.intersects(this.line2, this.allLines[i])) {
			return true;
		}
	}

	return false;
}

Frog.prototype.updateLines = function (angle) {

		var line1Start;
		var line2Start;
		normAngle = Phaser.Math.normalizeAngle(angle);

		if ((normAngle >= Math.PI / 2 && normAngle <= Math.PI) || (normAngle >= (3 * Math.PI / 2) && normAngle <= 2 * Math.PI)) {
			line1Start = Utils.getTopLeft(this);
			line2Start = Utils.getBottomRight(this);
		} else if ((normAngle >= Math.PI && normAngle <= (3 * Math.PI / 2)) || (normAngle >= 0 && normAngle <= Math.PI / 2)) {
			line1Start = Utils.getTopRight(this);
			line2Start = Utils.getBottomLeft(this);
		}

		this.line1.fromAngle(line1Start.x, line1Start.y, angle, this.speed);
		this.line2.fromAngle(line2Start.x, line2Start.y, angle, this.speed);
	}
	// Frog.prototype.render = function() {
	//    this.game.debug.body(this);
	//    this.game.debug.geom(this.line1);
	//    this.game.debug.geom(this.line2);
	// }
