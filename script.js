let width = 16;
let height = 16;
const colorPicker = document.getElementById("colorpicker");
let colorPicked = colorPicker.value;

const pixelContainer = document.getElementById("pixelContainer");

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

pixelContainer.childNodes.forEach(row => {
    row.childNodes.forEach(pixelDiv => {
        pixelDiv.addEventListener("mouseover", () => {
            pixelDiv.style.backgroundColor = colorPicked;
        })
    });
});

colorPicker.addEventListener("change", () => {
    colorPicked = colorpicker.value;
    console.log(colorPicked)
})
