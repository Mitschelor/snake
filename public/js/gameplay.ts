const snake = new Snake();
const food = new Food();

// Starts the game

const startGame = () => {
    snake.stopMovement();
    snake.clearCanvas();
    snake.move(snake.right);
    food.place();
};

// Checks, if the snake is at the same position as the food

const checkForFood = () => {
    const snakeIsNearFood: boolean = snake.getPositionX()[0] === food.getPositionX() && snake.getPositionY()[0] === food.getPositionY();
    if (snakeIsNearFood) {
        food.stopDrawing();
        food.place();
        snake.eat();
    } else {
        return;
    }
};

setInterval(checkForFood, 100);

// Keyboard controls

window.addEventListener("keydown", (event: KeyboardEvent) => {
    switch (event.key) {
        case "ArrowLeft":
            console.log("left key");
            snake.stopMovement();
            snake.move(snake.left);
            break;
        case "ArrowUp":
            console.log("up key");
            snake.stopMovement();
            snake.move(snake.up);
            break;
        case "ArrowRight":
            console.log("right key");
            snake.stopMovement();
            snake.move(snake.right);
            break;
        case "ArrowDown":
            console.log("down key");
            snake.stopMovement();
            snake.move(snake.down);
            break;
    }
});
