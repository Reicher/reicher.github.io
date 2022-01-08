var Lettris = {};
Lettris.Boot = function (game) {};

Lettris.Boot.prototype = {
    preload: function () {
	// preload the loading indicator first before anything else
	this.load.image('preloaderBar', 'assets/loading-bar.png');
    },
    create: function () {
	// set scale options
	this.input.maxPointers = 1;
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;

	this.game.version = "Version 1.2.1"

	// start the Preloader state
	this.state.start('Preloader');
    }
};
