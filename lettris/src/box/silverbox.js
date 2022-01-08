SilverBox = function (game, id, tile, x, y) {
    Box.call(this, game, id, 'silver-box', tile.letter, tile.points, 2, 1, x, y)

    Box.prototype.setCoolRemove.call(this, "silver-box-break", 3, ['silver-board1',
								   'silver-board2',
								   'screw1',
								   'confetti-blue'])
}

SilverBox.prototype = Object.create(Box.prototype);
SilverBox.prototype.constructor = SilverBox;
