const snake = new Snake();

const food = new Food();

// let xSpeed: number;
// let ySpeed: number;

// Starts the game

const startGame = () => {
    clearInterval(snake.moveTheSnake);
    snake.clearCanvas();
    snake.move(20, 0);
    food.place();
};

// Checks, if the snake is at the same position as the food

const checkForFood = () => {
    const snakeIsNearFood: boolean = snake.getPositionX()[0] === food.getPositionX() && snake.getPositionY()[0] === food.getPositionY();
    if (snakeIsNearFood) {
        clearInterval(food.foodPlacer);
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
            clearInterval(snake.moveTheSnake);
            snake.move(-20, 0);
            break;
        case "ArrowUp":
            console.log("up key");
            clearInterval(snake.moveTheSnake);
            snake.move(0, -20);
            break;
        case "ArrowRight":
            console.log("right key");
            clearInterval(snake.moveTheSnake);
            snake.move(20, 0);
            break;
        case "ArrowDown":
            console.log("down key");
            clearInterval(snake.moveTheSnake);
            snake.move(0, 20);
            break;
    }
});
