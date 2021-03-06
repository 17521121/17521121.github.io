class Square extends Phaser.Physics.Arcade.Sprite {
    //Type : range, melee, sample
    //name: power arrow frozen thunder
    constructor(scene, x, y, isInit = true) {
        super(scene, x * CELL_SIZE + 20, y * CELL_SIZE + OFFSET_Y, "square");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.Phaserscene = scene;
        this.posX = x;
        this.posY = y;
        this.setAlpha(0.1);
        // this.setDepth(2)
        if(isInit) {
            this.init();
        }
    }
    
    init() {
        //decide buy
        this.setDisplaySize(50, 50);
        this.setInteractive();
        
        this.on('pointerdown', pointer => {

            this.setAlpha(0.1)

            // console.log('clicked square');
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

                        let pre = [
                            parseInt((monsters[i].y - OFFSET_Y) / CELL_SIZE),
                            parseInt(monsters[i].x / CELL_SIZE)
                        ];

                        let prePath = findWay(COLLISION, pre, END_POS);
                        
                        if (!prePath) {
                            COLLISION[this.posY][this.posX] = 0;
                            return;
                        }
                        
                        if(
                            (prePath[0][1]*CELL_SIZE + CELL_SIZE/2 > monsters[i].x && monsters[i].x > prePath[1][1]*CELL_SIZE + CELL_SIZE/2)
                            ||
                            (prePath[0][1]*CELL_SIZE + CELL_SIZE/2 < monsters[i].x && monsters[i].x < prePath[1][1]*CELL_SIZE + CELL_SIZE/2)
                            ||
                            (prePath[0][0] * CELL_SIZE + OFFSET_Y > monsters[i].y && monsters[i].y > prePath[1][0] * CELL_SIZE + OFFSET_Y)
                            ||
                            (prePath[0][0] * CELL_SIZE + OFFSET_Y < monsters[i].y && monsters[i].y < prePath[1][0] * CELL_SIZE + OFFSET_Y)
                        ) {
                            prePath.splice(0,1)
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


                gold -= tempTower.getPrice();
                goldText.setText(`${gold}`);

                this.destroy();
                towers.push(tower);
            }
        });

        this.on('pointerover', pointer => {
            if(isBuying) {
                this.setAlpha(1)
                
            }
        })

        this.on("pointerout", pointer => {
            if(isBuying) {
                this.setAlpha(0.1)
            }
        })
    }
}
