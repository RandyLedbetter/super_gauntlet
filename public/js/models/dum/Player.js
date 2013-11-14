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
        img: null,
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
            //console.log(this.get("role") + " x: = " + this.get("x") + ".");
        });
        this.on("change:y", function(model){
            var y = model.get("y");
           // console.log(this.get("role") + " y: = " + this.get("y") + ".");
        });

        //this.set({img: ASSET_MANAGER.getAsset('images/fighter.png')});


        // Add any functions you want to call when a Player object is
        // first instantiated...

    },



    // Update player position
    update: function(keys, worldWidth, worldHeight) {
        // Previous position
        var prevX = this.get("x"),
            prevY = this.get("y");



        if (keys.up) {
            //console.log(this.get("y"));
            this.set({y: this.get("y") - this.get("speed")});
            this.get('player').currentState = 'up';
            //this.get('player').y = (((this.get('y') + 48)/2)-48) - this.get('speed');
            updateAnimation(this.get('player').stateAnimations[this.get('player').currentState]);
        } if (keys.down) {
           // console.log(this.get("y"));
            this.set({y: this.get("y") + this.get("speed")});
            this.get('player').currentState = 'down';
            //this.get('player').y = (((this.get('y') - 48)/2)-48) + this.get('speed');
            updateAnimation(this.get('player').stateAnimations[this.get('player').currentState]);
        }


        if (keys.left) {
         //   console.log(this.get("x"));
            this.set({x: this.get("x") - this.get("speed")});
            this.get('player').currentState = 'left';
            //this.get('player').x = (((this.get('x') + 32)/2)-32) - this.get('speed');
            updateAnimation(this.get('player').stateAnimations[this.get('player').currentState]);
        } if (keys.right) {
        //    console.log(this.get("x"));
            this.set({x: this.get("x") + this.get("speed")});
            this.get('player').currentState = 'right';
            //this.get('player').x = (((this.get('x') - 32)/2)-32) + this.get('speed');
            updateAnimation(this.get('player').stateAnimations[this.get('player').currentState]);
        }
    
    // don't let player leaves the world's boundary
    
        if(this.get("x") < 0) {  
            this.set({x: 0});
        }
        if(this.get("y") < 0){
            this.set({y: 0});
        }
        if(this.get("x") > 1220){
            this.set({x: 1220});
        }
        if(this.get("y") > 1180){
            this.set({y: 1180});
        }
    
        return (prevX != this.get("x") || prevY != this.get("y")) ? true : false;
     },

     makePlayerSprite: function(context) {

        switch(this.get("role"))
        {
            case 0:
                var spriteTiles = new Tileset('images/fighter-sprite-64.png', 64, 96);

                break;
            case 1:
                var spriteTiles = new Tileset('images/ranger-sprite-64.png', 64, 96);
                break;
            case 2:
                var spriteTiles = new Tileset('images/mage-sprite-64.png', 64, 96);
                break;
            case 3:
                var spriteTiles = new Tileset('images/cleric-sprite-64.png', 64, 96);
                break;
            default:
                console.log("Failed to assign localPlayer sprite image in localPlayer.initialize()");
        }

        var spriteLeftAnim = new Animation(spriteTiles, ['3,1', '2,1', '1,1', '0,1'], 200);
        var spriteRightAnim = new Animation(spriteTiles, ['3,2', '2,2', '1,2', '0,2'], 200);
        var spriteDownAnim = new Animation(spriteTiles, ['3,0', '2,0', '1,0', '0,0'], 200);
        var spriteUpAnim = new Animation(spriteTiles, ['0,3', '1,3', '2,3', '3,3'], 200);

        var player = new Sprite({'left': spriteLeftAnim, 'right': spriteRightAnim, 'down': spriteDownAnim, 'up': spriteUpAnim}, 'down', this.get('x'), this.get('y'), 64, 96, 200);
        this.set('player', player);
        console.log(player);
    },

    // Draw player
    draw: function(context, xView, yView) 
    {
        // Cheesy way to test client/server retention of multiplayer
        // object attributes. Remove once proof of concept is established.
        // Fighter = 0, Ranger = 1, Wizard = 2, and Cleric = 3. The user is
        // prompted upon client connection to select a number between 0 - 3.
        // This number is assigned to the Player object property 'pClass'
        // A different color is used to represent each class visually.
        //console.log(xView);
        //console.log(yView);
        /*
        if(xView == 0)
            this.set({x: 324, y: this.get("y")});
        else if(xView == 632)
            this.set({x: 956, y: this.get("y")});
        if(yView == 0)
            this.set({x: this.get("x"), y: 324});
        else if(yView == 632)
            this.set({x: this.get("x"), y: 956});
        */
        //this.set({x: this.get("x"), y: this.get("y")});
        this.get('player').x = this.get("x");
        this.get('player').y = this.get("y");
        drawSprite(this.get('player'), xView, yView);

        /*
        context.save(); 
        switch(this.get("role"))
        {
            case 0:
                context.drawImage(this.get("img"), (this.get("x") - this.get("img").width/2) - xView, (this.get("y") - this.get("img").height/2) - yView, 64, 64);
                //console.log('fighter drawImage was processed.');
                break;
            case 1:
                context.drawImage(this.get("img"), (this.get("x") - this.get("img").width/2) - xView, (this.get("y") - this.get("img").height/2) - yView, 64, 64);
                //console.log('archer drawImage was processed.');
                break;
            case 2:
                context.drawImage(this.get("img"), (this.get("x") - this.get("img").width/2) - xView, (this.get("y") - this.get("img").height/2) - yView, 64, 64);
                //console.log('wizard drawImage was processed.');
                break;
            case 3:
                context.drawImage(this.get("img"), (this.get("x") - this.get("img").width/2) - xView, (this.get("y") - this.get("img").height/2) - yView, 64, 64);
                //console.log('cleric drawImage was processed.');
                break;
            default:
                console.log("The role property passed to the Player.draw() function is greater than 3. Fix it.");
        }
        context.restore();*/
    }
});

