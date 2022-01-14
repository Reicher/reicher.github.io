TS.GameEnd = function(game){
  var car;
};
TS.GameEnd.prototype = {
  init: function(goalReached){
    this.goalReached = goalReached;
  },
  create: function(){
    // display scrolling background
    this.background = this.add.tileSprite(800, 0, 160, 60, 'menuBackground');
    this.background.scale.setTo(-10, 10);

    var back = this.add.sprite(50, 80, 'statusBox');
    back.scale.setTo(5, 5);
    back.alpha = 0.9;

    var endText;
    var endExplaination;
    if(!this.goalReached){
      endText = this.add.text(300, 115, 'Ingen lycka denna gång!',{ font: "40px Arial"});
      endText.anchor.set(0.5);
      endExplaination = this.add.text(70, 160, 'Du forsätter på samma sätt i \nmånader och lyckas knappt försöja\ndig själv. Det är dags att åka hem\nför den här gången.', { font: "30px Marlett"} );
    }
    else{
      endText = this.add.text(300, 115, 'En lyckad resa!',{ font: "40px Arial"});
      endText.anchor.set(0.5);
      endExplaination = this.add.text(70, 160, 'Du fortsätter i samma stil och har\nefter en tid lyckats samlat ihop \nlite pengar.', { font: "30px Arial"} );
    }

    var restartText = this.add.text(300, 350, '(Tryck för att försöka igen)', { font: "20px Arial" });
    restartText.anchor.set(0.5);

    this.car = this.add.sprite(400, 270, 'carWorse');
    this.car.scale.setTo(4, 4);
    this.game.add.tween(this.car).to({y: '+4'}, 300, Phaser.Easing.Linear.None, true, 0, -1, true);

    this.game.input.onDown.add(this.startBack, this);
    this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.startBack, this);

  },
  restartGame: function() {
    this.game.world.alpha = 255;
    this.game.input.enabled = true;
    this.state.start('MainMenu');
  },
	update: function() {
		this.background.tilePosition.x -= 0.5;
	},
  startBack: function() {
    this.game.input.enabled = false;
    this.game.add.tween(this.car).to({x: -this.car.width}, 1500, Phaser.Easing.Quadratic.In, true, 200);

    // NO IDEA why the fade only works on main menu...
    var fadeTween = this.game.add.tween(this.game.world).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, false, 1200);
    fadeTween.onComplete.add(this.restartGame, this);
    fadeTween.start();

  }
};
