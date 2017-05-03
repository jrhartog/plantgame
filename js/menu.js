var menuState = {
    create : function () {
      this.text = game.add.text(game.world.centerX + 300, 200, "Who do you want to be? (click)",{ font: "Arial", fontSize : '36px', fill: '#ffffff' });
      this.button = game.add.button(game.world.centerX + 300,  300, 'seedling', this.setSprite1, this, 0,0,0,0);
      this.button2 = game.add.button(game.world.centerX + 400, 300, 'seedlingBrown', this.setSprite2, this, 0,0,0,0);
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
