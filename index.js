const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

function startGame () {
    renderGrid(3);
}

let field = [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY]
];
let currentPlayer = CROSS;
let countMove = 0;
let flagWin = false;

function renderGrid (dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {

    console.log(`Clicked on cell: ${row}, ${col}`);
    let item = findCell(row, col);
    let symbol = item.textContent;

    if (symbol !== EMPTY) {
        return;
    }
    if (flagWin === true) {
        return;
    }

    field[row][col] = currentPlayer;
    renderSymbolInCell(currentPlayer, row, col);
    currentPlayer = currentPlayer === CROSS ? ZERO : CROSS;
    countMove ++;

    if (countMove === 9) {
        alert('Победила дружба');
        flagWin = true;
    }

    const winnerInfo = checkWinner(field);
    if (winnerInfo) {
        highlightCells(winnerInfo.cells, 'red');
        alert(`Победил ${winnerInfo.winner}`);
        flagWin = true;
    }
    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function checkWinner(board) {
    const lines = [];

    for (let row = 0; row < 3; row++) {
        lines.push([[row, 0], [row, 1], [row, 2]]);
    }

    for (let column = 0; column < 3; column++) {
        lines.push([[0, column], [1, column], [2, column]]);
    }

    lines.push([[0, 0], [1, 1], [2, 2]]);
    lines.push([[0, 2], [1, 1], [2, 0]]);

    for (const line of lines) {
        const [cell_first, cell_two, cell_three] = line;
        const symbol_one = board[cell_first[0]][cell_first[1]];
        const symbol_two = board[cell_two[0]][cell_two[1]];
        const symbol_three = board[cell_three[0]][cell_three[1]];

        if (symbol_one !== EMPTY && symbol_one === symbol_two && symbol_two === symbol_three) {
            return { winner: symbol_one, cells: line };
        }
    }

    return null;
}

function highlightCells(cells, color) {
    for (const[row, column] of cells) {
        renderSymbolInCell(field[row][column], row, column, color);
    }
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    console.log('reset!');
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
