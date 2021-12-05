const gridContainer = document.querySelector('.grid-container');
const buttonWrapper = document.querySelector('.button-wrapper');
const gridWrapper = document.querySelector('.grid-wrapper');
const outPutWrapper = document.querySelector('.output-value-wrapper');
const rangeWrapper = document.querySelector('.range-wrapper');

function createDivs(col, row) {
    for (let i = 0; i < (col * row); i++) {
        const gridSquare = document.createElement('div');
        gridContainer.style.border = '1px solid #141414';
        gridContainer.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${row}, 1fr)`;
        gridContainer.appendChild(gridSquare).classList.add('grid-squares');
    }
}

createDivs(40, 40);

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
                square.style.backgroundColor = generateGreyHSL();
            });
        });
    });
}

function generateGreyHSL() {
    const hue = Math.floor(Math.random() * 256);
    const saturation = Math.floor(Math.random() * (0 + 1)) + '%';
    const lightness = Math.floor(Math.random() * (100 + 1)) + '%';
    return 'hsl(' + hue + ', ' + saturation + ', ' + lightness + ')';
}

hoverGridSquares();
changeSquaresToBlack();
changeSquaresToRGB();
changeSquaresToGrey();

function clearCurrentGrid() {
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear';
    clearButton.id = 'clear-button';
    buttonWrapper.appendChild(clearButton);

    const clickClearButton = document.getElementById('clear-button');
    clickClearButton.addEventListener('click', () => {
        gridSquare.forEach(square => {
            square.style.backgroundColor = null;
        });
    });
}

clearCurrentGrid();

// refactor resize buttons into one function for range slider.
// use input instead of mousemove, since it's more UI-friendly.

function gridResizeSlider() {
    const rangeSlider = document.createElement('input');
    rangeSlider.type = 'range';
    rangeSlider.className = 'range-slider';
    rangeSlider.min = '10';
    rangeSlider.max = '40';
    rangeSlider.step = '2';
    gridWrapper.appendChild(rangeSlider);
}

gridResizeSlider();

let showOutPut = document.querySelector('output'),
    rangeTrack = document.querySelector('input');

function outPutValue() {
    showOutPut.innerHTML = rangeTrack.value;

    rangeTrack.addEventListener('input', () => {
        showOutPut.innerHTML = rangeTrack.value;
    }, false);

    outPutWrapper.appendChild(showOutPut);
    gridWrapper.appendChild(rangeWrapper);
    rangeWrapper.appendChild(outPutWrapper);
}

outPutValue();

// position value bubble for range slider.
const range = document.querySelector('.range-slider'),
      bubble = document.querySelector('.bubble');

rangeTrack.addEventListener('input', () => {
    setBubble(range, bubble);
});

function setBubble(range, bubble) {
    const val = range.value,
          min = range.min ? range.min : 10,
          max = range.max ? range.max : 40;
    let newVal = Number(((val - min) * 52) / (max - min));

range.oninput = () => {
    bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
    }
}

function changeGridSize() {
    createDivs(rangeTrack.value, rangeTrack.value);
}

rangeTrack.addEventListener('input', changeGridSize);