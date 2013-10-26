// File Name: Player.js
// Author: Randy Ledbetter

/*
 ===============================================================================
 Description:  Rough draft of a Player Class for the Super Gauntlet game.
 Used to test client/server Node.js / Socket.io multiplayer
 server.
 ===============================================================================
 */


var Player = function(startX, startY, playerClass, playerName, sprite) {
    var x = startX,
        y = startY,
        role = playerClass,     //0, 1, 2, or 3.
        username = playerName,
        player = sprite,
        id;

    // Declare and define getter and setter functions.
    var getX = function() {
        return x;
    };

    var getY = function() {
        return y;
    };

    var get_role = function() {
        return role;
    };


    var setX = function(newX) {
        x = newX;
    };

    var setY = function(newY) {
        y = newY;
    };

    var set_role = function(playerClass) {
        role = playerClass;
    };
    var get_username = function() {
        return username;
    };


    // Define which variables and methods can be accessed
    return {
        getX: getX,
        getY: getY,
        x: x,
        y: y,
        get_role: get_role,
        setX: setX,
        setY: setY,
        set_role: set_role,
        username: username,
        role: role,
        get_username: get_username,
        id: id
    };
};

// Export the Player class so you can use it in
// other files by using require("Player").Player
exports.Player = Player;