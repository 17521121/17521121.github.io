class Tower {
    constructor(game) {
        this.game = game;

        this.name = null;
        this.speed = null;
        this.range = null;
        this.damage = null;
        this.level = null;
        this.image = null;
        this.bulletImage = null
        this.cost = null;
        this.MAX_UPGRADE = 5;
        this.upgradeCost = {
            "1": 70,
            "2": 110,
            "3": 180,
            "4": 240,
            "5": 320
        }
        this.init();
    }



    init() {
        this.level = 1;
        this.image = new Image();
        this.image.src = '/img/frozen.png';
        this.bulletImage = new Image();
        this.bulletImage.src = "/img/bullet2.png"
    }

    


    Gaydamage() {
        if (this.level == 1) return 1;
        if (this.level == 2) return 3;
        if (this.level == 3) return 5;
        if (this.level == 4) return 10;
        if (this.level == 5) return 20;
    }

    upgrade() {
        if (this.level == 1) {
            this.level = 2;
        }
    }

    skill() {

    }
}
