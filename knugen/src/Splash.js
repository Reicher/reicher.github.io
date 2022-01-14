KnugenGame.Splash = function (game) {};
KnugenGame.Splash.prototype = {
	create: function () {

		var logo = this.add.sprite(this.game.width / 2, this.game.height / 2, 'TNSlogo');
		logo.anchor.setTo(0.5);
		logo.scale.setTo(0.6);

		this.game.music = this.game.add.audio('bgMusic', 0.7, true);
		this.game.music.play();

		var logoFade = this.game.add.tween(logo).to({
			alpha: 0
		}, 1000, Phaser.Easing.Linear.None, false, 3000);
		logoFade.onComplete.add(this.startGame, this);
		logoFade.start();

		this.game.input.onDown.add(this.startGame, this);
		this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.startGame, this);
	},
	startGame: function () {
		// start the Game state
		this.state.start('MainMenu');
	}
};