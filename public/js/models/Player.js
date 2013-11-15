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

    },



    // Update player position
    update: function(keys, worldWidth, worldHeight) {
        // Previous position
        var prevX = this.get("x"),
            prevY = this.get("y");



        if (keys.up) {
            
            this.set({y: this.get("y") - this.get("speed")});
            this.get('player').currentState = 'up';
            
            updateAnimation(this.get('player').stateAnimations[this.get('player').currentState]);
        } if (keys.down) {
          
            this.set({y: this.get("y") + this.get("speed")});
            this.get('player').currentState = 'down';
           
            updateAnimation(this.get('player').stateAnimations[this.get('player').currentState]);
        }


        if (keys.left) {
        
            this.set({x: this.get("x") - this.get("speed")});
            this.get('player').currentState = 'left';
          
            updateAnimation(this.get('player').stateAnimations[this.get('player').currentState]);
        } if (keys.right) {
        
            this.set({x: this.get("x") + this.get("speed")});
            this.get('player').currentState = 'right';
            updateAnimation(this.get('player').stateAnimations[this.get('player').currentState]);
        }
    
    // don't let player leaves the world's boundary
    
        if(this.get("x") < 0) {  
            this.set({x: 0});
        }
        if(this.get("y") < 0){
            this.set({y: 0});
        }
        if(this.get("x") > WORLD_WIDTH - 60){
            this.set({x: WORLD_WIDTH - 60});
        }
        if(this.get("y") > WORLD_HEIGHT - 100){
            this.set({y: WORLD_HEIGHT - 100});
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
        this.get('player').x = this.get("x");
        this.get('player').y = this.get("y");
        drawSprite(this.get('player'), xView, yView);
    }
});

