// Select the canvas element and set up the context
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Game variables
let paddleWidth = 10, paddleHeight = 100;
let ballSize = 10;
let playerY = (canvas.height - paddleHeight) / 2;
let aiY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2, ballY = canvas.height / 2;

// WebSocket setup
const socket = new WebSocket('ws://localhost:8000/ws/game/test/');

// Listen for messages from the server
socket.addEventListener('message', function (event) {
    const data = JSON.parse(event.data);
    console.log('message >> ', data)
    ballX = data.x;
    ballY = data.y;
});

// Draw everything
function draw() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the paddles
    context.fillStyle = 'white';
    context.fillRect(10, playerY, paddleWidth, paddleHeight);
    context.fillRect(canvas.width - 20, aiY, paddleWidth, paddleHeight);

    // Draw the ball
    context.beginPath();
    context.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    context.fill();
}

// Update game objects
function update() {
    // Move AI paddle
    if (aiY + paddleHeight / 2 < ballY) {
        aiY += 4;
    } else {
        aiY -= 4;
    }

    // Ensure AI paddle stays within the canvas
    aiY = Math.max(Math.min(aiY, canvas.height - paddleHeight), 0);
}

// Game loop
function gameLoop() {
    update();
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
});
