StandardBox = function (game, id, tile, x, y) {
    Box.call(this, game, id, 'box', tile.letter, tile.points, 1, 1, x, y)

    Box.prototype.setCoolRemove.call(this, "box-break", 3, ['board1',
						  'board2',
						  'screw1'])
}

StandardBox.prototype = Object.create(Box.prototype);
StandardBox.prototype.constructor = StandardBox;
