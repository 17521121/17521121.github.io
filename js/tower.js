class Tower extends Phaser.Physics.Arcade.Sprite {
    //Type : range, melee, sample
    //name: power arrow frozen thunder
    constructor(scene, x, y, name, level = 0, isInit = true) {
        super(scene, x, y, `${name}`);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.Phaserscene = scene;

        this.level = level;
        this.isReady = true;
        this.range = 800;
        this.price;

        this.setDisplaySize(40, 40);
        this.setDepth(-1);
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
        return this.price;
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
        return this.price;
    }

    init() {
        this.price = this.getPrice();
        //buy sample tower
        if (this.getName().substr(-1) == '0') {
            this.on('pointerdown', pointer => {
                //tạo tháp từ con trỏ chuột
                if (gold >= this.price) {
                    if (isBuying) {
                        tempTower.destroy();
                    }
                    isBuying = true;

                    tempTower = new Tower(
                        this.Phaserscene,
                        pointer.x,
                        pointer.y,
                        this.getName(),
                        0,
                        false
                    );

                    tempTower.setAlpha(0.5);
                }
            });
        }

        //upgrade
        else {
            this.on('pointerdown', pointer => {
                if (!isBuying) {
                    console.log('tower clicked');
                    let upgrade = this.Phaserscene.add.image(
                        this.x + CELL_SIZE / 2,
                        this.y - CELL_SIZE / 2,
                        'upgrade'
                    );

                    upgrade.setInteractive();

                    upgrade.on('pointerdown', pointer => {
                        console.log('upgrade clicked');

                        if (this.level == 5) {
                            upgrade.setAlpha(0.5);
                            return;
                        }

                        gold -= this.getUpgradeCost();
                        goldText.setText(`Vàng: ${gold}`);

                        let tower = new Tower(
                            this.Phaserscene,
                            this.x,
                            this.y,
                            this.getNextLevelName(),
                            this.level + 1
                        );
                        towers.splice(towers.indexOf(this), 1);
                        towers.push(tower);
                        upgrade.destroy();
                        this.destroy();
                        sell.destroy();
                    });
                    upgrade.setDisplaySize(25, 25);

                    let sell = this.Phaserscene.physics.add.sprite(
                        this.x + CELL_SIZE / 2,
                        this.y + CELL_SIZE / 2,
                        'sell'
                    );

                    sell.play('rotate');
                    sell.setInteractive();

                    sell.on('pointerdown', pointer => {
                        console.log('sell clicked');
                        gold += this.getPrice();
                        goldText.setText(`Vàng: ${gold}`);
                        towers.splice(towers.indexOf(this), 1);
                        // console.log(this)
                        let square = new Square(
                            this.Phaserscene,
                            this.posX,
                            this.posY
                        );
                        console.log(this);
                        sell.destroy();
                        upgrade.destroy();
                        this.destroy();
                    });
                    sell.setDisplaySize(25, 25);
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

    bullet() {}

    shoot() {}
}
