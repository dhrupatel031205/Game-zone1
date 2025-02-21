const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let bird = { x: 50, y: 300, radius: 15, velocity: 0, gravity: 0.2, jump: -6 }; // Reduced gravity for smoother gameplay
let pipes = [];
let gameRunning = false;
let pipeGap = 200; // Increased pipe gap for more space
let pipeWidth = 50;
let scoreFB = 0;

function createPipe() {
  const height = Math.random() * (canvas.height - pipeGap - 100) + 50;
  pipes.push({ x: canvas.width, top: height, bottom: height + pipeGap });
}

function drawBird() {
  ctx.beginPath();
  ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.stroke();
}

function drawPipes() {
  ctx.fillStyle = "black";
  ctx.boxshadow = "cyan"
  pipes.forEach((pipe) => {
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
    ctx.fillRect(pipe.x, pipe.bottom, pipeWidth, canvas.height - pipe.bottom);
  });
}

function drawscoreFB() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`scoreFB: ${scoreFB}`, 10, 30);
}

function updateBird() {
  bird.velocity += bird.gravity;
  bird.velocity *= 0.98; // Friction for smoother movement
  bird.y += bird.velocity;
}

function updatePipes() {
  pipes.forEach((pipe) => {
    pipe.x -= 1.5; // Smooth consistent movement
  });
  pipes = pipes.filter((pipe) => pipe.x + pipeWidth > 0);
}

function checkCollision() {
  if (bird.y + bird.radius >= canvas.height || bird.y - bird.radius <= 0) {
    return true;
  }

  for (let pipe of pipes) {
    if (
      bird.x + bird.radius > pipe.x &&
      bird.x - bird.radius < pipe.x + pipeWidth &&
      (bird.y - bird.radius < pipe.top || bird.y + bird.radius > pipe.bottom)
    ) {
      return true;
    }
  }
  return false;
}

function gameLoop() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBird();
  drawPipes();
  drawscoreFB();

  updateBird();
  updatePipes();

  if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 250) {
    createPipe();
  }

  if (pipes[0] && pipes[0].x + pipeWidth < bird.x && !pipes[0].scoreFBd) {
    scoreFB++;
    pipes[0].scoreFBd = true;
  }

  if (checkCollision()) {
    gameRunning = false;
    document.getElementById("restartButton3").style.display = "inline-block";
    document.getElementById("startButton3").style.display = "none";
    saveData2()
  } else {
    requestAnimationFrame(gameLoop);
  }
}

function resetGame() {
  bird.y = 300;
  bird.velocity = 0;
  pipes = [];
  scoreFB = 0;
}

document.getElementById("startButton3").addEventListener("click", () => {
  resetGame();
  gameRunning = true;
  gameLoop();
  document.getElementById("startButton3").style.display = "none";
  document.getElementById("restartButton3").style.display = "none";
});

document.getElementById("restartButton3").addEventListener("click", () => {
  resetGame();
  gameRunning = true;
  gameLoop();
  document.getElementById("restartButton3").style.display = "none";
  document.getElementById("startButton3").style.display = "none";
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && gameRunning) {
    bird.velocity = bird.jump;
  }
});


function saveData2(){
  const data = {
    score : scoreFB,
    timestamp: new Date().toISOString(),
  }

  fetch("/save_flappy_bird_data",{
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
    console.error("Error saving flappy bird game data:", error);
  });
}