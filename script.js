const sizeText = document.querySelector("#sizechange p");
const sizeBtn = document.querySelector("#sizechange button");
const colorBtn = document.querySelector("#color");
const rainbowBtn = document.querySelector("#rainbow");
const eraserBtn = document.querySelector("#eraser");
const clearBtn = document.querySelector("#clear");

const grid = document.querySelector("#grid");
let gridItems = [];

let color = "000000";
let isRainbow = false;

rainbowBtn.addEventListener("click", () => { isRainbow = true; color = getRandomColor(); });
eraserBtn.addEventListener("click", () => { isRainbow = false; color = "FFFFFF"; });
colorBtn.addEventListener("click", () => { isRainbow = false; color = getRandomColor(); });

clearBtn.addEventListener("click", () => clearGrid());

sizeBtn.addEventListener("click", () => changeSize());

// this is dumb as hell
let mouseDown = 0;
window.onmousedown = () => {
  mouseDown = 1;
}
window.onmouseup = () => {
  mouseDown = -1;
}

function clearGrid() {
    gridItems.forEach(item => {
        item.style.backgroundColor = "#FFFFFF";
    });
}

function getRandomColor() {
    return Math.floor(Math.random()*16777215).toString(16);
}

function changeItemColor(item) {
    item.style.backgroundColor = "#"+color;
    if (isRainbow)
        color = getRandomColor();
}

function fillGrid(size) {
    for (let i = 0; i < size*size; i++) {
        let gridItem = document.createElement("div");
        gridItem.classList.add("item");
        gridItem.addEventListener("mouseover", () => {
            console.log(mouseDown);
            if (mouseDown > 0)            
                changeItemColor(gridItem);
        });
        gridItem.addEventListener("click", () => changeItemColor(gridItem));
        grid.appendChild(gridItem);
        gridItems.push(gridItem);
    } 
}

function changeSize() {
    let size = window.prompt("What size do you want your grid?","16");
    if (size > 0) {
        gridItems = [];
        grid.innerHTML = "";
        grid.style.gridTemplateColumns = "";
        let newGridTemplateColumns = "";

        for (let i = 0; i < size; i++)
            newGridTemplateColumns += "auto "; 

        grid.style.gridTemplateColumns = newGridTemplateColumns
        fillGrid(size);

        sizeText.textContent = "Grid size: " + size + "x" + size;
    }
}

fillGrid(16);

