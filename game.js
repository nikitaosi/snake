var config = {
    type: Phaser.WebGL,
    width: 640,
    height: 480,
    backgroundColor: '#aa7d65',
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    audio: {
        disableWebAudio: true
    }
}

var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;

var game = new Phaser.Game(config);
var moveTime = 0;
var step = 16;
var direction = RIGHT;
var snakeside = RIGHT;
var snakebodies = 3;
var headPosition = new Phaser.Geom.Point(240, 240);
var alive = true;
var speed = 90;
var total = 0;


function preload () {
    this.load.image('body', 'assets/games/snake/body.png');
    this.load.image('food', 'assets/games/snake/food.png');
    this.load.audio('bulp', 'assets/sounds/bulp.mp3');
    this.load.audio('dead', 'assets/sounds/dead.mp3');
}


function create () {
    bulp = this.sound.add('bulp');
    dead = this.sound.add('dead');
    this.cursors = this.input.keyboard.createCursorKeys();
    food = this.add.image(480,240,'food');
    body = this.add.image('body');
//    snake = this.add.group({
//        key: 'body',
//        repeat: 8,
//        setXY: {
//            x:240,
//            y:240,
//            stepX: 16
//        }
//    });
    snake = this.add.group();
    var pos = headPosition;
    for(i=1; i==snakebodies; i++){
        snake.create(pos.x, pos.y, 'body');
        pos.x+=16;
    };
    Phaser.Actions.SetOrigin(snake.getChildren(), 0, 0);
    food.setOrigin(0.5);
}


function update (time) {

    if (!alive){
        console.log('you died')
        game.destroy();
    }

    if (moveTime<=time) {
        move();
        moveTime = time + speed;
    }

    if (headPosition.x == food.x && headPosition.y == food.y) { eat(); }

    if (this.cursors.up.isDown) {
        if (snakeside !== DOWN) {
            direction = UP;
        }
    }
    if (this.cursors.down.isDown) {
        if (snakeside !== UP) {
            direction = DOWN;
        }
    }
    if (this.cursors.left.isDown) {
        if (snakeside !== RIGHT) {
            direction = LEFT;
        }
    }
    if (this.cursors.right.isDown) {
        if (snakeside !== LEFT) {
            direction = RIGHT;
        }
    }
    if (this.cursors.space.isDown) {
        firstmem = snake.getChildren().length;
        console.log(firstmem);
    }

    for (i=1; i<snake.getChildren().length; i++)
        if ((time>1500) && (snake.getChildren()[i].x == snake.getChildren()[0].x) && (snake.getChildren()[i].y == snake.getChildren()[0].y)) {
             dead.play();
             alive = false;
        };
}


function move () {
    switch (direction) {
        case UP:
                snakeside = UP;
                Phaser.Actions.ShiftPosition(snake.getChildren(), headPosition.x, headPosition.y - 16);
                headPosition.y -= 16;
                if (headPosition.y < 0) {
                    headPosition.y = 464
                }
                break;
        case DOWN:
                snakeside = DOWN;
                Phaser.Actions.ShiftPosition(snake.getChildren(), headPosition.x, headPosition.y + 16);
                headPosition.y += 16;
                if (headPosition.y > 464) {
                    headPosition.y = 0
                }
                break;
        case LEFT:
                snakeside = LEFT;
                Phaser.Actions.ShiftPosition(snake.getChildren(), headPosition.x - 16, headPosition.y);
                headPosition.x -= 16;
                if (headPosition.x < 0) {
                    headPosition.x = 624
                }
                break;
        case RIGHT:
                snakeside = RIGHT;
                Phaser.Actions.ShiftPosition(snake.getChildren(), headPosition.x + 16, headPosition.y);
                headPosition.x += 16;
                if (headPosition.x > 624) {
                    headPosition.x = 0
                }
                break;
    }
};

function eat() {
    food.setPosition(Phaser.Math.Between(0, 39)*16, Phaser.Math.Between(0, 29)*16);
    snake.create(-10,-10,'body');
    total++;
    bulp.play();
    if (total%3==0 && speed<20){speed-=5}
};