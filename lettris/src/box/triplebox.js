TripleBox = function (game, id, x, y) {
    Box.call(this, game, id, 'multi-box', "x3", 0, 0, 3, x, y)
    this.point_text.destroy()
    this.text.fontSize = "30px"

    // Create a new prism shape, specified from bottom right, counter-clockwise (?!)
    this.body.clearShapes();
    this.body.addPolygon( {} , [ [74, 38]  ,  [38, 0],  [0, 38]  ,  [38, 74] ]);

    this.anchor.setTo(0.5) // anchor gets fucked up after clear shape

    Box.prototype.setCoolRemove.call(this, "multi-box-red-break", 3, ['confetti-red'])
}

TripleBox.prototype = Object.create(Box.prototype);
TripleBox.prototype.constructor = TripleBox;
