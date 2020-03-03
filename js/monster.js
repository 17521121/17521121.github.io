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
        scene.physics.add.existing(this);

        this.Phaserscene = scene;
        this.setDepth(2);

        this.type;
        this.speed;
        this.maxHealth;
        this.health;
        this.aimed = [];
        this.posX = x;
        this.posY = y;
        this.init();

        this.tween;
        this.follower;
        this.duration;
        this.path;
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
                repeat: 0
            });

            this.anims.play('right', true);

            this.setCircle(10, 3, 15);
            this.type = 'landing';
            this.maxHealth = 10 + wave * 5;
            this.health = 10 + wave * 5;
            this.speed = 80;
        }

        if (this.type == 'flying') {
            this.setVelocity(80, 80);
        }

        if (this.type == 'landing') {
            this.createPath(mazePuzzle);
        }
    }

    createPath(solved) {
        //solved is mazePuzzle
        if(this.tween) {
            this.tween.stop()
        }
         
        this.path = new Phaser.Curves.Path(this.x, this.y);
        // console.log(this.path)
        // console.log(this.follower)
        solved.forEach(i => {
            this.path.lineTo(
                CELL_SIZE * i[1] + CELL_SIZE / 2,
                i[0] * CELL_SIZE + OFFSET_Y
            );
        });

        this.duration =
            (Math.sqrt(this.path.getLength() * this.path.getLength()) /
                this.speed) *
            1000;
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };

        this.tween = this.Phaserscene.tweens.add({
            targets: this.follower,
            t: 1,
            ease: 'start',
            duration: this.duration, // change
            yoyo: false,
            repeat: -2,
            onComplete: monsterReachEndpoint,
            onCompleteParams: [this]
        });
    }

    dead() {
        gold += this.getPrice();
        goldText.setText(`Vàng: ${gold}`);
        this.tween.stop();
        let index = monsters.indexOf(this);

        let i = bullets.length - 1;
        while (i >= 0) {
            if (bullets[i].target === this) {
                bullets[i].destroy();
                bullets.splice(i, 1);
            }
            i--;
        }

        monsters.splice(index, 1);

        this.anims.play('dead');
        this.setAlpha(0.5);
        this.setDisplaySize(30, 40);
        // this.destroy();
    }

    setPosWithHealth(posX, posY) {
        this.setPosition(posX, posY);

        // health draw
        graphics.lineStyle(2, 0xff00, 0.5);
        graphics.strokeRoundedRect(
            this.x - this.width / 2,
            this.y + CELL_SIZE / 2,
            this.width,
            CELL_SIZE / 7,
            0
        );
        graphics.fillStyle(0x00ff00, 1);
        graphics.fillRect(
            this.x - this.width / 2,
            this.y + CELL_SIZE / 2,
            (this.width * this.health) / this.maxHealth,
            CELL_SIZE / 7
        );
        //end health draw
    }

    getPrice() {
        if (this.getName() == 'bigBee') {
            this.price = 10;
        }

        if (this.getName() == 'ani_beast') {
            this.price = 10;
        }
        return this.price;
    }

    getName() {
        return this.texture.key;
    }
}
