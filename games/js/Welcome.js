/**
 * Created by izzt on 6/15/19.
 */

class Welcome extends Phaser.Scene {
    constructor() {
        super({ key: "Welcome" });
    } // end constructor

    preload() {
        this.load.image("background0", "assets/easter_egg_2.png");

    }

    create() {
        var background=this.add.image(400, 300, "background0");



        //  The message
        this.message1 = this.add.text(10, 50, "Welcome to Save the Rabbit and ...", { fontSize: "35px", fill: "#000"});
        this.message1 = this.add.text(10, 100, "Dragon Egg Hunter Game!", { fontSize: "35px", fill: "#000" });

        this.messageTime = this.add.text(50, 220, "You have " + decrement + " seconds until game starts", { fontSize: "30px", fill: "#000" });

        //  set up cursor (arrow) Input Events
        this.cursors = this.input.keyboard.createCursorKeys();
        this.myTimer(); // get my countdown running, this shows the user the countdown




    }
    myTimer() {
        this.timer = setInterval(function () {
            //console.log(decrement--);
            this.timer = decrement--;
        }, 800);
    }

    // executed on every frame (60 times per second)
    update() {


        if (decrement <= 0) {
            this.gameOver();
        }

        this.messageTime.setText("You have " + decrement + " seconds until game starts");




    }

    gameOver() {


        // restart game
        this.time.delayedCall(500, function () {
            this.scene.start("GameStartScene");  // jump to scene with that key name
        }, [], this);
    }


} // end class