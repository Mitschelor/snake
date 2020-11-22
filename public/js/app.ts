const snake = new Snake();

const food = new Food();

let xSpeed: number;
let ySpeed: number;

// Starts the game

const startGame = () => {
    clearInterval(snake.moveTheSnake);
    snake.clearCanvas();
    snake.move(20, 0);
    food.place();
};

// Checks, if the snake is at the same position as the food

const checkForFood = () => {
    if (snake.getPositionX()[0] === food.getPositionX() && snake.getPositionY()[0] === food.getPositionY()) {
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


// window.addEventListener("click", (event: MouseEvent) => {
//     snake.eat();
// });

