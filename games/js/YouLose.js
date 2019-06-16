/**
 * Created by izzt on 6/13/19.
 */

class YouLose extends Phaser.Scene {
    constructor() {
        super({ key: "YouLose" });
    } // end constructor

    preload() {

        this.load.image("background3", "assets/easter_egg_1.png");
        this.load.audio("youLose", "assets/sad.mp3")
    }
    create(){

        this.add.image(400, 300, "background3");
        //play sound
        let sound = this.sound.add('youLose');
        //
        sound.play();

        //  The message
        this.messageTime = this.add.text(70, 120, "You have lost and your score is " + score, {
            fontSize: "32px",
            fill: "#000"
        });
    }
}
