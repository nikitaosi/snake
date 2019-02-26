var config = {
    type: Phaser.WebGL,
    width: 800,
    height: 600,
    backgroundColor: '#aa7d65',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;
var SPEED = 100;

var game = new Phaser.Game(config);
var moveTime = 0;
var step = 16;
var direction = RIGHT;


function preload () {
    this.load.image('body', 'assets/games/snake/body.png');
    this.load.image('food', 'assets/games/snake/food.png');
}

function create () {
    this.cursors = this.input.keyboard.createCursorKeys();
    food = this.add.image(512,256,'food');
    snake = this.add.image(256,256,'body');
    snake.setOrigin(0); food.setOrigin(0);
}

function update (time) {
if (moveTime<=time) {
  move();
   moveTime = time + SPEED;
}



if (this.cursors.up.isDown) {
  direction = UP;
}
if (this.cursors.down.isDown) {
  direction = DOWN;
}
if (this.cursors.left.isDown) {
  direction = LEFT;
}
if (this.cursors.right.isDown) {
  direction = RIGHT;
}

function move () {
  switch (direction) {
      case UP:
          snake.y -= step;
          if(snake.y<0){snake.y = 584}
          break;
      case DOWN:
          snake.y += step;
          if(snake.y>584){snake.y = 0}
          break;
      case LEFT:
          snake.x -= step;
          if(snake.x<0){snake.x = 784}
          break;
      case RIGHT:
          snake.x += step;
          if(snake.x>784){snake.x = 0}
          break;
  }
}

  }
