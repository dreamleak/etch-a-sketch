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

    gridSquare.forEach(square => {
        square.addEventListener('mouseover', () => {
            square.style.backgroundColor = 'hsl(0, 0%, 8%)';
        });
    });
}

const gridSquare = document.querySelectorAll('.grid-squares');


function changeSquaresToBlack() {
    const getBlackButton = document.createElement('button');
    getBlackButton.textContent = 'Black';
    getBlackButton.id = 'black-button';
    buttonWrapper.appendChild(getBlackButton);

    const clickGetBlack = document.getElementById('black-button');
        clickGetBlack.addEventListener('click', hoverGridSquares);
}

function changeSquaresToRGB() {
    const getRandomColorButton = document.createElement('button');
    getRandomColorButton.textContent = 'Rainbow';
    getRandomColorButton.id = 'rgb-button';
    buttonWrapper.appendChild(getRandomColorButton);

    const clickGetRandomColor = document.getElementById('rgb-button');
        clickGetRandomColor.addEventListener('click', () => {
            gridSquare.forEach(square => {
                square.addEventListener('mouseover', () => {
                square.style.backgroundColor = 'hsla(' + 
                (Math.random() * 360) + ', 100%, 50%, 1)';
            });
        });
    }); 
}

function changeSquaresToGrey() {
    const getGreyButton = document.createElement('button');
    getGreyButton.textContent = 'Greyscale';
    getGreyButton.id = 'grey-button';
    buttonWrapper.appendChild(getGreyButton);

    const clickGetGrey = document.getElementById('grey-button');
        clickGetGrey.addEventListener('click', () => {
            gridSquare.forEach(square => {
                square.addEventListener('mouseover', () => {
                square.style.backgroundColor = 'hsla(' + 
                (Math.random() * 130) + ', 0%, 50% , 1)';
             });
        });
    });
}

hoverGridSquares();
changeSquaresToBlack();
changeSquaresToRGB();
changeSquaresToGrey();

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

function resizeBackToDefaultGrid() {
    const defaultGridButton = document.createElement('button');
    defaultGridButton.textContent = '16x16';
    defaultGridButton.id = 'default-button';
    buttonWrapper.appendChild(defaultGridButton);

    const clickDefaultButton = document.getElementById('default-button');
        clickDefaultButton.addEventListener('click', () => {
            createDivs(16, 16);
        });
}

resizeBackToDefaultGrid();