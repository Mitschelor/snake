class Snake {
    readonly height: number;
    readonly width: number;
    private positionX: number[];
    private positionY: number[];
    private xSpeed: number;
    private ySpeed: number;
    public moveTheSnake?: any;
    private counter: number;
    private total: number;
    private canvas;
    private ctx;
    constructor(opts: SnakeConstruction) {
        this.positionX = [opts.positionX];
        this.positionY = [opts.positionY];
        this.xSpeed = 20;
        this.ySpeed = 0;
        this.height = 20;
        this.width = 20;
        this.counter = 1;
        this.total = this.positionX.length;
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
    }
    getPositionX() {
        return this.positionX[0];
    }
    getPositionY() {
        return this.positionY[0];
    }
    clearCanvas(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    isCollision(xPosition: number[], yPosition: number[], index: number): boolean {
        if (xPosition[index] === this.positionX[0] && yPosition[index] === this.positionY[0] && index != 0) {
            return true;
        } else {
            return false;
        }
    }
    update(): void {
        this.ctx.fillStyle = "Black";
        for (let index: number = this.positionX.length - 1; index >= 0; index--) {
            this.ctx.clearRect(this.positionX[index], this.positionY[index], this.width, this.height);
        }
        this.positionX[0] += this.xSpeed;
        this.positionY[0] += this.ySpeed;
        if (this.positionX.length < 2) {
            this.ctx.fillRect(this.positionX[0], this.positionY[0], this.height, this.width);
            console.log(`x: ${this.positionX}
            y: ${this.positionY}`);
        } else if (this.positionX.length < 3) {
            for (let index: number = this.positionX.length - 1; index >= 0; index--) {
                if (index > 0) {
                    this.positionX[index] = this.positionX[index - 1] - xSpeed;
                    this.positionY[index] = this.positionY[index - 1] - ySpeed;
                    this.ctx.fillRect(this.positionX[index], this.positionY[index], this.height, this.width);
                } else {
                    this.ctx.fillRect(this.positionX[index], this.positionY[index], this.height, this.width);
                }
            }
            console.log(`Is < 3
            x: ${this.positionX}
            y: ${this.positionY}`);
        } else {
            for (let index: number = this.positionX.length - 1; index >= 0; index--) {
                if (index === 1) {
                    this.positionX[index] = this.positionX[index - 1] - xSpeed;
                    this.positionY[index] = this.positionY[index - 1] - ySpeed;
                    this.ctx.fillRect(this.positionX[index], this.positionY[index], this.height, this.width);
                } else if (index > 1) {
                    this.positionX[index] = this.positionX[index - 1];
                    this.positionY[index] = this.positionY[index - 1];
                    this.ctx.fillRect(this.positionX[index], this.positionY[index], this.height, this.width);
                }
                else {
                    this.ctx.fillRect(this.positionX[index], this.positionY[index], this.height, this.width);
                }
            }
            for (let index: number = this.positionX.length - 1; index > 0; index--) {
                if (this.isCollision(this.positionX, this.positionY, index)) {
                    clearInterval(this.moveTheSnake);
                    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    this.ctx.fillText("Game over!", 250, 250, 400);
                    this.positionX = [0];
                    this.positionY = [0];
                    return;
                }
            }
            console.log(`x: ${this.positionX}
            y: ${this.positionY}`);
        }
    }
    move(xSpeed: number, ySpeed: number) {
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.moveTheSnake = setInterval(this.update.bind(this), 500);
    }
    eat(): void {
        this.positionX.push(this.positionX[this.positionX.length - 1] - this.xSpeed);
        this.positionY.push(this.positionY[this.positionY.length - 1] - this.ySpeed);
        console.log(`Snake ate: x: ${this.positionX}
        y: ${this.positionY}`);
    }
}

interface SnakeConstruction {
    positionX: number;
    positionY: number;
}

class Food {
    private possibleLocations: number[];
    private positionX: number;
    private positionY: number;
    readonly height: number;
    readonly width: number;
    public foodPlacer?: any;
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
    draw() {
        this.context.fillStyle = "Red";
        this.context.clearRect(this.positionX, this.positionY, this.width, this.height);
        this.context.fillRect(this.positionX, this.positionY, this.width, this.height);
    }
    place() {
        this.positionX = this.possibleLocations[Math.floor(Math.random() * 30)];
        this.positionY = this.possibleLocations[Math.floor(Math.random() * 30)];
        this.foodPlacer = setInterval(this.draw.bind(this), 500);
    }
    getPositionX() {
        return this.positionX;
    }
    getPositionY() {
        return this.positionY;
    }
}