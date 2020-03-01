class Bullet extends Phaser.Physics.Arcade.Sprite {
    //Type : range, melee, sample
    //name: power arrow frozen thunder
    constructor(scene, x, y, name, level) {
        super(scene, x, y, `${name}`);
        scene.add.existing(this);
        scene.physics.add.existing(this)
        this.Phaserscene = scene;
      
        this.setDepth(1);

        this.level = level
        this.type;
        this.speed;
        this.damage;
        this.target;

        this.init();
    }

    init() {
        this.setInteractive(new Phaser.Geom.Circle(
            512, 512, 512
        ), Phaser.Geom.Circle.Contains);
        this.setTint("0xffffff")
        this.setDisplaySize(30, 30);
        this.speed = 200
        // console.log(this.setCircle)
        // this.setCircle(45)
        this.setCircle(45)
    }

    getName() {
        return this.texture.key;
    }
}
