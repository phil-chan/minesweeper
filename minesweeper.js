document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: [{
      row: 0,
      col: 0,
      isMine: true,
      isMarked: false,
      hidden: true,

    },
    {
      row: 0,
      col: 1,
      isMine: false,
      isMarked: false,
      hidden: true,

    },
    {
      row: 0,
      col: 2,
      isMine: false,
      isMarked: false,
      hidden: true,

    },

    {
      row: 1,
      col: 0,
      isMine: true,
      isMarked: false,
      hidden: true,

    },
    {
      row: 1,
      col: 1,
      isMine: false,
      isMarked: false,
      hidden: true,

    },
    {
      row: 1,
      col: 2,
      isMine: true,
      isMarked: false,
      hidden: true,

    },

    {
      row: 2,
      col: 0,
      isMine: false,
      isMarked: false,
      hidden: true,

    },
    {
      row: 2,
      col: 1,
      isMine: false,
      isMarked: false,
      hidden: true,

    },
    {
      row: 2,
      col: 2,
      isMine: false,
      isMarked: false,
      hidden: true,

    },
  ]
};

function startGame() {
  // Don't remove this function call: it makes the game work!
  lib.initBoard();
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
}

document.addEventListener('click', function(e) {
  if (event.which == 1) {
    checkForWin;
    console.log(`Clicked`);
  }
})

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
  board.cells.forEach(function (cell) {
    var allMarked = false;

    if (cell.isMine === true && cell.isMarked === true) {
      return;
    }

    if (cell.isMarked === true) {

    }

  });
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