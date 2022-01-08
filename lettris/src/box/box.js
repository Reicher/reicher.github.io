Box = function (game, id, key, letter, points, local_multi, multi, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'sprites', key)

    this.id = id
    this.marked = false
    this.anchor.setTo(0.5)
    this.key = key
    this.base_points = points
    this.points = points * local_multi
    this.multi = multi

    // set random position if there is no position
    while(!x || !y){
	x = game.rnd.integerInRange(this.width/2 + 1,
				    game.width - this.width/2 - 1)
	y = -this.width/2
    }
    this.x = x
    this.y = y

    // Physics
    game.physics.p2.enable(this)
    this.body.collideWorldBounds = true

    // For having box collisions sound, doesnt work very well...
    //this.body.onBeginContact.add(this.collision, this);

    // Sound
    this.smash_sound = this.game.add.audio('smash');

    // letter text
    var style = { font: "50px Verdana", fill: "#EEEEEE" }
    this.text = this.game.add.text(0, 2, letter, style)
    this.text.fontWeight = 'bold';
    this.text.stroke = '#000000';
    this.text.strokeThickness = 3;
    this.text.anchor.setTo(0.5)
    this.addChild(this.text)

    // points text
    var style = { font: "20px Arial", fill: "#EEEEEE" }
    this.point_text = this.game.add.text(this.text.right+15,
					 this.text.bottom+7,
					 this.points,
					 style)
    this.point_text.fontWeight = 'bold';
    this.point_text.stroke = '#000000';
    this.point_text.strokeThickness = 3;
    this.point_text.anchor.setTo(1, 1)
    this.text.addChild(this.point_text)

    // Interaction
    this.inputEnabled = true;
    this.events.onInputDown.add(this.onDown, this)
    this.events.onInputUp.add(this.onUp, this)
    this.clicked = new Phaser.Signal()
}

Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor = Box;

Box.prototype.onUp = function () {
    this.clicked.dispatch(this)
}

Box.prototype.onDown = function () {
    this.mark( !this.marked )
}

Box.prototype.mark = function (mark) {
    if( mark ){
	this.tint = 0xe0e000

	var border = 10
	var emitter = this.game.add.emitter(this.x+border,
					    this.y+border,
					    10);
	emitter.width = this.width - (border*2)
	emitter.height = this.height - (border*2)
	emitter.makeParticles(['sprites'], ['spark1', 'spark2', 'spark3', 'confetti-yellow']);
	emitter.maxParticleSpeed.setTo(1, 1);
	emitter.start(false, 300, 10, -1);
	this.select_emitter = emitter;
    }
    else{
	this.tint = 0xFFFFFF // White
	this.select_emitter.destroy()
    }

    this.marked = mark
}

Box.prototype.spitParticles = function (sprites){
    // Particles!
    var lifetime = 5000
    var particles = 10
    var emitter = this.game.add.emitter(this.x - this.width/2 , this.y - this.height/2, particles);
    emitter.width = this.width
    emitter.height = this.height

    emitter.makeParticles(['sprites'], sprites);
    emitter.gravity = 200;

    emitter.start(true, lifetime, null, particles);
    this.game.time.events.add(lifetime, function () { emitter.destroy(); }, this);
}

Box.prototype.setCoolRemove = function (frame_name, num_frames, stuff) {
    this.frame_name = frame_name
    this.num_frames = num_frames
    this.stuff = stuff
}

Box.prototype.remove = function () {

    this.text.destroy()
    this.point_text.destroy()

    // Animation
    var frames = Phaser.Animation.generateFrameNames(this.frame_name, 1, this.num_frames)
    this.animations.add('break', frames, 10);
    this.animations.play('break')
    this.animations.currentAnim.onComplete.addOnce(function () {
    	this.destroy()
    }, this);

    // Particles!!
    Box.prototype.spitParticles.call(this, this.stuff);
}

Box.prototype.update = function() {
    var border = 10
    if(this.marked){
	this.select_emitter.x = this.x+border
	this.select_emitter.y = this.y+border
    }

    if(this.body.y >= 0 && this.body.velocity.y < 0)
	this.body.velocity.y = 0
}

Box.prototype.collision = function(body1, body2, shape, equation) {

    var body = !body1 ? body2 : body1

    var v = body.velocity.y;
    var m = body.mass;

    //calculate momentum
    var momentum = m*v;

    // Calculate volume
    var vol = Math.abs(momentum / 400)

    if(vol > 0.05 && !this.game.masterMute)
	this.smash_sound.play('', 0, vol)
}
