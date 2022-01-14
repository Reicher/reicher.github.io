KnugenGame.Credits = function(game){

};
KnugenGame.Credits.prototype = {
   create: function(){
      this.add.sprite(0, 0, 'menuBackground');

      // Tns stuff
      var text = "Trans-neptunian Studios";
      var style = { font: "18px Arial", fill: "#000000", align: "center" };
      var TnsLogo = this.game.add.text(KnugenGame.WIDTH/2, 20, text, style);
      TnsLogo.anchor.setTo(0.5, 0);

      var text = "http://trans-neptunian-studios.com/";
      var style = { font: "11px Arial", fill: "#000000", align: "center" };
      var tnsLink = this.game.add.text(KnugenGame.WIDTH/2, 40, text, style);
      tnsLink.anchor.setTo(0.5, 0);
      tnsLink.inputEnabled = true;
      tnsLink.events.onInputDown.add(this.redirect, this);

      // Credits headers
      var headerStyle = { font: "Bold 13px Arial", fill: "#000000", align: "center" };
      var text = "Kod\n\n\n\nGrafik\n\n\nMusik\n\n\n\nLjud";
      var style = { font: "14px Arial", fill: "#000000", align: "center" };
      var credits = this.game.add.text(KnugenGame.WIDTH/2, 90, text, headerStyle);
      credits.anchor.setTo(0.5, 0);

      // Credits
      var creditStyle = { font: "Italic 13px Arial", fill: "#000000", align: "center" };
      var text = "\nRobin Reicher\nMikael Larsson\n\n\nDavid Levi\n\n\n\"Minstrel Guild\" & \"Pinball Spring 160\"\n Kevin MacLeod\n\n\n\"Alien Amphibians\" - WeldonSmith\nSFXR";
      var style = { font: "13px Arial", fill: "#000000", align: "center" };
      var credits = this.game.add.text(KnugenGame.WIDTH/2, 90, text, creditStyle);
      credits.anchor.setTo(0.5, 0);

      this.game.input.onDown.add(this.startGame, this);
      this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.startGame, this);      
   },
   redirect: function(){
      var url = "http://trans-neptunian-studios.com";
      $(location).attr('href',url);
   },
   startGame: function() {
      // Back to the main menu
      this.state.start('MainMenu');
   }
};
