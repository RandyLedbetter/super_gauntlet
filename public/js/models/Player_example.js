var Player = Backbone.Model.extend({

    defaults:  function()
    {
    	return 
        {
            id: 0,
            name: '',
            role: '',
            ac: 10,
            hp: 100,
            str: 10,
            con: 10,
            dex: 10,
            speed: 1,
            x: 0,
            y: 0,
            img: '',
            weapon: '',
            items: []
    	}
    },

    initialize: function(){

        // Event listeners for changes in key values associated with the Player.
        // The functions below send feedback to the console when certain
        // properties change value. These event listeners would not be included
        // in the production code.
        console.log(name + ", the " + role + ", has entered the game.");

        this.on("change:ac", function(model){
            var ac = model.get("ac");
            console.log("The " + role + "'s Armour Class is now " + ac + ".");
        });

        this.on("change:str", function(model){
            var str = model.get("str");
            console.log("The " + role + "'s Strength is now " + str + ".");
        });

        this.on("change:con", function(model){
            var con = model.get("con");
            console.log("The " + role + "'s Constitution is now " + con + ".");
        });

        this.on("change:dex", function(model){
            var dex = model.get("dex");
            console.log("The " + role + "'s Dexterity is now " + dex + ".");
        });

        this.on("change:speed", function(model){
            var speed = model.get("speed");
            console.log("The " + role + "'s Speed is now " + speed + ".");
        });

        this.on("change:weapon", function(model){
            var weapon = model.get("weapon");
            console.log("The " + role + "'s weapon is a " + weapon + ".");
        });

        this.on("change:items", function(model){
            var items = model.get("items");
            console.log("The " + role + "'s items array includes" + items + ".");
        });


        // Add any functions you want to call when a Player object is
        // first instantiated...

    },

    // Update player position
    update: function(keys) {
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
    },

    // Draw player on HTML5 Canvas
    draw: function(context) {

        // Based on player character selection, the appropriate image
        // of fighter, ranger, mage, or cleric is drawn to the Canvas.
        switch(role)
        {

            case "fighter": context.drawImage(img, x, y, 32, 32);
                            break;
            case "ranger":  context.drawImage(img, x, y, 32, 32);
                            break;
            case "mage":    context.drawImage(img, x, y, 32, 32);
                            break;
            case "cleric":  context.drawImage(img, x, y, 32, 32);
                            break;
            default:        console.log("The role property passed to the Player.draw() function is greater than 3. Fix it.");
        }
    }

});

