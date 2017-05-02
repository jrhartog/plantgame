var bootState = {
    // create is automatically called by the Phaser system.
    create : function() {

        // start the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // load the next state (loads all assets, etc.)
        game.state.start('load');
    };
};
