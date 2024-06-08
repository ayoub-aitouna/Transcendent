// Select the canvas element and set up the context
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

// Game variables
let paddleWidth = 10,
  paddleHeight = 60;
let ballSize = 5;
let started = false;
let ball = { x: canvas.width / 2, y: canvas.height / 2 };
let leftPaddle = { x: 0, y: 0 };
let rightPaddle = { x: 0, y: 0 };
y = 0;
let socket = null;
// WebSocket setup
const loobySocket = new WebSocket(
  "ws://localhost:8000/ws/game/normal/looby/?game_mode=singleplayer"
);
loobySocket.onopen = function (event) {
  console.log("WebSocket is connected.");
};
loobySocket.onclose = function (event) {
  console.log("WebSocket is closed.", event);
};

loobySocket.onmessage = function (event) {
  const data = JSON.parse(event.data);
  console.log(data);
  game_uuid = data.game_uuid;
  if (data.type === "game_started") {
    console.log("Game started!");
    loobySocket.close();
    PingPongGame(game_uuid);
  }
};

const PingPongGame = (uuid) => {
  const socket = new WebSocket(`ws://localhost:8000/ws/game/${game_uuid}/`);
  socket.onopen = function (event) {
    console.log("WebSocket is connected.");
  };
  socket.onclose = function (event) {
    console.log("WebSocket is closed.", event);
  };

  socket.addEventListener("message", function (event) {
    const data = JSON.parse(event.data);
    if (data.type !== "update") {
      console.log(data);
    }
    switch (data.type) {
      case "update":
        started = true;
        ball = data.ball;
        leftPaddle = data.leftPaddle;
        rightPaddle = data.rightPaddle;
        break;
      case "goal":
        document.getElementById("first_player_score").innerText =
          data.first_player_score;
        document.getElementById("second_player_score").innerText =
          data.second_player_score;
        break;
      case "game_over":
        alert("Game Over!");
        break;
    }
  });

  function draw() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the paddles
    context.fillStyle = "white";
    // left paddle
    context.fillRect(
      leftPaddle.x - paddleWidth / 2,
      leftPaddle.y - paddleHeight / 2,
      paddleWidth,
      paddleHeight
    );

    // right paddle
    context.fillRect(
      rightPaddle.x - paddleWidth / 2,
      rightPaddle.y - paddleHeight / 2,
      paddleWidth,
      paddleHeight
    );

    // Draw the ball
    context.beginPath();
    context.arc(ball.x, ball.y, ballSize, 0, Math.PI * 2);
    context.fill();
  }

  function gameLoop() {
    if (started) draw();
    requestAnimationFrame(gameLoop);
  }

  gameLoop();

  let playerY = canvas.height / 2 - paddleHeight / 2;
  window.addEventListener("keydown", function (event) {
    switch (event.key) {
      case "ArrowUp":
        playerY -= 10;
        break;
      case "ArrowDown":
        playerY += 10;
        break;
    }
    socket.send(JSON.stringify({ type: "move", y: playerY }));
  });
};
