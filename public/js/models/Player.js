// File Name: Player.js
// Author: Randy Ledbetter

/*
===============================================================================
Description:  Rough draft of a Player Class for the Super Gauntlet game.
              Used to test client/server Node.js / Socket.io multiplayer
              server.
===============================================================================
*/
var Player = function(startX, startY, playerClass) {
	var x = startX,
		y = startY,
		id,
		pClass = playerClass,
		moveAmount = 6;
	
	// Declare and define getter and setter functions.
	var getX = function() {
		return x;
	};

	var getY = function() {
		return y;
	};

	var get_pClass = function() {
		return pClass;
	};

	var setX = function(newX) {
		x = newX;
	};

	var setY = function(newY) {
		y = newY;
	};

	var set_pClass = function(playerClass) {
		pClass = playerClass;
	};

	// Update player position
	var update = function(keys) {
		// Previous position
		var prevX = x,
			prevY = y;

	
		if (keys.up) {
			y -= moveAmount;
		} else if (keys.down) {
			y += moveAmount;
		}

		
		if (keys.left) {
			x -= moveAmount;
		} else if (keys.right) {
			x += moveAmount;
		}

		return (prevX != x || prevY != y) ? true : false;
	};

	// Draw player
	var draw = function(context) {


		// Cheesy way to test client/server retention of multiplayer
		// object attributes. Remove once proof of concept is established.
		// Fighter = 0, Ranger = 1, Wizard = 2, and Cleric = 3. The user is
		// prompted upon client connection to select a number between 0 - 3.
		// This number is assigned to the Player object property 'pClass'
		// A different color is used to represent each class visually.
		switch(pClass)
		{
			
			case 0: 
					context.fillStyle = "#FF0000";
					break;
			case 1: 
					context.fillStyle = "#00FF00";
			        break;
			case 2: 
					context.fillStyle = "#0000FF";
			        break;
			case 3: 
					context.fillStyle = "FFFF00";
			        break;
			default: 
					console.log("The pClass property passed to the Player.draw() function is greater than 3. Fix it.");
		}
		context.fillRect(x-5, y-5, 30, 30);
	};

	// Define which variables and methods can be accessed
	return {
		getX: getX,
		getY: getY,
		get_pClass: get_pClass,
		setX: setX,
		setY: setY,
		set_pClass: set_pClass,
		update: update,
		draw: draw
	};
};
