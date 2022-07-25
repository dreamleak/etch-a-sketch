const mainWrapper = document.querySelector('.main-wrapper'),
      gridWrapper = document.querySelector('.grid-wrapper'),
      gridContainer = document.querySelector('.grid-container'),
      buttonWrapper = document.querySelector('.button-wrapper'),
      outPutWrapper = document.querySelector('.output-value-wrapper'),
      rangeWrapper = document.querySelector('.range-wrapper'),
      headerOne = document.querySelector('#header-one'),
      buttonGroup = document.querySelectorAll('button');
      
function createDivs(column, row) {
	for (let i = 0; i < column * row; i++) {
		const gridSquare = document.createElement('div');
		gridContainer.style.gridTemplateColumns = `repeat(${column}, 1fr)`;
		gridContainer.style.gridTemplateRows = `repeat(${row}, 1fr)`;
		gridContainer.appendChild(gridSquare).classList.add('grid-squares');
	}
}

createDivs(50, 50);

function createButtons() {
	const buttonCollection = [
		{
			name: 'Black',
			class: 'black-button',
		},
		{
			name: 'Rainbow',
			class: 'rainbow-button',
		},
		{
			name: 'Greyscale',
			class: 'grey-button',
		},
		{
			name: 'Eraser',
			class: 'eraser-button',
		},
	];

	buttonCollection.forEach((button) => {
		let buttons = document.createElement('button');
		buttons.textContent = button.name;
		buttonWrapper.appendChild(buttons).className = button.class;
	});
}

createButtons();

function highlightActiveButtons() {
	// highlight ONLY active button to enchance user experience.
	buttonGroup.forEach((activeButton) => {
		activeButton.addEventListener('pointerdown', () => {
			buttonGroup.forEach((selectedButton) => {
				activeButton.classList.toggle(':active');

				if (selectedButton === activeButton.target) {
					selectedButton.style.outline = '2px solid hsl(165, 96%, 84%)';
				} else {
					selectedButton.style.removeProperty('outline');
				}
			});
		});
	});
}

highlightActiveButtons();

function chooseButtonColour() {
	buttonWrapper.addEventListener('pointerdown', (chosen) => {
		gridContainer.addEventListener('pointerover', function (square) {
			square.target.releasePointerCapture(square.pointerId);

			gridContainer.addEventListener('pointermove', (square) => {
				if (chosen.target.matches('.black-button')) {
					square.target.style.backgroundColor = 'hsl(0, 0%, 8%)';
				}
				if (chosen.target.matches('.rainbow-button')) {
					square.target.style.backgroundColor =
						'hsla(' + Math.random() * 360 + ', 100%, 50%, 1)';
				}
				if (chosen.target.matches('.grey-button')) {
					square.target.style.backgroundColor = generateGreyscale();
				}
				if (chosen.target.matches('.eraser-button')) {
					square.target.style.backgroundColor = null;
				}
			});
		});
	});
}

chooseButtonColour();

function generateGreyscale() {
    const hue = Math.floor(Math.random() * 256),
          saturation = Math.floor(Math.random() * (0 + 1)) + '%',
          lightness = Math.floor(Math.random() * (100 + 1)) + '%';
        return 'hsl(' + hue + ', ' + saturation + ', ' + lightness + ')';
}

function createRangeSlider() {
	const rangeSlider = document.createElement('input');
	rangeSlider.type = 'range';
	rangeSlider.className = 'range-slider';
	rangeSlider.min = '10';
	rangeSlider.max = '50';
	rangeSlider.step = '2';
	buttonWrapper.appendChild(rangeSlider);
}

createRangeSlider();

let showOutPut = document.querySelector('output'),
    rangeTrack = document.querySelector('input');

function displayValue() {
    showOutPut.innerHTML = rangeTrack.value;
    
    rangeTrack.addEventListener('input', () => {
        showOutPut.innerHTML = rangeTrack.value;
    }, false);
    
    rangeWrapper.appendChild(outPutWrapper);
}

displayValue();

function positionValueBubble(range, bubble) {
    // account for thumb size and position.
    // avoid magic number by using named const.
    const thumbSize = 16, // referenced from browser computed value.
    currentValue = range.value,
    updatedValue = Number(((currentValue - range.min) * 50) / (range.max - range.min)),
    bubbleOffset = thumbSize / 2; // fix value bubble from being offset of slider.
    bubble.style.left = `calc(${updatedValue}% + ${bubbleOffset}px)`;
}

const valueBubble = document.querySelector('.bubble');

rangeTrack.addEventListener('input', () => {
	positionValueBubble(rangeTrack, valueBubble);
});

rangeTrack.oninput = function changeGridSize() {
	createDivs(rangeTrack.value, rangeTrack.value);
};

function wrapHeaderOne() {
	const headerOneWrapper = document.createElement('div');
	headerOneWrapper.id = 'header-one-wrapper';
	headerOneWrapper.appendChild(headerOne);
	mainWrapper.append(headerOneWrapper);
}

wrapHeaderOne();

function createTextSpan() {
	const textSpan = document.createElement('span');
	textSpan.id = 'text-span';
	textSpan.textContent = 'digital!';
	mainWrapper.appendChild(textSpan);
}

createTextSpan();

// replicate knobs like an actual etch-a-sketch
function createKnobs() {
	const knobWrapper = document.createElement('div');
	knobWrapper.className = 'knob-wrapper';
	mainWrapper.appendChild(knobWrapper);

	const knobSpanOne = document.createElement('span');
	knobSpanOne.className = 'knob-one';

	const knobSpanTwo = document.createElement('span');
	knobSpanTwo.className = 'knob-two';
	knobWrapper.append(knobSpanOne, knobSpanTwo);
}

createKnobs();