
var SplashView = Backbone.View.extend({

        initialize:function () {
            this.template = _.template(tpl.get('splash'));
        },

        render:function (eventName) {
            $(this.el).html(this.template());
            return this;
        }

    });


