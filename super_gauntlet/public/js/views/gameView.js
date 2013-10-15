window.GameView = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('gameView'));
    },

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }

    draw: function()
    {
    	//draw background
    	
    	//draw all tiles
    	

    	//draw all objects
    	
    	//draw items 

    	//draw players

    }

});