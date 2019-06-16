/**
 * Created by izzt on 6/13/19.
 */

    var dragon;
    var egg1;
    var egg2;
    var egg3;
    var egg4;
    var arrows;
    var dragonMove;
    var cursorKeys;
    var dragonBgMusic;

//var score = 0;
var scoreText;

class DragonGame extends Phaser.Scene {
    constructor() {
        super({ key: "DragonGame" });
    } // end constructor

    preload() {
        this.load.image("bg", "assets/volcano.jpg");
        this.load.image("dragon", "assets/dragon.png");
        this.load.image("egg", "assets/dragonEgg.png");
        this.load.image("arrow", "assets/Arrow (1).png");
        this.load.audio('bgMusic1','assets/DragonMusic.mp3');

    }

    create(){

        //play sound
        dragonBgMusic = this.sound.add('bgMusic1');
        //
        dragonBgMusic.play();

        this.cameras.main.setBounds(0, 0, 1920 , 600 );
        this.physics.world.setBounds(0, 0, 1920 , 600 );

        this.add.image(0, -300, 'bg').setOrigin(0);
     
        egg1=this.physics.add.staticSprite(400,200,'egg');
        egg2=this.physics.add.staticSprite(800,300,'egg');
        egg3=this.physics.add.staticSprite(1300,500,'egg');
        egg4=this.physics.add.staticSprite(1800,30,'egg');

        //Arrow
        arrows = this.physics.add.group();
        this.timedEvent = this.time.addEvent({ delay: 1500, callback: this.doSomething, callbackScope: this, repeat: 20 });

        dragonMove = this.physics.add.sprite(200, 450, 'dragon');
        dragonMove.setCollideWorldBounds(true);
        dragonMove.body.allowGravity = false;

        //camera follows when dragon moves
        this.cameras.main.startFollow(dragonMove);
        //camera position at x(-300)
        this.cameras.main.followOffset.set(-300, 0);
        this.anims.create({
            key: 'left',
            frames: [
                {key: 'dragon', frame: 62},
            ],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{key: 'dragon', frame: 14}],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: [
                {key: 'dragon', frame: 42},
            ],
            frameRate: 10,
            repeat: -1



        });

        //get the keyboard arrow keys
        cursorKeys = this.input.keyboard.createCursorKeys();

        scoreText = this.add.text(16, 16, 'score: ' + score, {fontSize: '32px', fill: '#000'});

        this.physics.add.collider(dragonMove, arrows, this.hitArrow, null, this);
        this.physics.add.collider(dragonMove, egg1, this.collectegg, null, this);
        this.physics.add.collider(dragonMove, egg2, this.collectegg, null, this);
        this.physics.add.collider(dragonMove, egg3, this.collectegg, null, this);
        this.physics.add.collider(dragonMove, egg4, this.collectegg, null, this);
    }
    
    

    doSomething = function () {
        let arrow = arrows.create(1900, Phaser.Math.Between(0, 800), "arrow").setScale(2);
        arrow.setVelocity(-200, 0);
        arrow.body.allowGravity = false;
    }



    update(){
        if (cursorKeys.left.isDown) {
            dragonMove.setVelocityX(-160);
            dragonMove.setFlipX(true);
        }
        else if (cursorKeys.right.isDown) {
            dragonMove.setVelocityX(160);
            dragonMove.setFlipX(false);


        }
        else if (cursorKeys.down.isDown) {
            dragonMove.setVelocityY(160);

        }
        else if (cursorKeys.up.isDown) {
            dragonMove.setVelocityY(-160);
        }
        else {
            dragonMove.setVelocityX(0);
            dragonMove.setVelocityY(0);
        }

//to ensure that the score text follow the dragon move
        scoreText.x = dragonMove.x
    }

    hitArrow(dragonMove, arrows) {
        //this.physics.pause();
        //play sound
        let sound = this.sound.add('bombaudio');
        //
        sound.play();

        dragonMove.setTint(0xff0000);

        //dragonMove.anims.play('turn');

        gameOver = true;

        this.time.delayedCall(1000, function () {
            this.scene.start("YouLose");  // jump to scene with that key name
        }, [], this);
    }

    collectegg(dragonMove, egg) {
        egg.disableBody(true, true);
        //play sound
        let sound = this.sound.add('carrotaudio');

        sound.play();

        score += 10;
        scoreText.setText('Score: ' + score);

        if (score == 150) {
            dragonBgMusic.stop();
            // restart game
            this.time.delayedCall(1000, function () {
                this.scene.start("YouWin");  // jump to scene with that key name
            }, [], this);
        }
    }


} // end class