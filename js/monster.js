class Monster {
    constructor(game) {
        this.game = game;
        this.speed = null;
        this.hp = null;
        this.posX = null;
        this.posY = null;
        this.name = null;
        this.image = null;
        this.type = null;
        this.init();
    }

    init() {
        this.posX = 0;
        this.posY = 0;
        this.speed = 4;

        this.image = new Image();
      
        this.image.src = '/img/bigBee.png';
        this.name = 'bigBee';
        this.type = "bird"
    }

    draw() {
        // vẽ crep
        this.game.ctx.drawImage(
            this.image,
            this.posX,
            this.posY,
            this.game.CELL_SIZE,
            this.game.CELL_SIZE
        );
    }
 
    update() {
        // chim bay
        console.log(this.posX, this.posY);
        if(this.posX > this.game.GAME_WIDTH || this.posY > this.game.GAME_HEIGHT) {
            return;
        }
        if(this.type == "bird") {
            let angle = Math.atan(this.game.GAME_WIDTH / this.game.GAME_HEIGHT);
            this.posY += this.speed * Math.cos(angle);
            this.posX += this.speed * Math.sin(angle);
        }
    }

    findPath() {
        // return [100, 200];
    }
}
