BigBox = function (game, id, tile, x, y) {
    Box.call(this, game, id, 'big-box', tile.letter, tile.points, 1, 1, x, y)

    Box.prototype.setCoolRemove.call(this, "box-break", 3, ['board1',
							    'board2',
							    'screw1'])
}

BigBox.prototype = Object.create(Box.prototype);
BigBox.prototype.constructor = BigBox;
