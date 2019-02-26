var config = {
    type: Phaser.WebGL,
    width: 640,
    height: 480,
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
var SPEED = 70;

var game = new Phaser.Game(config);
var moveTime = 0;
var step = 16;
var direction = RIGHT;
var headPosition = new Phaser.Geom.Point(240, 240);

function preload () {
    this.load.image('body', 'assets/games/snake/body.png');
    this.load.image('food', 'assets/games/snake/food.png');
}

function create () {
    this.cursors = this.input.keyboard.createCursorKeys();
    food = this.add.image(480,240,'food');
    snake = this.add.group({
        key: 'body',
        repeat: 3,
        setXY: {
            x:240,
            y:240,
            stepX: 16
        }
    });
    Phaser.Actions.SetOrigin(snake.getChildren(), 0, 0);
    food.setOrigin(0.5);
}

function update (time) {
if (moveTime<=time) {
  move();
   moveTime = time + SPEED;
}

if (headPosition.x == food.x && headPosition.y == food.y) { eat(); }

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
if (this.cursors.space.isDown) {
  console.log(snake);
}

function move () {
  switch (direction) {
      case UP:
          Phaser.Actions.ShiftPosition(snake.getChildren(), headPosition.x, headPosition.y-16);
          headPosition.y -= 16;
          if(headPosition.y<0){headPosition.y = 464}
          break;
      case DOWN:
          Phaser.Actions.ShiftPosition(snake.getChildren(), headPosition.x, headPosition.y+16);
          headPosition.y += 16;
          if(headPosition.y>464){headPosition.y = 0}
          break;
      case LEFT:
          Phaser.Actions.ShiftPosition(snake.getChildren(), headPosition.x-16, headPosition.y);
          headPosition.x -= 16;
          if(headPosition.x<0){headPosition.x = 624}
          break;
      case RIGHT:
          Phaser.Actions.ShiftPosition(snake.getChildren(), headPosition.x+16, headPosition.y);
          headPosition.x += 16;
          if(headPosition.x>624){headPosition.x = 0}
          break;
  }
}

function eat() {
    food.setPosition(Phaser.Math.Between(0, 39)*16, Phaser.Math.Between(0, 29)*16);
    snake.create(-10,-10,'body');
    console.log(snake.getLast())
}

  }
