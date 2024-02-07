const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
let snake = [{ x: 100, y: 100 }];
let food = { x: 200, y: 200 };
let direction = 'right';
let gameInterval;
let score = 0;

function goHome() {
  window.location.href = "../html/index.html"
}

function drawSnake() {
  ctx.fillStyle = '#00F';
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });
}

function drawFood() {
  ctx.fillStyle = '#F00';
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function moveSnake() {
  const head = { ...snake[0] };

  switch (direction) {
    case 'up':
      head.y -= gridSize;
      break;
    case 'down':
      head.y += gridSize;
      break;
    case 'left':
      head.x -= gridSize;
      break;
    case 'right':
      head.x += gridSize;
      break;
  }

  snake.unshift(head);

  // Check for collision with food
  if (head.x === food.x && head.y === food.y) {
    generateFood();
  } else {
    snake.pop();
  }

  // Check for collision with walls or itself
  if (
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height ||
    checkCollision()
  ) {
    gameOver();
  }
}

function generateFood() {
  score++;
  food = {
    x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
    y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize
  };
}

function checkCollision() {
  return snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
}

function startGame() {
  if (!gameInterval) {
    gameInterval = setInterval(() => {
      moveSnake();
      draw();
    }, 150);
  }
}

function pauseGame() {
  clearInterval(gameInterval);
  gameInterval = null;
}

function gameOver() {
  clearInterval(gameInterval);
  gameInterval = null;
  Swal.fire({
    title: 'Game Over !',
    text: 'score=' + score,
    icon: 'info',
    confirmButtonText: 'OK'
  });
  score = 0;
  snake = [{ x: 100, y: 100 }];
  direction = 'right';
  generateFood();
  draw();
}

// Handle keyboard input for changing direction
document.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowUp':
      direction = 'up';
      break;
    case 'ArrowDown':
      direction = 'down';
      break;
    case 'ArrowLeft':
      direction = 'left';
      break;
    case 'ArrowRight':
      direction = 'right';
      break;
  }
});
// Initial draw
draw();