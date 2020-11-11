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
    constructor(opts: PaintOptions) {
        this.positionX = opts.positionX;
        this.positionY = opts.positionY;
        this.height = opts.height;
        this.width = opts.width;
        this.xSpeed = 0.5;
        this.ySpeed = 0;
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
    }
    updateSnake() {
        this.positionX = this.positionX + this.xSpeed;
        this.positionY = this.positionY + this.ySpeed;
        console.log(`Update: xSpeed: ${this.xSpeed}
        ySpeed: ${this.ySpeed}`);
        this.ctx.clearRect(this.positionX - 2 * this.xSpeed, this.positionY - 2 * this.ySpeed, this.width * 5, this.height * 5);
        this.ctx.beginPath();
        this.ctx.fillRect(this.positionX, this.positionY, this.height, this.width);
    }
    move(xSpeed: number, ySpeed: number) {
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.moveTheSnake = setInterval(this.updateSnake.bind(this), 10);
    }
}
interface PaintOptions {
    positionX: number;
    positionY: number;
    height: number;
    width: number;
}
