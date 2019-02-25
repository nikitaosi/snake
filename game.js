var config = {
    type: Phaser.WebGL,
    width: 800,
    height: 600,
    backgroundColor: '#aa7d65',
    scene: {
        preload: preload,
        create: create,
//        update: update
    }
}

var game = new Phaser.Game(config);

function preload () {
    this.load.image('body', 'assets/games/snake/body.png');
    this.load.image('food', 'assets/games/snake/food.png');
}

function create () {

    var cursors = this.input.keyboard.createCursorKeys();
    var UP = 0;
    var DOWN = 1;
    var LEFT = 2;
    var RIGHT = 3;

    var foodsprite = this.add.image('food');
    var snakesprite = this.add.image('body');

    var Snake = new Phaser.Class({

        initialize:

        function Snake(scene, x, y) {
            this.coordinates = new Phaser.Geom.Point(x, y);
            this.head = snakesprite;
            this.head.x = x;
            this.head.y = y;
            this.position = RIGHT;
            this.direction = RIGHT;
            this.moveTime = 0;
        },

        update: function(time) {

        }

    });
    var snake = new Snake(this, 16, 16);
}

function move () {

}

  function update () {
  if (cursors.up.isDown) {

  }
  if (cursors.down.isDown) {

  }
  if (cursors.left.isDown) {

  }
  if (cursors.right.isDown) {

  }
  }