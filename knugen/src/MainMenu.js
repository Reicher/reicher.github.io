KnugenGame.MainMenu = function (game) {

};
KnugenGame.MainMenu.prototype = {
	create: function () {
		this.add.sprite(0, 0, 'menuBackground');

		var title = this.add.sprite(KnugenGame.WIDTH / 2, 155, 'title');
		title.anchor.setTo(0.5, 0);

		var text = "(Tryck för att bli Knugen)";
		var style = {
			font: "10px Arial",
			fill: "#000000",
			align: "center"
		};

		var startText = this.game.add.text(KnugenGame.WIDTH / 2, 195, text, style);
		startText.anchor.setTo(0.5, 0);

		var text = "Version: 1.2";
		var style = {
			font: "10px Arial",
			fill: "#000000",
			align: "center"
		};
		var version = this.game.add.text(5, 385, text, style);

		this.game.add.tween(title).from({
			y: -200
		}, 1500, Phaser.Easing.Bounce.Out, true);
		this.game.add.tween(startText).from({
			alpha: 0
		}, 500, Phaser.Easing.Linear.None, true, 1500);

		this.game.input.onDown.add(this.startGame, this);
		this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.startGame, this);
	},
	startGame: function () {
		// start the Game state
		this.state.start('Game');
	}
};