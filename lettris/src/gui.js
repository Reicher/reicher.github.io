GUI = function (game, gameData) {
    Phaser.Group.call(this, game);
    this.y = game.height-200

    this.dictionary = game.cache.getJSON('dic')
    this.gameData = gameData
    this.markedList = []

    // Sounds
    this.accept_sound = this.game.add.audio('accept')
    this.clear_sound = this.game.add.audio('clear')
    this.select_sound = this.game.add.audio('select')
    this.deselect_sound = this.game.add.audio('deselect')
    this.level_sound = this.game.add.audio('level')

    this.text_style = { font: "30px Verdana",
			fontWeight: 'bold',
			stroke: '#000000',
			strokeThickness: 2,
			fill: "#EEEEEE"};

    this.add(game.add.button(25, 22, 'sprites', this.clear, this, 'clear', 'clear', 'clear-pressed'))
    this.add(game.add.button(145, 22, 'sprites', this.accept, this, 'accept', 'accept', 'accept-pressed'))

    var panel  = this.create(0, 0, 'sprites', 'panel')

    this.addLight(panel, 3, 3)
    this.addLight(panel, 3, 107)
    this.addLight(panel, 3, 180)
    var interval = 105
    for(i = 0; i < 3; ++i){
	this.addLight(panel, 127 + i * interval, 3)
	this.addLight(panel, 127 + i * interval, 107)
	this.addLight(panel, 127 + i * interval, 180)
    }
    this.addLight(panel, this.game.width-20, 3)
    this.addLight(panel, this.game.width-20, 107)
    this.addLight(panel, this.game.width-20, 180)

    var style = { font: "25px Arial", align: "center" };
    this.levelText = game.add.text(90,
				   155,
				   "Level " + gameData.level,
				   style)
    this.levelText.anchor.setTo(0.5)
    this.add(this.levelText)

    this.scoreText = game.add.text(game.world.centerX,
				   155,
				   "0",
				   style)
    this.scoreText.anchor.setTo(0.5)
    this.add(this.scoreText)

    var word_style = { font: "40px Verdana", align: "center" };
    this.word = game.add.text(game.world.centerX-60,
    			      40, "", word_style)
    this.add(this.word)

    this.langText = game.add.text(game.world.width-90,
				  155,
				  this.game.language,
				  style)
    this.langText.anchor.setTo(0.5, 0.5)
    this.add(this.langText)

    var ws_style = { font: "20px Verdana", align: "center" };
    this.wordScore = game.add.text(5, -5, "", ws_style)
    this.word.addChild(this.wordScore)

    // Hotkeys
    var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    space.onDown.add(this.accept, this);

    var x = game.input.keyboard.addKey(Phaser.Keyboard.X)
    x.onDown.add(this.clear, this);

    // Signals
    this.word_accepted = new Phaser.Signal()
}

GUI.prototype = Object.create(Phaser.Group.prototype)
GUI.prototype.constructor = GUI

GUI.prototype.addLight = function(parent, x, y) {
    var light = this.game.add.sprite(x, y, 'sprites', 'lamp-off')
    parent.addChild(light)

    var speed = this.game.rnd.integerInRange(1, 3)
	light.animations.add('blink', ['lamp-off', 'lamp-on'], speed, true);
    light.animations.play('blink');
}

GUI.prototype.clear = function () {
    this.markedList.forEach(function(box) {
	box.mark(false)
    }, this);
    this.markedList = []
    this.word.text = ""
    if(!this.accept_sound.isPlaying && !this.game.masterMute)
	this.clear_sound.play()
}

GUI.prototype.accept = function () {

    var word = this.word.text.toLowerCase()

    // Check if word is in dictionary
    if(this.word.text.length < 2 ||
       this.dictionary.indexOf(word) == -1)
	return

    if(!this.game.masterMute)
	this.accept_sound.play()

    // Remove all word letters
    var info = []
    var full_word = ""
    this.markedList.forEach(function(box) {
	this.gameData.tiles_cleared++
	info.push({letter: box.text.text,
		   key: box.key,
		   points: box.points,
		   multi : box.multi,
		   base_points : box.base_points})
	box.remove()
	if(box.text.text.length == 1) // To remove x2/x3
	    full_word += box.text.text
    }, this);

    // Psychological EXPERIMENT
    var local_key = "Stats-" + this.game.language
    this.stats = JSON.parse(localStorage.getItem(local_key));
    if(!this.stats)
	this.stats = []
    this.stats.push(full_word)
    localStorage.setItem(local_key, JSON.stringify(this.stats));

    // Karma is given without multipliers
    this.gameData.karma += this.points / this.multi

    if( this.base_points > this.gameData.best_word.score){
	this.gameData.best_word.score = this.base_points
	this.gameData.best_word.word = info
    }

    this.gameData.score += this.points
    this.scoreText.setText(this.gameData.score)

    var level = 1 + Math.floor(this.gameData.tiles_cleared / 15)
    if(level > this.gameData.level) {
	this.gameData.level = level
	this.levelText.setText("Level " + this.gameData.level)
	if(!this.game.masterMute)
	    this.level_sound.play()
    }

    this.clear()

    this.word_accepted.dispatch()
}

GUI.prototype.box_clicked = function (box) {
    if( box.marked ){
	this.markedList.push(box)
	if(!this.game.masterMute)
	    this.select_sound.play()
    }
    else{
	var index = this.markedList.findIndex(b => b.id == box.id)
	this.markedList.splice(index, 1)
	if(!this.game.masterMute)
	    this.deselect_sound.play()
    }

    this.base_points = 0
    this.points = 0
    this.multi = 0
    this.word.text = ""
    this.word.fontSize = "40pt"
    this.markedList.forEach(function(b) {
	if(b.multi > 1)
	    this.multi += (b.multi)
	else
	    this.word.text += b.text.text

	this.points += b.points
    }, this)
    this.multi = this.multi == 0 ? 1 : this.multi
    this.base_points = this.points
    this.points *= this.multi

    // Keep even long words inside our box
    var size = this.word.fontSize.replace(/[^0-9\.]/g, '')
    while (this.word.width > 240)
	this.word.fontSize = --size + "pt"

    this.wordScore.x = this.word.width

    this.wordScore.text = ""
    if(this.multi > 1)
	this.wordScore.text += "x" + this.multi + "="
    this.wordScore.text += this.points
}
