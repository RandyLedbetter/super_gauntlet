var WORLD_WIDTH = 32 * 200;
var WORLD_HEIGHT = 32 * 200;

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

       
dungeon = makeLevelMap(120, 120);



var mapTileSet = new Image();
mapTileSet.src = 'images/level1-3840x3840.png';
 
var tileSize = 32;       // The size of a tile (32x32)
var rowTileCount = 120;   // The number of tiles in a row of our background
var colTileCount = 120;   // The number of tiles in a column of our background
var imageNumTiles = 120;  // The number of tiles per row in the tileset image

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

    draw: function(context,  playerX, playerY) 
    {
   
        // dimensions of cropped image          
        var width =  context.canvas.width;
        var height = context.canvas.height;


        context.drawImage(this.image, playerX/2, playerY/2, width, height, 0, 0, width, height);
   },

});

