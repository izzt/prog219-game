var rabbit;
var platforms;
var cursors;
var score = 0;
var scoreText;
var gameOver = false;
var ground;
var topPlatform;
var platformSecond;
var platformThird;
var tomato;

var carrotIndex = 0;
var rabbitBgMusic;

class RabbitGame extends Phaser.Scene {
    constructor() {
        super({key: "rabbitGame"});
    } // end constructor


    preload() {
        this.load.image('background2', 'assets/back2.png');
        this.load.image('platform', 'assets/2dplatform.png');
        this.load.image('carrot', 'assets/Veggies.png');
        this.load.image('tomato', 'assets/chilli.png');
        //add sounds to assets folder
        //in preload, load the assets as audio
        this.load.audio('bombaudio', 'assets/bombAudio.mp3');
        this.load.audio('carrotaudio', 'assets/starAudio.mp3');
        this.load.audio('jump', 'assets/jump.mp3');
        this.load.audio('bgMusic','assets/rabbitMusic.mp3')

        this.load.spritesheet('bunny1',
            'assets/bunnysheet5.png',
            {frameWidth: 32, frameHeight: 42}
        );
    }//end of preload

    create() {
        //play background sound
        rabbitBgMusic = this.sound.add('bgMusic');
        //
        rabbitBgMusic.play();
        
        //moving background image
        var background2 = this.add.image(400, 300, 'background2');
        this.tweens.add({
            targets: background2,
            x: 310,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            duration: 10000
        });

        platforms = this.physics.add.staticGroup();
        //ground platform
        ground = platforms.create(170, 568, 'platform').setScale(0.25).refreshBody();
        platforms.create(500, 568, 'platform').setScale(0.25).refreshBody();
        platforms.create(830, 568, 'platform').setScale(0.25).refreshBody();
        //second platform
        platformSecond = platforms.create(650, 250, 'platform').setScale(0.25).refreshBody();
        //third platform
        platformThird = platforms.create(120, 450, 'platform').setScale(0.25).refreshBody();
        //fourth platform
        topPlatform = platforms.create(-75, 120, 'platform').setScale(0.25).refreshBody();
        
        //moving tomato
        tomato = this.physics.add.staticSprite(400, 350, 'tomato');
        this.tweens.add({
            targets: tomato,
            props: {
                x: { value: 700, duration: 4000, flipX: true },
                y: { value: 500, duration: 8000,  },
            },
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
        //moving rabbit
        rabbit = this.physics.add.sprite(50, 450, 'bunny1');
        rabbit.setBounce(0.2);
        rabbit.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: [
                {key: 'bunny1', frame: 62},
            ],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{key: 'bunny1', frame: 14}],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: [
                {key: 'bunny1', frame: 42},
            ],
            frameRate: 10,
            repeat: -1


        });
//get the keyboard arrow keys
        cursors = this.input.keyboard.createCursorKeys();

//make carrot appear one by one
        this.timedEvent = this.time.addEvent({ delay: 1500, callback: this.doSomething, callbackScope: this, repeat: 10 });

        scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});

        this.physics.add.collider(rabbit, platforms);
        this.physics.add.collider(rabbit, tomato, this.hitTomato, null, this);

    }//end of create

    doSomething() {
        //this is to set the carrot on the platforms
        var y = [topPlatform, platformThird, platformThird, platformThird, ground, ground, ground, ground, platformSecond, platformSecond, platformSecond]

        let i = carrotIndex;
        var x = 30 + i * 70;

        //this is to set the carrot left on the ground platform to make space for the rabbit
        if (y[i] == ground) {
            x += 200
        }
        let carrot = this.physics.add.staticSprite(x, y[i].body.y - 20, 'carrot');
        this.physics.add.collider(rabbit, carrot, this.collectcarrot, null, this);
        carrotIndex++;
    }

    update() {
        if (gameOver) {
            return;
        }

        if (cursors.left.isDown) {
            rabbit.setVelocityX(-160);

            rabbit.anims.play('left', true);
        }
        else if (cursors.right.isDown) {
            rabbit.setVelocityX(160);

            rabbit.anims.play('right', true);
        }
        else {
            rabbit.setVelocityX(0);

            rabbit.anims.play('turn');
        }

        if (cursors.up.isDown && rabbit.body.touching.down) {
            if (score > 100) {
                rabbit.setVelocityY(-600);
            } else if (score > 60) {
                rabbit.setVelocityY(-480);
            } else if (score > 30) {
                rabbit.setVelocityY(-300);
            } else {
                rabbit.setVelocityY(-100);
            }
            let sound = this.sound.add('jump');
            sound.play();
        }
        //update where tomato is when using tweens, so that when rabbit hit the tomato, gameover
        //when using tweens, the body is not updated, hence the colision doesnt work, without refreshBody.
        tomato.refreshBody()
    }


    collectcarrot(rabbit, carrot) {
        carrot.disableBody(true, true);
        //play sound
        let sound = this.sound.add('carrotaudio');

        sound.play();

        score += 10;
        scoreText.setText('Score: ' + score);

        if (score == 110) {
            rabbitBgMusic.stop();

            // new scene game
            this.time.delayedCall(1000, function () {
                this.scene.start("DragonGame");  // jump to scene with that key name
            }, [], this);
        }
    }

    hitTomato(rabbit, tomato) {
        this.physics.pause();
        //play sound
        let sound = this.sound.add('bombaudio');
        //
        sound.play();

        rabbit.setTint(0xff0000);

        rabbit.anims.play('turn');

        gameOver = true;

        this.time.delayedCall(1000, function () {
            this.scene.start("YouLose");  // jump to scene with that key name
        }, [], this);
    }

}
/**
 * Created by izzt on 6/13/19.
 */
