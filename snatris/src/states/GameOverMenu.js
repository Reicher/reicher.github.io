/* globals __DEV__ */
import Phaser from 'phaser'
import {
  setResponsiveWidth
}
from '../utils'

export default class extends Phaser.State {
  init(score) {
    this.finalScore = score

    this.Bad = ["Meh", "Eh?", "Hah!", "Shameful", "N00b"]
    this.Mediocre = ["Not bad", "Pretty cool", "Kinda neat", "Mediocre"]
    this.Good = ["Amazing!", "Fabulous!", "Awesome!!"]
    this.Best = ["Whoa dude!!", "Damn Son!!", "Sweet baby Jebus!", "My god, it's full of stars"]
  }
  preload() {}

  create() {
    var sorryText = this.game.add.text(this.game.world.centerX, this.game.world.height / 2 + 3, "Snatris Constellation Complete", {
      font: "20px Arial",
      fill: "#FFFFFF"
    });
    sorryText.alpha = 0;
    sorryText.anchor.set(0.5, 1);

    this.firstTween = game.add.tween(sorryText).to({
      alpha: 1
    }, 1000, Phaser.Easing.Linear.None, true);
    this.firstTween.onComplete.addOnce(() => {
      this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.addOnce(this.showScore, this);
      this.game.input.onDown.addOnce(this.showScore, this);
    }, this)
  }

  getReaction(score) {
    if (score > 55)
      return this.game.rnd.pick(this.Best)
    else if (score > 35)
      return this.game.rnd.pick(this.Good)
    else if (score > 20)
      return this.game.rnd.pick(this.Mediocre)
    else
      return this.game.rnd.pick(this.Bad)
  }

  update() {}

  showScore() {
    var toScoreTween = this.game.add.tween(this.camera).to({
      y: this.game.height
    }, 400, Phaser.Easing.Quadratic.InOut, true, 200);

    var Score = this.game.add.text(this.game.world.centerX, this.game.world.height*0.65, "Final Score: " + this.finalScore, {
      font: "50px Arial",
      fill: "#FFFFFF"
    });
    Score.anchor.set(0.5);

    var reaction = this.game.add.text(this.game.world.centerX, this.game.world.height*0.7, this.getReaction(this.finalScore), {
      font: "35px Arial",
      fill: "#FFFFFF",
      fontStyle: "Italic"
    });
    reaction.anchor.set(0.5);

    var bestScore = localStorage.getItem('SnatrisBest');
    bestScore = !bestScore ? 0 : bestScore
    var OldScore = this.game.add.text(this.game.world.centerX, this.game.world.height*0.97, "Old personal best: " + bestScore, {
      font: "20px Arial",
      fill: "#FFFFFF"
    });
    OldScore.anchor.set(0.5);

    if (this.finalScore > bestScore) {
      localStorage.setItem('SnatrisBest', this.finalScore);
      var highscoreText = this.game.add.text(this.game.world.centerX, this.game.world.height*0.88, "New personal best!", {
        font: "20px Arial",
        fill: "#FFFFFF"
      });
      highscoreText.anchor.set(0.5);
    }

    toScoreTween.onComplete.addOnce(() => {
      this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.addOnce(this.toMainMenu, this);
      this.game.input.onDown.addOnce(this.toMainMenu, this);
    }, this)
  }

  toMainMenu() {
    this.state.start('MainMenu');
  }

  render() {}
}
