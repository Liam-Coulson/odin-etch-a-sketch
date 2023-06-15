# odin-etch-a-sketch

This is my attempt at the Etch a Sketch project from The Odin Project's foundation course.

This version of the project meets all the requirements laid out in the project description:

* Creates a 16x16 grid of pixels upon first loading the page using JavaScript
* Colours in the pixels on the grid when hovering over them with the mouse similar to using a pen on paper
* Allows the user to make a new grid of a different size, going up to 100x100 pixels. The pixels remain square shaped and fit within a maximum width without becoming distorted

Additional features added beyond the requirements:
* Allows the user to reset/clear the grid by pressing the "Clear" button
* Includes the "darken to black" feature where each pass over a pixel adds 10% blackness to it (using CMYK)

TODO
* Make it so even for low grid sizes, the grid stays the same absolute size, e.g. going from 50x50 to 64x64 the grid stays the same size, but 50x50 to 10x10 the grid becomes smaller
* Make header a bit prettier, maybe link back to github homepage site