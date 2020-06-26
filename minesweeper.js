document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: []
};

var size = 3;

function startGame() {
  // Don't remove this function call: it makes the game work!
  createBoard();
  cellCounts();
  lib.initBoard();
}

function restartGame() {
  board.cells = [];
  console.log(board.cells);
  lib.initBoard();
  //NEED TO CLEAR THE DRAWN CELLS SOMEHOW, IT'S CURRENTLY DUPLICATING <===============
  startGame();
}

function increaseCells() {
  size++;
  restartGame();
}

function decreaseCells() {
  size--;
  restartGame();
}

//Adds surrounding mines property to cells
function cellCounts() {
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
}

//Creates board with random cells and mines 
function createBoard() {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let cell = {
        row: i,
        col: j,
        isMine: Math.random() >= 0.8, //return 20% chance of mine
        isMarked: false,
        hidden: true
      };
      board.cells.push(cell);
    }
  }
}

//Check left click
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
  if (playerHasWon) lib.displayMessage('You win!'); //this remains true through our two tests, so the player has won
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
  var totalSurroundingMines = 0; //a counter which increases if surrounding cell/s has IsMine: true
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col); //stores all surrounding cells
  surroundingCells.forEach(function (surroundingCell) { //loops through all surrounding cells
    if (surroundingCell.isMine === true) totalSurroundingMines++; //adds to counter if a surrounding cell is IsMine: true
  })
  return totalSurroundingMines;
}