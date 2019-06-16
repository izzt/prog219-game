/**
 * Created by izzt on 6/13/19.
 */

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [GameStartScene, RabbitGame, DragonGame, YouLose, YouWin]  // will start with first one in array
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);
let decrement = 10;  // had trouble creating a varaible at phaser class level that Interval could access
// so put it at game level.  Tried adding it to config and then referencing it as
// decrement
// game.decrement
// game.config.decrement   none worked, so left it here
