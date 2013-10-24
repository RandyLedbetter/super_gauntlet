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
        dispX: 0,
        dispY: 0,
        level: 1,
        player: '',
        weapon: '',
        items: [],
        width: 64,
        height: 96
    },


    initialize: function(){

        
        // Initialization functions and tasks will go here.

    },


    // Update player position
    update: function(keys) {
        // Previous position
        var prevX = this.get("x"),
            prevY = this.get("y");



        if (keys.up) {
            this.set({y: this.get("y") - this.get("speed")});
            this.get('player').currentState = 'up';
            this.get('player').y = (((this.get('y') + 48)/2)-48) - this.get('speed');
            updateAnimation(this.get('player').stateAnimations[this.get('player').currentState]);
        } if (keys.down) {
            this.set({y: this.get("y") + this.get("speed")});
            this.get('player').currentState = 'down';
            this.get('player').y = (((this.get('y') - 48)/2)-48) + this.get('speed');
            updateAnimation(this.get('player').stateAnimations[this.get('player').currentState]);
        }


        if (keys.left) {
            this.set({x: this.get("x") - this.get("speed")});
            this.get('player').currentState = 'left';
            this.get('player').x = (((this.get('x') + 32)/2)-32) - this.get('speed');
            updateAnimation(this.get('player').stateAnimations[this.get('player').currentState]);
        } if (keys.right) {
            this.set({x: this.get("x") + this.get("speed")});
            this.get('player').currentState = 'right';
            this.get('player').x = (((this.get('x') - 32)/2)-32) + this.get('speed');
            updateAnimation(this.get('player').stateAnimations[this.get('player').currentState]);
        }
    
    // don't let player leaves the world's boundary
        if(this.get("x") - this.get("width")/2 < 0){        
            this.set({x: 0 + this.get("width")/2});
        }
        if(this.get("y") - this.get("height")/2 < 0){
            this.set({y: 0 + this.get("height")/2});
        }
        if(this.get("x") + this.get("width")/2 > WORLD_WIDTH){
            this.set({x: WORLD_WIDTH - this.get("width")/2});
        }
        if(this.get("y") + this.get("height")/2 > WORLD_HEIGHT){
            this.set({y: WORLD_HEIGHT - this.get("height")/2});
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
    draw: function(context) 
    {
        
        if (this.get("x")<canvas.width/2)
        {
            this.set({dispX: this.get("x")});
        }
        else if (this.get("x")>(WORLD_WIDTH-canvas.width/2))
        {
            this.set({dispX: this.get("x")-(WORLD_WIDTH-canvas.width)});
        }
        else
        {
            this.set({dispX: canvas.width/2});
        }
      

        if (this.get("y")<canvas.height/2)
        {
            this.set({dispY: this.get("y")});
        }
        else if (this.get("y")>(WORLD_HEIGHT-canvas.height/2))
        {
            this.set({dispY: this.get("y")-(WORLD_HEIGHT-canvas.height)});
        }
        else
        {
            this.set({dispY: canvas.height/2});
        }



        drawSprite(this.get('player'));
               
    }

    
});

