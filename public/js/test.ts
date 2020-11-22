let xPosition: number[] = [20, 40, 60, 80, 100];
let yPosition: number[] = [40, 40, 40, 40, 40];

const foodPositionX: number = 80;
const foodPositionY: number = 40;

let counter: number = 0;


const didItSpawnOnTheSnake = (): boolean => {
    counter = 0;
    for (let index: number = xPosition.length; index >= 0; index--) {
        if (xPosition[index] === foodPositionX && yPosition[index] === foodPositionY) {
            counter++;
            console.log(counter);
        }
    }
    if (counter > 0) {
        return true;
    } else {
        return false;
    }
};

console.log(didItSpawnOnTheSnake());