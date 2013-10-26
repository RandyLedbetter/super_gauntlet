// File Name: server.js
// Author: Randy Ledbetter


/*
 ===============================================================================
 Description:  Node.js / HTTP / Socket.io multi-player server.
 ===============================================================================
 */


/*
 ================================================================================
 HTTP server script
 ================================================================================
 */




// HTTP - Sends html/js/css/img to the browser

var sendHTML = function( filePath, contentType, response ){

    console.log('sendHTML: ' + filePath) ;

    path.exists(filePath, function( exists ) {

        if (exists) {
            fs.readFile(filePath, function(error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                }
                else {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
            });
        }
        else {
            response.writeHead(404);
            response.end();
        }
    });
};

var getFilePath = function(url) {

    var filePath = './public' + url;
    if (url == '/' ) filePath = './public/index.html';

    console.log("url: " + url);

    return filePath;
};

// Determine appropriate MIME type
var getContentType = function(filePath) {

    var extname = path.extname(filePath);
    var contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
    }

    return contentType;
};

// HTTP Restful server request handler function.
var onHtmlRequestHandler = function(request, response) {

    console.log('onHtmlRequestHandler... request.url: ' + request.url) ;


    var filePath = getFilePath(request.url);
    var contentType = getContentType(filePath);

    console.log('onHtmlRequestHandler... getting: ' + filePath) ;

    sendHTML(filePath, contentType, response);

};

// Instantiate an HTTP server with Socket.io functionality.
// Declare Node.js modules.
var httpServer = require('http').createServer(onHtmlRequestHandler),
    io = require('socket.io'),
    fs = require('fs'),
    path = require('path'),
    connect = require('connect');

var httpPort = process.env.PORT || 8080;



httpServer.listen(httpPort, function(){
    console.log('HTTP / Socket.io Server listening on port ' + httpPort);
});

//==============================================================================
//     Socket.io server-related scripts
//==============================================================================

var util = require("util"),
    Player = require("./Player").Player; // Server version of Player Model


var socket,		// Socket controller
    players;	// Array of connected players

var socketPort = 8000; // Port number for socket.io on localhost.


// Super Gauntlet game initialization function init()
function init() {
    // Create an empty array to store players
    players = [];

    // Set up Socket.IO to listen on port 8000
    socket = io.listen(socketPort);

    // Configure Socket.IO to use websockets and reduce verbosity of log outputs.
    socket.configure(function() {

        socket.set("transports", ["websocket"]);

        socket.set("log level", 2);
    });

    // Start listening for events
    setEventHandlers();
}



// Declare and define game event handler functions
var setEventHandlers = function() {
    // Socket.IO
    socket.sockets.on("connection", onSocketConnection);
};

// Called once a client connects to the server. The parameter
// 'client' represents the connecting client.
function onSocketConnection(client) {
    util.log("New player has connected: "+ client.id);


    // Listen for client disconnected event. Then call onClientDisconnect.
    client.on("disconnect", onClientDisconnect);

    // Listen for new player message from a client. Then call onNewPlayer.
    client.on("new player", onNewPlayer);

    // Listen for move player message from a client. Then call onMovePlayer.
    client.on("move player", onMovePlayer);
}

// Socket client has disconnected
function onClientDisconnect() {
    util.log("Player has disconnected: "+ this.id);

    var removePlayer = playerById(this.id);

    // If the player was not found in the players[] array.
    if (!removePlayer) {
        util.log("Player not found: "+this.id);
        return;
    }

    // Remove player from players array
    players.splice(players.indexOf(removePlayer), 1);

    // Broadcast removed player to all remaining socket clients still connected.
    this.broadcast.emit("remove player", {id: this.id});
}

// Called whenever a 'new player' message is received from a connected client.
// The 'data' parameter represents the local client Player object.
// onNewPlayer instantiates a server side copy of the 'data' object.
function onNewPlayer(data) {
    // Create a new player based on 'data'
    var newPlayer = new Player(data.x, data.y, data.role, data.username, data.player);
    newPlayer.id = this.id;



    // Broadcast new player to all connected socket clients except
    // the client that just sent the 'new player' message.
    this.broadcast.emit("new player", newPlayer);


    // Send existing players to the to the client that sent the 'new player'
    // message.
    var i, existingPlayer;
    for (i = 0; i < players.length; i++) {
        existingPlayer = players[i];
        this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY(), role: existingPlayer.get_role(), username: existingPlayer.username});
    }

    // Add new player to the players array
    players.push(newPlayer);
}

// Called whenever a client sends the 'move player' message to the server.
function onMovePlayer(data) {
    // Find player in the server side players array
    var movePlayer = playerById(this.id);

    // If the 'move player' request from the client does not correspond
    // to an existing player in the server side players array...
    if (!movePlayer) {
        util.log("Player not found: "+this.id);
        return;
    }

    // Update the player's position
    movePlayer.setX(data.x);
    movePlayer.setY(data.y);

    // Broadcast updated position to all connected socket clients
    // except to the client that sent the 'move player' message.
    this.broadcast.emit("move player", {id: movePlayer.id, x: movePlayer.getX(), y: movePlayer.getY()});
}

// Super Gauntlet server helper functions

// Find player by ID
function playerById(id) {
    var i;
    for (i = 0; i < players.length; i++) {
        if (players[i].id == id)
            return players[i];
    }

    return false;
}


// Start Super Gauntlet
init();