// File Name: super_gauntlet.js
// Author: Randy Ledbetter

/*
===============================================================================
Description:  Client side Super Gauntlet core game implementation and event
              handler management functionality.
===============================================================================
*/


var canvas,			// HTML5 Canvas element
	context,		// HTML5 Canvas rendering context
	keys,			// Keyboard input
	localPlayer,	// Local player
	remotePlayers,	// Remote players array
	socket;			// Socket connection

var PORT = 8000;    // HTTP port number for socket.io on localhost


    


// This function, init(), initializes the Super Gauntlet game
// creates and HTML5 Canvas, and instantiates a local Player object.
function init() {

    // Declare the canvas and rendering context
	canvas = document.getElementById("gameCanvas");
	context = canvas.getContext("2d");

	// Maximise the canvas
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// Initialize keyboard movement controls
	keys = new Keys();

	// Calculate a random start position for the local player
	// The minus 15 (half a player size) stops the player being
	// placed right on the egde of the screen
	var startX = Math.round(Math.random()*(canvas.width)),
		startY = Math.round(Math.random()*(canvas.height));

    window.localPlayer.set({x: startX, y: startY});


    // Initialize the socket connection. Server is running locally on port 8080.
    socket = io.connect("http://localhost", {port: PORT, transports: ["websocket"]});

	// Initialize remote players array. This array will allow the local client
	// to keep track of all remote players.
	remotePlayers = [];

	// Start listening for events
	setEventHandlers();
}



// Set up Super Gauntlet core event handlers.
var setEventHandlers = function() {
	// Keyboard
	window.addEventListener("keydown", onKeydown, false);
	window.addEventListener("keyup", onKeyup, false);

	// If socket connection successful, call onSocketConnected()
	socket.on("connect", onSocketConnected);

	// If local client disconnects from the server, call onSocketDisconnect()
	socket.on("disconnect", onSocketDisconnect);

	// When a new player message is received from server, call onNewPlayer()
	socket.on("new player", onNewPlayer);

	// When a move player message is received from server, call onMovePlayer()
	socket.on("move player", onMovePlayer);

	// When a remove player message is received from server, call onRemovePlayer()
	socket.on("remove player", onRemovePlayer);
};

// Keyboard key down
function onKeydown(e) {
	if (localPlayer) {
		keys.onKeyDown(e);
	}
}

// Keyboard key up
function onKeyup(e) {
	if (localPlayer) {
		keys.onKeyUp(e);
	}
}

// Browser window resize
function onResize(e) {
	// Maximise the canvas
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
};

// Socket connected event handler
function onSocketConnected(data) {
	console.log("Connected to socket server");

	// Send local player data to the game server
	//socket.emit("new player", {x: localPlayer.get("x"), y: localPlayer.get("y"), role: localPlayer.get("role"), username: localPlayer.get("username")});
    socket.emit("new player", localPlayer);

}

// Socket disconnected event handler
function onSocketDisconnect() {
	console.log("Disconnected from socket server");
}

// New player event handler. The parameter 'data' represents the new Player
// object broadcast from the server.
function onNewPlayer(data) {
        console.log("New player connected: "+ data.id);

        // Instantiate a local version of the Player object broadcast from the server.
        var newPlayer = new Player();

        newPlayer.set({x: data.x, y: data.y, role: data.role, id: data.id, username: data.username});

        console.log(newPlayer.toJSON());

        // Add new player to the remote players array
        remotePlayers.push(newPlayer);



}

// Move player event handler. The parameter 'data' represents the remote player
// that triggered the 'move player' event.
function onMovePlayer(data) {
	var movePlayer = playerById(data.id);

	// Player not found
	if (!movePlayer) {
		console.log("Player not found: "+ data.id);
		return;
	}

	// Update player position
	movePlayer.set({x: data.x});
	movePlayer.set({y: data.y});
}

// Remove player event handler. The paramter 'data' represents the remote 
// player belonging to the remote client that disconnected from the server.
function onRemovePlayer(data) {
	var removePlayer = playerById(data.id);

	// Player not found
	if (!removePlayer) {
		console.log("Player not found: "+ data.id);
		return;
	}

	// Remove remote player from the remotePlayers array
	remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
}


// Super Gauntlet animation loop.
function animate() {
	update();
	draw();

	// Request a new animation frame using Paul Irish's shim
	window.requestAnimFrame(animate);
}


// This function updates the localPlayer state.
function update() {
	// Update local player and check for change
	if (localPlayer.update(keys)) {
		// Send local player data to the game server for processing
		socket.emit("move player", {x: localPlayer.get("x"), y: localPlayer.get("y")});
	}
}


// This function draws the local player and the remote players on the local
// HTML5 canvas.
function draw() {
	// Wipe the canvas clean
	context.clearRect(0, 0, canvas.width, canvas.height);


	// Draw the local player
	localPlayer.draw(context);


	// Draw the remote players
	var i;
	for (i = 0; i < remotePlayers.length; i++) {
		remotePlayers[i].draw(context);
	}
    
}


// Super Gauntlet Client Side Helper Functions

// Find player by ID
function playerById(id) {
	var i;
	for (i = 0; i < remotePlayers.length; i++) {
		if (remotePlayers[i].get("id") == id)
			return remotePlayers[i];
	}
	
	return false;
}
