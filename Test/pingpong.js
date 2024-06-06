// Select the canvas element and set up the context
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Game variables
let paddleWidth = 10, paddleHeight = 60;
let ballSize = 5;

let ball = { x: canvas.width / 2, y: canvas.height / 2 };
let leftPaddle = { x: 0, y: 0 };
let rightPaddle = { x: 0, y: 0 };
y = 0;
// WebSocket setup
const socket = new WebSocket('ws://localhost:8000/ws/game/test/');

// Listen for messages from the server
socket.addEventListener('message', function (event) {
    const data = JSON.parse(event.data);
    ball = data.ball;
    leftPaddle = data.leftPaddle;
    rightPaddle = data.rightPaddle;
    // console.log('ball', ball, 'leftPaddle', leftPaddle, 'rightPaddle', rightPaddle);
});

// Draw everything
function draw() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the paddles
    context.fillStyle = 'white';
    // left paddle
    console.log('leftPaddle', leftPaddle.y);
    context.fillRect(leftPaddle.x - paddleWidth / 2, leftPaddle.y - paddleHeight / 2, paddleWidth, paddleHeight);

    // right paddle
    context.fillRect(rightPaddle.x - paddleWidth / 2, rightPaddle.y - paddleHeight / 2, paddleWidth, paddleHeight);

    // Draw the ball
    context.beginPath();
    context.arc(ball.x, ball.y, ballSize, 0, Math.PI * 2);
    context.fill();
}

// Game loop
function gameLoop() {
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

// Handle player input
window.addEventListener('mousemove', function (event) {
    playerY = event.clientY - paddleHeight / 2;
    // Ensure player paddle stays within the canvas
    playerY = Math.max(Math.min(playerY, canvas.height - paddleHeight), 0);
    socket.send(JSON.stringify({ type: 'move', y: playerY }));
});
