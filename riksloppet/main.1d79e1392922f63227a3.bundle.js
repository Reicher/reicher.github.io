/*! For license information please see main.1d79e1392922f63227a3.bundle.js.LICENSE.txt */
(()=>{var e,s={135:(e,s,t)=>{"use strict";t(260);class i extends Phaser.Physics.Arcade.Sprite{constructor(e,s,t,i,a){super(e,s,t,i),this.max_speed=10,this.knocked_out=0,this.punch=!1,this.player=!1,a&&(this.cursors=a,this.setInteractive(),this.player=!0),e.add.existing(this),e.physics.add.existing(this),e.anims.create({key:"east",frameRate:10,frames:e.anims.generateFrameNumbers("annie_run",{start:0,end:11}),repeat:-1}),this.play("east")}playerControl(){console.log("topspeed: "+this.max_speed);let e=[0,0];this.cursors.left.isDown?e[0]=-1:this.cursors.right.isDown&&(e[0]=1),this.cursors.up.isDown?e[1]=-1:this.cursors.down.isDown&&(e[1]=1);let s=Math.abs(Math.sqrt(e[0]*e[0]+e[1]*e[1]));return 0==s&&(s=1),this.cursors.space.isDown?this.punch=!0:this.punch=!1,[e[0]/s*this.max_speed,e[1]/s*this.max_speed]}update(e,s){let t=[0,0];this.knocked_out>0?(t[0]=0,this.knocked_out-=s/1e3):this.player?t=this.playerControl():(t[0]=this.max_speed,t[1]=0),this.setVelocityX(t[0]*s),this.setVelocityY(t[1]*s),this.depth=this.y}}class a extends Phaser.Scene{constructor(){super({key:"MainScene"}),this.goal=1400}init(){this.WIDTH=this.sys.game.canvas.width,this.HEIGHT=this.sys.game.canvas.height,this.cameras.main.setBounds(0,0,this.goal,this.HEIGHT,!0),this.physics.world.setBounds(0,150,this.goal+100,this.HEIGHT-150),this.physics.world.setBoundsCollision(),this.add.tileSprite(0,0,this.goal,this.HEIGHT,"himmel").setOrigin(0).setScrollFactor(.6),this.add.tileSprite(0,0,this.goal,this.HEIGHT,"gata").setOrigin(0).setScrollFactor(1),this.spelare=new i(this,250,200,"vansterpartiet",this.input.keyboard.createCursorKeys());let e=[this.spelare,new i(this,150,200,"socialdemokraterna"),new i(this,50,200,"miljöpartiet"),new i(this,100,300,"sverigedemokraterna"),new i(this,200,300,"moderaterna"),new i(this,50,400,"liberalerna"),new i(this,150,400,"kristdemokraterna"),new i(this,250,400,"centern")];this.riksdagen=new Phaser.Physics.Arcade.Group(this.physics.world,this,e),this.riksdagen.children.each((e=>{e.setCollideWorldBounds(!0)})),this.updut=new Phaser.Physics.Arcade.Group(this.physics.world,this),this.neddut=new Phaser.Physics.Arcade.Group(this.physics.world,this),this.hinder=new Phaser.Physics.Arcade.Group(this.physics.world,this),this.hinder=new Phaser.Physics.Arcade.Group(this.physics.world,this);let s=this.add.tileSprite(0,this.HEIGHT-100,this.goal,this.HEIGHT,"förgrund2");s.setOrigin(0).setScrollFactor(1.5),s.depth=this.WIDTH+10;let t=this.add.tileSprite(0,this.HEIGHT-100,this.goal,this.HEIGHT,"förgrund1");t.setOrigin(0).setScrollFactor(2),t.depth=this.WIDTH+11}create(){console.log("Main Scene");for(let e=0;e<10;e++)this.updut.create(Phaser.Math.Between(this.WIDTH/2,this.goal),Phaser.Math.Between(140,this.HEIGHT),"peng").value=2,this.neddut.create(Phaser.Math.Between(this.WIDTH/2,this.goal),Phaser.Math.Between(140,this.HEIGHT),"neddut").value=2;for(let e=0;e<2;e++)this.hinder.create(Phaser.Math.Between(this.WIDTH/2,this.goal),Phaser.Math.Between(140,this.HEIGHT),"bil").setImmovable(!0);this.physics.add.collider(this.riksdagen,this.hinder)}update(e,s){let t=0,i=this.cameras.main.worldView.x;this.physics.world.overlap(this.riksdagen,this.updut,this.updutCollision),this.physics.world.overlap(this.riksdagen,this.neddut,this.neddutCollision),this.physics.world.overlap(this.riksdagen,this.kastbar,this.kastbarCollision),this.physics.world.overlap(this.riksdagen,this.riksdagen,this.riksdagskollision),this.riksdagen.children.each((a=>{a.update(e,s),a.x>t&&(t=a.x,this.cameras.main.centerOnX(t)),(i>a.x||a.x>this.goal)&&(this.riksdagen.remove(a,!0,!0),a.player&&this.scene.start("PostScene"))}))}updutCollision(e,s){e.max_speed+=s.value,s.destroy()}neddutCollision(e,s){e.max_speed-=s.value,s.destroy()}kastbarCollision(e,s){}riksdagskollision(e,s){e.punch&&(s.knocked_out=1)}}class r extends Phaser.Scene{constructor(){super({key:"PostScene"})}create(){console.log("Game over"),this.cursors=this.input.keyboard.createCursorKeys(),this.add.sprite(0,0,"postGame").setOrigin(0)}update(){this.cursors.space.isDown&&this.scene.start("TitleScene")}}class h extends Phaser.Scene{constructor(){super({key:"TitleScene"})}create(){console.log("PreGame"),this.cursors=this.input.keyboard.createCursorKeys(),this.add.sprite(0,0,"title").setOrigin(0)}update(){this.cursors.space.isDown&&this.scene.start("LevelSelectScene")}}class n extends Phaser.Scene{constructor(){super({key:"PreloadScene"})}preload(){this.load.spritesheet("annie_run","assets/img/Annie_spring-Sheet.png",{frameWidth:40,frameHeight:80}),this.load.image("gata","assets/img/Gata.png"),this.load.image("himmel","assets/img/Himmel och skyline.png"),this.load.image("förgrund1","assets/img/Förgrund1.png"),this.load.image("förgrund2","assets/img/Förgrund2.png"),this.load.image("splash","assets/img/splash.png"),this.load.image("title","assets/img/titel.png"),this.load.image("levelSetting","assets/img/levelSettings.png"),this.load.image("charSelect","assets/img/charSelect.png"),this.load.image("postGame","assets/img/postGame.png"),this.load.image("bil","assets/img/Blå bil.png"),this.load.image("peng","assets/img/Peng.png"),this.load.image("neddut","assets/img/neddut.png")}create(){console.log("PreLoad"),this.scene.start("MainScene")}}class o extends Phaser.Scene{constructor(){super({key:"SplashScene"}),this.fade_time=1e3}preload(){}create(){console.log("Splash"),this.add.sprite(0,0,"splash").setOrigin(0),this.cameras.main.once("camerafadeincomplete",(function(e){e.fadeOut(e.scene.fade_time)})),this.cameras.main.once("camerafadeoutcomplete",(function(e){e.scene.scene.start("TitleScene")})),this.cameras.main.fadeIn(this.fade_time)}}class c extends Phaser.Scene{constructor(){super({key:"LevelSelectScene"})}create(){console.log("LevelSelectScene"),this.cursors=this.input.keyboard.createCursorKeys(),this.add.sprite(0,0,"levelSetting").setOrigin(0)}update(){this.cursors.space.isDown&&this.scene.start("CharSelectScene")}}class l extends Phaser.Scene{constructor(){super({key:"CharSelectScene"})}create(){console.log("CharSelectScene"),this.cursors=this.input.keyboard.createCursorKeys(),this.add.sprite(0,0,"charSelect").setOrigin(0)}update(){this.cursors.space.isDown&&this.scene.start("MainScene")}}const d={type:Phaser.AUTO,backgroundColor:"#ff23ff",pixelArt:!0,width:960,height:540,scale:{parent:"phaser-game",mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH,width:960,height:540},scene:[n,o,h,c,l,a,r],physics:{default:"arcade",arcade:{debug:!1,gravity:{y:0}}}};window.addEventListener("load",(()=>{new Phaser.Game(d)}))},204:()=>{console.log("%c %c %c %c %c Built using phaser-project-template %c https://github.com/yandeu/phaser-project-template","background: #ff0000","background: #ffff00","background: #00ff00","background: #00ffff","color: #fff; background: #000000;","background: none")}},t={};function i(e){var a=t[e];if(void 0!==a)return a.exports;var r=t[e]={exports:{}};return s[e].call(r.exports,r,r.exports,i),r.exports}i.m=s,e=[],i.O=(s,t,a,r)=>{if(!t){var h=1/0;for(l=0;l<e.length;l++){for(var[t,a,r]=e[l],n=!0,o=0;o<t.length;o++)(!1&r||h>=r)&&Object.keys(i.O).every((e=>i.O[e](t[o])))?t.splice(o--,1):(n=!1,r<h&&(h=r));if(n){e.splice(l--,1);var c=a();void 0!==c&&(s=c)}}return s}r=r||0;for(var l=e.length;l>0&&e[l-1][2]>r;l--)e[l]=e[l-1];e[l]=[t,a,r]},i.o=(e,s)=>Object.prototype.hasOwnProperty.call(e,s),(()=>{var e={179:0};i.O.j=s=>0===e[s];var s=(s,t)=>{var a,r,[h,n,o]=t,c=0;if(h.some((s=>0!==e[s]))){for(a in n)i.o(n,a)&&(i.m[a]=n[a]);if(o)var l=o(i)}for(s&&s(t);c<h.length;c++)r=h[c],i.o(e,r)&&e[r]&&e[r][0](),e[h[c]]=0;return i.O(l)},t=self.webpackChunkphaser_project_template=self.webpackChunkphaser_project_template||[];t.forEach(s.bind(null,0)),t.push=s.bind(null,t.push.bind(t))})(),i.O(void 0,[216],(()=>i(135)));var a=i.O(void 0,[216],(()=>i(204)));a=i.O(a)})();