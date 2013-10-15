window.ClericOptionsView = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('clericOptions'));
    },

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }

});