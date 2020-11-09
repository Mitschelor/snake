let speedX: number;
let speedY: number;

const snake = new Snake({
    positionX: 20,
    positionY: 20,
    height: 20,
    width: 20,
});

const startGame = () => {
    snake.moveRight();
};
