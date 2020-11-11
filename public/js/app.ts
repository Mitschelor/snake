const snake = new Snake({
    positionX: 20,
    positionY: 20,
    height: 20,
    width: 20,
});

let xSpeed: number;
let ySpeed: number;


const startGame = () => {
    snake.move(0.5, 0);
};

window.addEventListener("keydown", (ev: KeyboardEvent) => {
    switch (ev.key) {
        case "ArrowLeft":
            console.log("left key");
            // left key
            xSpeed = -0.5;
            ySpeed = 0;
            snake.move(xSpeed, ySpeed);
            break;
        case "ArrowUp":
            console.log("up key");
            // upKey
            xSpeed = 0;
            ySpeed = -0.5;
            snake.move(xSpeed, ySpeed);
            break;
        case "ArrowRight":
            console.log("right key");
            // right key
            xSpeed = 0.5;
            ySpeed = 0;
            snake.move(xSpeed, ySpeed);
            break;
        case "ArrowDown":
            console.log("down key");
            // down key
            xSpeed = 0;
            ySpeed = 0.5;
            snake.move(xSpeed, ySpeed);
            break;
    }
});