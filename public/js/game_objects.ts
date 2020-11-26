class Snake {
    readonly height: number;
    readonly width: number;
    private positionX: number[];
    private positionY: number[];
    private xSpeed: number;
    private ySpeed: number;
    public moveTheSnake?: any;
    private canvas;
    private ctx;
    constructor() {
        this.positionX = [20, 0];
        this.positionY = [20, 20];
        this.xSpeed = 20;
        this.ySpeed = 0;
        this.height = 20;
        this.width = 20;
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
    }
    getPositionX(): number[] {
        return this.positionX;
    }

    getPositionY(): number[] {
        return this.positionY;
    }

    clearCanvas(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private draw(index: number): void {
        this.ctx.fillRect(this.positionX[index], this.positionY[index], this.height, this.width);
    }

    private cleanUpBehind(): void {
        for (let index: number = this.positionX.length - 1; index >= 0; index--) {
            this.ctx.clearRect(this.positionX[index], this.positionY[index], this.width, this.height);
        }
    }

    private updateThePositionOfTheHead(): void {
        this.ctx.fillStyle = "Black";
        this.cleanUpBehind();
        this.positionX[0] += this.xSpeed;
        this.positionY[0] += this.ySpeed;
    }

    private wantsToGoThroughWall(): boolean {
        let isTouchingWall: boolean = this.positionX[0] <= -20 || this.positionX[0] >= 600 || this.positionY[0] <= -20 || this.positionY[0] >= 600;
        if (isTouchingWall) {
            return true;
        } else {
            return false;
        }
    }

    private letGoThroughWall(index: number): void {
        const isAtLeftWall: boolean = this.positionX[0] <= -20;
        const isAtRightWall: boolean = this.positionX[0] >= 600;
        const isAtTopWall: boolean = this.positionY[0] <= -20;
        if (isAtLeftWall) {
            this.positionX[0] = 580;
            this.draw(index);
        } else if (isAtRightWall) {
            this.positionX[0] = 0;
            this.draw(index);
        } else if (isAtTopWall) {
            this.positionY[0] = 580;
            this.draw(index);
        } else {
            this.positionY[0] = 0;
            this.draw(index);
        }
    }

    private drawTheHead(index: number): void {
        if (this.wantsToGoThroughWall()) {
            this.letGoThroughWall(index);
        } else {
            this.draw(index);
        }
    }

    private updateAndDrawTheTailBase(index: number): void {
        this.positionX[index] = this.positionX[index - 1] - this.xSpeed;
        this.positionY[index] = this.positionY[index - 1] - this.ySpeed;
        this.draw(index);
    }

    private updateAndDrawTheTail(index: number): void {
        this.positionX[index] = this.positionX[index - 1];
        this.positionY[index] = this.positionY[index - 1];
        this.draw(index);
    }

    private isCollision(xPosition: number[], yPosition: number[], index: number): boolean {
        let isBitingItsTail: boolean = xPosition[index] === this.positionX[0] && yPosition[index] === this.positionY[0] && index != 0;
        if (isBitingItsTail) {
            return true;
        } else {
            return false;
        }
    }

    private movementOfTheShortSnake(): void {
        for (let index: number = this.positionX.length - 1; index >= 0; index--) {
            let isTheHead: boolean = index > 0;
            if (isTheHead) {
                this.updateAndDrawTheTailBase(index);
            } else {
                this.drawTheHead(index);
            }
        }
    }

    private movementOfTheLongSnake(): void {
        for (let index: number = this.positionX.length - 1; index >= 0; index--) {
            let isTheTailBase: boolean = index === 1;
            let isTheHead: boolean = index > 1;
            if (isTheTailBase) {
                this.updateAndDrawTheTailBase(index);
            } else if (isTheHead) {
                this.updateAndDrawTheTail(index);
            } else {
                this.drawTheHead(index);
            }
        }
    }

    private die(): void {
        clearInterval(this.moveTheSnake);
        clearInterval(food.foodPlacer);
        this.clearCanvas();
        this.ctx.fillText("Game over!", 250, 250, 400);
        this.positionX = [20, 0];
        this.positionY = [20, 20];
    }

    private checkForCollision(): void {
        for (let index: number = this.positionX.length - 1; index > 0; index--) {
            if (this.isCollision(this.positionX, this.positionY, index)) {
                this.die();
                return;
            }
        }
    }

    private updateAndDrawEntireSnake(): void {
        this.updateThePositionOfTheHead();
        if (this.positionX.length < 3) {
            this.movementOfTheShortSnake();
            this.checkForCollision();
        } else {
            this.movementOfTheLongSnake();
            this.checkForCollision();
        }
    }

    private calculatePositionOfTheNewPartOfTheTail(position: number[], speed: number): number {
        let newPosition: number;
        let speedIsZero: boolean = speed === 0;
        if (speedIsZero) {
            newPosition = position[position.length - 1];
        } else {
            newPosition = position[position.length - 1] - speed;
        }
        return newPosition;
    }

    move(xSpeed: number, ySpeed: number): void {
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.moveTheSnake = setInterval(this.updateAndDrawEntireSnake.bind(this), 500);
    }

    eat(): void {
        for (let i: number = 0; i < 2; i++) {
            this.positionX.push(this.calculatePositionOfTheNewPartOfTheTail(this.positionX, this.xSpeed));
            this.positionY.push(this.calculatePositionOfTheNewPartOfTheTail(this.positionY, this.ySpeed));
        }
    }
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

    private draw(): void {
        this.context.fillStyle = "Red";
        this.context.clearRect(this.positionX, this.positionY, this.width, this.height);
        this.context.fillRect(this.positionX, this.positionY, this.width, this.height);
    }

    place(): void {
        this.positionX = this.possibleLocations[Math.floor(Math.random() * 30)];
        this.positionY = this.possibleLocations[Math.floor(Math.random() * 30)];
        food.foodPlacer = setInterval(food.draw.bind(food), 10);
        this.foodPlacer;
    }

    getPositionX() {
        return this.positionX;
    }

    getPositionY() {
        return this.positionY;
    }
}