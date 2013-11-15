var WORLD_WIDTH = 64 * 60;
var WORLD_HEIGHT = 64 * 60;

var dungeon;


var makeLevelMap = function(rows, columns) {

    var temp = [], map = [], number = 0;

    for(var i = 0; i < rows; i++) {
        for(var j = 0; j < columns; j++) {
                temp.push(number++);
        }

            map.push(temp);
            temp = [];
    }

    return map; 
}

       
dungeon = makeLevelMap(60, 60);



var mapTileSet = new Image();
mapTileSet.src = 'images/level1-3840x3840.png';
 
var tileSize = 64;       // The size of a tile (32x32)
var rowTileCount = 60;   // The number of tiles in a row of our background
var colTileCount = 60;   // The number of tiles in a column of our background
var imageNumTiles = 10;  // The number of tiles per row in the tileset image

var World = Backbone.Model.extend
({

     defaults:
    {
        id: 1,
        width: WORLD_WIDTH,
        height: WORLD_HEIGHT,
        level: 1,
        image: new Image()
    },
    initialize: function(){
        canvas = document.getElementById("gameCanvas");
        context = canvas.getContext("2d");

        var wide = context.canvas.width;
        var high = context.canvas.height;
		    context.canvas.width = this.get('width');
		    context.canvas.height = this.get('height');

        function drawMap () {
           for (var r = 0; r < rowTileCount; r++) {
              for (var c = 0; c < colTileCount; c++) {
                 var tile = dungeon[ r ][ c ];
                 var tileRow = (tile / imageNumTiles) | 0; // Bitwise OR operation
                 var tileCol = (tile % imageNumTiles) | 0;
                 context.drawImage(mapTileSet, (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, (c * tileSize), (r * tileSize), tileSize, tileSize);
              }
              
           }
        }

        drawMap();
        

        this.image = new Image();
        this.image.src = context.canvas.toDataURL("image/png");
				context.canvas.width = wide;
				context.canvas.height = high;
    },
    
    draw: function(context, xView, yView) {
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
        
        // location on canvas to draw the cropped image
        dx = 0;
        dy = 0;
        // match destination with source to not scale the image
        dWidth = sWidth;
        dHeight = sHeight;                                  
       // console.log(this.image);
        context.drawImage(mapTileSet, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);            
    },
    /*
    draw: function(context,  playerX, playerY) 
    {
   
        // dimensions of cropped image          
        var width =  context.canvas.width;
        var height = context.canvas.height;


        context.drawImage(this.image, playerX/2, playerY/2, width, height, 0, 0, width, height);
   },
  */
});

