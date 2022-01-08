Lettris.Splash = function (game) {};

Lettris.Splash.prototype = {
    create: function () {
	this.logo = this.add.sprite(this.game.world.centerX,
				    this.game.world.centerY,
				    'sprites', 'tns-logo')
	this.logo.anchor.setTo(0.5)
	this.logo.alpha = 0
	var intro_sound = this.game.add.audio('intro');
	if(!this.game.masterMute)
	    intro_sound.play()

	// Start fade in of TNS logo
	let fadeInTween = this.game.add.tween(this.logo).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true)
	fadeInTween.onComplete.add(()=>{
	    // Wait one second with full alpha
	    this.game.time.events.add(Phaser.Timer.SECOND * 1, ()=>{
		// Start to fade out
		let fadeOutTween = this.game.add.tween(this.logo).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true)
		fadeOutTween.onComplete.add(()=>{
		    this.state.start('LangMenu')
		}, this)
	    }, this)
	})

	this.game.input.onDown.add(()=>{
	    intro_sound.stop()
            this.state.start('LangMenu')
	}, this)
    }
}
