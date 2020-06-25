document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: [
    // {
    //   row: 0,
    //   col: 0,
    //   isMine: true,
    //   isMarked: false,
    //   hidden: true,

    // },
    // {
    //   row: 0,
    //   col: 1,
    //   isMine: false,
    //   isMarked: false,
    //   hidden: true,

    // },
    // {
    //   row: 0,
    //   col: 2,
    //   isMine: false,
    //   isMarked: false,
    //   hidden: true,

    // },

    // {
    //   row: 1,
    //   col: 0,
    //   isMine: false,
    //   isMarked: false,
    //   hidden: true,

    // },
    // {
    //   row: 1,
    //   col: 1,
    //   isMine: false,
    //   isMarked: false,
    //   hidden: true,

    // },
    // {
    //   row: 1,
    //   col: 2,
    //   isMine: false,
    //   isMarked: false,
    //   hidden: true,

    // },

    // {
    //   row: 2,
    //   col: 0,
    //   isMine: false,
    //   isMarked: false,
    //   hidden: true,

    // },
    // {
    //   row: 2,
    //   col: 1,
    //   isMine: true,
    //   isMarked: false,
    //   hidden: true,

    // },
    // {
    //   row: 2,
    //   col: 2,
    //   isMine: false,
    //   isMarked: false,
    //   hidden: true,
    // },
  ]
};

function startGame() {
  // Don't remove this function call: it makes the game work!
  createBoard(2, 2, false, false, true);
  cellCounts();
  lib.initBoard();
}

//Adds surrounding mines property to cells
function cellCounts() {
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
}

//Creates board
function createBoard(row, col, isMine, isMarked, hidden) {
  var size = 3;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let cell = {
        row: i,
        col: j,
        isMine: Math.random() >= 0.8, //return 20% chance of true
        isMarked: isMarked,
        hidden: hidden
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
  //These are some losing 'flags' since I don't know how to return and break of nested functions
  var loseCriteria1 = false;
  var loseCriteria2 = false;

  //=================================================================================
  //1. Check if all mines are marked, if not, then player has not won
  //=================================================================================
  board.cells.forEach(function (cell) {
    if (cell.isMine === true && cell.isMarked === false) {
      loseCriteria1 = true;
      return;
    }
  });

  //=================================================================================
  //2. Check if all mines are marked and if some non-mine cells are still hidden, if yes, then player has not won
  //=================================================================================
  //Filters cells for mines, then returns true if all those mines are marked
  var allMinesMarked = board.cells.filter(cell => cell.isMine).every(mine => mine.isMarked);
  //Loops through each cell, tests if all non-mine cells are hidden
  board.cells.forEach(function (cell) {
    if (allMinesMarked === true && cell.isMine === false && cell.hidden === true) {
      loseCriteria2 = true;
      return;
    }
  })

  if (loseCriteria1 === false && loseCriteria2 === false) lib.displayMessage('You win!'); //winning
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