const grid = document.querySelector('#grid');
const newButton = document.querySelector('#new-button');
const form = document.querySelector('form');
const cancelButton = document.querySelector('#cancel-button');

newButton.addEventListener('click', (e) => {
    form.style.display = 'block';
});

form.addEventListener('submit', (e) => {
    grid.innerHTML = '';
    grid.style.cssText = '';
    const gridSize = document.querySelector('form input').value;
    createGrid(gridSize, gridSize);
    form.style.display = 'none';
})

cancelButton.addEventListener('click', (e) => {
    e.preventDefault();
    form.style.display = 'none';
});

function createGrid(rows, columns) {
    grid.style.cssText = `
        display: grid;
        grid-template-rows: repeat(${rows}, auto);
        grid-template-columns: repeat(${columns}, auto);`;
    for (let row = 1; row <= rows; row++) {
        for (let column = 1; column <= columns; column++) {
            let div = document.createElement('div');
            div.style.cssText = `
                gird-row: ${row}/${row + 1};
                gird-column: ${column}/${column + 1};
                width: 100%;
                height: 100%;
                border: thin solid #333;`;
            div.addEventListener('mouseover', (e) => paint(div));
            div.addEventListener('touchstart', (e) => paint(div));
            grid.appendChild(div);
        }
    }
}

function paint(div) {
    if (div.getAttribute('data-set') == 'true') {
        darken(div);
    } else {
        setRndColor(div);
    }
}

function darken(div) {
    let i = Number(div.getAttribute('data-i'));
    if (i <= 10) {
        let r = Number(div.getAttribute('data-r'));
        let g = Number(div.getAttribute('data-g'));
        let b = Number(div.getAttribute('data-b'));
        r = Math.floor(r - r / 10 * i);
        g = Math.floor(g - g / 10 * i);
        b = Math.floor(b - b / 10 * i);
        r = r < 0 ? 0 : r;
        g = g < 0 ? 0 : g;
        b = b < 0 ? 0 : b;
        div.style.background = `rgb(${r}, ${g}, ${b})`;
        i++;
        div.setAttribute('data-i', `${i}`);
    }
}

function setRndColor(div) {
    div.setAttribute('data-set', 'true');
    div.setAttribute('data-i', '1');
    div.setAttribute('data-r', `${getRndInteger(0, 255)}`);
    div.setAttribute('data-g', `${getRndInteger(0, 255)}`);
    div.setAttribute('data-b', `${getRndInteger(0, 255)}`);
    div.style.background = `rgb(
        ${div.getAttribute('data-r')}, 
        ${div.getAttribute('data-g')}, 
        ${div.getAttribute('data-b')})`;
}

/* returns a random number between min and max (both included) */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

createGrid(16, 16);