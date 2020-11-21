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
    isMovingOnXAxis(): boolean {
        for (let y: number = this.positionY.length - 1; y > 0; y--) {
            if (this.positionY[y] === this.positionY[y - 1]) {
                this.counter += 1;
            } else {
                this.counter = this.counter;
            }
        }
        if (this.counter === this.positionY.length) {
            return true;
        } else {
            return false;
        }
    }
    isMovingOnYAxis(): boolean {
        for (let x: number = this.positionX.length - 1; x > 0; x--) {
            if (this.positionX[x] === this.positionX[x - 1]) {
                this.counter += 1;
            } else {
                this.counter = this.counter;
            }
        }
        if (this.counter === this.positionX.length) {
            return true;
        } else {
            return false;
        }
    }
    howManyValuesAreTheSame(position: number[]) {
        this.counter = 0;
        for (let i: number = 0; i < position.length - 1; i++) {
            if (position[i] === position[i - 1]) {
                this.counter += 1;
            } else {
                this.counter = this.counter;
            }
        }
        return this.counter;
    }
    initiateTurn(firstPosition: number[], secondPosition: number[], speed: number, firstIndex: number, secondIndex: number) {
        if (firstIndex === 1) {
            firstPosition[firstIndex] = firstPosition[firstIndex];
            console.log(`x: ${firstPosition}`);
        } else {
            firstPosition[firstIndex] += speed;
            console.log(`x: ${firstPosition}`);
        }
        if (secondIndex === 1) {
            if (secondPosition[secondIndex] < secondPosition[secondIndex - 1]) {
                secondPosition[secondIndex] += speed;
                console.log(`y: ${secondPosition}`);
            } else {
                secondPosition[secondIndex] = secondPosition[secondIndex];
            }
        } else if (secondIndex > 1 && secondPosition[secondIndex] < secondPosition[secondIndex - 1]) {
            secondPosition[secondIndex] += speed;
            console.log(`y: ${secondPosition}`);
        } else {
            secondPosition[secondIndex] = secondPosition[secondIndex];
        }
    }
    moveWhenGoingStraight(position: number[], speed: number, index: number) {
        if (position[index] < position[index - 1]) {
            if (index === 1) {
                console.log("Index is 1");
                if (position[index] === position[index + 1]) {
                    position[index] += speed;
                    console.log(`x:: ${position}`);
                } else {
                    position[index] = position[index];
                    console.log(`x: ${position}`);
                }
            } else {
                position[index] += speed;
                console.log(`x: ${position}`);
            }
        } else {
            position[index] = position[index];
            console.log(`x: ${position}`);
        }
    }
    moveWhenInATurn(firstPosition: number[], secondPosition: number[], speed: number, firstIndex: number, identicalValues: number) {
        console.log(`Identical: ${identicalValues}`);
        if (firstPosition[1] - firstPosition[0] > 20 || firstPosition[1] - firstPosition[0] < -20) {
            firstPosition[1] += speed;
        }
        if (firstIndex === 0 || firstIndex === 1) {
            firstPosition[firstIndex] = firstPosition[firstIndex];
            console.log(`x: ${firstPosition}`);
        } else {
            if (firstPosition[firstIndex] === firstPosition[firstIndex - 1]) {
                console.log(`${firstIndex} is 20`);
                firstPosition[firstIndex] = firstPosition[firstIndex];
                console.log(`x: ${firstPosition}`);
            } else if (firstPosition[firstIndex] - firstPosition[firstIndex - 1] > 20 || firstPosition[firstIndex] - firstPosition[firstIndex - 1] < -20) {
                firstPosition[firstIndex] += speed;
            } else {
                firstPosition[firstIndex] = firstPosition[firstIndex];
                console.log(`x: ${firstPosition}`);
            }
        }
        if (secondPosition[1] - secondPosition[0] > 20 || secondPosition[1] - secondPosition[0] < -20) {
            secondPosition[1] += speed;
        }
        if (firstIndex === 0 || firstIndex === 1) {
            secondPosition[firstIndex] = secondPosition[firstIndex];
            console.log(`y: ${secondPosition}`);
        } else {
            if (identicalValues === firstIndex) {
                secondPosition[firstIndex] = secondPosition[firstIndex];
            } else {
                if (secondPosition[firstIndex] === secondPosition[firstIndex - 1]) {
                    secondPosition[firstIndex] = secondPosition[firstIndex];
                } else {
                    secondPosition[firstIndex] += speed;
                }
            }
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
                    // this.positionX[index] = this.positionX[index - 1];
                    // this.positionY[index] = this.positionY[index - 1];
                    this.ctx.fillRect(this.positionX[index], this.positionY[index], this.height, this.width);
                }
            }
            console.log(`x: ${this.positionX}
            y: ${this.positionY}`);
        }

        // if (this.isMovingOnYAxis()) {
        //     console.log("Is moving on y Axis");
        //     this.positionX[0] += this.xSpeed;
        //     this.positionY[0] += this.ySpeed;
        //     for (let y: number = this.positionY.length - 1; y > 0; y--) {
        //         for (let x: number = this.positionX.length - 1; x > 0; x--) {
        //             if (this.positionX[x - 1] > this.positionX[x]) {
        //                 this.initiateTurn(this.positionX, this.positionY, this.xSpeed, x, y);
        //                 this.ctx.clearRect(this.positionX[0] - this.xSpeed, this.positionY[0] - this.ySpeed, this.width, this.height);
        //                 this.ctx.fillRect(this.positionX[0], this.positionY[0], this.height, this.width);
        //             } else {
        //                 this.moveWhenGoingStraight(this.positionY, this.ySpeed, y);
        //                 this.ctx.clearRect(this.positionX[0] - this.xSpeed, this.positionY[0] - this.ySpeed, this.width, this.height);
        //                 this.ctx.fillRect(this.positionX[0], this.positionY[0], this.height, this.width);
        //             }
        //         }
        //     }
        // } else if (this.isMovingOnXAxis()) {
        //     console.log("Is moving on x Axis");
        //     this.positionX[0] += this.xSpeed;
        //     this.positionY[0] += this.ySpeed;
        //     for (let x: number = this.positionX.length - 1; x > 0; x--) {
        //         for (let y: number = this.positionY.length - 1; y > 0; y--) {
        //             if (this.positionY[y - 1] > this.positionY[y]) {
        //                 this.initiateTurn(this.positionY, this.positionX, this.ySpeed, y, x);
        //                 this.ctx.clearRect(this.positionX[0] - this.xSpeed, this.positionY[0] - this.ySpeed, this.width, this.height);
        //                 this.ctx.fillRect(this.positionX[0], this.positionY[0], this.height, this.width);
        //             } else {
        //                 this.moveWhenGoingStraight(this.positionX, this.xSpeed, x);
        //                 this.ctx.clearRect(this.positionX[0] - this.xSpeed, this.positionY[0] - this.ySpeed, this.width, this.height);
        //                 this.ctx.fillRect(this.positionX[0], this.positionY[0], this.height, this.width);
        //             }
        //         }
        //     }
        // } else {
        //     console.log("Is in a curve");
        //     this.positionX[0] += this.xSpeed;
        //     this.positionY[0] += this.ySpeed;
        //     const identicalValuesX: number = this.howManyValuesAreTheSame(this.positionX);
        //     const identicalValuesY: number = this.howManyValuesAreTheSame(this.positionY);
        //     for (let x: number = this.positionX.length - 1; x > 0; x--) {
        //         if (this.xSpeed != 0) {
        //             this.moveWhenInATurn(this.positionX, this.positionY, this.xSpeed, x, identicalValuesY);
        //             this.ctx.clearRect(this.positionX[0] - this.xSpeed, this.positionY[0] - this.ySpeed, this.width, this.height);
        //             this.ctx.fillRect(this.positionX[0], this.positionY[0], this.height, this.width);
        //         } else {
        //             this.moveWhenInATurn(this.positionY, this.positionX, this.ySpeed, x, identicalValuesX);
        //             this.ctx.clearRect(this.positionX[0] - this.xSpeed, this.positionY[0] - this.ySpeed, this.width, this.height);
        //             this.ctx.fillRect(this.positionX[0], this.positionY[0], this.height, this.width);
        //         }
        //     }
        // }
        // this.ctx.fillStyle = "Black";
        // this.positionX[0] += this.xSpeed;
        // this.positionY[0] += this.ySpeed;
        // if (this.positionX.length < 2 && this.positionY.length < 2) {
        //     this.ctx.clearRect(this.positionX[0] - this.xSpeed, this.positionY[0] - this.ySpeed, this.width, this.height);
        //     this.ctx.fillRect(this.positionX[0], this.positionY[0], this.height, this.width);
        // } else {
        //     this.ctx.clearRect(this.positionX[0] - this.xSpeed, this.positionY[0] - this.ySpeed, this.width, this.height);
        //     this.ctx.fillRect(this.positionX[0], this.positionY[0], this.height, this.width);
        //     for (let x: number = this.positionX.length - 1; x > 0; x--) {
        //         for (let y: number = this.positionY.length - 1; y > 0; y--) {
        //             if (x > 1 || y > 1) {
        //                 this.positionX[x] = this.positionX[x - 1];                                                     // I don't know why, but I have to subtract the speed
        //                 this.positionY[y] = this.positionY[y - 1];                                                     // in order for it to work correctly. But hey, problems that don't make sense, require solutions that don't make sense.
        //                 this.ctx.clearRect(this.positionX[x - 1], this.positionY[y - 1], this.width, this.height);     // And for some reason, clearRect doesn't work for the tail.
        //                 this.ctx.fillRect(this.positionX[x], this.positionY[y], this.height, this.width);
        //             } else if (this.xSpeed != 0) {
        //                 this.positionX[x] = this.positionX[0] - this.xSpeed;
        //                 this.positionY[y] = this.positionY[0];
        //                 this.ctx.clearRect(this.positionX[x], this.positionY[y], this.width, this.height);
        //                 this.ctx.fillRect(this.positionX[x], this.positionY[y], this.height, this.width);
        //             } else if (this.ySpeed != 0) {
        //                 this.positionX[x] = this.positionX[0];
        //                 this.positionY[y] = this.positionY[0] - this.ySpeed;
        //                 this.ctx.clearRect(this.positionX[x - 1], this.positionY[y - 1], this.width, this.height);
        //                 this.ctx.fillRect(this.positionX[x], this.positionY[y], this.height, this.width);
        //             }
        //         }
        //     }
        //     console.log(`x: ${this.positionX}
        //             y: ${this.positionY}`);
        // }
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