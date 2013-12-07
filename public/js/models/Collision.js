// File Name: Collision.js

/*
===============================================================================
Description:  Class to handle collision detection for the player in game
===============================================================================
*/

/* function Hitmap takes an image as an argument
   and draws it to the canvas*/
function HitMap(img){
	var self = this;
	this.img = img;

	if(img.complete){
		this.draw();
	}
	else{
		img.onload = function(){
			self.draw();
		};
	}
}

HitMap.prototype = {
	draw: function(){
		this.canvas = document.createElement('canvas');
		this.canvas.width = this.img.width;
		this.canvas.height = this.img.height;
		this.context = this.canvas.getContext('2d');

		this.context.drawImage(this.img, 0, 0);
	},

	/*isHit function takes the player x and y position as an argument 
	  and returns true if the player is on a black pixel, flase otherwise*/

	isHit: function(playerX, playerY){
		if (this.context){
			var pixel = this.context.getImageData(playerX, playerY, 1, 1);
			if(pixel.data[0] === 0){
				return true;
			}
			else{
				return false;
			}
		}
	}
};
