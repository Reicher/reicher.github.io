BallBox = function (game, id, tile, x, y) {
    Box.call(this, game, id, 'ball-box', tile.letter, tile.points, 1, 1, x, y)
    this.body.setCircle(this.width/2);

    Box.prototype.setCoolRemove.call(this, "ball-break", 3, ['ball-piece-red',
							     'ball-piece-redyellow',
							     'ball-piece-yellow',
							     'confetti-blue',
							     'confetti-red',
							     'confetti-green',
							     'confetti-yellow'])
}

BallBox.prototype = Object.create(Box.prototype);
BallBox.prototype.constructor = BallBox;
