let playerScore = 0;
let computerScore = 0;
let tieCount = 0;

const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const tieCountElement = document.getElementById('tie-count');
const resultElement = document.getElementById('result');

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
    const computerChoice = getComputerChoice();
    const result = playRound(playerChoice, computerChoice);
    resultElement.textContent = `Player chose ${playerChoice}, Computer chose ${computerChoice}. ${result}`;
    updateScores();
}

document.getElementById('rock').addEventListener('click', () => handlePlayerChoice('rock'));
document.getElementById('paper').addEventListener('click', () => handlePlayerChoice('paper'));
document.getElementById('scissors').addEventListener('click', () => handlePlayerChoice('scissors'));
