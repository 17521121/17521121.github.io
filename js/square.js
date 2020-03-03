class Square extends Phaser.Physics.Arcade.Sprite {
    //Type : range, melee, sample
    //name: power arrow frozen thunder
    constructor(scene, x, y) {
        super(scene, x * CELL_SIZE + 20, y * CELL_SIZE + OFFSET_Y, `square`);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.Phaserscene = scene;
        this.setDisplaySize(40, 45);
        this.setInteractive();
        this.posX = x;
        this.posY = y;
        this.setAlpha(0.1);
        // this.setDepth(0)
        this.init();
    }

    init() {
        //decide buy

        this.on('pointerdown', pointer => {
            console.log('clicked square');
            if (isBuying && gold >= 70) {
                //Check isOkPath

                COLLISION[this.posY][this.posX] = 1;
                let temp = findWay(COLLISION, START_POS, END_POS);
                //not ok
                if (!temp) {
                    COLLISION[this.posY][this.posX] = 0;
                    return;
                }

                let tempPath = [];
                for (let i = 0; i < monsters.length; i++) {
                    if (monsters[i].type == 'landing') {
                        // let pre = [
                        //     parseInt((monsters[i].y - OFFSET_Y) / CELL_SIZE),
                        //     parseInt(monsters[i].x / CELL_SIZE)
                        // ];

                        let pre = [
                            Math.ceil((monsters[i].y - OFFSET_Y) / CELL_SIZE),
                            Math.ceil(monsters[i].x / CELL_SIZE)
                        ];

                        let prePath = findWay(COLLISION, pre, END_POS);
                        if (!prePath) {
                            COLLISION[this.posY][this.posX] = 0;
                            return;
                        }
                        tempPath.push(prePath);
                    } else {
                        tempPath.push([]);
                    }
                }

                //ok

                mazePuzzle = temp;
                //Cập nhật lại đường đi quái vật landing
                monsters.forEach((m, index) => {
                    m.createPath(tempPath[index]);
                });

                let tower = new Tower(
                    this.Phaserscene,
                    this.x,
                    this.y,
                    tempTower.getNextLevelName(),
                    1
                );

                gold -= tower.getPrice();
                goldText.setText(`Vàng: ${gold}`);

                this.destroy();
                towers.push(tower);
            }
        });
    }
}
