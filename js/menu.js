var menuState = {
    create : function () {
      button = game.add.button(game.world.centerX - 95, 400, 'seedling', start, this, 2, 1, 0);
      button2 = game.add.button(game.world.centerX - 95, 300, 'SeedlingBrown', start, this, 2, 1, 0);
    };

    start : function () {
        game.state.start('play');
    };
};
