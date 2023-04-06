let width = 16;
let height = 16;

const pixelContainer = document.getElementById("pixelContainer");

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