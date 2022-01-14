TS.MainMenu = function(game){
	var background;
	var music;
	var startButton;

	var car;
};
TS.MainMenu.prototype = {
	create: function(){
		// display scrolling background
		this.background = this.add.tileSprite(0, 0, 160, 60, 'menuBackground');
		this.background.scale.setTo(10, 10);

		var title = this.add.sprite((TS.GAME_WIDTH-200)/2, 30, 'title');
		title.scale.setTo(5, 5);

		this.add.text(400, 220, 'v1.1 av Punkrockaren Claude', { fontSize: '5px', fill: '#AAAAAA' });
		var musicCred = this.add.text(5, TS.GAME_HEIGHT+5, 'Music: www.bensound.com', { font: "15px Arial"});
		musicCred.anchor.setTo(0, 1);

		this.car = this.add.sprite(60, 340, 'car');
		this.car.scale.setTo(4, 4);
		this.game.add.tween(this.car).to({y: '+4'}, 300, Phaser.Easing.Linear.None, true, 0, -1, true);

		// add the button that will start the game
		this.startButton = this.add.button(TS.GAME_WIDTH-220, TS.GAME_HEIGHT-130, 'button-start', this.onStartClick, this, 1, 0, 2);
		this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.onStartClick, this);

		if(!this.music){
			this.music = this.game.add.audio('bgMusic', 0.9, true);
			this.music.play();
		}
		else
			this.music.volume = 1.0;
	},
	startGame: function() {
		// start the Game state
		this.state.start('Game');
	},
	update: function() {
		this.background.tilePosition.x -= 0.5;
	},
	onStartClick: function() {
		this.startButton.visible = false;

		this.game.add.tween(this.music).to({volume: 0.3}, 2500, Phaser.Easing.Linear.None, true, 200);
		this.game.add.tween(this.car).to({x: '800'}, 1500, Phaser.Easing.Quadratic.In, true, 200);
		var fadeTween = this.game.add.tween(this.game.world).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, false, 1000);
		fadeTween.onComplete.add(this.startGame, this);
		fadeTween.start();
	}
};
