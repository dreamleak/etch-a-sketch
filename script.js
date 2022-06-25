const mainWrapper = document.querySelector('.main-wrapper');
const gridWrapper = document.querySelector('.grid-wrapper');
const gridContainer = document.querySelector('.grid-container');
const buttonWrapper = document.querySelector('.button-wrapper');
const outPutWrapper = document.querySelector('.output-value-wrapper');
const rangeWrapper = document.querySelector('.range-wrapper');
const headerOneWrapper = document.querySelector('#header-one-wrapper');
const headerOne = document.querySelector('#header-one');
const knobWrapper = document.querySelector('.knob-wrapper');
const knobSpanOne = document.querySelector('.knob-one');
const knobSpanTwo = document.querySelector('.knob-two');

function createDivs(col, row) {
    for (let i = 0; i < (col * row); i++) {
        const gridSquare = document.createElement('div');
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

    gridWrapper.appendChild(outPutWrapper);
}

outPutValue();

// position value bubble for range slider.
const range = document.querySelector('.range-slider'),
      bubble = document.querySelector('.bubble');

rangeTrack.addEventListener('input', () => {
    setBubble(range, bubble);
});

    buttonWrapper.appendChild(range);
    rangeWrapper.appendChild(outPutWrapper);
    
function setBubble(range, bubble) {
    const thumbSize = 16, // referenced from browser computed value.
          val = range.value,
          newVal = Number(((val - range.min) * 50) / (range.max - range.min)),
          bubbleOffset = thumbSize / 2;
        // fix value bubble from being offset of slider.
        // account for thumb size/position + avoid magic number by using named const.
     bubble.style.left = `calc(${newVal}% + ${bubbleOffset}px)`;
    }

function changeGridSize() {
    createDivs(rangeTrack.value, rangeTrack.value);
}

rangeTrack.addEventListener('input', changeGridSize);


function wrapHeaderOne() {
    const headerOneWrapper = document.createElement('div');
    headerOneWrapper.id = 'header-one-wrapper';
    headerOneWrapper.appendChild(headerOne);
    mainWrapper.appendChild(headerOneWrapper);
}

wrapHeaderOne();

function setTextSpan() {
    const textSpan = document.createElement('span');
    textSpan.id = 'text-span';
    textSpan.textContent = 'digital!';
    mainWrapper.appendChild(textSpan);
}

setTextSpan();

// replicate knobs like an actual etch-a-sketch
function setKnobWrapperAndSpans() {
    const knobWrapper = document.createElement('div');
    knobWrapper.className = 'knob-wrapper';
    mainWrapper.appendChild(knobWrapper);

    const knobSpanOne = document.createElement('span');
    knobSpanOne.className = 'knob-one';
    knobWrapper.appendChild(knobSpanOne);
    
    const knobSpanTwo = document.createElement('span');
    knobSpanTwo.className = 'knob-two';
    knobWrapper.appendChild(knobSpanTwo);
}

setKnobWrapperAndSpans();

// highlight ONLY active button to enchance user experience.

const getButtons = document.querySelectorAll('button');

getButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            getButtons.forEach(selectedButton => {
                e.target.classList.toggle(':active');
            
                if (selectedButton != e.target) {
                    selectedButton.style.removeProperty('outline');

                } else { 
                    if (selectedButton == e.target) {
                        e.target.style.outline = '2px solid hsl(165, 96%, 84%)';
                    }
                }
            });
        }); 
    });