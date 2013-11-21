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
		follow = false,
		x = startX,
		y = startY,
		stop = false,
		hDir = 1, // None: 0 Right: 1 Left: 2
		vDir = 1; // None: 0 Down: 1 Up: 2 

	var update = function(enemyX, enemyY, enemyDir, attackDist) {
		//console.log(this.hDir);
		//console.log("vDir: ", this.vDir);

		if((Math.abs(enemyX - this.x) < 250 || Math.abs(enemyY - this.y) < 250 || this.follow == true) && this.stop == false)  {
			follow = true; // Once the AI sees the enemy, keep following them
			
			this.setDirs(enemyX, enemyY);
			
			this.move(enemyX, enemyY);

			if(attackDist > 0)
				this.checkIfHit(enemyX, enemyY, enemyDir, attackDist);
	        else if(Math.abs(enemyX - this.x) < 15 && Math.abs(enemyY - this.y) < 30)
	        	return true;
	        return false;
	    }
	};

	var draw = function(xView, yView) 
    {
    	this.AI.x = this.x;
    	this.AI.y = this.y;
        drawSprite(this.AI, xView, yView); 
        //console.log(this.id);

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
        //console.log(this.AI);
    };

    var setDirs = function(enemyX, enemyY) {
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
    };

    var move = function(enemyX, enemyY) {
    	if (this.vDir == 2) {
        //    console.log("Ai Y: ", this.y);
        	if(this.y - this.speed >= enemyY)
            	this.y = this.y - this.speed;
            else
            	this.y = enemyY;
            this.AI.currentState = 'up';
            //this.get('player').y = (((this.get('y') + 48)/2)-48) - this.get('speed');
            updateAnimation(this.AI.stateAnimations[this.AI.currentState]);
        } 
        else if (this.vDir == 1) {
         //   console.log("Ai Y: ", this.y);
            //this.y = this.y + this.speed;
            if(this.y + this.speed <= enemyY)
            	this.y = this.y + this.speed;
            else
            	this.y = enemyY;
            this.AI.currentState = 'down';
            //this.get('player').y = (((this.get('y') - 48)/2)-48) + this.get('speed');
            updateAnimation(this.AI.stateAnimations[this.AI.currentState]);
        }

        if (this.hDir == 2) {
        //    console.log("Ai X: ", this.x);
            //this.x = this.x - this.speed;
            if(this.x - this.speed >= enemyX)
            	this.x = this.x - this.speed;
            else
            	this.x = enemyX;
            this.AI.currentState = 'left';
            //this.get('player').x = (((this.get('x') + 32)/2)-32) - this.get('speed');
            updateAnimation(this.AI.stateAnimations[this.AI.currentState]);
        } 
        else if (this.hDir == 1) {
        //    console.log("Ai X: ", this.x);
            //this.x = this.x + this.speed;
            if(this.x + this.speed <= enemyX)
            	this.x = this.x + this.speed;
            else
            	this.x = enemyX;
            this.AI.currentState = 'right';
            //this.get('player').x = (((this.get('x') - 32)/2)-32) + this.get('speed');
            updateAnimation(this.AI.stateAnimations[this.AI.currentState]);
        }
    };

    var checkIfHit = function(enemyX, enemyY, enemyDir, attackDist) {

    	if(enemyDir == "up" && (enemyY - attackDist) <= this.y && Math.abs(enemyX - this.x) <= attackDist/2 && enemyY > this.y) {
    		this.hp = this.hp - 10;
    		this.y = this.y - 50;
        	this.stop = true;
        	var that = this;
        	setTimeout(function(){ that.stop = false }, 750);
    	}
    	else if(enemyDir == "down" && (enemyY + attackDist) >= this.y && Math.abs(enemyX - this.x) <= attackDist/2 && enemyY < this.y) {
    		this.hp = this.hp - 10;
    		this.y = this.y + 50;
    		this.stop = true;
        	var that = this;
        	setTimeout(function(){ that.stop = false }, 750);
		}	
    	else if(enemyDir == "left" && (enemyX - attackDist) <= this.x && Math.abs(enemyY - this.y) <= attackDist/2 && enemyX > this.x) {
    		this.hp = this.hp - 10;
    		this.x = this.x - 50;
    		this.stop = true;
        	var that = this;
        	setTimeout(function(){ that.stop = false }, 750);
    	}
    	else if(enemyDir == "right" && (enemyX + attackDist) >= this.x && Math.abs(enemyY - this.y) <= attackDist/2 && enemyX < this.x) {
    		this.hp = this.hp - 10;
    		this.x = this.x + 50;
    		this.stop = true;
        	var that = this;
        	setTimeout(function(){ that.stop = false }, 750);
    	}

    	if(this.hp <= 0)
    		this.stop = true;
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
		follow: follow,
		x: x,
		y: y,
		stop: stop,
		hDir: hDir,
		vDir: vDir,
		update: update,
		draw: draw,
		makeAISprite: makeAISprite,
		setDirs: setDirs,
		move: move,
		checkIfHit: checkIfHit
    };
};
