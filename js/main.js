//var game = new Phaser.Game(800, 600, Phaser.AUTO, '#game', { preload: preload, create: create, update: update });

// the player
var player;

// scene elements
var platforms;
var cursors;
var sky;

// non-playing characters
var baddie;
var dandelion;
var mushroomguy;

// treasures and currency
var stars;
var quotes = {'pokemon1':'Pikachu, I choose you!',
              'pokemon2':'Ya snooze ya lose.'};

// scores, healt points, and levels
var score = 0;
var scoreText;


//
//function preload() {
//  /* images available, W x H of total PNG (including all frames) in pixels.
//    DandelionEnemyClone.png: PNG image data, 90 x 180, 8-bit/color RGBA, non-interlaced
//    MushroomGuyNew.png:      PNG image data, 100 x 59, 8-bit/color RGBA, non-interlaced
//    Plant_enemy_draft.png:   PNG image data, 4960 x 992, 8-bit/color RGBA, non-interlaced
//    Pot.png:                 PNG image data, 32 x 32, 8-bit/color RGBA, non-interlaced
//    SeedlingBrown.png:       PNG image data, 211 x 177, 8-bit/color RGBA, non-interlaced
//    SeedlingBrownDying.png:  PNG image data, 211 x 177, 8-bit/color RGBA, non-interlaced
//    baddie.png:              PNG image data, 128 x 32, 8-bit/color RGBA, non-interlaced
//    diamond.png:             PNG image data, 32 x 28, 8-bit/color RGBA, non-interlaced
//    dude.png:                PNG image data, 288 x 48, 8-bit/color RGBA, non-interlaced
//    field_and_sky.png:       PNG image data, 1600 x 1200, 8-bit/color RGB, non-interlaced
//    firstaid.png:            PNG image data, 32 x 32, 8-bit/color RGBA, non-interlaced
//    mushroomGuy.png:         PNG image data, 1364 x 800, 8-bit/color RGBA, non-interlaced
//    platform.png:            PNG image data, 400 x 32, 8-bit/color RGB, non-interlaced
//    seedling.png:            PNG image data, 489 x 96, 8-bit/color RGBA, non-interlaced
//    sky.png:                 PNG image data, 800 x 600, 8-bit colormap, non-interlaced
//    star.png:                PNG image data, 24 x 22, 8-bit/color RGBA, non-interlaced
//  */
//
//  // Make all the different assets available to the game
//
//  // background options
//  game.load.image('sky', 'assets/field_and_sky.png');
//
//  // ledges and other obstacles
//  game.load.image('ground', 'assets/platform.png');
//
//  //  treasures to collect to gain points
//  game.load.image('star', 'assets/star.png');
//
//  // non-playing characters
//  game.load.atlasJSONArray('mushroomguy', 'assets/MushroomGuyNew.png',
//  'assets/MushroomGuyNew.json');
//  game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32, 4);
//  game.load.atlasJSONArray('dandelion', 'assets/DandelionEnemyClone.png',
//  'assets/DandelionEnemyClone.json');
//
//  // player skin options
//  game.load.atlasJSONArray('seedlingBrown', 'assets/SeedlingBrown.png',
//                           'assets/SeedlingBrown.json');
//  game.load.spritesheet('seedling', 'assets/seedling.png', 54, 96, 9);
//}

function create() {

    //game.world.setBounds(-2000, -600, 2000, 600);

    //  We're going to be using physics, so enable the Arcade Physics system
  //  game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    sky = game.add.sprite(0, 0, 'sky');

    // trying to add dandelion
    dandelion = game.add.sprite(400, 290, 'dandelion');
    dandelion.animations.add('blinking');
    dandelion.animations.play('blinking', 2, true);

    mushroomguy = game.add.sprite(1000, 200, 'mushroomguy')
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();
    characters = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(5, 2);
    //sky.scale.setTo(4, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(200, 400, 'ground');

    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');

    ledge.body.immovable = true;

    // The seedling and its settings
    player = game.add.sprite(32, game.world.height - 420, 'seedlingBrown');

    //add dog thing
    baddie = game.add.sprite(396, game.world.height - 100, 'baddie');

    //  We need to enable physics on the player and the other characters

    game.physics.arcade.enable(player);
    game.physics.arcade.enable(baddie);
    game.physics.arcade.enable(dandelion);
    game.physics.arcade.enable(mushroomguy);

    //  seedling physics properties. Give the little guy a slight bounce.
  
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
  
    baddie.body.gravity.y = 300;
    baddie.body.collideWorldBounds = true;
    baddie.body.bounce.y = 0.2;
    baddie.body.velocity.x = 100;

    dandelion.body.bounce.y = 0.2;
    dandelion.body.gravity.y = 300;
    dandelion.body.collideWorldBounds = true;
    dandelion.body.velocity.x = -100;

    //  Our two animations, walking left and right.
    //seedling.animations.add('left', [0, 1, 2, 3], 10, true);
    //seedling.animations.add('right', [5, 6, 7, 8], 10, true);
  
    player.animations.add('bobble');

    stars = game.add.group();

    stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 70, 0, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 6;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    scoreText.fixedToCamera = true;

    cursors = game.input.keyboard.createCursorKeys();
//    cursors = game.input.keyboard.addKeys({'up' : Phaser.KeyCode.W,
//              'down' : Phaser.KeyCode.S, 'left' : Phaser.KeyCode.A,
//              'right' : Phaser.KeyCode.D});

    game.camera.follow(player);

}

var characterJumped = false
//so that the character can only jump once?
function update() {

    // baddie turns around if it reaches the horizontal edges of the world
    if (baddie.x == game.world.width - baddie.width)
    {
      baddie.body.velocity.x = -100;
    }

    if (baddie.x == 0)
    {
      baddie.body.velocity.x = 100;
    }

    // all the game elements collide with the platforms
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.collide(baddie, platforms);
    game.physics.arcade.collide(dandelion, platforms);

    // other collisions
    game.physics.arcade.collide(player, dandelion);

    // other interactions
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    game.physics.arcade.overlap(player, baddie, seedlingDies, null, this);
    game.physics.arcade.overlap(player, mushroomguy, speak, null, {this:this, text:quotes.pokemon1});

    //  Reset the seedlings velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('bobble', 8, true);
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('bobble', 8, true);
    }
    else if (cursors.up.isDown)
    {
      if (characterJumped == false)
      {
        player.body.velocity.y = -300;
        //console.log("the guy jumps");
        //character can only jump after it jumps once/lands on gruond??
      }
    }

    else
    {
        //  Stand still
        player.animations.stop();
        player.frame = 4;
    }

    //  Allow the seedling to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -150;
    }
        //game.camera.x = seedling.x;
        //game.camera.y = seedling.y;
        console.log("player.x: " + player.x);
        console.log("player.y: " + player.y);
        //console.log(game.camera.x + "This is the game camera");

}
function collectStar (seedling, star) {

    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Score: ' + score;
}

function seedlingDies (seedling, baddie) {
  
  console.log("player.x: " + player.x);
  console.log("player.y: " + player.y);
  console.log("seedling.x: " + seedling.x);
  console.log("seedling.y: " + seedling.y);
  console.log("baddie.x: " + baddie.x);
  console.log("baddie.y: " + baddie.y);
  seedling.kill();
  var style = { font: "32px Arial", fill: "black", wordWrap: true, align: "center", backgroundColor: "transparent" };
  var text = game.add.text(0, 0, "you died :(", style);
  text.anchor.set(0.5);

  text.x = 200;
  text.y = 200;
}

function speak (seedling, mushroomguy) {

    console.log(this.text);
    var style = { font: "12px Sans", fill: "black", wordWrap: true, align: "center", backgroundColor: "transparent" };
    var text = game.add.text(mushroomguy.x + 10, mushroomguy.y + 10, this.text, style);
    //text.anchor.set(0.5);

    text.x = mushroomguy.x + 10
    text.y = mushroomguy.y + 10;
}

