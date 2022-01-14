import Phaser from 'phaser'

export default class extends Phaser.Group {

  constructor(game, startX, startY) {
    super(game)

    this.game = game
    this.graphics = game.add.graphics(0, 0);
    this.alive = true;
    this.thickness = 1;

    this.links = [new Phaser.Point(startX, startY)]
    this.nextLinks = []

    // SOUNDS
    var masterVolume = 0.5
    this.confirmSounds = [game.add.audio('confirm1', masterVolume), game.add.audio('confirm2', masterVolume), game.add.audio('confirm3', masterVolume)]
    this.deathSound = game.add.audio('death', masterVolume)

    this.pieces = [
            [new Phaser.Point(0, -50)],
            [new Phaser.Point(0, -100)],
            [new Phaser.Point(0, -50), new Phaser.Point(50, 0)],
            [new Phaser.Point(0, -50), new Phaser.Point(-50, 0)],
            [new Phaser.Point(-25, 0), new Phaser.Point(0, -50)],
            [new Phaser.Point(25, 0), new Phaser.Point(0, -50)],
            [new Phaser.Point(0, -50), new Phaser.Point(-25, 0)],
            [new Phaser.Point(0, -50), new Phaser.Point(25, 0)],
            [new Phaser.Point(0, -25), new Phaser.Point(-25, 0), new Phaser.Point(0, 25)],
            [new Phaser.Point(0, -25), new Phaser.Point(25, 0), new Phaser.Point(0, 25)],
            [new Phaser.Point(25, 0), new Phaser.Point(-25, -25), new Phaser.Point(25, 0)],
            [new Phaser.Point(-25, 0), new Phaser.Point(25, -25), new Phaser.Point(-25, 0)]
        ]

    this.previewPiece = this.pieces[0]
  }

  addLinks(relativeLinks, preview) {
    this.nextLinks = [];
    for (var i = 0; i < relativeLinks.length; i++) {
      var head = this.nextLinks.length != 0 ? this.nextLinks[this.nextLinks.length - 1] : this.links[this.links.length - 1]

      if (preview)
        this.nextLinks.push(new Phaser.Point(head.x + relativeLinks[i].x, head.y + relativeLinks[i].y))
      else
        this.links.push(new Phaser.Point(head.x + relativeLinks[i].x, head.y + relativeLinks[i].y))
    }
  }

// my god..
  flash(down) {
    var colorBlend = {
      step: 0
    };
    var colorTween = game.add.tween(colorBlend).to({
      step: 100
    }, 100, Phaser.Easing.Linear.None, true);

    if ( down ) {
      colorTween.onUpdateCallback(function() {
        this.graphics.tint = Phaser.Color.interpolateColor(0xffff00, 0xffffff, 100, colorBlend.step);
      }, this);
      game.add.tween(this).to({
        thickness: 1
      }, 200, Phaser.Easing.Linear.None, true);
    } else {
      colorTween.onUpdateCallback(function() {
        this.graphics.tint = Phaser.Color.interpolateColor(0xffffff, 0xffff00, 100, colorBlend.step);
      }, this);
      colorTween.onComplete.addOnce(function() {
        this.flash(true)
      }, this);
      game.add.tween(this).to({
        thickness: 5
      }, 200, Phaser.Easing.Linear.None, true);
    }
  }

  confirmPlacement() {
    this.addLinks(this.previewPiece)
    this.previewPiece = this.game.rnd.pick(this.pieces)
    this.addLinks(this.previewPiece, true)
    this.rotatePreview(this.game.rnd.integer() % 360)

    var confirm = this.game.rnd.pick(this.confirmSounds)
    confirm.play()
    this.flash();
  }

  rotatePreview(angle) {
    for (var i = 0; i < this.previewPiece.length; i++)
      this.previewPiece[i].rotate(0, 0, angle, true);
  }

  snakeify() {
    if (this.links.length < 2) // Dont run when the snatris is a dot
      return;

    // Remove links not needed any more
    if (Phaser.Point.distance(this.links[0], this.links[1], true) < 3) //Remove "dead" links
      this.links.shift();

    var tail = this.links[0]
    var head = this.links[this.links.length - 1]

    var dirTail = new Phaser.Point(tail.x - this.links[1].x, tail.y - this.links[1].y).normalize()
    tail.x -= dirTail.x
    tail.y -= dirTail.y

    // head moves 20 % faster than tail
    var dirHead = new Phaser.Point(this.links[this.links.length - 2].x - head.x, this.links[this.links.length - 2].y - head.y).normalize().multiply(1.2, 1.2)
    head.x -= dirHead.x
    head.y -= dirHead.y
  }

  checkCollision() {
    for (var i = 0; i < this.links.length - 1; i++) {
      for (var j = 0; j < this.links.length - 1; j++) {
        if (i == j)
          continue;

        var L1 = new Phaser.Line(this.links[i].x, this.links[i].y, this.links[i + 1].x, this.links[i + 1].y)
        var L2 = new Phaser.Line(this.links[j].x, this.links[j].y, this.links[j + 1].x, this.links[j + 1].y)
        var pointOfCollision = new Phaser.Point(0, 0);

        // this is fabolus
        if (L1.intersects(L2, true, pointOfCollision) &&
          Phaser.Point.distance(pointOfCollision, this.links[i], true) >= 4 &&
          Phaser.Point.distance(pointOfCollision, this.links[i + 1], true) >= 3) {
          return true;
        }
      }
    }
    return false;
  }

  //
  isInside(x, y, w, h) {
    for (var i = 0; i < this.links.length; i++) {
      if (this.links[i].x < x || this.links[i].x > w || this.links[i].y < y || this.links[i].y > h)
        return false;
    }
    return true;
  }

  complete() {
    this.alive = false;
    this.deathSound.play();
    this.reDraw(false)
  }

  reDraw(withPreview) {
    // main body
    this.graphics.clear()
    this.graphics.moveTo(this.links[0].x, this.links[0].y)
    for (var i = 1; i < this.links.length; i++) {
      this.graphics.lineStyle(this.thickness, 0xFFFFFF);
      this.graphics.lineTo(this.links[i].x, this.links[i].y);
    }

    // preview
    if (withPreview) {
      for (var i = 0; i < this.nextLinks.length; i++) {
        this.graphics.lineStyle(2, 0x3B9243);
        this.graphics.lineTo(this.nextLinks[i].x, this.nextLinks[i].y);
      }
    }
  }

  update() {
    if (!this.alive)
      return;

    this.addLinks(this.previewPiece, true)
    this.snakeify()
    this.reDraw(true)

    if (this.checkCollision())
      this.complete()
  }
}
