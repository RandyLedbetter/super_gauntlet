window.FighterOptionsView = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('fighterOptions'));
    },

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }

});

