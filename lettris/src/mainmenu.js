Lettris.MainMenu = function (game) {

};
Lettris.MainMenu.prototype = {
    create: function () {
	this.game.add.sprite(0, 0, 'sprites', 'background');

	this.logo = this.game.add.sprite(this.game.width/2, 140, 'sprites', 'logo')
	this.logo.anchor.setTo(0.5)

	this.addLight(this.logo, -179, -92)
	this.addLight(this.logo, 163, -92)
	this.addLight(this.logo, -179, 75)
	this.addLight(this.logo, 163, 75)
	this.addLight(this.logo, 74, -84)

	// Tip of the day
	var tips = ["The red button in the lower left corner clears current word.",
		    "Gold boxes are worth three times normal!",
		    "Silver boxes are worth twice as much as regular boxes!",
		    "Multiboxes multiplies the whole word two or three times!!",
		    "Bomb boxes are always worth 0 points.",
		    "The frequency of box drops is logarithmic",
		    "Bombs destroys the closest boxes without granting you any points.",
		    "You can use several multi boxes at a time!",
		    "Hi mom!",
		    "Big boxes, balls and suitcases works like the common boxes"]
	var style = { font: "22px Arial", fill: "#EEEEEE"}
	this.tipHeader = this.game.add.text(this.game.world.centerX,
					    this.logo.bottom + 50,
					    "Random Tip:",
					    style)
	this.tipHeader.anchor.setTo(0.5, 1)
	this.tipHeader.fontWeight = 'bold';
	this.tipHeader.stroke = '#000000';
	this.tipHeader.strokeThickness = 3;

	var style = { font: "22px Arial", fill: "#EEEEEE", wordWrap: true, wordWrapWidth: this.game.world.width - 40 };
	this.tip = this.game.add.text(this.game.world.centerX,
				      this.tipHeader.bottom,
				      "\"" + Phaser.ArrayUtils.getRandomItem(tips) + "\"",
				      style)
	this.tip.fontWeight = 'italic';
	this.tip.stroke = '#000000';
	this.tip.strokeThickness = 3;

	this.tip.anchor.setTo(0.5, 0)

	// Buttons
	this.boxes = 0
	this.addMenuButton("PLAY", 'Tutorial')
	this.addMenuButton("CREDITS", 'Credits')

	var allWords = JSON.parse(localStorage.getItem('Stats-' + this.game.language))
	if( allWords && allWords.length > 100)
	    this.addMenuButton("STATS", 'Stats')

	this.addMenuButton("LANGUAGE", 'LangMenu')

	// Sound buttons
	this.game.masterMute = !JSON.parse(localStorage.getItem('master-mute'))
	this.masterMuteButton = this.game.add.sprite(10, this.game.height - 50, 'sprites', 'sound')
	this.toggleMasterMute()
	this.masterMuteButton.inputEnabled = true
	this.masterMuteButton.events.onInputDown.add(this.toggleMasterMute, this)

	this.game.music = this.game.add.audio('music')
	if(!this.game.music.isPlaying)
	    this.game.music.play("", 0, 0.5, true)

	this.game.music.mute = !JSON.parse(localStorage.getItem('music-mute'))
	this.musicMuteButton = this.game.add.sprite(70, this.game.height - 50, 'sprites', 'music')
	this.toggleMusicMute()
	this.musicMuteButton.inputEnabled = true
	this.musicMuteButton.events.onInputDown.add(this.toggleMusicMute, this)

	var style = { font: "20px Arial", fill: "#F0FFF0"}
	this.version = this.game.add.text(this.game.width-5,
					  this.game.height-5,
					  this.game.version,
					  style)
	this.version.anchor.setTo(1, 1)
    },
    addLight: function(parent, x, y) {
	var light = this.game.add.sprite(x, y, 'sprites', 'lamp-off')
	parent.addChild(light)

	var speed = this.game.rnd.integerInRange(3, 6)
	light.animations.add('blink', ['lamp-off', 'lamp-on'], speed, true);
	light.animations.play('blink');
    },
    addMenuButton: function (text, next_state) {

	var choice = new TextButton(this.game,
				    text, this.game.world.centerX,
				    430 + (this.boxes * 90),
				    this.startState,
				    this)
	choice.button.state = next_state

	this.boxes++

	return choice
    },
    toggleMasterMute: function() {
	this.game.masterMute = !this.game.masterMute
	if( this.game.masterMute )
	    this.masterMuteButton.frameName = 'sound-pressed'
	else
	    this.masterMuteButton.frameName = 'sound'

	localStorage.setItem('master-mute', JSON.stringify(this.game.masterMute));
    },
    toggleMusicMute: function() {
	this.game.music.mute = !this.game.music.mute
	if( this.game.music.mute )
	    this.musicMuteButton.frameName = 'music-pressed'
	else
	    this.musicMuteButton.frameName = 'music'

	localStorage.setItem('music-mute', JSON.stringify(this.game.music.mute));
    },
    startState: function (button) {
	// start the Game state
	this.state.start(button.state);
    },
};
