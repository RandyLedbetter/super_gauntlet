


var game = {
    images: 0,
    imagesLoaded: 0,
}

function imageLoaded() {
    game.imagesLoaded ++;
}
 
function Tileset(image, tileWidth, tileHeight) {
    this.image = new Image();
    game.images ++;
    this.image.onload = imageLoaded;
    this.image.src = image;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
};
 
//var spriteTiles = new Tileset('ranger-sprite-64.png', 64, 96);

function Animation(tileset, frames, frameDuration) {
    this.tileset = tileset;
    this.frames = frames;
    this.currentFrame = 0;
    this.frameTimer = Date.now();
    this.frameDuration = frameDuration;
}

//var spriteLeftAnim = new Animation(spriteTiles, ['3,1', '2,1', '1,1', '0,1'], 200);
//var spriteRightAnim = new Animation(spriteTiles, ['0,2', '1,2', '2,2', '3,2'], 200);
//var spriteDownAnim = new Animation(spriteTiles, ['0,0', '1,0', '2,0', '3,0'], 200);
//var spriteUpAnim = new Animation(spriteTiles, ['0,3', '1,3', '2,3', '3,3'], 200);

function updateAnimation(anim) {
    if (Date.now() - anim.frameTimer > anim.frameDuration) {
        if (anim.currentFrame < anim.frames.length - 1) anim.currentFrame ++;
        else anim.currentFrame = 0;
        anim.frameTimer = Date.now();
    }
}

function Sprite(stateAnimations, startingState, x, y, width, height, speed) {
    this.stateAnimations = stateAnimations;
    this.currentState = startingState;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
}

//var player = new Sprite({'left': spriteLeftAnim, 'right': spriteRightAnim, 'down': spriteDownAnim, 'up': spriteUpAnim}, 'down', canvas.width / 2, canvas.height / 2, 64, 96, 300);

 
 function drawSprite(sprite, xView, yView) {
    context.drawImage(
        sprite.stateAnimations[sprite.currentState].tileset.image, 
        sprite.stateAnimations[sprite.currentState].frames[sprite.stateAnimations[sprite.currentState].currentFrame].split(',')[0] * sprite.stateAnimations[sprite.currentState].tileset.tileWidth,
        sprite.stateAnimations[sprite.currentState].frames[sprite.stateAnimations[sprite.currentState].currentFrame].split(',')[1] * sprite.stateAnimations[sprite.currentState].tileset.tileHeight,
        sprite.stateAnimations[sprite.currentState].tileset.tileWidth,
        sprite.stateAnimations[sprite.currentState].tileset.tileHeight,
        Math.round(sprite.x) - xView,
        Math.round(sprite.y) - yView,
        sprite.width,
        sprite.height
    );
}


/*function update(mod) {
    if (37 in keysDown) {
        player.currentState = 'left';
        player.x -= player.speed * mod;
        updateAnimation(player.stateAnimations[player.currentState]);
    }
    if (38 in keysDown) {
        player.currentState = 'up';
        player.y -= player.speed * mod;
        updateAnimation(player.stateAnimations[player.currentState]);
    }
    if (39 in keysDown) {
        player.currentState = 'right';
        player.x += player.speed * mod;
        updateAnimation(player.stateAnimations[player.currentState]);
    }
    if (40 in keysDown) {
        player.currentState = 'down';
        player.y += player.speed * mod;
        updateAnimation(player.stateAnimations[player.currentState]);
    }
}*/
 
function render() {
    //context.fillStyle = game.backgroundColor;
    //context.fillRect(0, 0, canvas.width, canvas.height);
    //drawMap();
    //drawSprite(player);

}
 
/*function main() {
    update((Date.now() - then) / 1000);
    if (game.images == game.imagesLoaded) {
        render();
    }
    then = Date.now();
}
 
var then = Date.now();
setInterval(main, 10);*/


