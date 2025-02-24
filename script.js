const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

const paddleWidth = 10, paddleHeight = 80, ballSize = 10;
let leftPaddleY = (canvas.height - paddleHeight) / 2;
let rightPaddleY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

let leftPaddleSpeed = 0;
let rightPaddleSpeed = 0;

let leftScore = 0;
let rightScore = 0;

let gameStarted = false; // Variável que indica se o jogo começou

const updateScore = () => {
  document.getElementById("score-left").textContent = leftScore;
  document.getElementById("score-right").textContent = rightScore;
};

const drawPaddles = () => {
  context.fillStyle = "#fff";
  context.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
  context.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
};

const drawBall = () => {
  context.fillStyle = "#fff";
  context.fillRect(ballX - ballSize / 2, ballY - ballSize / 2, ballSize, ballSize);
};

const moveBall = () => {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Colisão com o topo ou fundo
  if (ballY + ballSize / 2 > canvas.height || ballY - ballSize / 2 < 0) {
    ballSpeedY = -ballSpeedY;
  }

  // Colisão com as raquetes
  if (ballX - ballSize / 2 < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  } else if (ballX + ballSize / 2 > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  }

  // Pontuação
  if (ballX + ballSize / 2 > canvas.width) {
    leftScore++;
    updateScore();
    resetBall();
  } else if (ballX - ballSize / 2 < 0) {
    rightScore++;
    updateScore();
    resetBall();
  }
};

const resetBall = () => {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = 5;
};

const resetGame = () => {
  leftScore = 0;
  rightScore = 0;
  updateScore();
  resetBall();
  gameStarted = false;
  document.getElementById("play-btn").style.display = "inline-block"; // Mostrar botão Play
  document.getElementById("reset-btn").style.display = "none"; // Esconder o botão Reset
};

const movePaddles = () => {
  leftPaddleY += leftPaddleSpeed;
  rightPaddleY += rightPaddleSpeed;

  if (leftPaddleY < 0) leftPaddleY = 0;
  if (leftPaddleY + paddleHeight > canvas.height) leftPaddleY = canvas.height - paddleHeight;

  if (rightPaddleY < 0) rightPaddleY = 0;
  if (rightPaddleY + paddleHeight > canvas.height) rightPaddleY = canvas.height - paddleHeight;
};

const update = () => {
  if (gameStarted) { // Só atualiza se o jogo começou
    moveBall();
    movePaddles();
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddles();
    drawBall();
  }
};

setInterval(update, 1000 / 60);

// Função para iniciar o jogo quando o botão for pressionado
document.getElementById("play-btn").addEventListener("click", () => {
  gameStarted = true;
  document.getElementById("play-btn").style.display = "none"; // Esconde o botão Play
  document.getElementById("reset-btn").style.display = "inline-block"; // Exibe o botão Reset
});

// Função para resetar o jogo
document.getElementById("reset-btn").addEventListener("click", resetGame);

// Movimentação das raquetes
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") rightPaddleSpeed = -6;
  else if (event.key === "ArrowDown") rightPaddleSpeed = 6;
  else if (event.key === "w") leftPaddleSpeed = -6;
  else if (event.key === "s") leftPaddleSpeed = 6;
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowUp" || event.key === "ArrowDown") rightPaddleSpeed = 0;
  if (event.key === "w" || event.key === "s") leftPaddleSpeed = 0;
});
