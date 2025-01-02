const gameBoard = document.getElementById("gameBoard");
const statusDisplay = document.getElementById("status");
const resetButton = document.getElementById("resetButton");

let boardState = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedIndex = parseInt(clickedCell.getAttribute("data-cell-index"));

  if (boardState[clickedIndex] !== "" || !gameActive) {
    return;
  }

  boardState[clickedIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  if (checkWin()) {
    statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (boardState.every((cell) => cell !== "")) {
    statusDisplay.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winningConditions.some((condition) => {
    const [a, b, c] = condition;
    return (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    );
  });
}

function resetGame() {
  boardState = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  statusDisplay.textContent = `Player X's turn`;

  document.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
  });
}

function initializeBoard() {
  gameBoard.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell", "col");
    cell.setAttribute("data-cell-index", i);
    cell.addEventListener("click", handleCellClick);
    gameBoard.appendChild(cell);
  }
}

resetButton.addEventListener("click", resetGame);
initializeBoard();
resetGame();
