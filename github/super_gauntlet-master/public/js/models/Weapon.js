//Andrew Reed
//Weapon.js
//rough draft of the weapon class to be used in the game super gauntlet

var Weapon = Backbone.Model.extend({
	defaults: {
		id:  0,
		name: '',
		str: 0,
		dex: 0,
		con: 0,
		img: ''

	},
	/*Event listeners to detect changes in the key values of the weapon
	  and gives feedback to the console when such changes occur
	 */

	initialize: function(){
	    this.ong("change:name", function(model){
	    	var weapon_name = model.get("name");
	    	console.log("This weapon is named " + this.get("name"))
	    });
		this.on("change:str", function(model){
			var weapon_str = model.get("str");
			console.log("The " + this.get("name") + " has " + parseInt(this.get("str")) + " strength!")
		});

		this.on("change:dex", function(model){
			var weapon_dex = model.get("dex");
			console.log("The " + this.get("dex") + " has " + parseInt(this.get("dex")) + " dexterity!")	
		});

		this.on("change:con", function(model){
			var weapon_con = model.get("con");
			console.log("The " + this.get("con") + " has " + parseInt(this.get("con")) + " constitution!")
		});


	}
})