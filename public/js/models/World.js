var World = Backbone.Model.extend(
{

    drawWall: function(context) {
        //we need something here that says, wait till the wall image has loaded
        //imageObj.onload = function() {
        imageObj.src = 'wall.png';
        image.onload="$(this).data('loaded', 'loaded');"
        if ($('#myimage').data('loaded')) 
        {
            while(x < 160 && x >= 0  && y >= 0 && y < 160)
            {
                x++;
                y++;
                context.drawImage(imageObj, x*32, y*32);
            }
        }
    }
});