WideBox = function (game, id, tile, x, y) {
    Box.call(this, game, id, 'wide-box', tile.letter, tile.points, 1, 1, x, y)
    Box.prototype.setCoolRemove.call(this, "wide-box-break", 3, ['suitcase-piece1',
						       'suitcase-piece2',
						       'suitcase-piece3',
						       'tophat',
						       'wand',
						       'boxershorts',
						       'bowtie',
						       'book'])
}

WideBox.prototype = Object.create(Box.prototype);
WideBox.prototype.constructor = WideBox;
