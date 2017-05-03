var bootState = {
    // create is automatically called by the Phaser system.
    create : function() {
        // define world bounds bigger than w x h 
        game.world.setBounds(-800,-600,1600,1200);

        // start the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // load the next state (loads all assets, etc.)
        game.state.start('load');
    }
};
