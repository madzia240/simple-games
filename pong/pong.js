var canvas;
var canvasContext;
var ballX = 350;
var ballY = 250;
var ballSpeedX = 10;
var ballSpeedY = 4;

var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 5;

var showingStartScreen = true;
var showingWinScreen = false;
var startText = "click anywhere to start"

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 90;

var sound = document.getElementById('sound');
sound.volume = 0.3;

function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

function calculateTouchPos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.touches[0].clientX - rect.left - root.scrollLeft;
    var mouseY = evt.touches[0].clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

function handleMouseClick(evt) {
    if (showingWinScreen) {
        player1Score = 0;
        player2Score = 0;
        showingWinScreen = false;
    }
    if (showingStartScreen) {
        startText = "";
        showingStartScreen = false;
    }
}

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(function () {
        drawEverything();
        moveEverything();

    }, 1000 / framesPerSecond);

    canvas.addEventListener('mousedown', handleMouseClick);

    canvas.addEventListener('mousemove',
        function (evt) {
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
        });
    canvas.addEventListener('touchmove',
        function (evt) {
            var touchPos = calculateTouchPos(evt);
            paddle1Y = touchPos.y - (PADDLE_HEIGHT / 2);
        });
}

function ballReset() {
    if (player1Score >= WINNING_SCORE ||
        player2Score >= WINNING_SCORE) {

        showingWinScreen = true;

    }

    ballSpeedX = -ballSpeedX;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

function computerMovement() {
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);
    if (paddle2YCenter < ballY - 35) {
        paddle2Y = paddle2Y + 8;
    } else if (paddle2YCenter > ballY + 35) {
        paddle2Y = paddle2Y - 8;
    }
}

function moveEverything() {
    if (showingWinScreen) {
        return;
    }
    if (showingStartScreen) {
        return;
    }

    computerMovement();

    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;

    if (ballX < 0) {
        if (ballY > paddle1Y &&
            ballY < paddle1Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;

            sound.play();
            var deltaY = ballY -
                (paddle1Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            player2Score++; // must be BEFORE ballReset()
            ballReset();
        }
    }
    if (ballX > canvas.width) {
        if (ballY > paddle2Y &&
            ballY < paddle2Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
            //var sound2 = document.getElementById('sound');
            sound.play();

            var deltaY = ballY -
                (paddle2Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            player1Score++; // must be BEFORE ballReset()
            ballReset();
        }
    }
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
}

function drawNet() {
    for (var i = 0; i < canvas.height; i += 40) {
        colorRect(canvas.width / 2 - 1, i, 2, 20, 'white');
    }
}

function drawEverything() {
    // next line blanks out the screen with black
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    if (showingStartScreen) {
        canvasContext.fillStyle = "white";
        canvasContext.fillText(startText, 300, 250).fillStyle("white");
    }
    if (showingWinScreen) {
        canvasContext.fillStyle = 'white';

        if (player1Score >= WINNING_SCORE) {

            canvasContext.fillText("Left Player Won", 300, 250, );
        } else if (player2Score >= WINNING_SCORE) {
            canvasContext.fillText("Right Player Won", 300, 250);
        }

        canvasContext.fillText("click to continue", 300, 450);
        return;
    }

    drawNet();

    // this is left player paddle
    colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');

    // this is right computer paddle
    colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');

    // next line draws the ball
    colorCircle(ballX, ballY, 10, 'white');

    canvasContext.fillText("score: " + player1Score, 150, 20);
    canvasContext.fillText("score: " + player2Score, canvas.width - 200, 20);
}

function colorCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}