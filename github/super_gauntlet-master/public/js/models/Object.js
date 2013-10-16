//Andrew Reed 
//Object.js
/*Rough draft of the Object class to be used
  in the game Super Gauntlet, this is where the
  objects will be instantiated and stored for use in the game
 */

var Object = Model.Backbone.extend({})

	defaults: {
		id: 0,
		name: '',
		hp: 0,
		ac: '',
		img: ''
	},

	/*Event listeners to detect changes in the key values of the
	  Object and gives feedback to the console when such changes
	  occur */

	  initialize: function(){
	  	this.on("change:name", function(model){
	  		var object_name = model.get("name");
	  		console.log("This object is named " + this.get("name"))
	  	});
	  	this.on("change:ac", function(model){
	  		var object_ac = model.get("ac");
	  		console.log("This object belongs to the " + this.get("ac") + " armour class");
	  	});
	  }
