Lettris.Preloader = function (game) {};

Lettris.Preloader.prototype = {
    preload: function () {
	// set background color and preload image
	this.stage.backgroundColor = '#000000';

	this.preloadBar = this.add.sprite(this.game.width / 2,
					  this.game.height / 2,
					  'preloaderBar');
	this.preloadBar.anchor.setTo(0.5)
	this.load.setPreloadSprite(this.preloadBar);

	this.game.load.atlasJSONArray('sprites',
 				      'assets/spritesheet.png',
 				      'assets/sprites.json')

	// Sounds
	this.game.load.audio('select', './assets/audio/letter_click.wav')
	this.game.load.audio('deselect', './assets/audio/letter_declick.wav')
	this.game.load.audio('clear', './assets/audio/clear.wav')
	this.game.load.audio('accept', './assets/audio/accept.wav')
	this.game.load.audio('boom', './assets/audio/dynamite_destroy.wav')
	this.game.load.audio('firework', './assets/audio/fireworks.wav')
	this.game.load.audio('button', './assets/audio/button_click.wav')
	this.game.load.audio('music', './assets/audio/theme.mp3')
	this.game.load.audio('intro', './assets/audio/TNS_splash.mp3')
	this.game.load.audio('fanfare', './assets/audio/fanfare.wav')
	this.game.load.audio('ambient', './assets/audio/funfair_ambient.mp3')
	this.game.load.audio('level', './assets/audio/level_up.wav')
    },
    create: function () {
	// start the MainMenu state
	this.state.start('Splash');
    }
};
