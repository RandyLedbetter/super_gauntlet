var Ai = function(startId, startRole, startAc, startHp, startStr, startCon, startDex, startSpeed, startX, startY) {
	var id = startId,
		AI = null,
		role = startRole,
		ac = startAc,
		hp = startHp,
		str = startStr,
		con = startCon,
		dex = startDex,
		speed = startSpeed,
		x = startX,
		y = startY,
		hDir = 1, // None: 0 Right: 1 Left: 2
		vDir = 1; // None: 0 Down: 1 Up: 2 

	var update = function(enemyX, enemyY) {
		
		if(enemyX < this.x) {
		
			this.hDir = 2;
		}
		else if(enemyX > this.x) {
		
			this.hDir = 1;
		}
		else this.hDir = 0;

		if(enemyY < this.y) {
		
			this.vDir = 2;
		}
		else if(enemyY > this.y) {
			this.vDir = 1;
		}
		else this.vDir = 0;

		if (this.vDir == 2) {
        
            this.y = this.y - this.speed;
            this.AI.currentState = 'up';
           
            updateAnimation(this.AI.stateAnimations[this.AI.currentState]);
        } 
        else if (this.vDir == 1) {
        
            this.y = this.y + this.speed;
            this.AI.currentState = 'down';
            
            updateAnimation(this.AI.stateAnimations[this.AI.currentState]);
        }

        if (this.hDir == 2) {
       
            this.x = this.x - this.speed;
            this.AI.currentState = 'left';
           
            updateAnimation(this.AI.stateAnimations[this.AI.currentState]);
        } 
        else if (this.hDir == 1) {
       
            this.x = this.x + this.speed;
            this.AI.currentState = 'right';
           
            updateAnimation(this.AI.stateAnimations[this.AI.currentState]);
        }
	};

	var draw = function(xView, yView) 
    {
    	this.AI.x = this.x;
    	this.AI.y = this.y;
        drawSprite(this.AI, xView, yView); 
    };

    var makeAISprite = function() {

        switch(this.role)
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

        this.AI = new Sprite({'left': spriteLeftAnim, 'right': spriteRightAnim, 'down': spriteDownAnim, 'up': spriteUpAnim}, 'down', this.x, this.y, 64, 96, 200);
        console.log(this.AI);
    };

    return {
    	id :id,
		AI: AI,
		role: role,
		ac: ac,
		hp: hp,
		str: str,
		con: con,
		dex: dex,
		speed: speed,
		x: x,
		y: y,
		hDir: hDir,
		vDir: vDir,
		update: update,
		draw: draw,
		makeAISprite: makeAISprite
    };
};
