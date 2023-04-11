let width = 16;
let height = 16;
const colorPicker = document.getElementById("colorPicker");
let colorPicked = colorPicker.value;
const newGrid = document.getElementById("newGrid");
const pixelContainer = document.getElementById("pixelContainer");

const clearGrid = document.getElementById("clearGrid");


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
    console.log(colorPicked)
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
                pixelDiv.style.backgroundColor = colorPicked;
            })
        });
    });
}

// On page startup generate the pixel grid with default width and height

drawGrid(width, height);