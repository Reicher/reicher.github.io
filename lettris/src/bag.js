Bag = function (game, boxes) {
    this.game = game
    this.tiles = []
    this.id = 0
    this.boxes = boxes

    var file = game.cache.getJSON('let')
    this.json = file.letters
}

Bag.prototype.fill = function () {
    for (var key in this.json)
	for( i = 0; i < this.json[key].tiles; ++i)
	    this.tiles.push({letter: key.toUpperCase(),
			     points: this.json[key].points})
}

Bag.prototype.getTile = function () {
    if( this.tiles.length < 1 )
	this.fill()

    return Phaser.ArrayUtils.removeRandomItem(this.tiles)
}

Bag.prototype.placeBox = function (x, y) {
    var tile = this.getTile()
    var box = new StandardBox(this.game, this.id++, tile, x, y)
    this.boxes.add(box)
    return box
}

Bag.prototype.getBox = function (gameData) {

    var karma = gameData.karma
    var level = gameData.level

    // Super Nice boxes
    if ( karma > 17 )
	return new TripleBox(this.game, this.id++)
    else if ( karma > 12 )
	return new DoubleBox(this.game, this.id++)

    // Nice boxes
    var tile = this.getTile()
    if ( karma > 7 )
    	return new GoldBox(this.game, this.id++, tile)
    else if ( karma > 3 )
    	return new SilverBox(this.game, this.id++, tile)

    // Bad Boxes
    var dice = this.game.rnd.integer()%10
    if ( dice == 1 && level > 3)
	return new BombBox(this.game, this.id++, tile, this.boxes)
    else if (dice == 2 && level > 2)
    	return new WideBox(this.game, this.id++, tile)
    else if (dice == 3 && level > 2)
	return new BallBox(this.game, this.id++, tile)
    else if (dice == 4 && level > 1)
    	return new BigBox(this.game, this.id++, tile)
    else  // Standard Box
	return  new StandardBox(this.game, this.id++, tile)
}

Bag.prototype.dropBox = function (gameData) {

    var box = this.getBox(gameData)

    this.boxes.add(box)
    return box
}
