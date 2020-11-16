let xPosition: number[] = [80, 80, 80, 80, 80];
let yPosition: number[] = [80, 100, 120, 140, 160];

const move = (xSpeed: number, ySpeed: number) => {
    xPosition[0] += xSpeed;
    yPosition[0] += ySpeed;

    for (let x: number = 1; x < xPosition.length; x++) {
        for (let y: number = 1; y < yPosition.length; y++) {
            if (x === 1) {
                xPosition[x] = xPosition[x - 1] - xSpeed;
            } else if (y === 1) {
                yPosition[y] = yPosition[y - 1] - ySpeed;
            } else {
                xPosition[x] = xPosition[x - 1];
                yPosition[y] = yPosition[y - 1];
            }

            console.log(`x: ${x}. Runde
            y: ${y}. Runde`);
            console.log(`x: ${xPosition}
            y: ${yPosition}`);
        }
    }
};

for (let i: number = 1; i <= 3; i++) {
    console.log(`${i}. Feld`);
    move(20, 0);
}

