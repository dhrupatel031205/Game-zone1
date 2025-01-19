const bird = document.getElementById("bird");
const gameContainer = document.getElementById("game-container");
const scoreElement = document.getElementById("score");
const gameOverScreen = document.getElementById("game-over");
const finalScoreElement = document.getElementById("final-score");
const restartButton = document.getElementById("restart-b");
const startButton = document.getElementById("start-button1");

let birdTop = 200;
let birdGravity = 2;
let jumpHeight = 40;
let isGameOver = false;
let score = 0;
let gameStarted = false;
let pipeSpeed = 4; // Speed of the pipes

function spawnPipes() {
  const pipeTop = document.querySelector(".pipe-top");
  const pipeBottom = document.querySelector(".pipe-bottom");

  // Initial pipe positions outside the screen
  pipeTop.style.left = "400px";
  pipeBottom.style.left = "400px";

  // Randomize pipe heights
  const topHeight = Math.random() * 200 + 50;
  const bottomHeight = 600 - topHeight - 150;

  pipeTop.style.height = `${topHeight}px`;
  pipeBottom.style.height = `${bottomHeight}px`;

  setInterval(() => {
    if (isGameOver) return;

    const pipeLeft = parseInt(pipeTop.style.left.replace("px", ""));
    pipeTop.style.left = `${pipeLeft - pipeSpeed}px`; // Pipe speed
    pipeBottom.style.left = `${pipeLeft - pipeSpeed}px`;

    if (pipeLeft < -60) {
      pipeTop.style.left = "400px";
      pipeBottom.style.left = "400px";

      const newTopHeight = Math.random() * 200 + 50;
      pipeTop.style.height = `${newTopHeight}px`;
      pipeBottom.style.height = `${600 - newTopHeight - 150}px`;

      if (!isGameOver) score++;
    }

    // Collision detection
    if (
      pipeLeft < 90 &&
      pipeLeft > 50 &&
      (bird.offsetTop < pipeTop.offsetHeight ||
        bird.offsetTop + bird.offsetHeight > 600 - pipeBottom.offsetHeight)
    ) {
      endGame();
    }
  }, 20); // Adjust interval to control smoothness
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
  if (!gameStarted) return;

  birdTop -= jumpHeight;
}

function startGame() {
  gameStarted = true;
  startButton.style.display = "none"; // Hide start button
  spawnPipes();
}

function endGame() {
  isGameOver = true;
  gameOverScreen.classList.remove("d-none");
  finalScoreElement.textContent = score;
  saveData();
  clearInterval(gameLoop);
}

function restartGame() {
  window.location.reload();
}

// Event Listeners
document.addEventListener("keydown", (e) => {
  if (e.key === " " && gameStarted) jump();
});
document.addEventListener("click", () => {
  if (gameStarted) jump();
});

restartButton.addEventListener("click", restartGame);
startButton.addEventListener("click", startGame); // Start game when button clicked

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

// Difficulty Adjustment
setInterval(() => {
  if (gameStarted && !isGameOver) {
    birdGravity += 0.01; // Gradually increase gravity
    pipeSpeed += 0.1; // Increase pipe speed over time
  }
}, 1000); // Every second

const saveData = () => {
  const data = {
    score: score,
    timestamp: new Date().toISOString(),
  };
  
  fetch("/save_flappy_bird_data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to save flappy bird game data");
      }
      return response.json();
    })

    .then((responseData) => {
      console.log("Game data saved successfully:", responseData);
    })

    .catch((error) => {
      console.log(`Error to saving game flappy bird data ${error} `);
    });
};
