window.onload = () => {
  let btnRef = document.querySelectorAll(".ox");
  let restartBtn = document.getElementById("restartB");
  let msgRef = document.getElementById("messageB");

  let winning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let userTurn = true; // User starts the game
  let count = 0;
  let gameOver = false; // Track if the game is over

  // Disable all cells
  const disableBtns = () => {
    btnRef.forEach((cell) => {
      cell.style.pointerEvents = "none";
    });
  };

  // Enable all cells and reset styles
  const enableBtns = () => {
    btnRef.forEach((cell) => {
      cell.innerText = "";
      cell.style.pointerEvents = "auto";
    });
    msgRef.innerHTML = "Your Turn (X)";
    userTurn = true;
    count = 0;
    gameOver = false;
  };

  // Display win message
  const winFunction = (letter) => {
    var sendData = "";
    if (letter === "X") {
      msgRef.innerHTML = "User Wins! (X)";
      sendData = `user wins`;
    } else {
      msgRef.innerHTML = "Computer Wins! (O)";
      sendData = `computer wins`;
    }
    disableBtns();
    gameOver = true; // Mark the game as over
    saveData(sendData);
  };

  // Display draw message
  const drawFunction = () => {
    msgRef.innerHTML = "It's a Draw!";
    gameOver = true; // Mark the game as over
    saveData("it is draw");
  };

  // Reset game on restart button click
  restartBtn.addEventListener("click", () => {
    enableBtns();
  });

  // Check for win condition
  const winChecker = () => {
    for (let i of winning) {
      let [cell1, cell2, cell3] = [
        btnRef[i[0]].innerText,
        btnRef[i[1]].innerText,
        btnRef[i[2]].innerText,
      ];
      if (cell1 !== "" && cell1 === cell2 && cell2 === cell3) {
        winFunction(cell1);
        return true; // Stop further checks once we have a winner
      }
    }
    return false;
  };

  // Computer's move
  const computerMove = () => {
    if (gameOver) return; // Stop the computer if the game is over
    msgRef.innerHTML = "Computer's Turn (O)";
    setTimeout(() => {
      let availableCells = [];
      btnRef.forEach((cell, index) => {
        if (cell.innerText === "") {
          availableCells.push(index);
        }
      });

      // Choose a random cell for the computer
      if (availableCells.length > 0) {
        let randomIndex = Math.floor(Math.random() * availableCells.length);
        let selectedCell = btnRef[availableCells[randomIndex]];
        selectedCell.innerText = "O";
        selectedCell.style.pointerEvents = "none";
        count++;

        // Check for win or draw after computer's move
        if (!winChecker() && count === 9) {
          drawFunction();
        } else if (!gameOver) {
          msgRef.innerHTML = "Your Turn (X)";
          userTurn = true;
        }
      }
    }, 500); // Add a delay for realism
  };

  // Add click event listener to each cell
  btnRef.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (userTurn && !gameOver) {
        cell.innerText = "X";
        cell.style.pointerEvents = "none"; // Disable the cell after it's clicked
        count++;
        userTurn = false;

        // Check for win or draw after user's move
        if (!winChecker() && count === 9) {
          drawFunction();
        } else if (!gameOver) {
          computerMove(); // Let the computer play
        }
      }
    });
  });

  enableBtns();

  const saveData = (win) => {
    const data = {
      result: win, 
      time_played: new Date().toISOString(), 
    };

    // Use the Fetch API to send the data to the backend
    fetch("/save_tic_tac_toe_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save tic tac toe game data");
        }
        return response.json();
      })
      .then((responseData) => {
        console.log("Game data saved successfully:", responseData);
      })
      .catch((error) => {
        console.error("Error saving game data:", error);
      });
  };
};
