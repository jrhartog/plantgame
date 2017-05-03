var menuState = {
    create : function () {
      this.button = game.add.button(game.world.centerX - 95, 400, 'seedling', this.setSprite1, this, 0,0,0,0);
      this.button2 = game.add.button(game.world.centerX - 95, 300, 'seedlingBrown', this.setSprite2, this, 0,0,0,0);
       },
    setSprite1 : function () {
        this.start('seedling');
    },
    setSprite2 : function () {
        this.start('seedlingBrown');
    },
    start : function (spriteKey) {
        console.log('spriteKey: ' + spriteKey);
        game.state.start('play',false,false,spriteKey);
       }
};
