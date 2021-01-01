const snake = new Snake();
const food = new Food();

window.onload = () => {
    snake.showScore();
};

const startGame = () => {
    document.getElementById("player_dead")!.style.display = "none";
    document.getElementById("game")!.style.display = "flex";
    snake.score = 0;
    snake.stopMovement();
    snake.clearCanvas();
    snake.move(snake.right);
    snake.showScore();
    food.place();
};

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

window.addEventListener("keydown", (event: KeyboardEvent) => {
    switch (event.key) {
        case "ArrowLeft":
            snake.stopMovement();
            snake.move(snake.left);
            break;
        case "ArrowUp":
            snake.stopMovement();
            snake.move(snake.up);
            break;
        case "ArrowRight":
            snake.stopMovement();
            snake.move(snake.right);
            break;
        case "ArrowDown":
            snake.stopMovement();
            snake.move(snake.down);
            break;
        case "Escape":
            snake.stopMovement();
            break;
    }
});
