#super_gauntlet
==============

This is a Node.js / Socket.IO real-time multi-player game. Both server- and client-side code is written in JavaScript, HTML5, and CSS. The MVC framework being used is Backbone.js and server-related code is based on Node.js and Socket.io.

Contributors (in alphbetical order): Ryan Beal, John Challinger, Randy Ledbetter, Andrew Reed, Ethan Ward, and Justin Wessel.

When a client connects to the server, the user is presented with a Splash screen. There is a character customization page for each of the four base character classes available to users. Once customization is complete, the game begins. In its current state, the user is asked to select a number from 0 to 3 (four numbers, each representing one of the four character classes in the Super Gauntlet game).

Once the character class id is selected, a client side Player object is instantiated and news of this event is sent to the server via socket.io. The server instantiates a server side Player object with the same properties as contained within the transmitted client Player object and stored in a players[] array.

The server then broadcasts the news of the newly-connected player to all other connected clients(if any).
The client side code then draws the localPlayer via HTML5 Canvas. The user can then move the drawn square (representing the player) in the browser by pressing the arrow keys.

Every time a new client (new browser window) connects to the server, this process is repeated and all connected clients have their Canvas updated with the addition of the new remote player.



##Requirements to Experiment with this Code
1. Download repository folder. In console, switch to the directory
2. Install Node.js http://nodejs.org 
3. Install Node Package Manager
4. Install Socket.IO (type: npm install socket.io)
5. Install Connect (type: npm install connect)
6. Type:       node server.js
7. Open public/index.html in a browser. Select a number from 0 to 3 (representing a character class). Move the character with the arrow keys.
8. Open a seperate browser window and repeat the process with a different number to instantiate a different character class. Move the character around in the second window. Switch back and forth, and you will see the players' movements are in sync.


####The Character Class Colors Are:
* Fighter = 0 = Red
* Ranger = 1 = Green
* Wizard = 2 = Blue
* Cleric = 3 = Yellow
