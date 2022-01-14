TS.Splash = function(game){
};
TS.Splash.prototype = {
	create: function(){

		var logo = this.add.sprite((TS.GAME_WIDTH)/2, (TS.GAME_HEIGHT)/2, 'TNSlogo');
		logo.anchor.setTo(0.5);
		var fadeTween = this.game.add.tween(logo).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, false, 3000);
		fadeTween.onComplete.add(this.startGame, this);
		fadeTween.start();

		this.game.input.onDown.add(this.startGame, this);
	},
	startGame: function() {
		// start the Game state
		this.state.start('MainMenu');
	}
};
