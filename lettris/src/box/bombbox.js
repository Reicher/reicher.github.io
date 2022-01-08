BombBox = function (game, id, tile, boxes, x, y) {
    Box.call(this, game, id, 'bomb-box1', tile.letter, 0, 1, 1, x, y)
    this.point_text.destroy()
    this.boxes = boxes

    var frames = Phaser.Animation.generateFrameNames('bomb-box', 1, 2)
    this.animations.add('pulse', frames, 5, true);
    this.animations.play('pulse');

    Box.prototype.setCoolRemove.call(this, "bomb-box-break", 3, ['screw1'])
}

BombBox.prototype = Object.create(Box.prototype);
BombBox.prototype.constructor = BombBox;

BombBox.prototype.remove = function (boom = true) {
    if(boom)
	this.BOOM()

    if(!this.game.masterMute){
	var sound = this.game.add.audio('boom', 0.5)
	sound.play()
    }

    Box.prototype.remove.call(this)
}

BombBox.prototype.BOOM = function (){
    for(var i=0;i<this.boxes.children.length;i++){
	var box = this.boxes.children[i]
	if(this.id == box.id)
	   continue

        var angle = this.position.angle(box);
	var dist = this.position.distance(box);
	var force = 15000 / Math.pow(dist, 2)

	if( dist < 120)
	    box.remove(false)

	box.body.applyImpulseLocal([Math.cos(angle) * force * box.body.mass,
				    Math.sin(angle) * force * box.body.mass],
				   box.x,
				   box.y)

	// For screen shake
	this.game.camera.shake(0.03, 200);
    }
}
