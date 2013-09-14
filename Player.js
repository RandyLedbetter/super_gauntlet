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
        pClass = playerClass,     //0, 1, 2, or 3.
        id;

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

    // Define which variables and methods can be accessed
    return {
        getX: getX,
        getY: getY,
        get_pClass: get_pClass,
        setX: setX,
        setY: setY,
        set_pClass: set_pClass,
        id: id
    };
};

// Export the Player class so you can use it in
// other files by using require("Player").Player
exports.Player = Player;
