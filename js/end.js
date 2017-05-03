var endState = {
    init : function(score,hp,level) {
        this.score = score;
        this.hp = hp;
        this.level = level;
    },
    create : function() {
        this.scoreText = game.add.text(16, 16, 'score: ' + this.score, { fontSize: '32px', fill: '#fff' });
        this.hpText = game.add.text(16, 50, 'hp: ' + this.hp, { fontSize: '32px', fill: '#fff' });
        this.levelText = game.add.text(16, 84, 'you have reached level ' + this.level, { fontSize: '32px', fill: '#fff' });
        this.scoreText.fixedToCamera = true;
        this.hpText.fixedToCamera = true;
        this.levelText.fixedToCamera = true;
    },
    continue : function() {
        game.state.start('play');
    },
    restart : function() {
        game.state.start('menu');
    }
};
