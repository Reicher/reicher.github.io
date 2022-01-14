import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
    init() {
        this.stage.backgroundColor = '#000000'
        this.fontsReady = false
        this.fontsLoaded = this.fontsLoaded.bind(this)
        this.game.world.setBounds(0, 0, this.game.world.width, this.game.world.height * 2)
    }

    preload() {
        WebFont.load({
            google: {
                families: ['Nunito']
            },
            active: this.fontsLoaded
        })

        let text = this.add.text(this.world.centerX, this.world.centerY / 2, 'loading stuff', {
            font: '16px Arial',
            fill: '#dddddd',
            align: 'center'
        })
        text.anchor.setTo(0.5, 0.5)

        // Loading ALL assets
        this.load.image('loaderBg', './assets/images/loader-bg.png')
        this.load.image('loaderBar', './assets/images/loader-bar.png')

        this.load.image('background', './assets/images/Background.png');
        this.load.image('TNSlogo', './assets/images/TNS_logo.png');
        this.load.image('title', './assets/images/title.png');


        this.load.audio('confirm1', './assets/audio/confirm1.wav')
        this.load.audio('confirm2', './assets/audio/confirm2.wav')
        this.load.audio('confirm3', './assets/audio/confirm3.wav')
        this.load.audio('death', './assets/audio/death.wav')
    }

    render() {
        if (this.fontsReady) {
            this.state.start('Splash')
        }
    }

    fontsLoaded() {
        this.fontsReady = true
    }
}
