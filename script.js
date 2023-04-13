const newGrid = document.getElementById("newGrid");
const colorPicker = document.getElementById("colorPicker");
const randomColor = document.getElementById("randomColor");
const clearGrid = document.getElementById("clearGrid");
const pixelContainer = document.getElementById("pixelContainer");

let width = 16;
let height = 16;
let colorPicked = colorPicker.value;
let isRandomColor = false;

// Event to generate a new grid of pixels of a given size

newGrid.addEventListener("click", () => {
    let newWidth = parseInt(prompt("Please enter width of new grid (max 100 pixels): "));

    if (typeof newWidth === "number" && newWidth <= 100 && newWidth >= 1) {
        width = newWidth;
        height = newWidth;
        drawGrid(newWidth, newWidth);
    }
    else{
        alert("Something went wrong. Pick values only between 1 and 100.")
    }
});

// Event to change paint colour to the user's selection

colorPicker.addEventListener("change", () => {
    colorPicked = colorPicker.value;
})

randomColor.addEventListener("change", () => {
    isRandomColor = randomColor.checked;
    console.log("random color mode changed");
    console.log(isRandomColor);
})

// Event to clear the grid (redraw the grid)

clearGrid.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear the grid?")) {
        drawGrid(width, height);
    }
})

function drawGrid(width, height) {
    // Deletes the previous grid if there was a previous grid
    while (pixelContainer.childNodes.length > 0) {
        pixelContainer.removeChild(pixelContainer.lastChild);
    }

    for (i = 0; i < width; i++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("pixelRow")
        for (j = 0; j < height; j++) {
            const pixel = document.createElement("div");
            pixel.classList.add("pixel");
            rowDiv.appendChild(pixel);
        }
        pixelContainer.appendChild(rowDiv);
    }

    // Events to paint the colour of the pixels on mouseover

    pixelContainer.childNodes.forEach(row => {
        row.childNodes.forEach(pixelDiv => {
            pixelDiv.addEventListener("mouseover", () => {
                if (!isRandomColor) {
                    pixelDiv.style.backgroundColor = colorPicked;
                }
                else {
                    pixelDiv.style.backgroundColor = getRandomHexColor(pixelDiv);
                }
            })
        });
    });
}

// Picks a random RGB colour when "random color mode" is checked

function getRandomHexColor (pixel) {
    let R = Math.floor(Math.random() * 255).toString(16);
    let G = Math.floor(Math.random() * 255).toString(16);
    let B = Math.floor(Math.random() * 255).toString(16);

    if (R.length < 2) {
        R = R + "0";
    }
    if (G.length < 2) {
        G = G + "0";
    }
    if (B.length < 2) {
        B = B + "0";
    }
    let newBackgroundColor = "#"+R+G+B;
    return newBackgroundColor;
}

// On page startup generate the pixel grid with default width and height

drawGrid(width, height);