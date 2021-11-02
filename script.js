const gridContainer = document.querySelector('.grid-container');
const buttonWrapper = document.querySelector('.button-wrapper');

function createDivs(col, row) {
    for (let i = 0; i < (col * row); i++) {
        const gridSquare = document.createElement('div');
        gridContainer.style.border = '1px solid #141414';
        gridContainer.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${row}, 1fr)`;
        gridContainer.appendChild(gridSquare).classList.add('grid-squares');
    }
}

createDivs(16, 16);

function hoverGridSquares() {
    const gridSquare = document.querySelectorAll('.grid-squares');

    gridSquare.forEach(square => {
        square.addEventListener('mouseover', () => {
            square.style.backgroundColor = '#141414';
        });

        // if mouseover is triggered, there must be mouseout.
        // square.addEventListener('mouseout', () => {
        //     square.style.backgroundColor = '#ffffff';
        // });
    });
}

hoverGridSquares();

function clearCurrentGrid() {
    // dynmatically create clear button.
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear';
    clearButton.id = 'clear-button';
    buttonWrapper.appendChild(clearButton);

    const clickClearButton = document.getElementById('clear-button');
        clickClearButton.addEventListener('click', () => {
            gridContainer.textContent = '';
        });
}

clearCurrentGrid();

function resizeGridByTen() {
    // instead of prompt, add grid resize button option for better UX and UI.
    const resizeByTen = document.createElement('button');
    resizeByTen.textContent = '10x10';
    resizeByTen.id = 'ten-by-ten-button';
    buttonWrapper.appendChild(resizeByTen);

    const clickResizeByTen = document.getElementById('ten-by-ten-button');
        clickResizeByTen.addEventListener('click', () => {
            createDivs(10, 10);
        });
}

resizeGridByTen();

