Lettris.GameOver = function(game){

};
Lettris.GameOver.prototype = {
    init: function( gameData ) {
	this.score = gameData.score
	this.bestWord = gameData.best_word.word
	this.bestWordScore = gameData.best_word.score
	this.diff = gameData.diff
    },

    create: function(){
	console.log("Game over man!")
	ga('send', 'event', 'Lettris', 'game over', this.game.version);

	this.last_music_setting = this.game.music.mute
	this.game.music.mute = true

	this.ambient = this.game.add.audio('ambient')
	if(!this.game.music.mute)
	    this.ambient.play('', 0, 1, true)

	this.game.add.sprite(0, 0, 'sprites', 'background');
	var panel = this.game.add.sprite(50, 50, 'sprites', 'big-panel');
	panel.alpha = 0.9

	this.addLight(panel, 4, 3)
	this.addLight(panel, 360, 3)
	this.addLight(panel, 4, 698)
	this.addLight(panel, 360, 698)
	var logo = this.game.add.sprite(this.game.world.centerX, 60, 'sprites', 'game-over')
	logo.anchor.setTo(0.5)

	var tent_back = this.game.add.sprite(this.game.world.centerX,
					     220,
					     'sprites',
					     'point-tent')
	tent_back.anchor.setTo(0.5)

	var style = { font: "40px Arial", fill: "#EEEEEE" }
	var score_text = this.game.add.text(this.game.world.centerX,
					    270,
					    this.score,
					    style)
	score_text.anchor.setTo(0.5)
	score_text.fontWeight = 'bold';
	score_text.stroke = '#000000';
	score_text.strokeThickness = 3;

	this.curtain = this.game.add.sprite(this.game.world.centerX,
					     210,
					     'sprites',
					     'point-reveal1')
	this.curtain.anchor.setTo(0.5, 0)
	var curtain_frames = Phaser.Animation.generateFrameNames("point-reveal", 1, 10)
	this.curtain.animations.add('reveal', curtain_frames, 10, false)
	this.game.time.events.add(Phaser.Timer.SECOND * 1.5,
				  this.revealScore,
				  this)

	this.show_best_word()

	this.highscore_key = 'Lettris-best-' +
	    this.game.lang

	this.highscore = JSON.parse(localStorage.getItem(this.highscore_key));
	this.nick =localStorage.getItem('Nick')

	 // first time player
	if(!this.highscore)
	    this.highscore = []
	if(!this.nick)
	    this.nick = "AAA"

	if(this.diff == "Easy")
	    this.show_easy_mode()
	else if(this.highscore.length < 4 ||
	   this.highscore[this.highscore.length-1].score < this.score)
	    this.input_highscore()
	else{
	    this.show_highscore()
	    this.backButton.enable(false)
	    this.game.time.events.add(Phaser.Timer.SECOND * 1.5,
				      function() {this.backButton.enable(true)},
				      this)
	}
    },
    show_easy_mode: function (){

	var style = { font: "28px Verdana", fill: "#FFA90B", wordWrap: true, wordWrapWidth: 250}
	this.game.add.text(this.game.world.centerX,
			   600,
			   "(Highscore available on normal difficulty)",
			   style).anchor.setTo(0.5)


	this.backButton = new TextButton(this.game, "Main Menu",
					 this.game.world.centerX, 760,
					 this.leave, this)
    },
    revealScore: function() {
	var fanfare = this.game.add.audio('fanfare')
	this.curtain.animations.play('reveal')
	if(!this.game.masterMute)
	    fanfare.play()

    },
    addLight: function(parent, x, y) {
	var light = this.game.add.sprite(x, y, 'sprites', 'lamp-off')
	parent.addChild(light)

	var speed = this.game.rnd.integerInRange(3, 6)
	light.animations.add('blink', ['lamp-off', 'lamp-on'], speed, true);
	light.animations.play('blink');
    },
    show_best_word: function() {
	var style = { font: "30px Arial", fill: "#EEEEEE" }
	var header = this.game.add.text(this.game.world.centerX,
					340,
					"Best Word",
					style)
	header.anchor.setTo(0.5)
	header.fontWeight = 'bold';
	header.stroke = '#000000';
	header.strokeThickness = 3;

	var text = ""
	var leter = ""
	for(var i = 0; i < this.bestWord.length; ++i){
	    letter = this.bestWord[i].letter
	    if(letter.length == 1)
		text += letter
	}
	var panel = new MiniPanel(this.game,
				  text,
				  this.game.world.centerX,
				  390)
    },
    input_highscore: function() {
	this.game.time.events.add(Phaser.Timer.SECOND * 1.5, function() {
	    new Rocket(this.game,
		       {x: this.game.world.centerX, y: 900},
		       {x: 100, y: 100}, 1400)
	    new Rocket(this.game,
		       {x: this.game.world.centerX, y: 900},
		       {x: 250, y: 150}, 1200)
	    new Rocket(this.game,
		       {x: this.game.world.centerX, y: 900},
		       {x: 400, y: 75}, 1700)
	}, this)
	// Controlls
	this.letter = []
	this.letter[0] = new NickControl(this.game, this.game.world.centerX - 100, 590, this.nick[0])
	this.letter[1] = new NickControl(this.game, this.game.world.centerX, 590, this.nick[1])
	this.letter[2] = new NickControl(this.game, this.game.world.centerX + 100, 590, this.nick[2])

	this.submit = new TextButton(this.game, "Submit",
				    this.game.world.centerX, 760,
				    this.addHighscore, this)
	this.submit.enable(false)

	this.game.time.events.add(Phaser.Timer.SECOND * 1.5,
				  function() {this.submit.enable(true)},
				  this)


    },
    addHighscore: function(){
	var nick = this.letter[0].letter + this.letter[1].letter + this.letter[2].letter
	var date = new Date();
	var now = date.getDate() + '/' + (date.getMonth()+1)
	var max_id = Math.max.apply(Math, this.highscore.map(function(entry){return entry.id;}))
	var id = isNaN(max_id) || !isFinite(max_id) ? 0 : max_id+1
	this.highscore.push({nick: nick, score: this.score, date: now, id: id})

	this.highscore.sort(function (a, b) {
	    return a.score < b.score;
	});
	this.highscore = this.highscore.slice(0, 4);

	this.submit.destroy()
	this.letter.forEach(function(letter) {
	    letter.destroy();
	});
	localStorage.setItem(this.highscore_key, JSON.stringify(this.highscore));
	localStorage.setItem("Nick", nick);

	this.show_highscore(id)
    },
    show_highscore: function (id) {
	var style = { font: "25px Verdana", fill: "#FFA90B"}
	this.game.add.text(this.game.world.centerX,
			   450,
			   "High score (" + this.game.language + ")",
			   style).anchor.setTo(0.5)

	var header = this.game.add.text(this.game.world.centerX,
					480,
					"Nick  |  Score  |  Date",
					style)
	header.anchor.setTo(0.5)

	let underline = this.game.add.graphics(header.left, header.bottom -3);
	underline.lineStyle(2, 0x995908);
	underline.moveTo(0, 0);
	underline.lineTo(header.width, 0);

	for( var i = 0; i < this.highscore.length; ++i){
	    if(this.highscore[i].id == id) // if current highscore
		style = { font: "25px Verdana", fill: "#ffd700"}
	    else
		style = { font: "25px Verdana", fill: "#FFA90B"}

	    var y = 510 + (i * 40)
	    this.game.add.text(header.left, y, this.highscore[i].nick, style)
	    this.game.add.text(this.game.world.centerX, y, this.highscore[i].score, style).anchor.setTo(0.5, 0)
	    this.game.add.text(header.right, y, this.highscore[i].date, style).anchor.setTo(1, 0)
	}

	// Share score!
	var share_score = this.game.add.text(120,
					this.game.height-120,
					"Share on: ",
					     style)

	var face = this.game.add.sprite(260,
					this.game.height-125,
					'sprites',
					'face')
	face.inputEnabled = true;
	face.events.onInputDown.add(function(){
	    window.open("https://www.facebook.com/sharer/sharer.php?u=http://trans-neptunian-studios.com/games/Lettris/&quote=I just got " + this.score + " points in the amazing game of Lettris.")
	}, this);

	var twitt = this.game.add.sprite(310,
					 this.game.height-125,
					 'sprites',
					 'twitter')
	twitt.inputEnabled = true
	twitt.events.onInputDown.add(function(){
	    window.open("https://twitter.com/intent/tweet?&text=" +
			"I just got " + this.score +
			" points in the amazing game of Lettris. http://trans-neptunian-studios.com/games/Lettris/")
	}, this)

	this.backButton = new TextButton(this.game, "Main Menu",
					 this.game.world.centerX, 760,
					 this.leave, this)
    },
    leave: function() {
	this.game.music.mute = true
	this.ambient.stop()
        this.state.start('MainMenu')
    },
};
