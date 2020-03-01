class Square extends Phaser.Physics.Arcade.Sprite {
    //Type : range, melee, sample
    //name: power arrow frozen thunder
    constructor(scene, x, y) {
        super(scene, x * CELL_SIZE + 20, y * CELL_SIZE + OFFSET_Y, `square`);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.Phaserscene = scene;
        this.setDisplaySize(40, 45);
        this.setInteractive();
        this.posX = x;
        this.posY = y;

        this.init();
    }

    init() {
        //decide buy
        
        this.on('pointerdown', pointer => {
            console.log('clicked square');
            if (isBuying && gold >= 70) {
                //Check isOkPath
                // pathOfMonsters.forEach()

                //if
                //Kiểm tra xây được không

                //Cập nhật lại đường đi quái vật landing
                //end if

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
