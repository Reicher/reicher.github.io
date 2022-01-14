People = function (game, asset) {
    // Random sprite
    bmd = game.make.bitmapData(128, 48);
    var spriteSheets =['folk1', 'folk2', 'folk3', 'folk4'];
    bmd.load(game.rnd.pick(spriteSheets));

    // Skin tone
    var Tones =[{r: 68, g: 0, b: 0},
                {r: 255, g: 195, b: 170},
                {r: 165, g: 87, b: 51},
                {r: 227, g: 161, b: 115},
                {r: 225, g: 173,  b: 164}];
    var skinTone = game.rnd.pick(Tones);
    bmd.replaceRGB(123, 123, 123, 255,
        skinTone.r,skinTone.g, skinTone.b, 255);

    // Hair color
    var Hair =[{r: 44, g: 44, b: 44},
                {r: 180, g: 160, b: 160},
                {r: 230, g: 207, b: 168},
                {r: 185, g: 151,  b: 120},
                {r: 180, g: 80,  b: 50},
                {r: 145, g: 85,  b: 61}];
    var hairColor = game.rnd.pick(Hair);
    bmd.replaceRGB(0, 100, 200, 255,
      hairColor.r,hairColor.g, hairColor.b, 255);

    var height = 110 + game.rnd.integerInRange(0, 160);
    game.cache.addSpriteSheet('dynamic', '', bmd.canvas, 32, 48, 4, 0, 0);
    Phaser.Sprite.call(this, game, 0, height, 'dynamic');
    this.anchor.setTo(0.5);

    var tween;
    var speed = game.rnd.integerInRange(10000, 10000)
    // 50-50 går från höger eller vänster
    if( game.rnd.integerInRange(0, 1) ){ // vänster till höger
        this.scale.setTo(3, 3);
        this.x = -this.width/2;
        tween = game.add.tween(this).to({x: this.game.world.width + this.width/2}, speed, Phaser.Easing.Linear.None, false);
    }
    else{ // höger till vänster
        this.scale.setTo(-3, 3);
        this.x = game.width - (this.width/2);
        tween = game.add.tween(this).to({x: +this.width/2}, speed, Phaser.Easing.Linear.None, false);
    }

    this.animations.add('walking', [0, 1, 2, 3], speed/1500, true);

    // Remove sprite when tween is done
    tween.onComplete.add(function () {
        this.destroy();
    }, this);
    tween.start();

    // Trow stuff
    if(asset){
      asset.anchor.setTo(0.5);
      var timer = game.time.create(game);
      asset.visible = false; // hide it
      timer.add(game.rnd.integerInRange(0, speed), function () { this.throwAsset(asset) }, this);
      timer.start();
    }

    this.animations.play('walking');

    this.throwAsset = function(asset){
      asset.x = this.x;
      asset.y = this.y;
      asset.body.velocity.y = 150;
      asset.visible = true;

      if(asset.throwSound)
        asset.throwSound.play();
    };
};

People.prototype = Object.create(Phaser.Sprite.prototype);
People.prototype.constructor = People;
