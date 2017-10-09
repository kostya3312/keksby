window.onload = init;

function init() {
	var fireButton = document.getElementById("fireButton");
	var guessInput = document.getElementById("guessInput");
	fireButton.onclick = handleFireButton;
	guessInput.onkeypress = handleKeyPress;

	model.generateShipLocations();
	// view.displayCells();

	for (var row = 0; row < model.boardSize; row++) {
		for (var col = 0; col < model.boardSize; col++) {
			var cell = document.getElementById(row + "" + col);
			cell.onclick = handleCellClick;
		}
	}

	function handleCellClick(e) {
		var alphabet = ["A", "B", "C", "D", "E", "F", "G"];		
		var location = e.target.getAttribute("id");		
		var guess = alphabet[location[0]] + location[1];
		controller.processGuess(guess);
	}
}

function handleFireButton() {
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value;
	controller.processGuess(guess);
	guessInput.value = "";
}

function handleKeyPress(e) {	
	var fireButton = document.getElementById("fireButton");
	if (e.keyCode === 13) {
		fireButton.click();
		return false;
	}
}

/* VIEW */
var view = {
	displayMessage: function (msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},

	displayHit: function (location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},

	displayMiss: function (location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	},	

	displayCells: function() {
		var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
		for (var row = 0; row < model.boardSize; row++) {
			for (var col = 0; col < model.boardSize; col++) {
				var guess = alphabet[row] + "" + col;
				controller.processGuess(guess);
			}
		}
	},

	displayShips: function() {
		for (var i = 0; i < model.numShips; i++) {
			console.log(model.ships[i].locations, " ", model.ships[i].hits);
		}
	}
};

/* MODEL */
var model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,

	ships: [ { locations: ["00","01","02"], hits: ["", "", ""] },
		       { locations: ["20","21","22"], hits: ["", "", ""] },
		       { locations: ["40","41","42"], hits: ["", "", ""] } ],

	fire: function(guess) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);
			if (index >= 0) {
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("HIT!");
				if (this.isSunk(ship)) {
					this.shipsSunk++;
					view.displayMessage("You sank battleship!");
				}
				return true;
			}
		}
		view.displayMiss(guess);
		view.displayMessage("You MISSED!");		
		return false;
	},

	isSunk: function(ship) {
		for (var i = 0; i < this.shipLength; i++) {
			if (ship.hits[i] !== "hit") {
				return false;
			}
		}
		return true;
	},

	generateShipLocations: function() {
		var locations;
		for (var i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while(this.collision(locations));
			this.ships[i].locations = locations;
		}
	},

	generateShip: function() {
		var direction = Math.floor(Math.random() * 2);
		var row, col;

		if (direction === 1) { // along row
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
		} else { // along column
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
			col = Math.floor(Math.random() * this.boardSize);			
		}

		var newShipLocations = [];
		for (var i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}

		return newShipLocations;
	},

	collision: function(locations) {
		for (var i = 0; i < this.numShips; i++) {
			var shipLocations = this.ships[i].locations;
			for (var j = 0; j < locations.length; j++) {
				if (shipLocations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}
};


/* CONTROLLER */
var controller = {
	guesses: 0,

	parseGuess: function(guess) {
		var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
		if ( guess === null || guess.length !== 2 ) {
			alert("Oops, please enter a letter and a number on the board!");
		} else {
			firstChar = guess.charAt(0);
			var row = alphabet.indexOf(firstChar);
			var col = guess[1];
			if ( isNaN(row) || isNaN(col) ) {
				alert("Oops, that's not on the board!");
			} else if (row < 0 | row >= model.boardSize || col < 0 || col >= model.boardSize) {
				alert("Oops, that's off the board!");
			} else {
				return row + col;
			}
		}
	},

	processGuess: function(guess) {
		var location = this.parseGuess(guess);
		if (location) {
			this.guesses++;
			var hit = model.fire(location);
			if (hit && (model.shipsSunk === model.numShips)) {
				view.displayMessage("You sank all battleships, in " + this.guesses + " guesses!");
			}
		}
	}

};


