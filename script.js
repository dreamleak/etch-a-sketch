const gridContainer = document.querySelector('.grid-container');

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