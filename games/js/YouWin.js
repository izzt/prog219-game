/**
 * Created by izzt on 6/14/19.
 */

    var dragonWin;
var bunnyWin;
class YouWin extends Phaser.Scene {
    constructor() {
        super({key: "YouWin"});
    } // end constructor


    preload() {
        this.load.image("background4", "assets/meadow.jpg");
        this.load.audio("youWon","assets/youWon.mp3");
        this.load.image("dragon", "assets/dragon.png");
        this.load.image("bunny", "assets/bunny.png");


    }
    create() {
        //  A simple background for our game
        this.add.image(400, 300, "background4");

        //play sound
        let sound = this.sound.add('youWon');
        //
        sound.play();

        this.dragon = this.physics.add.group();

        dragonWin = this.dragon.create(Phaser.Math.Between(100, 700), 16, "dragon");
        dragonWin.setBounce(1);
        dragonWin.setCollideWorldBounds(true);
        dragonWin.setVelocity(Phaser.Math.Between(0, 200), 20);
        dragonWin.allowGravity = false;
        //dragon.setTint(0xffff00);

        bunnyWin = this.dragon.create(Phaser.Math.Between(100, 700), 50, "bunny").setScale(2);
        bunnyWin.setBounce(1);
        bunnyWin.setCollideWorldBounds(true);
        bunnyWin.setVelocity(Phaser.Math.Between(50, 200), 20);
        bunnyWin.allowGravity = false;


        //  The message
        this.messageTime = this.add.text(70, 120, "You have won and your score is " + score, {
            fontSize: "32px",
            fill: "#000"
        });
    }

    update(){
        if (bunnyWin.body.velocity.x < 0) {
            bunnyWin.setFlipX(true)
        } else {
            bunnyWin.setFlipX(false)
        }
        if (dragonWin.body.velocity.x < 0) {
            dragonWin.setFlipX(true)
        } else {
            dragonWin.setFlipX(false)
        }
    }
}