class Game {
    constructor() {
        this.wave = {
            quantity: null,
            name: null
        };
        this.ctx = null;
        this.canvas = null;

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
            name: 1,
            quantity: 1
        };
        this.canvas = document.getElementById('myCanvas');
        this.ctx = this.canvas.getContext('2d');
        for(let i = 0; i<this.wave.quantity;i++) {
            let monster= new Monster(this);
            this.monsterList.push(monter)
        }
        // this.monster = new Monster(this);

        this.square = new Image();
        this.square.src = '/img/square.png';
    }

    update() {
        this.monster.update();
    }

    draw() {
        //ve o luoi grid
        for (let i = 0; i < this.GAME_HEIGHT / this.CELL_SIZE; i++) {
            for (let j = 0; j < this.GAME_WIDTH / this.CELL_SIZE; j++) {
                if (!this.COLLISION[i][j]) {
                    this.ctx.drawImage(
                        this.square,
                        j * this.CELL_SIZE,
                        i * this.CELL_SIZE,
                        this.CELL_SIZE,
                        this.CELL_SIZE
                    );
                } else {
                    this.ctx.fillStyle = 'f00';
                    this.ctx.fillRect(
                        j * this.CELL_SIZE,
                        i * this.CELL_SIZE,
                        this.CELL_SIZE,
                        this.CELL_SIZE
                    );
                }
            }
        }

        //ve monster
        this.monster.draw();
    }

    gameloop() {
        this.ctx.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
        this.draw();
        this.update();
        requestAnimationFrame(() => this.gameloop());
    }
}

// function handleMouseMove(evt) {
//   var rect = game.canvas.getBoundingClientRect();
//   console.log({
//     x:
//       ((evt.clientX - rect.left) / (rect.right - rect.left)) *
//       game.canvas.width,
//     y:
//       ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * game.canvas.height
//   });
// }

// document
//   .getElementById('myCanvas')
//   .addEventListener('mousemove', e => handleMouseMove(e));
