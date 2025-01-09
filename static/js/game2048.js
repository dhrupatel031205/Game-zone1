const gridElement = document.getElementById("grid2048");
const resetBtn = document.getElementById("restart2048");
const gameOverElement = document.getElementById("game-over2048");
const upButton = document.getElementById("up");
const downButton = document.getElementById("down");
const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");
const timeElement = document.getElementById("time");
const highScoreElement = document.getElementById("high-score");

let grid = [];
let highScore = 0;
let startTime;
let gameTime = 0;
let timerInterval;

function initializeGrid() {
  grid = Array.from({ length: 4 }, () => Array(4).fill(0));
  gameOverElement.style.display = "none";
  startTime = Date.now();
  gameTime = 0;
  addRandomTile();
  addRandomTile();
  renderGrid();
  updateTime();
}

function addRandomTile() {
  const emptyCells = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (grid[row][col] === 0) {
        emptyCells.push({ row, col });
      }
    }
  }
  if (emptyCells.length > 0) {
    const { row, col } =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    finalRandomValue = 0;
    generateValue = Math.random();
    if (generateValue <= 0.2) {
      finalRandomValue = 2;
    } else if (generateValue <= 0.4 && generateValue >= 0.2) {
      finalRandomValue = 4;
    } else if (generateValue <= 0.6 && generateValue >= 0.4) {
      finalRandomValue = 8;
    } else if (generateValue <= 0.8 && generateValue >= 0.6) {
      finalRandomValue = 16;
    } else {
      finalRandomValue = 32;
    }
    grid[row][col] = finalRandomValue;
  }
}

function renderGrid() {
  gridElement.innerHTML = "";
  grid.forEach((row) => {
    row.forEach((value) => {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      if (value > 0) {
        tile.textContent = value;
        tile.dataset.value = value;
      }
      gridElement.appendChild(tile);
    });
  });
  checkGameOver();
  updateHighScore();
}

function move(direction) {
  let moved = false;
  if (direction === "up") moved = moveUp();
  if (direction === "down") moved = moveDown();
  if (direction === "left") moved = moveLeft();
  if (direction === "right") moved = moveRight();
  if (moved) {
    addRandomTile();
    renderGrid();
  }
}

function combine(rowOrCol) {
  for (let i = 0; i < rowOrCol.length - 1; i++) {
    if (rowOrCol[i] === rowOrCol[i + 1] && rowOrCol[i] !== 0) {
      rowOrCol[i] *= 2;
      rowOrCol[i + 1] = 0;
    }
  }
}

function slide(rowOrCol) {
  const newRowOrCol = rowOrCol.filter((val) => val !== 0);
  while (newRowOrCol.length < 4) newRowOrCol.push(0);
  return newRowOrCol;
}

function moveLeft() {
  let moved = false;
  for (let row = 0; row < 4; row++) {
    const original = [...grid[row]];
    grid[row] = slide(grid[row]);
    combine(grid[row]);
    grid[row] = slide(grid[row]);
    if (original.toString() !== grid[row].toString()) moved = true;
  }
  return moved;
}

function moveRight() {
  let moved = false;
  for (let row = 0; row < 4; row++) {
    const original = [...grid[row]];
    grid[row] = slide(grid[row].reverse()).reverse();
    combine(grid[row]);
    grid[row] = slide(grid[row].reverse()).reverse();
    if (original.toString() !== grid[row].toString()) moved = true;
  }
  return moved;
}

function moveUp() {
  let moved = false;
  for (let col = 0; col < 4; col++) {
    const original = grid.map((row) => row[col]);
    let column = slide(original);
    combine(column);
    column = slide(column);
    for (let row = 0; row < 4; row++) {
      if (grid[row][col] !== column[row]) moved = true;
      grid[row][col] = column[row];
    }
  }
  return moved;
}

function moveDown() {
  let moved = false;
  for (let col = 0; col < 4; col++) {
    const original = grid.map((row) => row[col]);
    let column = slide(original.reverse()).reverse();
    combine(column);
    column = slide(column.reverse()).reverse();
    for (let row = 0; row < 4; row++) {
      if (grid[row][col] !== column[row]) moved = true;
      grid[row][col] = column[row];
    }
  }
  return moved;
}

function checkGameOver() {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (grid[row][col] === 0) return;
      if (row < 3 && grid[row][col] === grid[row + 1][col]) return;
      if (col < 3 && grid[row][col] === grid[row][col + 1]) return;
    }
  }
  gameOverElement.style.display = "flex";
  clearInterval(timerInterval); // Stop the timer when the game is over
}

function updateHighScore() {
  const highestTile = Math.max(...grid.flat());
  if (highestTile > highScore) {
    highScore = highestTile;
    highScoreElement.textContent = highScore;
  }
}

function updateTime() {
  timerInterval = setInterval(() => {
    if (gameOverElement.style.display !== "flex") {
      // Only update time if the game is not over
      gameTime = Math.floor((Date.now() - startTime) / 1000);
      timeElement.textContent = gameTime;
    }
  }, 1000);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") move("up");
  if (e.key === "ArrowDown") move("down");
  if (e.key === "ArrowLeft") move("left");
  if (e.key === "ArrowRight") move("right");
});

upButton.addEventListener("click", () => move("up"));
downButton.addEventListener("click", () => move("down"));
leftButton.addEventListener("click", () => move("left"));
rightButton.addEventListener("click", () => move("right"));

resetBtn.addEventListener("click", initializeGrid);

initializeGrid();
