window.GameView = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('gameView'));
        this.render().el;
       
    },

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }

});