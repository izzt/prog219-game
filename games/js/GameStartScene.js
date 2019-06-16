
class GameStartScene extends Phaser.Scene {
    constructor() {
        super({ key: "GameStartScene" });
    } // end constructor

    preload() {
        this.load.image("background", "assets/pyramid-background.svg");
        this.load.image("dragon", "assets/dragon.png");
        this.load.image("bunny", "assets/bunny.png");

    }

    create() {
        var background=this.add.image(400, 300, "background");
        //moving the background
        this.tweens.add({
            targets: background,
            x: 300,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            duration: 3000
        });
        
        //  The message
        this.message1 = this.add.text(10, 50, "Welcome to Save the Rabbit and ...", { fontSize: "35px", fill: "#000"});
        this.message1 = this.add.text(10, 100, "Dragon Egg Hunter Game!", { fontSize: "35px", fill: "#000" });
        this.message1 = this.add.text(10, 170, "RabbitGame:", { fontSize: "20px", fill: "#000" });
        this.message1 = this.add.text(10, 195, "Help Bunny to jump out of the hole by eating the carrot.", { fontSize: "15px", fill: "#000" });
        this.message1 = this.add.text(10, 220, "The more carrots Bunny eats, the higher Bunny can jump.", { fontSize: "15px", fill: "#000" });
        this.message1 = this.add.text(10, 280, "DragonGame:", { fontSize: "20px", fill: "#000" });
        this.message1 = this.add.text(10, 305, "Help dragon to save the dragon eggs and escape the arrows by dragonhunter.", { fontSize: "15px", fill: "#000" });

        this.message3 = this.add.text(350, 510, "Press any arrow key to start.", { fontSize: "25px", fill: "#000080" });

        //  set up cursor (arrow) Input Events
        this.cursors = this.input.keyboard.createCursorKeys();

        //moving the dragon
        var image1 = this.add.image(0, 80, 'dragon', 0);

        this.tweens.add({
            targets: image1,
            props: {
                x: { value: 700, duration: 4000, flipX: true },
                y: { value: 500, duration: 8000,  },
            },
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        //moving the bunny
        var image2 = this.add.image(0, 80, 'bunny', 0).setScale(2);

        this.tweens.add({
            targets: image2,
            props: {
                x: { value: 900, duration: 3000, flipX: true },
                y: { value: 300, duration: 8000,  },
            },
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });


    }

    update() {
        //set up cursor movement
       if (this.cursors.left.isDown) {
           this.gameOver();
        } else if (this.cursors.right.isDown) {
            this.gameOver();
        }
        if (this.cursors.up.isDown) {
            this.gameOver();
        } else if (this.cursors.down.isDown) {
            this.gameOver();
        }

    }

    gameOver() {
       // go to next scene
        this.time.delayedCall(500, function () {
            this.scene.start("rabbitGame");  // jump to scene with that key name
        }, [], this);
    }


} // end class