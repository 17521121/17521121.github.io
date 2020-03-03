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
        this.init();
        this.lastPosX;
        this.lastPosY;
        this.tween;
        this.follower;
        this.duration;
        this.path;

        this.direction;
    }

    init() {
        this.direction = "down"

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

            this.setCircle(10, 3, 15);
            this.type = 'landing';
            this.maxHealth = 10 + wave * 25;
            this.health = 10 + wave * 25;
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
        goldText.setText(`${gold}`);
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
        this.lastPosX = this.x;
        this.lastPosY = this.y;
        this.setPosition(posX, posY);

        if(this.lastPosX > this.x && this.direction != "left") {
            this.direction = "left";
            this.anims.play("left")             
        } else
        if(this.lastPosX < this.x && this.direction != "right") {
            this.direction = "right";
            this.anims.play("right")             
        } else
        if(this.lastPosY > this.y && this.direction != "up") {
            this.direction = "up";
            this.anims.play("up")             
        } else
        if(this.lastPosY < this.y && this.direction != "down") {
            this.direction = "down";
            this.anims.play("down")             
        }

        // health draw
        graphics.lineStyle(2, 0xff00, 0.5);
        graphics.strokeRoundedRect(
            this.x - this.width / 2,
            this.y + 22,
            this.width,
            4,
            0
        );
        graphics.fillStyle(0x00ff00, 1, 0.5);
        graphics.fillRect(
            this.x - this.width / 2,
            this.y + 22,
            (this.width * this.health) / this.maxHealth,
            4
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
