class Game {
    constructor() {
        this.wave = {
            quantity: null,
            id: null
        };
        this.ctx = null;
        this.canvas = null;
        this.life = null;

        this.OFFSET_Y = 100;
        this.OFFSET_RIGHT_X = 180;
        this.OFFSET_RIGHT_Y = 30;
        this.GAME_WIDTH = 500;
        this.GAME_HEIGHT = 500;
        this.CELL_SIZE = 40;
        this.START_POS = {
            x: 0,
            y: 0
        };
        this.monster = null;
        this.square = null;
        this.monsterList = [];
        this.gold = null;
        this.tower = null;
        this.tower1 = null;
        this.COLLISION = [
            [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        this.init();
        requestAnimationFrame(() => this.gameloop());
    }

    init() {
        this.wave = {
            id: 1,
            quantity: 1
        };

        this.life = 10;
        this.gold = 250;

        this.canvas = document.getElementById('myCanvas');
        this.ctx = this.canvas.getContext('2d');

        for (let i = 0; i < this.wave.quantity; i++) {
            let monster = new Monster(this);
            this.monsterList.push(monster);
        }

        this.tower = new Tower(this);
        this.tower1 = new Tower(this);

        this.square = new Image();
        this.square.src = '/img/square.png';
    }

    update() {
        this.monsterList.map((T, i) => T.update());
    }

    draw() {
        //ve o luoi grid
        for (let i = 0; i < this.GAME_HEIGHT / this.CELL_SIZE; i++) {
            for (let j = 0; j < this.GAME_WIDTH / this.CELL_SIZE; j++) {
                if (!this.COLLISION[i][j]) {
                    this.ctx.drawImage(
                        this.square,
                        j * this.CELL_SIZE,
                        i * this.CELL_SIZE + this.OFFSET_Y,
                        this.CELL_SIZE,
                        this.CELL_SIZE
                    );
                } else {
                    this.ctx.fillStyle = 'red';
                    this.ctx.fillRect(
                        j * this.CELL_SIZE,
                        i * this.CELL_SIZE + this.OFFSET_Y,
                        this.CELL_SIZE,
                        this.CELL_SIZE
                    );
                }
            }
        }

        //Vẽ shop tháp
        this.ctx.font = '40px Arial';
        this.ctx.strokeText('Tháp', 560, 200);
        this.ctx.strokeText('Skill', 560, 420);

        this.ctx.drawImage(this.tower.image, 560, 220, 40, 40);
        this.ctx.drawImage(this.tower1.image, 560, 270, 40, 40);
        this.ctx.drawImage(this.tower1.image, 560, 320, 40, 40);
        this.ctx.drawImage(this.tower1.image, 620, 220, 40, 40);
        this.ctx.drawImage(this.tower1.image, 620, 270, 40, 40);
        this.ctx.drawImage(this.tower1.image, 620, 320, 40, 40);

        this.ctx.strokeRect(560, 220, 40, 40);
        this.ctx.strokeRect(560, 270, 40, 40);
        this.ctx.strokeRect(560, 320, 40, 40);
        this.ctx.strokeRect(620, 220, 40, 40);
        this.ctx.strokeRect(620, 270, 40, 40);
        this.ctx.strokeRect(620, 320, 40, 40);

        this.ctx.fillStyle = 'black';
        this.ctx.font = '20px roboto';
        this.ctx.bo;
        this.ctx.fillText(`Vàng : ${this.gold}`, 560, 150);
        this.ctx.fillText('Cửa vào', -5, 90);
        this.ctx.fillText('Cửa ra', 450, 635);
        this.ctx.fillText('Đợt', 300, 80);

        //ve monster
        this.monsterList.map((T, i) => T.draw());
    }

    gameloop() {
        //tạo đợt quái

        this.ctx.clearRect(
            0,
            0,
            this.GAME_WIDTH + this.OFFSET_RIGHT_X + 50,
            this.GAME_HEIGHT + this.OFFSET_Y + this.OFFSET_RIGHT_Y + 50
        );
        this.draw();
        this.update();
        // console.log(this.ctx)
        requestAnimationFrame(() => this.gameloop());
    }
}

function handleMouseMove(evt) {
    let rect = game.canvas.getBoundingClientRect();
    pos = {
        x:
            ((evt.clientX - rect.left) / (rect.right - rect.left)) *
            game.canvas.width,
        y:
            ((evt.clientY - rect.top) / (rect.bottom - rect.top)) *
            game.canvas.height
    };
    console.log('Mouse pos: ', pos);
    return pos;
}

document.getElementById('myCanvas').addEventListener('mousemove', e => handleMouseMove(e))
document.getElementById('myCanvas').addEventListener('mousedown', e => handleMouseMove(e))
document.getElementById('myCanvas').addEventListener('mouseup', e => handleMouseMove(e))
document.getElementById('myCanvas').addEventListener('mouseover', e => handleMouseMove(e))
document.getElementById('myCanvas').addEventListener('contextmenu', e => handleMouseMove(e)) // right click
  
