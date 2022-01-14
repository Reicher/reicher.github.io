TS.Game = function(game){
	// define needed variables for TS.Game
	var player;
	var byPassers;

	var goodGroup;
	var badGroup;

	var clock;

	var coinSound1, coinSound2;
	var spitSound1, spitSound2;
	var curse;

};

TS.Game.prototype = {
	create: function(){

		// Add physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// display background
		var background = this.add.sprite(0, 0, 'background');
		background.scale.setTo(10, 10);

		this.coinSound1 = this.game.add.audio('coin1', 1, false);
		this.coinSound2 = this.game.add.audio('coin2', 1, false);
		this.spitSound1 = this.game.add.audio('spit1', 1, false);
		this.spitSound2 = this.game.add.audio('spit2', 1, false);
		this.curse  		= this.game.add.audio('curse', 1, false);

		// Player
		this.player = new Player(this.game);
		this.game.add.existing(this.player);

		// Clock (timer)
		this.clock = new Clock(this.game, 720, 50, 60000);
		this.game.add.existing(this.clock);

		// statusBox
		this.statusBox = new StatusBox(this.game, 20, 520, this.player.moneyGoal, this.player.maxHealth);
		this.game.add.existing(this.statusBox);

		// create group for good things
		this.goodGroup = this.game.add.group();
		this.goodGroup.enableBody = true;

		// Create group for all bad things
		this.badGroup = this.game.add.group();
		this.badGroup.enableBody = true;

		//  Start our folk-loop
		this.byPassers = this.game.add.group();
		this.createPeople();

		// Show stuff
		this.game.world.alpha = 255;
	},
	update: function(){

		if(	 this.player.wellbeing <= 0 || this.clock.timeUp )
			this.state.start('GameEnd', true, false, this.player.money >= this.player.moneyGoal);

		this.player.update();

		this.game.physics.arcade.overlap(	this.player,
																			this.goodGroup,
																			this.gotMoney,
																			null,
																			this);

		this.game.physics.arcade.overlap(	this.player,
																			this.badGroup,
																			this.gotHurt,
																			null,
																			this);
		// draw people on the right level
		this.byPassers.sort('y', Phaser.Group.SORT_ASCENDING);

	},
	createPeople: function(){
		var naughtiness = this.game.rnd.integerInRange(0, 100);
		var stuff;

		if(naughtiness > 90){ // Really bad persons throw bricks
			stuff = this.badGroup.create(0, 0, 'brick')
			stuff.effect = 3;
			this.game.add.tween(stuff).to({angle: '+360'}, 1000, Phaser.Easing.Linear.None, true, 0, -1, false);}
		else if(naughtiness > 80){ // Bad persons spit
			stuff = this.badGroup.create(0, 0, 'glob')
			stuff.effect = 2;
			if(Phaser.Math.chanceRoll())
				stuff.throwSound = this.spitSound1;
			else
				stuff.throwSound = this.spitSound2;
			}
		else if(naughtiness > 70){ // Many say bad things
			stuff = this.badGroup.create(0, 0, 'curse')
			stuff.effect = 1;
			stuff.throwSound = this.curse;}
		else if(naughtiness < 30){ // some are nice
			stuff = this.goodGroup.create(0, 0, 'peng');
			stuff.effect = this.game.rnd.integerInRange(1, 15);
		}

		var p = new People(this.game, stuff);
		this.game.add.existing(p);
		this.byPassers.add(p);

		var timer = this.game.time.create(this.game);
		timer.add(this.game.rnd.integerInRange(200, 1500), this.createPeople, this);
		timer.start();
	},
	gotMoney: function (player, money){
		this.player.money += money.effect;
		this.statusBox.setMoney(this.player.money);
		money.kill();

		if(Phaser.Math.chanceRoll())
			this.coinSound1.play();
		else
			this.coinSound2.play();

	},
	gotHurt: function (player, hurtingThing){
		this.player.wellbeing -= hurtingThing.effect;
		this.statusBox.setHealth(this.player.wellbeing);
		hurtingThing.kill();
	}
};
