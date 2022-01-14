/* globals __DEV__ */
import Phaser from 'phaser'
import Snatris from '../snatris'
import {
    setResponsiveWidth
} from '../utils'

export default class extends Phaser.State {
    init() {}
    preload() {}

    create() {
        this.graphics = this.game.add.graphics(0, 0);
        this.border = {
            x: 30,
            y: 30,
            w: this.game.width - 30,
            h: this.game.height - 30
        }

        this.snatris = new Snatris(this.game, this.game.world.centerX, this.game.height * 0.9)
        this.game.add.existing(this.snatris)

        // Keyboard+Mouse input
        game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.snatris.confirmPlacement, this.snatris)
        this.cursors = game.input.keyboard.createCursorKeys()
        this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.TouchDown = false;

        this.score = 0;
        this.ScoreText = this.game.add.text(this.game.world.width - 130, 6, "Score: " + this.score, {
            font: "20px Arial",
            fill: "#FFFFFF",
            align: "left"
        });

        this.drawBorder();
    }

    drawBorder() {
        this.graphics.lineStyle(1, 0xFFFFFF, 0.3);
        this.graphics.moveTo(this.border.x, this.border.y)
        this.graphics.lineTo(this.border.w, this.border.y)
        this.graphics.lineTo(this.border.w, this.border.h)
        this.graphics.lineTo(this.border.x, this.border.h)
        this.graphics.lineTo(this.border.x, this.border.y)
    }

    update() {
        if (!this.snatris.alive) {
            this.ScoreText.alpha = 0;
            this.state.start('GameOver', false, false, this.score)
        }

        if (!this.snatris.isInside(this.border.x, this.border.y, this.border.w, this.border.h))
            this.snatris.complete();

        // Cursors
        if (this.cursors.left.isDown || this.leftKey.isDown)
            this.snatris.rotatePreview(-4)
        else if (this.cursors.right.isDown || this.rightKey.isDown)
            this.snatris.rotatePreview(4)

        // TOUCH
        if (game.input.activePointer.isDown && !this.TouchDown)
            this.TouchDown = true;
        else if (game.input.activePointer.isDown)
            this.snatris.rotatePreview(game.input.speed.x + game.input.speed.y);
        else if (this.TouchDown) {
            this.snatris.confirmPlacement();
            this.TouchDown = false;
        }

        this.score = this.snatris.links.length-1;
        this.ScoreText.setText("Score: " + this.score);
    }
}
