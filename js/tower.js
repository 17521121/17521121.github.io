class Tower extends Phaser.Physics.Arcade.Sprite {
    //Type : range, melee, sample
    //name: power arrow frozen thunder
    constructor(scene, x, y, name, level = 0, isInit = true) {
        super(scene, x, y, `${name}`);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.Phaserscene = scene;

        this.level = level;
        this.isReady = true;
        this.range;
        this.price;
        this.recharge;

        this.setDepth(1);
        this.setInteractive();

        this.posX = (this.x - CELL_SIZE / 2) / CELL_SIZE;
        this.posY = (this.y - OFFSET_Y) / CELL_SIZE;
        if (isInit) {
            this.init();
        }
    }

    getUpgradeCost() {
        if (this.getName() == 'power1') {
            return 150;
        } else if (this.getName() == 'power2') {
            return 240;
        } else if (this.getName() == 'power3') {
            return 320;
        } else if (this.getName() == 'power4') {
            return 400;
        }

        if (this.getName() == 'frozen1') {
            return 120;
        } else if (this.getName() == 'frozen2') {
            return 180;
        } else if (this.getName() == 'frozen3') {
            return 240;
        } else if (this.getName() == 'frozen4') {
            return 320;
        }
    }

    getPrice() {
        //Sell price
        if (this.getName() == 'power0') {
            this.price = 110;
        } else if (this.getName() == 'power1') {
            this.price = 70;
        } else if (this.getName() == 'power2') {
            this.price = 110;
        } else if (this.getName() == 'power3') {
            this.price = 180;
        } else if (this.getName() == 'power4') {
            this.price = 240;
        } else if (this.getName() == 'power5') {
            this.price = 320;
        }

        //Sell price
        if (this.getName() == 'frozen0') {
            this.price = 80;
        } else if (this.getName() == 'frozen1') {
            this.price = 40;
        } else if (this.getName() == 'frozen2') {
            this.price = 110;
        } else if (this.getName() == 'frozen3') {
            this.price = 150;
        } else if (this.getName() == 'frozen4') {
            this.price = 170;
        } else if (this.getName() == 'frozen5') {
            this.price = 220;
        }

        return this.price;
    }

    getDisplaySize() {
        this.setDisplaySize(40, 40);
        if(this.getName() == "frozen2") {
            this.setDisplaySize(45, 45);
        } else
        if(this.getName() == "frozen3") {
            this.setDisplaySize(40, 40);
        } else
        if(this.getName() == "frozen4") {
            this.setDisplaySize(50, 50);
            // this.setTint()
        } else
        if(this.getName() == "frozen5") {
            this.setDisplaySize(70, 70);
        }
    }

    init() {
        this.price = this.getPrice();
        this.range = this.getRange();
        this.getDisplaySize();

        //buy sample tower
        if (this.getName().substr(-1) == '0') {
            this.on('pointerdown', pointer => {
                console.log('sampleTower clicked');
                //tạo tháp từ con trỏ chuột
                if (gold >= this.getPrice()) {
                    if (isBuying) {
                        tempTower.destroy();
                    }

                    isBuying = false;
                    this.Phaserscene.time.addEvent({
                        delay: 100,
                        callback: () => {
                            isBuying = true;
                        },
                        callbackScope: this,
                        loop: false
                    });

                    tempTower = new Tower(
                        this.Phaserscene,
                        pointer.x,
                        pointer.y,
                        this.getName(),
                        0,
                        false
                    );

                    tempTower.setDepth(-1);

                    tempTower.setAlpha(0.5);
                }
            });
        }

        //upgrade
        else {
            this.on('pointerdown', pointer => {
                if (!isBuying) {
                    console.log('tower clicked');
                    if (isTowerClicked) {
                        upgradeImage.destroy();
                        sellImage.destroy();
                    }
                    isTowerClicked = false;
                    this.Phaserscene.time.addEvent({
                        delay: 100,
                        callback: () => {
                            isTowerClicked = true;
                        },
                        callbackScope: this,
                        loop: false
                    });

                    upgradeImage = this.Phaserscene.physics.add.image(
                        this.x + CELL_SIZE / 2,
                        this.y - CELL_SIZE / 2,
                        'upgrade'
                    );
                    if (this.level == 5) {
                        upgradeImage.setAlpha(0.5);
                    }

                    upgradeImage.setInteractive();

                    upgradeImage.on('pointerdown', pointer => {
                        if (gold < this.getUpgradeCost()) {
                            return;
                        }
                        console.log('upgrade clicked');

                        if (this.level == 5) {
                            return;
                        }

                        gold -= this.getUpgradeCost();
                        goldText.setText(`Vàng: ${gold}`);

                        towers.splice(towers.indexOf(this), 1);

                        let tower = new Tower(
                            this.Phaserscene,
                            this.x,
                            this.y,
                            this.getNextLevelName(),
                            this.level + 1
                        );

                        isTowerClicked = false;
                        towers.push(tower);
                        upgradeImage.destroy();
                        this.destroy();
                        sellImage.destroy();
                    });
                    upgradeImage.setDisplaySize(25, 25);

                    sellImage = this.Phaserscene.physics.add.sprite(
                        this.x + CELL_SIZE / 2,
                        this.y + CELL_SIZE / 2,
                        'sell'
                    );

                    sellImage.play('rotate');
                    sellImage.setInteractive();

                    sellImage.on('pointerdown', pointer => {
                        console.log('sell clicked');
                        gold += this.getPrice();
                        goldText.setText(`Vàng: ${gold}`);
                        towers.splice(towers.indexOf(this), 1);

                        let square = new Square(
                            this.Phaserscene,
                            this.posX,
                            this.posY
                        );

                        COLLISION[this.posY][this.posX] = 0;
                        mazePuzzle = findWay(COLLISION, START_POS, END_POS);

                        isTowerClicked = false;
                        sellImage.destroy();
                        upgradeImage.destroy();
                        this.destroy();
                    });
                    sellImage.setDisplaySize(25, 25);
                }
            });
        }
    }

    getNextLevelName() {
        if (this.level == 5) return this.getName();
        return this.getName().slice(0, -1) + (this.level + 1);
    }

    getName() {
        return this.texture.key;
    }

    getRange() {
        if (this.getName() == 'power1') {
            this.range = 80;
        } else if (this.getName() == 'power2') {
            this.range = 80;
        } else if (this.getName() == 'power3') {
            this.range = 80;
        } else if (this.getName() == 'power4') {
            this.range = 80;
        } else if (this.getName() == 'power5') {
            this.range = 80;
        }

        if (this.getName() == 'frozen1') {
            this.range = 20;
        } else if (this.getName() == 'frozen2') {
            this.range = 22;
        } else if (this.getName() == 'frozen3') {
            this.range = 24;
        } else if (this.getName() == 'frozen4') {
            this.range = 26;
        } else if (this.getName() == 'frozen5') {
            this.range = 30;
        }
        this.range += CELL_SIZE;
        return this.range;
    }

    getCharge() {
        if (this.getName() == 'frozen1') {
            return 300;
        } else if (this.getName() == 'frozen2') {
            return 200;
        } else if (this.getName() == 'frozen3') {
            return 100;
        } else if (this.getName() == 'frozen4') {
            return 50;
        } else if (this.getName() == 'frozen5') {
            return 30;
        }
    }

    getBulletName() {
        if (this.getName() == 'frozen1') {
            return 'bullet1';
        } else if (this.getName() == 'frozen2') {
            return 'bullet2';
        } else if (this.getName() == 'frozen3') {
            return 'bullet3';
        } else if (this.getName() == 'frozen4') {
            return 'bullet4';
        } else if (this.getName() == 'frozen5') {
            return 'bullet5';
        }
    }

    shoot() {
        if (this.getName().slice(0, -1) == 'power') {
            return;
        }

        let minDistance = this.range;

        monsters.forEach(monster => {
            let dist = getDistance(this, monster);
            if (
                this.isReady && //sẵn sàng bắn // chờ nạp đạn
                minDistance > dist
            ) {
                minDistance = dist;
                this.target = monster;
            }
        });

        if (minDistance < this.range) {
            //nạp đạn
            // this.setTint('0xff00');
            // tower.setAlpha(0.5)
            this.rotation += 0.1;
            this.isReady = false;
            this.Phaserscene.time.addEvent({
                delay: this.getCharge(),
                callback: () => {
                    // this.clearTint();
                    this.isReady = true;
                },
                callbackScope: this.Phaserscene,
                loop: false
            });

            //Tạo đạn và bắn

            let bullet = new Bullet(
                this.Phaserscene,
                this.x,
                this.y,
                this.getBulletName(),
                this.level
            );
            bullet.target = this.target;
            this.target.aimed.push(bullet);

            this.Phaserscene.physics.add.overlap(
                bullet,
                bullet.target,
                dealDamage,
                null,
                this.Phaserscene
            );

            bullets.push(bullet);
        }
    }
}
