const newGrid = document.getElementById("newGrid");
const colorPicker = document.getElementById("colorPicker");
const randomColor = document.getElementById("randomColor");
const darkenToBlack = document.getElementById("darkenToBlack");
const clearGrid = document.getElementById("clearGrid");
const pixelContainer = document.getElementById("pixelContainer");

let width = 16;
let height = 16;
let colorPicked = colorPicker.value;
let isRandomColor = false;
let isDarkenToBlack = false;

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

// Event to turn on random colour mode if checkbox is checked

randomColor.addEventListener("change", () => {
    isRandomColor = randomColor.checked;
    if (darkenToBlack.checked == true) {
        darkenToBlack.checked = false;
        isDarkenToBlack = darkenToBlack.checked;
    }
})

// Event to turn on darken to black mode if checkbox is checked

darkenToBlack.addEventListener("change", () => {
    isDarkenToBlack = darkenToBlack.checked;
    if (randomColor.checked == true) {
        randomColor.checked = false;
        isRandomColor = randomColor.checked;
    }
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
                if (isRandomColor) {
                    pixelDiv.style.backgroundColor = getRandomHexColor(pixelDiv);
                }
                else if (isDarkenToBlack) {
                    pixelDiv.style.backgroundColor = darkenColor(pixelDiv);
                }
                else {
                    pixelDiv.style.backgroundColor = colorPicked;
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

function darkenColor(pixel) {
    // The CMYK color system stores blackness as a % so we can use this to help us
    // as the task asks us to add 10% blackness per pass over a pixel, so that
    // after 10 passes, the pixel is completely black.

    let currentColor = pixel.style.backgroundColor;
    if (currentColor == "") {
        currentColor = "rgb(255, 255, 255)"
    }

    currentColorArray = currentColor.slice(4, currentColor.length -1).split(",");
    for (let i = 0; i <= 2; i++) {
        currentColorArray[i] = currentColorArray[i].trim();
    }

    let R = currentColorArray[0]/255;
    let G = currentColorArray[1]/255;
    let B = currentColorArray[2]/255;

    let K = 1 - Math.max(R, G, B);
    let C = (1-R-K)/(1-K);
    let M = (1-G-K)/(1-K);
    let Y = (1-B-K)/(1-K);

    K = K + 0.10;
    if (K > 1) {
        K = 1;
    }

    R = Math.floor(255*(1-C)*(1-K));
    G = Math.floor(255*(1-M)*(1-K));
    B = Math.floor(255*(1-Y)*(1-K));

    newColor = `rgb(${R}, ${G}, ${B})`;
    pixel.style.backgroundColor = newColor;
}

// On page startup generate the pixel grid with default width and height

drawGrid(width, height);