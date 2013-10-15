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
        items: [],
        width: 32,
        height: 32
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

        var imageObj = new Image();

        // Add any functions you want to call when a Player object is
        // first instantiated...

    },

    // Update player position
    update: function(keys) {
        // Previous position
        var prevX = this.get("x"),
            prevY = this.get("y"),
            imgSize = 64,
            worldWidth = 160*32,
            worldHeight = 160*32;



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
    
    // don't let player leaves the world's boundary
        if(this.get("x") - this.get("width")/2 < 0){        
            this.set({x: 0 + this.get("width")/2});
        }
        if(this.get("y") - this.get("height")/2 < 0){
            this.set({y: 0 + this.get("height")/2});
        }
        if(this.get("x") + this.get("width")/2 > worldWidth){
            this.set({x: worldWidth - this.get("width")/2});
        }
        if(this.get("y") + this.get("height")/2 > worldHeight){
            this.set({y: worldHeight - this.get("height")/2});
        }

        return (prevX != this.get("x") || prevY != this.get("y")) ? true : false;
    },

    // Draw player
    draw: function(context) 
    {
        // Fighter = 0, Ranger = 1, Wizard = 2, and Cleric = 3. The user is
        // prompted upon client connection to select a number between 0 - 3.
        // This number is assigned to the Player object property 'pClass'
        // A different color is used to represent each class visually.

        switch(this.get("role"))
        {
            case 0:
                var img = ASSET_MANAGER.getAsset('images/fighter.png');
                context.drawImage(img, this.get("x") - img.width/2, this.get("y") - img.height/2, 64, 64);
                //console.log('fighter drawImage was processed.');
                break;
            case 1:
                var img = ASSET_MANAGER.getAsset('images/archer.png');
                context.drawImage(img, this.get("x") - img.width/2, this.get("y") - img.height/2, 64, 64);
                //console.log('archer drawImage was processed.');
                break;
            case 2:
                var img = ASSET_MANAGER.getAsset('images/wizard.png');
                context.drawImage(img, this.get("x") - img.width/2, this.get("y") - img.height/2, 64, 64);
                //console.log('wizard drawImage was processed.');
                break;
            case 3:
                var img = ASSET_MANAGER.getAsset('images/cleric.png');
                context.drawImage(img, this.get("x") - img.width/2, this.get("y") - img.height/2, 64, 64);
                //console.log('cleric drawImage was processed.');
                break;
            default:
                console.log("The role property passed to the Player.draw() function is greater than 3. Fix it.");
        }
    }

    
});

