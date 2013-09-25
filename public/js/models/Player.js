var Player = Backbone.Model.extend({

    defaults:
    {
        id: 0,
        username: '',
        role: 0,
        ac: 10,
        hp: 100,
        str: 10,
        con: 10,
        dex: 10,
        speed: 0,
        x: 0,
        y: 0,
        level: 1,
        img: '',
        weapon: '',
        items: []
    },


    initialize: function(){

        // Event listeners for changes in key values associated with the Player.
        // The functions below send feedback to the console when certain
        // properties change value. These event listeners would not be included
        // in the production code.
        console.log(this.get("username") + ", the " + this.get("role") + ", has entered the game.");

        this.on("change:ac", function(model){
            var ac = model.get("ac");
            console.log("The " + this.get("role") + "'s Armour Class is now " + parseInt(this.get("ac")) + ".");
        });

        this.on("change:str", function(model){
            var str = model.get("str");
            console.log("The " + this.get("role") + "'s Strength is now " + parseInt(this.get("str")) + ".");
        });

        this.on("change:con", function(model){
            var con = model.get("con");
            console.log("The " + this.get("role") + "'s Constitution is now " + parseInt(this.get("con")) + ".");
        });

        this.on("change:dex", function(model){
            var dex = model.get("dex");
            console.log("The " + this.get("role") + "'s Dexterity is now " + parseInt(this.get("dex")) + ".");
        });

        this.on("change:speed", function(model){
            var speed = model.get("speed");
            console.log("The " + this.get("role") + "'s Speed is now " + parseInt(this.get("speed")) + ".");
        });

        this.on("change:weapon", function(model){
            var weapon = model.get("weapon");
            console.log("The " + this.get("role") + "'s weapon is a " + this.get("weapon") + ".");
        });

        this.on("change:items", function(model){
            var items = model.get("items");
            console.log("The " + this.get("role") + "'s items array includes" + this.get("items") + ".");
        });
        this.on("change:x", function(model){
            var x = model.get("x");
            console.log("x = " + this.get("x") + ".");
        });
        this.on("change:y", function(model){
            var y = model.get("y");
            console.log("y = " + this.get("y") + ".");
        });


        // Add any functions you want to call when a Player object is
        // first instantiated...

    },

    // Update player position
    update: function(keys) {
        // Previous position
        var prevX = this.get("x"),
            prevY = this.get("y");


        if (keys.up) {
            this.set({y: this.get("y") - this.get("speed")});
        } else if (keys.down) {
            this.set({y: this.get("y") + this.get("speed")});
        }


        if (keys.left) {
            this.set({x: this.get("x") - this.get("speed")});
        } else if (keys.right) {
            this.set({x: this.get("x") + this.get("speed")});
        }

        return (prevX != this.get("x") || prevY != this.get("y")) ? true : false;
    },

    // Draw player
    draw: function(context) {


        // Cheesy way to test client/server retention of multiplayer
        // object attributes. Remove once proof of concept is established.
        // Fighter = 0, Ranger = 1, Wizard = 2, and Cleric = 3. The user is
        // prompted upon client connection to select a number between 0 - 3.
        // This number is assigned to the Player object property 'pClass'
        // A different color is used to represent each class visually.
        switch(this.get("role"))
        {

            case 0:
                context.fillStyle = "#FF0000";
                break;
            case 1:
                context.fillStyle = "#00FF00";
                break;
            case 2:
                context.fillStyle = "#0000FF";
                break;
            case 3:
                context.fillStyle = "FFFF00";
                break;
            default:
                console.log("The role property passed to the Player.draw() function is greater than 3. Fix it.");
        }
        context.fillRect(this.get("x")-5, this.get("y")-5, 30, 30);
    }

});

