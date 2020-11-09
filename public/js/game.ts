class Snake {
    private positionX: number;
    private positionY: number;
    private height: number;
    private width: number;
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
        this.ctx.clearRect(this.positionX - horizontalMovement, this.positionY - verticalMovement, this.width, this.height);
        this.positionX += horizontalMovement;
        this.positionY += verticalMovement;
        console.log(`x: ${horizontalMovement},
        y: ${verticalMovement}`);
        this.ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
    }
    moveRight() {
        setInterval(this.paint.bind(this, 0.5, 0), 10);
    }
    moveDown() {
        setInterval(this.paint.bind(this, 0, 0.5), 10);
    }
    /*stop(horizontalMovement: number, verticalMovement: number) {
        this.ctx.clearRect(this.positionX - horizontalMovement, this.positionY - verticalMovement, this.width, this.height);
        this.ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
    }*/
}
interface PaintOptions {
    positionX: number;
    positionY: number;
    height: number;
    width: number;
}
