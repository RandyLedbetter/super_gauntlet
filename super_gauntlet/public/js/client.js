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
    $('#content').html(new FighterOptionsView().render().el);
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
        $('#content').html(new GameView().render().el);
    }

});

tpl.loadTemplates(['splash', 'fighterOptions', 'rangerOptions', 'mageOptions', 'clericOptions', 'gameView'], function () {
    app = new AppRouter();
    Backbone.history.start();
});