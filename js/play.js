var playState = {
  quotes : {'pokemon1':'Pikachu, I choose you!',
              'pokemon2':'Ya snooze ya lose.'},

  // scores, healt points, and levels
  score : 0,
  level : 0,
  hpMax : 100,
  scoreText : '',
  healthText : '',
  init : function(spriteKey) {
         this.spriteKey = spriteKey;  
      },
  create : function() {

    // the world:
    // -800,-600                 800,-600
    //                 0,0 
    // -800,600                  800,600
    //  A simple background for our game
    this.sky = game.add.sprite(-800, -600, 'sky');

    // trying to add dandelion
    this.dandelion = game.add.sprite(400, 290, 'dandelion');
    this.dandelion.animations.add('blinking');
    this.dandelion.animations.play('blinking', 2, true);

    this.mushroomguy = game.add.sprite(600, 200, 'mushroomguy')
    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    this.platforms.enableBody = true;

    // Here we create the ground.
    this.ground = this.platforms.create(-800, game.world.bottom - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    this.ground.scale.setTo(4, 2);

    //  This stops it from falling away when you jump on it
    this.ground.body.immovable = true;

    //  Now let's create two ledges
    this.ledge = this.platforms.create(200, 400, 'ground');

    this.ledge.body.immovable = true;

    this.ledge = this.platforms.create(-150, 250, 'ground');

    this.ledge.body.immovable = true;

    // The seedling and its settings
    this.player = game.add.sprite(32, game.world.bottom - 160, this.spriteKey);
    this.player.health = this.hpMax
    this.player.maxHealth = this.hpMax;

    //add dog thing
    this.baddie = game.add.sprite(396, game.world.bottom - 160, 'baddie');

    //  We need to enable physics on the player and the other characters

    this.game.physics.arcade.enable(this.player);
    this.game.physics.arcade.enable(this.baddie);
    this.game.physics.arcade.enable(this.dandelion);
    this.game.physics.arcade.enable(this.mushroomguy);

    //  seedling physics properties. Give the little guy a slight bounce.
  
    this.player.body.bounce.y = 0.2;
    this.player.body.gravity.y = 300;
    this.player.body.collideWorldBounds = true;
  
    this.baddie.body.gravity.y = 300;
    this.baddie.body.collideWorldBounds = true;
    this.baddie.body.bounce.y = 0.2;
    this.baddie.body.velocity.x = 100;

    this.dandelion.body.bounce.y = 0.5;
    this.dandelion.body.gravity.y = 300;
    this.dandelion.body.collideWorldBounds = true;
    this.dandelion.body.velocity.x = -100;

    //  Our two animations, walking left and right.
    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);
  
    this.player.animations.add('bobble');

    this.stars = game.add.group();

    this.stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    var xx;
    var yy;
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        xx = game.rnd.integerInRange(-800,800);
        yy = game.rnd.integerInRange(-600,600);
  
        var star = this.stars.create(xx, yy, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 6;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    this.scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000', backgroundColor: 'rgba(100,100,100,0.5)' });
    this.scoreText.fixedToCamera = true;
    this.healthText = game.add.text(16, 56, 'health: ' + this.hpMax, { fontSize: '32px', fill: '#000', backgroundColor: 'rgba(100,100,100,0.5)' });
    this.healthText.fixedToCamera = true;

    this.cursors = game.input.keyboard.createCursorKeys();
//    cursors = game.input.keyboard.addKeys({'up' : Phaser.KeyCode.W,
//              'down' : Phaser.KeyCode.S, 'left' : Phaser.KeyCode.A,
//              'right' : Phaser.KeyCode.D});

    game.camera.follow(this.player);
    
    this.characterJumped = false;

    }, 
update : function() {

    // baddie turns around if it reaches the horizontal edges of the world
    if (this.baddie.x == game.world.width - this.baddie.width)
    {
      this.baddie.body.velocity.x = -100;
    }

    if (this.baddie.x == 0)
    {
      this.baddie.body.velocity.x = 100;
    }

    // all the game elements collide with the platforms
    game.physics.arcade.collide(this.player, this.platforms);
    game.physics.arcade.collide(this.stars, this.platforms);
    game.physics.arcade.collide(this.baddie, this.platforms);
    game.physics.arcade.collide(this.dandelion, this.platforms);

    // other collisions
    game.physics.arcade.collide(this.player, this.dandelion, this.doDamage, null, this);

    // other interactions
    game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
    game.physics.arcade.overlap(this.player, this.baddie, this.seedlingDies, null, this);
    game.physics.arcade.overlap(this.player, this.mushroomguy, this.speak, null, {this:this, text:this.quotes.pokemon1});

    //  Reset the seedlings velocity (movement)
    this.player.body.velocity.x = 0;

    if (this.cursors.left.isDown)
    {
        if (game.paused) {
            game.paused = false;
        }
        //  Move to the left
        this.player.body.velocity.x = -150;

        this.player.animations.play('left', 4, true);
    }
    else if (this.cursors.right.isDown)
    {
        //  Move to the right
        this.player.body.velocity.x = 150;

        this.player.animations.play('right', 4, true);
    }
    else if (this.cursors.up.isDown)
    {
      if (this.characterJumped == false)
      {
        this.player.body.velocity.y = -300;
        //console.log("the guy jumps");
        //character can only jump after it jumps once/lands on gruond??
      }
    }
    else
    {
        //  Stand still
        this.player.animations.stop();
        this.player.frame = 4;
    }

    //  Allow the seedling to jump if they are touching the ground.
    if (this.cursors.up.isDown && this.player.body.touching.down)
    {
        this.player.body.velocity.y = -150;
    }
        //game.camera.x = seedling.x;
        //game.camera.y = seedling.y;
    console.log("this.player.health: " + this.player.health);
    console.log("this.score: " + this.score);
    console.log("bounds: " + game.world.bounds);

    // wrap around when player reaches world bounds
    //game.world.wrap(this.player,0,true);

        //console.log(game.camera.x + "This is the game camera");

},
collectStar : function(seedling, star) {

    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    this.score += 10;
    this.scoreText.text = 'Score: ' + this.score;
},
doDamage : function() {
    this.player.damage(1);
    this.healthText.text = 'health: ' + this.player.health;
    if (! this.player.alive) {
        game.state.start('end',true,false,this.score,this.player.health,this.level)
    };
},
seedlingDies : function(seedling, baddie) {
  console.log("player.x: " + this.player.x);
  console.log("player.y: " + this.player.y);
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

  // go to end screen (still need to be made, just go back to menu)
  game.state.start('end',true,false,this.score,this.player.health,this.level);
  },
speak : function(seedling, mushroomguy) {

    console.log(this.text);
    var style = { font: "12px Sans", fill: "black", wordWrap: true, align: "center", backgroundColor: "transparent" };
    var text = game.add.text(mushroomguy.x + 10, mushroomguy.y + 10, this.text, style);
    //text.anchor.set(0.5);

    text.x = mushroomguy.x + 10
    text.y = mushroomguy.y + 10;
    seedling.heal(20);
    }
};
