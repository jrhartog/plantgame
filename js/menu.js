var menuState = {
    create : function () {
      this.button = game.add.button(game.world.centerX - 95, 400, 'seedling', this.start, this, 2, 1, 0);
      this.button2 = game.add.button(game.world.centerX - 95, 300, 'SeedlingBrown', this.start, this, 2, 1, 0);
       },
    start : function () {
        game.state.start('play');
       }
};
