var loadState =  {
  preload : function () {
              /* images available, W x H of total PNG (including all frames) in pixels.
             DandelionEnemyClone.png: PNG image data, 90 x 180, 8-bit/color RGBA, non-interlaced
             MushroomGuyNew.png:      PNG image data, 100 x 59, 8-bit/color RGBA, non-interlaced
             Plant_enemy_draft.png:   PNG image data, 4960 x 992, 8-bit/color RGBA, non-interlaced
             Pot.png:                 PNG image data, 32 x 32, 8-bit/color RGBA, non-interlaced
             SeedlingBrown.png:       PNG image data, 211 x 177, 8-bit/color RGBA, non-interlaced
             SeedlingBrownDying.png:  PNG image data, 211 x 177, 8-bit/color RGBA, non-interlaced
             baddie.png:              PNG image data, 128 x 32, 8-bit/color RGBA, non-interlaced
             diamond.png:             PNG image data, 32 x 28, 8-bit/color RGBA, non-interlaced
             dude.png:                PNG image data, 288 x 48, 8-bit/color RGBA, non-interlaced
             field_and_sky.png:       PNG image data, 1600 x 1200, 8-bit/color RGB, non-interlaced
             firstaid.png:            PNG image data, 32 x 32, 8-bit/color RGBA, non-interlaced
             mushroomGuy.png:         PNG image data, 1364 x 800, 8-bit/color RGBA, non-interlaced
             platform.png:            PNG image data, 400 x 32, 8-bit/color RGB, non-interlaced
             seedling.png:            PNG image data, 489 x 96, 8-bit/color RGBA, non-interlaced
             sky.png:                 PNG image data, 800 x 600, 8-bit colormap, non-interlaced
             star.png:                PNG image data, 24 x 22, 8-bit/color RGBA, non-interlaced
           */
         
           // Make all the different assets available to the game
         
           // background options
           game.load.image('sky', 'assets/field_and_sky.png');
         
           // ledges and other obstacles
           game.load.image('ground', 'assets/platform.png');
         
           //  treasures to collect to gain points
           game.load.image('star', 'assets/star.png');
         
           // non-playing characters
           game.load.atlasJSONArray('mushroomguy', 'assets/MushroomGuyNew.png',
           'assets/MushroomGuyNew.json');
           game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32, 4);
           game.load.atlasJSONArray('dandelion', 'assets/DandelionEnemyClone.png',
           'assets/DandelionEnemyClone.json');
         
           // player skin options
           game.load.atlasJSONArray('seedlingBrown', 'assets/SeedlingBrown.png',
                                    'assets/SeedlingBrown.json');
           game.load.spritesheet('seedling', 'assets/seedling.png', 54, 96, 9);
           },
  create : function() {
             game.state.start('menu');
           }
};
