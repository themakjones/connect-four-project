/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

const makeBoard = () => {
  for (let y = 0; y < HEIGHT; y++) {
    const row = [];
    for (let x = 0; x < WIDTH; x++) {
      
      row.push(null);
    }
    board.push(row);
  }
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  // finished
};

/** makeHtmlBoard: make HTML table and row of column tops. */

const makeHtmlBoard = () => {
  const htmlBoard = document.getElementById(`board`);
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  // finished
  // TODO: add comment for this code
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  // the above creates a top row that will be used to drop pieces. the id of column-top corresponds to CSS to make the tile stand out.

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

const findSpotForCol = (x) => {
  // TODO: write the real version of this, rather than always returning 0
  for (y = board.length - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
}

/** placeInTable: update DOM to place piece into HTML table of board */

const placeInTable = (y, x) => {
  // TODO: make a div and insert into correct table cell
  const gamePiece = document.createElement(`div`);
  const tableCell = document.getElementById(`${y}-${x}`);
  gamePiece.setAttribute(`id`, `p${currPlayer}`);
  gamePiece.setAttribute(`class`, `piece`);

  tableCell.append(gamePiece);
  board[y][x] = currPlayer;
};

/** endGame: announce game end */

const endGame = msg => {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

const handleClick = (evt) => {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  if (y !== null) {
    placeInTable(y, x);
  }

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  checkCells = () => {
    const cellsFilled = [];
    for (row of board) {
      row.every(cell => cell)? cellsFilled.push(true) : cellsFilled.push(false);
  }
    if (cellsFilled.every(row => row)) {
      endGame(`It's a tie!`);
    }
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
};

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
