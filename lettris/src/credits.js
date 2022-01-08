Lettris.Credits = function(game){

};
Lettris.Credits.prototype = {
    create: function(){
	this.game.add.sprite(0, 0, 'sprites', 'background');

	this.logo = this.game.add.sprite(this.game.width/2, 140, 'sprites', 'logo')
	this.logo.anchor.setTo(0.5)

	this.category(this.logo.bottom+50,
		      "Programming", //Programming?
		      ["Robin Reicher", "Magnus Malm", "Andreas Galic"])

	this.category(this.logo.bottom+200,
		      "Graphics and sound",
		      ["David Levi"])

	this.category(this.logo.bottom+300,
		      "Special Thanks",
		      ["Betatesters!",
		       "\"Fru\" och barn",
		       "Fröken Lind"])

	new TextButton(this.game, "Back",
		       this.game.world.centerX,
		       this.game.height-50,
		       this.back,
		       this)
    },
    category: function(y, title, names) {
	var header_style = { font: "30px Verdana",
			     fontWeight: 'bold',
			     stroke: '#000000',
			     strokeThickness: 2,
			     fill: "#EEEEEE",
			     align: "center"};

	var name_style = { font: "25px Verdana",
			     fontWeight: 'italic',
			     stroke: '#000000',
			     strokeThickness: 2,
			     fill: "#EEEEEE",
			   align: "center"};

	var header = this.game.add.text(this.game.world.centerX,
					y,
					title,
					header_style)
	header.anchor.setTo(0.5)

	for(i = 0; i < names.length; ++i){
	    var cast = this.game.add.text(this.game.world.centerX,
					  header.bottom + 20 + i * 30,
					  names[i],
					  name_style)
	    cast.anchor.setTo(0.5)
	}

    },
    back: function() {
	this.state.start('MainMenu');
    }
};
