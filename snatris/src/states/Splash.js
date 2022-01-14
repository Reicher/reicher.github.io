import Phaser from 'phaser'
import {
    centerGameObjects
} from '../utils'

export default class extends Phaser.State {
    init() {}

    preload() {
        this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY / 2, 'TNSlogo');
        centerGameObjects([this.logo])
    }

    create() {
        this.logo.alpha = 0;
        var fadeTween = this.game.add.tween(this.logo).to({
            alpha: 1
        }, 2000, Phaser.Easing.Linear.None, true, 1000);
        fadeTween.yoyo(true, 2000);
        fadeTween.onComplete.addOnce(this.showMainMenu, this);

        this.game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.addOnce(this.showMainMenu, this);
    }

    showMainMenu() {
        this.state.start('MainMenu')
    }
}
