const snake = new Snake({
    positionX: 20,
    positionY: 20,
    height: 20,
    width: 20,
});

let key: number = 1;
let xSpeed: number;
let ySpeed: number;

const startGame = () => {
    if (key > 3) {
        key = 0;
    } else {
        key += 1;
    }
    console.log(key);
    switch (key) {
        case 0:
            xSpeed = 0.5;
            ySpeed = 0;
            setInterval(snake.updateSnake.bind(xSpeed, ySpeed), 10);
            break;
        case 1:
            xSpeed = 0;
            ySpeed = 0.5;
            setInterval(snake.updateSnake.bind(xSpeed, ySpeed), 10);
            break;
        case 2:
            xSpeed = -0.5;
            ySpeed = 0;
            setInterval(snake.updateSnake.bind(xSpeed, ySpeed), 10);
            break;
        case 3:
            xSpeed = 0;
            ySpeed = -0.5;
            setInterval(snake.updateSnake.bind(xSpeed, ySpeed), 10);
    }
};