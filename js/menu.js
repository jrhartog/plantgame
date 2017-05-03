var menuState = {
    create : function () {
      this.button = game.add.button(game.world.centerX - 95, 400, 'seedling', this.start('seedling'), this, 0,0,0,0);
      this.button2 = game.add.button(game.world.centerX - 95, 300, 'seedlingBrown', this.start('seedlingBrown'), this, 0,0,0,0);
       },
    start : function (spriteKey) {
        console.log('spriteKey: ' + spriteKey);
        game.state.start('play',false,false,spriteKey);
       }
};
