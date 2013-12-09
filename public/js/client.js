var AppRouter = Backbone.Router.extend({

    routes:{
        "":"splashView",
        "fighterOptions":"fighterOptions",
        "rangerOptions":"rangerOptions",
        "mageOptions":"mageOptions",
        "clericOptions":"clericOptions",
        "gameView":"gameView"
    },

    splashView: function () {
            $('#content').html(new SplashView().render().el);
    },


    fighterOptions: function () {
    $('#content').html(new FighterOptionsView({model: Player}).render().el);
    },


    rangerOptions: function () {
        $('#content').html(new RangerOptionsView().render().el);
    },


    mageOptions: function () {
        $('#content').html(new MageOptionsView().render().el);
    },


    clericOptions: function () {
        $('#content').html(new ClericOptionsView().render().el);
    },


    gameView: function () {
        //$('#content').html(new GameView({model: localPlayer}).render().el);
        this.gameView = new GameView({model: localPlayer, el: $("#content")});
         this.healthBView = new HealthBarView({model: localPlayer, el: "#health-bar-template"});

    }

});

tpl.loadTemplates(['splash', 'fighterOptions', 'rangerOptions', 'mageOptions', 'clericOptions', 'gameView', 'health-bar-template'], function () {
    app = new AppRouter();
    Backbone.history.start();
});