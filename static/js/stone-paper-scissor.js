let playerScore = 0;
let computerScore = 0;
let tieCount = 0;
let roundsPlayed = 0;
const totalRounds = 5;

const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const tieCountElement = document.getElementById('tie-count');
const resultElement = document.getElementById('result');
const finalResultElement = document.getElementById('final-result'); // Display final results

const choices = ['rock', 'paper', 'scissors'];

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function playRound(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        tieCount++;
        return 'It\'s a tie!';
    }
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        playerScore++;
        return 'You win this round!';
    }
    computerScore++;
    return 'Computer wins this round!';
}

function updateScores() {
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
    tieCountElement.textContent = tieCount;
}

function handlePlayerChoice(playerChoice) {
    if (roundsPlayed >= totalRounds) {
        return; // Stop the game after 5 rounds
    }

    const computerChoice = getComputerChoice();
    const result = playRound(playerChoice, computerChoice);
    resultElement.textContent = `Player chose ${playerChoice}, Computer chose ${computerChoice}. ${result}`;
    updateScores();

    roundsPlayed++;

    if (roundsPlayed === totalRounds) {
        displayFinalResult();
    }
}

function displayFinalResult() {
    var result = ""
    if (playerScore > computerScore) {
        finalResultElement.textContent = 'Congratulations! You won the game!';
        result = "User wins"
    } else if (playerScore < computerScore) {
        finalResultElement.textContent = 'Sorry, the computer won the game!';
        result = "Computer wins"
    } else {
        finalResultElement.textContent = 'The game is a tie!';
        result = "It's tie"
    }
    var score = [playerScore,computerScore,tieCount]
    sendData(result,score)
}

function restartGame() {
    // Reset scores and round counter
    playerScore = 0;
    computerScore = 0;
    tieCount = 0;
    roundsPlayed = 0;

    // Update the UI to reflect the reset state
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
    tieCountElement.textContent = tieCount;
    resultElement.textContent = 'Make your choice to start the game!';
    finalResultElement.textContent = '';
}

const sendData=(result) =>{
    const data = {
        result : result,
        computerS :computerScore,
        userS : playerScore,
        tieS : tieCount,
        timestamp :new Date().toISOString(),
    }
    
    fetch("/save_stone_paper_scissor_data",{
        method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((response)=>{
        if (!response.ok) {
            throw new Error("Failed to save data of stone paper scissor game data");
        }
        return response.json();
    }) 
    .then((responseData)=>{
        console.log(`Game data is saved successfully : ${responseData}`);
    })
    .catch((error)=>{
        console.log(`Error in saving stone paper scissor data: ${error}`);
    });
};

document.getElementById('rock').addEventListener('click', () => handlePlayerChoice('rock'));
document.getElementById('paper').addEventListener('click', () => handlePlayerChoice('paper'));
document.getElementById('scissors').addEventListener('click', () => handlePlayerChoice('scissors'));
document.getElementById('restart').addEventListener('click', restartGame);