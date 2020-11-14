const snake = new Snake({
    positionX: 0,
    positionY: 0,
    height: 20,
    width: 20,
});

const food = new Food();

let xSpeed: number;
let ySpeed: number;


const startGame = () => {
    snake.move(20, 0);
    food.place();
};

window.addEventListener("keydown", (event: KeyboardEvent) => {
    switch (event.key) {
        case "ArrowLeft":
            console.log("left key");
            xSpeed = -20;
            ySpeed = 0;
            clearInterval(snake.moveTheSnake);
            snake.move(xSpeed, ySpeed);
            break;
        case "ArrowUp":
            console.log("up key");
            xSpeed = 0;
            ySpeed = -20;
            clearInterval(snake.moveTheSnake);
            snake.move(xSpeed, ySpeed);
            break;
        case "ArrowRight":
            console.log("right key");
            xSpeed = 20;
            ySpeed = 0;
            clearInterval(snake.moveTheSnake);
            snake.move(xSpeed, ySpeed);
            break;
        case "ArrowDown":
            console.log("down key");
            xSpeed = 0;
            ySpeed = 20;
            clearInterval(snake.moveTheSnake);
            snake.move(xSpeed, ySpeed);
            break;
    }
});

