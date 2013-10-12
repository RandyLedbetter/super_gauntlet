var World = Backbone.Model.extend
({

     defaults:
    {
        id: 1,
        width: 32*160,
        height: 32*160,
        x: 0,
        y: 0,
        level: 1,
        image: new Image()
    },
    initialize: function(){
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
    },

    draw: function(context,  xView, yView) 
    {
   
   
        var sx, sy, dx, dy;
        var sWidth, sHeight, dWidth, dHeight;
        
        // offset point to crop the image
        sx = xView;
        sy = yView;
        
        // dimensions of cropped image          
        sWidth =  context.canvas.width;
        sHeight = context.canvas.height;

        // if cropped image is smaller than canvas we need to change the source dimensions
        if(this.image.width - sx < sWidth){
            sWidth = this.image.width - sx;
        }
        if(this.image.height - sy < sHeight){
            sHeight = this.image.height - sy; 
        }
        
        // match destination with source to not scale the image
        dWidth = sWidth;
        dHeight = sHeight;                                  
        
        context.drawImage(this.image, sx, sy, sWidth, sHeight, 0, 0, dWidth, dHeight);            
   },
       /* for all objects
     colision: function (Player) {
        if this.dimensions = object.dimensions
           report
        // body...
    }
        */
});

