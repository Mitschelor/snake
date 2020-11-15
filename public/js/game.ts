class Snake {
    private positionX: number[];
    private positionY: number[];
    private height: number;
    private width: number;
    private xSpeed: number;
    private ySpeed: number;
    public moveTheSnake?: any;
    private canvas;
    private ctx;
    constructor(opts: SnakeConstruction) {
        this.positionX = [opts.positionX];
        this.positionY = [opts.positionY];
        this.height = opts.height;
        this.width = opts.width;
        this.xSpeed = 20;
        this.ySpeed = 0;
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
    }
    getPositionX() {
        return this.positionX[0];
    }
    getPositionY() {
        return this.positionY[0];
    }
    updateSnake() {
        this.ctx.fillStyle = "Black";
        this.positionX[0] += this.xSpeed;
        this.positionY[0] += this.ySpeed;
        if (this.positionX.length < 2 && this.positionY.length < 2) {
            this.ctx.clearRect(this.positionX[0] - this.xSpeed, this.positionY[0] - this.ySpeed, this.width, this.height);
            this.ctx.fillRect(this.positionX[0], this.positionY[0], this.height, this.width);
        } else {
            this.ctx.clearRect(this.positionX[0] - this.xSpeed, this.positionY[0] - this.ySpeed, this.width, this.height);
            this.ctx.fillRect(this.positionX[0], this.positionY[0], this.height, this.width);
            for (let x: number = this.positionX.length - 1; x > 0; x--) {
                for (let y: number = this.positionY.length - 1; y > 0; y--) {
                    if (x > 1 || y > 1) {
                        this.positionX[x] = this.positionX[x - 1] - this.xSpeed;                                    // I don't know why, but I have to subtract the speed
                        this.positionY[y] = this.positionY[y - 1] - this.ySpeed;                                    // in order for it to work correctly.
                        this.ctx.clearRect(this.positionX[x - 1], this.positionY[y - 1], this.width, this.height);  // And for some reason, clearRect doesn't work for the tail.
                        this.ctx.fillRect(this.positionX[x], this.positionY[y], this.height, this.width);
                    } else if (this.xSpeed != 0) {
                        this.positionX[x] = this.positionX[0] - this.xSpeed;
                        this.positionY[y] = this.positionY[0];
                        this.ctx.clearRect(this.positionX[x], this.positionY[y], this.width, this.height);
                        this.ctx.fillRect(this.positionX[x], this.positionY[y], this.height, this.width);
                    } else if (this.ySpeed != 0) {
                        this.positionX[x] = this.positionX[0];
                        this.positionY[y] = this.positionY[0] - this.ySpeed;
                        this.ctx.clearRect(this.positionX[x - 1], this.positionY[y - 1], this.width, this.height);
                        this.ctx.fillRect(this.positionX[x], this.positionY[y], this.height, this.width);
                    }
                }
            }
            console.log(`x: ${this.positionX}
                    y: ${this.positionY}`);
        }
    }
    move(xSpeed: number, ySpeed: number) {
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.moveTheSnake = setInterval(this.updateSnake.bind(this), 500);
    }
    makeLonger() {
        this.positionX.push(this.positionX[this.positionX.length - 1] - this.xSpeed);
        this.positionY.push(this.positionY[this.positionY.length - 1] - this.ySpeed);
    }
}

interface SnakeConstruction {
    positionX: number;
    positionY: number;
    height: number;
    width: number;
}

class Food {
    private possibleLocations: number[];
    private positionX: number;
    private positionY: number;
    private height: number;
    private width: number;
    private canvas;
    private context;

    constructor() {
        this.possibleLocations = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500, 520, 540, 560, 580, 600];
        this.positionX = this.possibleLocations[Math.floor(Math.random() * 30)];
        this.positionY = this.possibleLocations[Math.floor(Math.random() * 30)];
        this.height = 20;
        this.width = 20;
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.context = <CanvasRenderingContext2D>this.canvas.getContext("2d");
    }
    place() {
        this.positionX = this.possibleLocations[Math.floor(Math.random() * 30)];
        this.positionY = this.possibleLocations[Math.floor(Math.random() * 30)];
        this.context.fillStyle = "Red";
        this.context.clearRect(this.positionX, this.positionY, this.canvas.width, this.canvas.height);
        this.context.fillRect(this.positionX, this.positionY, this.width, this.height);
    }
    getPositionX() {
        return this.positionX;
    }
    getPositionY() {
        return this.positionY;
    }
}