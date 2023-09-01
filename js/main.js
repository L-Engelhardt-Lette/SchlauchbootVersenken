const numRows = 25;
const numCols = 25;
const gameBoard = document.getElementById('gameBoard');
const resetButton = document.getElementById('resetButton');

let boardData = [];

function initializeBoard() {
  for (let i = 0; i < numRows; i++) {
    const row = [];
    for (let j = 0; j < numCols; j++) {
      row.push(0); // 0 represents empty space, 1 represents boat
    }
    boardData.push(row);
  }
}

function renderBoard() {
  gameBoard.innerHTML = '';
  for (let i = 0; i < numRows; i++) {
    const rowElem = document.createElement('tr');
    for (let j = 0; j < numCols; j++) {
      const cellElem = document.createElement('td');
      cellElem.dataset.row = i;
      cellElem.dataset.col = j;
      cellElem.addEventListener('click', handleCellClick);
      if (boardData[i][j] === 1) {
        cellElem.classList.add('boat');
      }
      rowElem.appendChild(cellElem);
    }
    gameBoard.appendChild(rowElem);
  }
}

function handleCellClick(event) {
  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);
  
  if (boardData[row][col] === 0) {
    boardData[row][col] = 1;
    event.target.classList.add('boat');
  } else {
    boardData[row][col] = 0;
    event.target.classList.remove('boat');
  }
}

function resetBoard() {
  boardData = [];
  initializeBoard();
  renderBoard();
}

initializeBoard();
renderBoard();

resetButton.addEventListener('click', resetBoard);