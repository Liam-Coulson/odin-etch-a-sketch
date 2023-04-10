let width = 16;
let height = 16;
const colorPicker = document.getElementById("colorPicker");
let colorPicked = colorPicker.value;
const newGrid = document.getElementById("newGrid");
const pixelContainer = document.getElementById("pixelContainer");

// Event to change paint colour to the user's selection

colorPicker.addEventListener("change", () => {
    colorPicked = colorPicker.value;
    console.log(colorPicked)
})

// Event to generate a new grid of pixels of a given size

newGrid.addEventListener("click", () => {
    let newWidth = parseInt(prompt("Please enter width of new grid (max 100 pixels): "));
    let newHeight = parseInt(prompt("Please enter height of new grid (max 100 pixels): "));

    if (typeof newWidth === "number" && typeof newHeight === "number"
        && newWidth <= 100 && newWidth >= 1 && newHeight <= 100 && newHeight >= 1) {
        drawGrid(newWidth, newHeight);
    }
    else{
        alert("Something went wrong. Pick values only between 1 and 100.")
    }
});

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
            pixel.classList.add("pixelDefault");
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