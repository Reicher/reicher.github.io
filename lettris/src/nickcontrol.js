NickControl = function (game, x, y, letter) {
    Phaser.Group.call(this, game);
    this.x = x
    this.y = y

    this.alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(letter)
	this.letter_index = this.alph.indexOf(letter)
    else
	this.letter_index = 0
    this.letter = this.alph[this.letter_index]

    var up = game.add.button(0, -76, 'sprites', this.up, this, 'arrow', 'arrow', 'arrow-pressed')
    up.anchor.setTo(0.5)
    this.add(up)

    var down = game.add.button(0, 76, 'sprites', this.down, this, 'arrow', 'arrow', 'arrow-pressed')
    down.scale.setTo(1, -1)
    down.anchor.setTo(0.5)
    this.add(down)

    this.create(0, 0, 'sprites', 'box').anchor.setTo(0.5)

    var style = { font: "50px Verdana", fill: "#EEEEEE" }
    this.letter_text = game.add.text(0, 4, this.letter, style)
    this.letter_text.fontWeight = 'bold';
    this.letter_text.stroke = '#000000';
    this.letter_text.strokeThickness = 3;

    var style = { font: "40px Verdana", align: "center" };

    this.letter_text.anchor.setTo(0.5)
    this.add(this.letter_text)
}

NickControl.prototype = Object.create(Phaser.Group.prototype)
NickControl.prototype.constructor = NickControl

NickControl.prototype.up = function (box) {
    this.letter_index++
    this.resetText(box)
}

NickControl.prototype.down = function (box) {
    this.letter_index--
    this.resetText(box)
}

NickControl.prototype.resetText = function (box){
    this.letter_index = ((this.letter_index%this.alph.length)
			 +this.alph.length)%this.alph.length;
    this.letter = this.alph[this.letter_index]
    this.letter_text.setText(this.letter)
}
