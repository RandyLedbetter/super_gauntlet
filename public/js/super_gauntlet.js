// File Name: super_gauntlet.js
// Author: Randy Ledbetter

/*
===============================================================================
Description:  Client side Super Gauntlet core game implementation and event
              handler management functionality.
===============================================================================
*/


var axis,
	canvas,			// HTML5 Canvas element
	camera,
	context,		// HTML5 Canvas rendering context
	keys,			// Keyboard input
	map,			// World object
	localPlayer,	// Local player
	remotePlayers,	// Remote players array
	AiArray,
	pixelValue,
	//pixelValueUp,
	//pixelValueDown,
	//pixelValueLeft,
	//pixelValueRight,
	socket;			// Socket connection


var PORT = 8000;    // HTTP port number for socket.io on localhost


    


// This function, init(), initializes the Super Gauntlet game
// creates and HTML5 Canvas, and instantiates a local Player object.
function init() {

	// Create the world
    map = new World();

	// Initialize keyboard movement controls
	keys = new Keys();

	axis = 3;

	// Calculate a random start position for the local player
	// The minus 15 (half a player size) stops the player being
	// placed right on the egde of the screen
	var startX = canvas.width / 2,
		startY = canvas.height / 2;

    window.localPlayer.set({x: startX, y: startY});
    window.localPlayer.makePlayerSprite(context);

    camera = new Camera(0, 0, canvas.width, canvas.height, map.get("width"), map.get("height"));
	camera.follow(localPlayer, canvas.width/2, canvas.height/2);

	AiArray = new Array();

	setSpawnPoint(canvas.width/2, canvas.width/2, 5000, 25000, 0, 0, 50, 6);
	setSpawnPoint(10, 10, 5000, 25000, 0, 3, 50, 5);

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
	socket.emit("new player", {x: localPlayer.get("x"), y: localPlayer.get("y"), role: localPlayer.get("role"), username: localPlayer.get("username")});
    //socket.emit("new player", localPlayer);

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
function update(context) {

	/*pixelValueUp = map.collision(localPlayer.get("x"), (localPlayer.get("y") - 1));
	pixelValueDown = map.collision(localPlayer.get("x"), (localPlayer.get("y") + 1));
	pixelValueLeft = map.collision((localPlayer.get("x") - 1), localPlayer.get("y"));
	pixelValueRight = map.collision((localPlayer.get("x") + 1), localPlayer.get("y"));*/
	pixelValue = map.collision(localPlayer.get("x"), localPlayer.get("y"));

	if(localPlayer.get('player').currentState == 'up')
	{
		pixelValue = map.collision(localPlayer.get("x"), (localPlayer.get("y") - 1));
	}
	else if(localPlayer.get('player').currentState == 'down')
	{
		pixelValue = map.collision(localPlayer.get("x"), (localPlayer.get("y") + 48));
	}
	else if(localPlayer.get('player').currentState == 'left')
	{
		pixelValue = map.collision((localPlayer.get("x") - 1), localPlayer.get("y"));
	}
	else if(localPlayer.get('player').currentState == 'right')
	{
		pixelValue = map.collision((localPlayer.get("x") + 32), localPlayer.get("y"));
	}


	// Update local player and check for change
	if (localPlayer.update(keys, pixelValue/*, pixelValueUp, pixelValueDown, pixelValueLeft, pixelValueRight*/)) {
		// Send local player data to the game server for processing
		if(keys.up || keys.down)
			axis = 1
		if(keys.left || keys.right) {
			if(axis == 1)
				axis = 3
			else axis = 2
		}
		
		camera.update(axis);
		socket.emit("move player", {x: localPlayer.get("x"), y: localPlayer.get("y")});
	}

	//Update the AIs
	var i;
	for (i = 0; i < AiArray.length; i++) {
		if(AiArray[i].update(localPlayer.get("x"), localPlayer.get("y"), localPlayer.get("player").currentState, localPlayer.get("attackDist")) == true && localPlayer.get("mercy") == false) {
			if(localPlayer.get("hp") > 0) {
				localPlayer.set({hp: localPlayer.get("hp") - 10}); 
				localPlayer.set({mercy: true}); // localPlayer will not take damage until below timer goes off after 1 second
				setTimeout(function(){ localPlayer.set({ mercy: false }) }, 1000); 
				console.log(localPlayer.get("hp"));
			}
			else if(localPlayer.get("hp") <= 0) {
				setTimeout(function() {  
					localPlayer.revive();
            		camera.reset(); 
            		//console.log("REVIVE");
            	}, 2500); 
        	}
		}
	}

	//console.log("x: ", localPlayer.get("x"));
	//console.log("y: ", localPlayer.get("y"));

	//AI1.update(localPlayer.get("x"), localPlayer.get("y"));
	//AI2.update(localPlayer.get("x"), localPlayer.get("y"));
}


// This function draws the local player and the remote players on the local
// HTML5 canvas.
function draw() {
	// Wipe the canvas clean
	//context.clearRect(0, 0, canvas.width, canvas.height);

	//draw map
	map.draw(context, camera.xView, camera.yView);

	// Draw the local player
	localPlayer.draw(context, camera.xView, camera.yView);
//	if(camera.viewPort.left < AI.x && camera.viewPort.top < AI.y
//			&& (camera.viewPort.left + camera.wView) > AI.x
//			&& (camera.viewPort.top + camera.hView) > AI.y)
	
	var i;
	for (i = 0; i < AiArray.length; i++) {
		AiArray[i].draw(camera.xView, camera.yView);
	}
	//AI1.draw(camera.xView, camera.yView);
	//AI2.draw(camera.xView, camera.yView);

	// Draw the remote players
	var i;
	for (i = 0; i < remotePlayers.length; i++) {
		if(camera.viewPort.left < remotePlayers[i].get("x") && camera.viewPort.top < remotePlayers[i].get("y")
			&& (camera.viewPort.left + camera.wView) > remotePlayers[i].get("x") && (camera.viewPort.top + camera.hView) > remotePlayers[i].get("y"))
			remotePlayers[i].draw(context, camera.xView, camera.yView);
	}
    
}

function setSpawnPoint(x, y, interval, timeout, id, role, hp, speed) {
	x = setInterval(function() { 
		AiArray[AiArray.length] = new Ai(id, role, 10, hp, 10, 10, 10, speed, x, y);
		//console.log(AiArray[AiArray.length]);
		AiArray[AiArray.length-1].makeAISprite();
	}, 2500);

	setTimeout(function(){ clearTimeout(x); }, timeout); 
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
