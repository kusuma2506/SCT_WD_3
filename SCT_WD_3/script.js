const board = document.getElementById('gameBoard');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diagonals
];

function handleCellClick(e) {
    const clickedCell = e.target;
    const cellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if(gameState[cellIndex] !== "" || !gameActive) return;

    gameState[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for(let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if(gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if(roundWon) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if(!gameState.includes("")) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = 'X';
    gameActive = true;
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
}

function createBoard() {
    for(let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-cell-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

resetBtn.addEventListener('click', resetGame);
createBoard();
statusText.textContent = `Player ${currentPlayer}'s Turn`;