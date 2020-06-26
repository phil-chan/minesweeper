document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {};
var size = 3; //The size of the board i.e. size = 3 is 3x3 board

function startGame() {
    createBoard(size);
    cellCounts();
    lib.initBoard(); // Don't remove this function call: it makes the game work!
}

//Restarts the game by clearing the board object and board div class, then calling startGame()
function restartGame() {
    board = {};
    document.querySelector('.board').innerHTML = ""; // Clears the board div
    startGame();
}

//Change size of board and restart
function increaseCells() {
    size++;
    restartGame();
}

function decreaseCells() {
    size--;
    restartGame();
}

//Adds surrounding mines counter to cells
function cellCounts() {
    board.cells.forEach(cell => cell.surroundingMines = countSurroundingMines(cell));
}

//Creates board with randomized cells and mines 
function createBoard(size) {
    board.cells = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let cell = {
                row: i,
                col: j,
                isMine: Math.random() >= 0.7, //30% chance of mine
                isMarked: false,
                hidden: true
            };
            board.cells.push(cell);
        }
    }
}

// Check left click
document.addEventListener('click', function (event) {
    if (event.which === 1) checkForWin();
})

//Check right click
document.addEventListener('contextmenu', function (event) {
    checkForWin();
})

function checkForWin() {
    let playerHasWon = true; //Have to prove this wrong, otherwise player has won
    board.cells.forEach(cell => {
        if (cell.isMine && !cell.isMarked) playerHasWon = false; //Player hasn't won if all mines aren't marked
        if (!cell.isMine && cell.hidden) playerHasWon = false; //Player hasn't won if non-mine cells are still hidden
    })
    if (playerHasWon) lib.displayMessage('You win!');
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
    let totalSurroundingMines = 0; //a counter which increases if surrounding cell/s has IsMine: true
    let surroundingCells = lib.getSurroundingCells(cell.row, cell.col); //stores all surrounding cells
    surroundingCells.forEach(function (surroundingCell) { //loops through all surrounding cells
        if (surroundingCell.isMine) totalSurroundingMines++; //adds to counter if a surrounding cell is IsMine: true
    })
    return totalSurroundingMines;
}