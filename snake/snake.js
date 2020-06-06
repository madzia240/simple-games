var canvas, canvasContext;

window.onload = function () {
    canvas = document.querySelector("canvas");
    canvasContext = canvas.getContext("2d");

    document.addEventListener("keydown", keyDownEvent);
    var x = 8;
    setInterval(draw, 1000 / x);
};


var gridSize = (tileSize = 17);
var nextX = (nextY = 0);


var defaultTailSize = 3;
var tailSize = defaultTailSize;
var snakeTrail = [];
var snakeX = (snakeY = 10);


var appleX = (appleY = 15);


var playerScore = 0;


var highScore = 0;
var localStorage = localStorage;
var yourScore = document.querySelector('.yourScore');
var totalHighScore = document.querySelector('.score')

var startText = "Press any key to start";

function draw() {

    snakeX += nextX;
    snakeY += nextY;

    if (snakeX < 0) {
        snakeX = gridSize - 1;
    }
    if (snakeX > gridSize - 1) {
        snakeX = 0;
    }

    if (snakeY < 0) {
        snakeY = gridSize - 1;
    }
    if (snakeY > gridSize - 1) {
        snakeY = 0;
    }


    if (snakeX === appleX && snakeY === appleY) {
        tailSize++;

        appleX = Math.floor(Math.random() * gridSize);
        appleY = Math.floor(Math.random() * gridSize);
        playerScore++;
    }


    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    totalHighScore.textContent = `High Score: ${localStorage.getItem('High Score')}`

    canvasContext.fillStyle = "white";
    for (var i = 0; i < snakeTrail.length; i++) {
        canvasContext.fillRect(
            snakeTrail[i].x * tileSize,
            snakeTrail[i].y * tileSize,
            tileSize,
            tileSize
        );

        if (snakeTrail[i].x === snakeX && snakeTrail[i].y === snakeY) {
            tailSize = defaultTailSize;
            if (playerScore > highScore) {
                highScore = playerScore;
                localStorage.setItem("High Score", highScore);
            };
            playerScore = 0;

        }
    }


    canvasContext.fillStyle = "red";
    canvasContext.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);


    canvasContext.fillStyle = 'white';
    canvasContext.fillText("score: " + playerScore, 20, 20, );


    snakeTrail.push({
        x: snakeX,
        y: snakeY
    });
    while (snakeTrail.length > tailSize) {
        snakeTrail.shift();
    }

    canvasContext.fillStyle = "white";
    canvasContext.fillText(startText, 100, 100);
}


const leftBtn = document.querySelector('.left')
const upBtn = document.querySelector('.up')
const rightBtn = document.querySelector('.right')
const downBtn = document.querySelector('.down')

leftBtn.addEventListener('click', () => {
    startText = "";
    nextX = -1;
    nextY = 0;
})
upBtn.addEventListener('click', () => {
    startText = "";
    nextX = 0;
    nextY = -1;
})
rightBtn.addEventListener('click', () => {
    startText = "";
    nextX = 1;
    nextY = 0;
})
downBtn.addEventListener('click', () => {
    startText = "";
    nextX = 0;
    nextY = 1;
})

function keyDownEvent(e) {
    if (e) {
        startText = "";
    }
    switch (e.keyCode) {
        case 37:
            nextX = -1;
            nextY = 0;
            break;
        case 38:
            nextX = 0;
            nextY = -1;
            break;
        case 39:
            nextX = 1;
            nextY = 0;
            break;
        case 40:
            nextX = 0;
            nextY = 1;
            break;
    }
}
const restartBtn = document.querySelector('.start')

restartBtn.addEventListener('click', () => {
    location.reload();
})