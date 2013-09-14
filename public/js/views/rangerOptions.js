window.RangerOptionsView = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('rangerOptions'));
    },

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }

});