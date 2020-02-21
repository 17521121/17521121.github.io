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

        this.gameAngle = Math.atan(this.game.GAME_WIDTH / this.game.GAME_HEIGHT);

        this.init();
    }

    init() {
        this.posX = 0;
        this.posY = 0;
        this.speed = 5;

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
            this.posY + this.game.OFFSET_Y,
            this.game.CELL_SIZE,
            this.game.CELL_SIZE
        );
    }
 
    update() {
        // chim bay
        if(this.posX > this.game.GAME_WIDTH + 200 || this.posY > this.game.GAME_HEIGHT + 200) {
            return;
        }
        if(this.type == "bird") {
            
            this.posY += this.speed * Math.cos(this.gameAngle);
            this.posX += this.speed * Math.sin(this.gameAngle);
        }
    }

    findPath() {
        // return [100, 200];
    }
}
