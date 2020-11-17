let xPosition: number[] = [80, 80, 80, 80, 80];
let yPosition: number[] = [160, 140, 120, 100, 80];

const isMovingOnXAxis = (): boolean => {
    let counter: number = 1;
    for (let y: number = yPosition.length - 1; y > 0; y--) {
        if (yPosition[y] === yPosition[y - 1]) {
            counter += 1;
        } else {
            counter = counter;
        }
    }
    if (counter === yPosition.length) {
        return true;
    } else {
        return false;
    }
};

const isMovingOnYAxis = (): boolean => {
    let counter: number = 1;
    for (let x: number = xPosition.length - 1; x > 0; x--) {
        if (xPosition[x] === xPosition[x - 1]) {
            counter += 1;
        } else {
            counter = counter;
        }
    }
    if (counter === yPosition.length) {
        return true;
    } else {
        return false;
    }
};

const checkHowSnakeNeedsToBeMovedWhenOnChangeOfDirection = (firstPosition: number[], secondPosition: number[], speed: number, firstIndex: number, secondIndex: number) => {
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
};

const checkHowSnakeNeedsToBeMovedInGeneral = (position: number[], speed: number, index: number) => {
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
};

const move = (xSpeed: number, ySpeed: number) => {
    if (isMovingOnYAxis()) {
        console.log("Is moving on y Axis");
        xPosition[0] += xSpeed;
        yPosition[0] += ySpeed;
        for (let y: number = yPosition.length - 1; y > 0; y--) {
            for (let x: number = xPosition.length - 1; x > 0; x--) {
                if (xPosition[x - 1] > xPosition[x]) {
                    checkHowSnakeNeedsToBeMovedWhenOnChangeOfDirection(xPosition, yPosition, xSpeed, x, y);
                } else {
                    checkHowSnakeNeedsToBeMovedInGeneral(yPosition, ySpeed, y);
                }
            }
        }
    } else if (isMovingOnXAxis()) {
        console.log("Is moving on x Axis");
        xPosition[0] += xSpeed;
        yPosition[0] += ySpeed;
        for (let x: number = xPosition.length - 1; x > 0; x--) {
            for (let y: number = yPosition.length - 1; y > 0; y--) {
                if (yPosition[y - 1] > yPosition[y]) {
                    checkHowSnakeNeedsToBeMovedWhenOnChangeOfDirection(yPosition, xPosition, ySpeed, y, x);
                } else {
                    checkHowSnakeNeedsToBeMovedInGeneral(xPosition, xSpeed, x);
                }
            }
        }
    } else {
        return;
    }
};

for (let i: number = 1; i <= 3; i++) {
    console.log(`${i}. Feld`);
    move(20, 0);
}