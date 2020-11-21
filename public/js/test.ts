let xPosition: number[] = [80, 80];
let yPosition: number[] = [160, 140];

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

const howManyValuesAreTheSame = (position: number[]) => {
    let counter: number = 0;
    for (let i: number = 0; i < position.length - 1; i++) {
        if (position[i] === position[i - 1]) {
            counter += 1;
        } else {
            counter = counter;
        }
    }
    return counter;
};

const initiateTurn = (firstPosition: number[], secondPosition: number[], speed: number, firstIndex: number, secondIndex: number) => {
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

const moveWhenGoingStraight = (position: number[], speed: number, index: number) => {
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

const moveWhenInATurn = (firstPosition: number[], secondPosition: number[], speed: number, firstIndex: number, identicalValues: number) => {
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
            /*let newIdenticalValues: number = howManyValuesAreTheSame(secondPosition);
            if (newIdenticalValues > identicalValues) {
                return;
            }*/
            if (secondPosition[firstIndex] === secondPosition[firstIndex - 1]) {
                secondPosition[firstIndex] = secondPosition[firstIndex];
            } else {
                secondPosition[firstIndex] += speed;
            }
        }
        /*if (secondPosition[firstIndex] === secondPosition[firstIndex - 1]) {
            console.debug(`${firstIndex} is 20`);
            secondPosition[firstIndex] = secondPosition[firstIndex];
            console.log(`y: ${secondPosition}`);
        } else if (secondPosition[firstIndex - 1] === secondPosition[firstIndex - 2]) {
            secondPosition[firstIndex] += speed;
        } else {
            secondPosition[firstIndex] = secondPosition[firstIndex];
            console.log(`y: ${secondPosition}`);
        }*/
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
                    initiateTurn(xPosition, yPosition, xSpeed, x, y);
                } else {
                    moveWhenGoingStraight(yPosition, ySpeed, y);
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
                    initiateTurn(yPosition, xPosition, ySpeed, y, x);
                } else {
                    moveWhenGoingStraight(xPosition, xSpeed, x);
                }
            }
        }
    } else {
        console.log("Is in a curve");
        xPosition[0] += xSpeed;
        yPosition[0] += ySpeed;
        const identicalValuesX: number = howManyValuesAreTheSame(xPosition);
        const identicalValuesY: number = howManyValuesAreTheSame(yPosition);
        for (let x: number = xPosition.length - 1; x > 0; x--) {
            if (xSpeed != 0) {
                moveWhenInATurn(xPosition, yPosition, xSpeed, x, identicalValuesY);
            } else {
                moveWhenInATurn(yPosition, xPosition, ySpeed, x, identicalValuesX);
            }
        }
    }
};

for (let i: number = 1; i <= 2; i++) {
    console.log(`${i}. Feld`);
    move(20, 0);
}