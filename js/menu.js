var menuState = {
    create : function () {
      this.button = game.add.button(game.world.centerX - 95, 400, 'seedling', this.start('seedling'), this, 2, 1, 0);
      this.button2 = game.add.button(game.world.centerX - 95, 300, 'seedlingBrown', this.start('seedlingBrown'), this, 2, 1, 0);
       },
    start : function (spriteKey) {
        game.state.start('play',false,false,spriteKey);
       }
};
