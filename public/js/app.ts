const snake = new Snake({
    positionX: 20,
    positionY: 20,
    height: 20,
    width: 20,
});

let key: number = 3;

const getKeyPress = () => {
    if (key >= 3) {
        key = 0;
        snake.move(key);
        console.log(key);
    } else {
        key = key + 1;
        snake.move(key);
        console.log(key);
    }
};

const startGame = () => {
    setInterval(getKeyPress, 2000);
};