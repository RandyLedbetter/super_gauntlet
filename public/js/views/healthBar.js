window.HealthBarView = Backbone.View.extend({	

    initialize:function () {
        this.template = _.template(tpl.get('health-bar-template'));
        this.listenTo(localPlayer, "change:hp", this.updateHealth);
        
         var classes = this.getBarCSS();
         var textType = this.getTextCSS();

        // Render the view.
      	this.render();

      	$('div#completion').addClass(classes);
      	$('#player-name').addClass(textType);
      	$('#weapon-name').addClass(textType);
    },

    getBarCSS: function() {

    	var string;

    	switch(localPlayer.get("role"))
    	{
    		case 0:
    			string = "completion fighter-completion";
    			break;
    		case 1:
    			string = "completion ranger-completion";
    			break;
    		case 2:
    			string = "completion mage-completion";
    			break;
    		case 3:
    			string = "completion cleric-completion";
    			break;
    		default:
    			string = "completion mage-completion";
    			break;
    	}

    	return string;
    },

    getTextCSS: function() {

    	var text;

    	switch(localPlayer.get("role"))
    	{
    		case 0:
    			text = "fighter-text";
    			break;
    		case 1:
    			text = "ranger-text";
    			break;
    		case 2:
    			text = "mage-text";
    			break;
    		case 3:
    			text = "cleric-text";
    			break;
    		default:
    			text = "mage-text";
    			break;
    	}

    	return text;
    },

    updateHealth: function() {
        
        if(localPlayer.get("hp") <= 0) {
        	console.log(localPlayer.get("username") + " has been respawned!!!");
    		$('div#completion').width(326);
    		

        } else {

        	value = (localPlayer.get("hp") / localPlayer.get("maxhp")) * 326; // 326px is the width of lifebar image
		    value = Math.floor(value);

      		console.log($('div#completion').width(value));
      		console.log($('div#completion').width());

		}

	    localPlayer.set("prevhp", localPlayer.get("hp"));

    },


    render:function () {
        this.$el.html(this.template());
        return this;
    }

});