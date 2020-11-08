class Snake {
    positionX;
    positionY;
    private height;
    private width;
    private canvas;
    private ctx;
    constructor(opts: PaintOptions) {
        this.positionX = opts.positionX;
        this.positionY = opts.positionY;
        this.height = opts.height;
        this.width = opts.width;
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
    }
    paint(horizontalMovement: number, verticalMovement: number) {
        this.ctx.clearRect(this.positionX, this.positionY, this.width, this.height);
        this.positionX += horizontalMovement;
        this.positionY += verticalMovement;
        this.ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
    }
    move(horizontalMovement: number, verticalMovement: number) {
        setInterval(this.paint.bind(this, horizontalMovement, verticalMovement), 10);
    }
}
interface PaintOptions {
    positionX: number;
    positionY: number;
    height: number;
    width: number;
}
const snake = new Snake({
    positionX: 20,
    positionY: 20,
    height: 20,
    width: 20
});

console.log(`x: ${snake.positionX}
y: ${snake.positionY}`);


snake.move(0.5, 0);