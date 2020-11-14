class Snake {
    private positionX: number;
    private positionY: number;
    private height: number;
    private width: number;
    private xSpeed: number;
    private ySpeed: number;
    public moveTheSnake?: any;
    private canvas;
    private ctx;
    constructor(opts: SnakeConstruction) {
        this.positionX = opts.positionX;
        this.positionY = opts.positionY;
        this.height = opts.height;
        this.width = opts.width;
        this.xSpeed = 20;
        this.ySpeed = 0;
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
    }
    updateSnake() {
        this.positionX = this.positionX + this.xSpeed;
        this.positionY = this.positionY + this.ySpeed;
        this.ctx.fillStyle = "Black";
        this.ctx.clearRect(this.positionX - this.xSpeed, this.positionY - this.ySpeed, this.width, this.height);
        this.ctx.fillRect(this.positionX, this.positionY, this.height, this.width);
    }
    move(xSpeed: number, ySpeed: number) {
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.moveTheSnake = setInterval(this.updateSnake.bind(this), 500);
    }
}

interface SnakeConstruction {
    positionX: number;
    positionY: number;
    height: number;
    width: number;
}

class Food {
    private positionX: number;
    private positionY: number;
    private height: number;
    private width: number;
    private canvas;
    private context;

    constructor() {
        this.positionX = Math.floor(Math.random() * 600);
        this.positionY = Math.floor(Math.random() * 600);
        this.height = 15;
        this.width = 15;
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.context = <CanvasRenderingContext2D>this.canvas.getContext("2d");
    }
    place() {
        this.context.fillStyle = "Red";
        this.context.clearRect(this.positionX, this.positionY, this.canvas.width, this.canvas.height);
        this.context.fillRect(this.positionX, this.positionY, this.width, this.height);
    }
}

