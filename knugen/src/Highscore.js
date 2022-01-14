KnugenGame.Highscore = function (game) {};
KnugenGame.Highscore.prototype = {
	create: function () {

		// Get our highscore
		$.ajax({
			context: this,
			url: 'php/getHighscore.php',
			type: 'GET',
			success: this.manageHighscore
		});

		this.add.sprite(0, 0, 'gameOverScreen');
		this.add.sprite(100, 270, 'KnugGroda');

		var graphics = this.game.add.graphics(0, 0);
		graphics.beginFill(0xFFFFFF, 1);
		graphics.drawRoundedRect(10, 10, 220, 270, 10);
		graphics.alpha = 0.5;

		// Header
		var text = "Topplista";
		var style = {
			font: "20px Arial",
			fill: "#000000",
			align: "center"
		};
		var header = this.game.add.text(KnugenGame.WIDTH / 2, 10, text, style);
		header.anchor.setTo(0.5, 0);

		// Score
		var text = "Poäng: " + this.game.points;
		var style = {
			font: "15px Arial",
			fill: "#000000",
			align: "center"
		};
		var score = this.game.add.text(15, 330, text, style);
		score.anchor.setTo(0, 0);

		// Best
		var text = "Bäst: " + this.compareScore(this.game.points);
		var style = {
			font: "15px Arial",
			fill: "#000000",
			align: "center"
		};
		var best = this.game.add.text(15, 350, text, style);
		best.anchor.setTo(0, 0);

		// Frogs Seen
		var text = "Grodor: " + this.getFrogProgress();
		var style = {
			font: "15px Arial",
			fill: "#000000",
			align: "center"
		};
		var frogsSeen = this.game.add.text(15, 370, text, style);
		frogsSeen.anchor.setTo(0, 0);

		graphics.beginFill(0xFFFFFF, 1);
		graphics.drawRoundedRect(10, 320, frogsSeen.width + 10, 73, 10);
		graphics.alpha = 0.5;

		this.game.input.onDown.add(this.gotoCredits, this);
		this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.gotoCredits, this);
	},
	manageHighscore: function (data) {
		var highscore;
		if (data == "0 results")
			highscore = new Array();
		else
			highscore = JSON.parse(data);

		// Sort list
		highscore.sort(function (a, b) {
			return b.score - a.score;
		});

		if (highscore.length < 10 || this.game.points > highscore[9].score) {

			var nick = prompt("Grattis! Skriv in namn för att hamna på topplistan!", "Knugen");
			while (nick && nick.length > 15) {
				alert("Max 15 tecken!");
				nick = prompt("Skriv in namn för highscore", "Knugen");
			}

			if (nick) {
				var newEntry = {
					nick: nick,
					score: this.game.points.toString()
				};

				$.ajax({
					url: "php/dealer.php",
					type: "POST",
					data: newEntry,
					success: function (result) {
						newEntry.hash = result;
						$.ajax({
							url: "php/setHighscore.php",
							type: "POST",
							data: newEntry
						});
					}
				});
				newEntry.isPlayer = true;
				highscore.push(newEntry);
			}
		}

		// Sort list
		highscore.sort(function (a, b) {
			return b.score - a.score;
		});

		for (i = 0; i < highscore.length && i < 10; ++i) {
			this.addScoreLine(i + 1, highscore[i]);
		}
	},
	addScoreLine: function (place, entry) {
		var style = {
			font: "15px Arial",
			fill: "#000000",
			align: "center"
		};
		if (entry.isPlayer)
			style.fill = "#FF0000";

		var y = 30 + (place * 23);

		if (place % 2 != 0) {
			var graphics = this.game.add.graphics(10, 0);
			graphics.beginFill(0xFFFFFF, 0.5);
			graphics.drawRect(0, y - 3, 220, 21);
		}

		this.game.add.text(20, y, place, style);
		this.game.add.text(50, y, entry.nick, style);
		this.game.add.text(200, y, entry.score, style);
	},
	compareScore: function (score) {
		if (!this.supports_html5_storage()) {
			console.log("NOO");
			return false;
		}

		var best = localStorage.getItem("BestLocal");
		if (!best || best < score) {
			localStorage["BestLocal"] = score;
			return score;
		}
		return best;
	},
	getFrogProgress: function () {
		if (!this.supports_html5_storage()) {
			console.log("NOO");
			return "-";
		}

		var frogsSeen = JSON.parse(localStorage.getItem("Frogs"));

		return frogsSeen.length + "/" + grodor.length;
	},
	supports_html5_storage: function () {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	},
	gotoCredits: function () {
		this.state.start('Credits');
	}
};