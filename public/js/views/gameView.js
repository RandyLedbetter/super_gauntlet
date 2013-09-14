window.GameView = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('gameView'));
    },

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }

});