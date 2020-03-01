class Monster extends Phaser.Physics.Arcade.Sprite {
    //Type : range, melee, sample
    //name: power arrow frozen thunder
    constructor(scene, x, y, name) {
        super(
            scene,
            x * CELL_SIZE + CELL_SIZE / 2,
            y * CELL_SIZE + OFFSET_Y,
            `${name}`
        );
        scene.add.existing(this);
        scene.physics.add.existing(this)

        this.Phaserscene = scene;
        this.setDepth(0);

        this.type;
        this.speed;
        this.maxHealth;
        this.health;
        this.aimed = []
        this.posX = x;
        this.posY = y;
        this.init();
    }

    init() {
        if (this.getName() == 'ani_beast') {
            this.Phaserscene.anims.create({
                key: 'right',
                frames: this.Phaserscene.anims.generateFrameNumbers(
                    'ani_beast',
                    { start: 0, end: 5 }
                ),
                frameRate: 10,
                repeat: -1
            });

            this.Phaserscene.anims.create({
                key: 'left',
                frames: this.Phaserscene.anims.generateFrameNumbers(
                    'ani_beast',
                    { start: 6, end: 11 }
                ),
                frameRate: 10,
                repeat: -1
            });

            this.anims.play('right', true);

            this.setCircle(10, 3 , 15)
            this.type = 'landing';
            this.maxHealth = 1000;
            this.health = 1000;
            this.speed = 100;
        }

        if (this.type == 'flying') {
           
            this.setVelocity(80, 80);
            pathOfMonsters.push([]);
            monsterVecs.push(null);
        }

        if (this.type == 'landing') {
            let path = new Phaser.Curves.Path(this.x, this.y);

            mazePuzzle.forEach(i => {
                path.lineTo(
                    CELL_SIZE * i[1] + CELL_SIZE / 2,
                    i[0] * CELL_SIZE + OFFSET_Y
                );
            });
           
            pathOfMonsters.push(path);
            let duration =
                (Math.sqrt(path.getLength() * path.getLength()) / this.speed) *
                1000;
            let follower = { t: 0, vec: new Phaser.Math.Vector2() };
            let tween = this.Phaserscene.tweens.add({
                targets: follower,
                t: 1,
                ease: 'start',
                duration: duration, // change
                yoyo: false,
                repeat: -2,
                onComplete: monsterReachEndpoint,
                onCompleteParams: [this]
            });

            // this.setBounce(1, 1);

            monsterVecs.push(follower);
        }
    }


    setPosWithHealth(posX, posY) {
        this.setPosition(posX, posY)

        // health draw
        graphics.lineStyle(2, 0xff00, 0.5);
        graphics.strokeRoundedRect(this.x - this.width / 2, this.y + CELL_SIZE / 2, this.width, CELL_SIZE / 7, 0);
        graphics.fillStyle(0x00ff00, 1);
        graphics.fillRect(this.x - this.width / 2, this.y + CELL_SIZE / 2, this.width * this.health / this.maxHealth, CELL_SIZE / 7);
        //end health draw
    } 

    getPrice() {
        //dead price
        if (this.getName() == 'bigBee') {
            this.price = 110;
        }
        return this.price;
    }

    getName() {
        return this.texture.key;
    }
}