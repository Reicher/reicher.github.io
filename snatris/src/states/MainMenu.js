/* globals __DEV__ */
import Phaser from 'phaser'
import {
  setResponsiveWidth
}
from '../utils'

export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {
    this.game.camera.setPosition(0, this.game.height);
    this.game.add.sprite(0, 0, 'background');

    console.log(this.game.width)

    this.title = this.game.add.sprite(this.game.world.centerX, this.game.world.height * 0.7, 'title');
    if(this.game.width < this.title.width)
      this.title.scale.setTo(0.5);

    this.startText = this.game.add.text(this.game.world.centerX, this.game.world.height * 0.965, "Press to start", {
      font: "20px Arial",
      fill: "#FFFFFF",
    });

    this.authorText = this.game.add.text(5, this.game.world.height - 15, "by Robin Reicher with art from Mikael Larsson & Johannes Carlsson", {
      font: "10px Arial",
      fill: "#FFFFFF"
    });

    this.versionText = this.game.add.text(this.game.world.width - 10, this.game.world.height - 15, "Version. 1.0.1", {
      font: "10px Arial",
      fill: "#FFFFFF"
    });
    this.versionText.anchor.set(1, 0);
    this.authorText.anchor.set(0, 0);
    this.startText.anchor.set(0.5);
    this.title.anchor.set(0.5);

    this.setMenuAlpha(0)

    var titleFade = this.game.add.tween(this.title).to({
      alpha: 1
    }, 800, Phaser.Easing.Linear.None, true, 200);
    titleFade.onComplete.addOnce(function() {
      this.setMenuAlpha(1)
    }, this);

    this.game.input.onDown.addOnce(this.startGame, this);
    this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.addOnce(this.startGame, this);
  }

  setMenuAlpha(alpha) {
    this.startText.alpha = alpha;
    this.versionText.alpha = alpha;
    this.authorText.alpha = alpha;
    this.title.alpha = alpha;
  }

  update() {}

  startGame() {
    this.toBoard = this.game.add.tween(this.camera).to({
      y: 0
    }, 800, Phaser.Easing.Quadratic.InOut, true, 200);
    this.toBoard.onComplete.addOnce(function() {
      this.state.start('Game', false, false)
      this.setMenuAlpha(0)
    }, this);
  }
}
