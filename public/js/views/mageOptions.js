window.MageOptionsView = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('mageOptions'));
    },

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }

});