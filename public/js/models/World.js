var World = Backbone.Model.extend
({

     defaults:
    {
        id: 1,
        width: 32*160,
        height: 32*160,
        level: 1,
        image: new Image()
    },
    initialize: function(){
        canvas = document.getElementById("gameCanvas");
        context = canvas.getContext("2d");
        var wide = context.canvas.width;
        var high = context.canvas.height;
				context.canvas.width = 32*160;
				context.canvas.height = 32*160;
console.log(this.height);
        var x= 0;
        var y=0;
        var img = ASSET_MANAGER.getAsset('images/cleric.png');
        while(x < 160 && y < 160)
        {
            x++;
            y++;
            context.drawImage(img, x*32, y*32 , 32, 32);
            
        }
        this.image = new Image();

        this.image.src = context.canvas.toDataURL("image/png");
				context.canvas.width = wide;
				context.canvas.height = high;
    },

    draw: function(context,  playerX, playerY) 
    {
   
   
        // var px, py, dx, dy;
        var width, height;
        
        // offset point to crop the image
        // px = playerX;
        // py = playerY;
        
        // dimensions of cropped image          
        width =  context.canvas.width;
        height = context.canvas.height;

        // if cropped image is smaller than canvas we need to change the source dimensions
        // if(this.image.width - px < sWidth){
        //     sWidth = this.image.width - px;
        // }
        // if(this.image.height - py < sHeight){
        //     sHeight = this.image.height - py; 
        // }
        
        // match destination with source to not scale the image
        // dWidth = sWidth;
        // dHeight = sHeight;    

        //ctx.drawImage(imageObj, x_crop, y_crop, w_crop, h_crop, x, y, wide, high);

        context.drawImage(this.image, playerX, playerY, width, height, 0, 0, width, height);
   },
       /* for all objects
     colision: function (Player) {
        if this.dimensions = object.dimensions
           report
        // body...
    }
        */
});

