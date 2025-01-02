const bird = document.getElementById("bird");
const gameContainer = document.getElementById("game-container");
const scoreElement = document.getElementById("score");
const gameOverScreen = document.getElementById("game-over");
const finalScoreElement = document.getElementById("final-score");
const restartButton = document.getElementById("restart-btn");

let birdTop = 200;
let birdGravity = 2;
let jumpHeight = 40;
let isGameOver = false;
let score = 0;
let gameStarted = false;

function spawnPipes() {
  const pipeTop = document.querySelector(".pipe-top");
  const pipeBottom = document.querySelector(".pipe-bottom");

  // Randomize pipe heights
  const topHeight = Math.random() * 200 + 50;
  const bottomHeight = 600 - topHeight - 150;

  pipeTop.style.height = `${topHeight}px`;
  pipeBottom.style.height = `${bottomHeight}px`;

  setInterval(() => {
    if (isGameOver) return;

    const pipeLeft = parseInt(
      window.getComputedStyle(pipeTop).getPropertyValue("left")
    );
    pipeTop.style.left = `${pipeLeft - 2}px`;
    pipeBottom.style.left = `${pipeLeft - 2}px`;

    if (pipeLeft < -60) {
      pipeTop.style.left = "400px";
      pipeBottom.style.left = "400px";

      const newTopHeight = Math.random() * 200 + 50;
      pipeTop.style.height = `${newTopHeight}px`;
      pipeBottom.style.height = `${600 - newTopHeight - 150}px`;

      if (!isGameOver) score++;
    }

    if (
      pipeLeft < 90 &&
      pipeLeft > 50 &&
      (bird.offsetTop < pipeTop.offsetHeight ||
        bird.offsetTop + bird.offsetHeight > 600 - pipeBottom.offsetHeight)
    ) {
      endGame();
    }
  }, 20);
}

function moveBird() {
  if (!gameStarted) return;

  birdTop += birdGravity;
  bird.style.top = `${birdTop}px`;

  if (birdTop > 560 || birdTop < 0) {
    endGame();
  }
}

function jump() {
  if (!gameStarted) {
    gameStarted = true;
    spawnPipes();
  }

  birdTop -= jumpHeight;
}

function endGame() {
  isGameOver = true;
  gameOverScreen.classList.remove("d-none");
  finalScoreElement.textContent = score;
  clearInterval(gameLoop);
}

function restartGame() {
  window.location.reload();
}

// Event Listeners
document.addEventListener("keydown", (e) => {
  if (e.key === " ") jump();
});
document.addEventListener("click", jump);

restartButton.addEventListener("click", restartGame);

// Update Score
setInterval(() => {
  if (gameStarted && !isGameOver) {
    scoreElement.textContent = `Score: ${score}`;
  }
}, 100);

// Main Game Loop
const gameLoop = setInterval(() => {
  if (!isGameOver) moveBird();
}, 20);
