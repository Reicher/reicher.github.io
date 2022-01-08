Lettris.LangMenu = function (game) {};

Lettris.LangMenu.prototype = {
    create: function () {
	this.game.add.sprite(0, 0, 'sprites', 'background');

	var style = { font: "40px Verdana",
		      fontWeight: 'bold',
		      stroke: '#000000',
		      strokeThickness: 4,
		      fill: "#EEEEEE",
		      align: "center"};

	var text = this.game.add.text(this.game.world.centerX, 120, "Dictionary Language", style)
	text.anchor.setTo(0.5)

	this.boxes = 0
	this.addLangBox('ENGLISH', 'eng')
	this.addLangBox('SVENSKA', 'swe')
    },
    addLangBox: function(text, lang) {

	var b = new TextButton(this.game,
			       text, this.game.world.centerX,
			       230 + (this.boxes * 140),
			       this.loadLang,
			       this)
	b.button.lang = lang
	b.button.text = text
	this.boxes++

    },
    loadLang: function (b) {
	b.parent.text.setText("Loading")

	var path = 'assets/lang/' + b.lang + '/'
	this.game.load.json('let', path + 'letters.json')
	this.game.load.json('dic', path + 'dictionary.json')

	this.game.lang = b.lang
	this.game.language = b.text
	b.text = "Loading"

	this.game.load.start()
	this.game.load.onLoadComplete.add(this.start, this);
    },
    start: function() {
	this.state.start('MainMenu');
    }
};
