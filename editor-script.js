// Error handling for global script errors
window.addEventListener('error', function(event) {
    console.error('Error occurred:', event.message);
    console.error('At:', event.filename, 'Line:', event.lineno, 'Column:', event.colno);
});

// History management for SVG states
let historyStack = [];
let currentIndex = -1;

function updateHistory() {
    // Removes future states if redo has been performed
    if (currentIndex < historyStack.length - 1) {
        historyStack = historyStack.slice(0, currentIndex + 1);
    }
    // Adds the current SVG state to the history stack
    historyStack.push(document.getElementById('svgCanvas').innerHTML);
    currentIndex++;
    console.log("State updated, current index:", currentIndex);
    console.log("Current SVG state:", document.getElementById('svgCanvas').innerHTML);
}

let initialState;

// SVG file upload handling
document.getElementById('svgFile').addEventListener('change', function() {
    const file = this.files[0];
    if (file && file.type === "image/svg+xml") {
        const reader = new FileReader();
        reader.onload = function(e) {
            const newSvg = e.target.result;
            const svgCanvas = document.getElementById('svgCanvas');
            svgCanvas.innerHTML = newSvg;
            initialState = newSvg; // Store the initial state after loading the SVG
            initSVGInteractions(svgCanvas);
        };
        reader.readAsText(file);
    } else {
        alert('Please upload a valid SVG file.');
    }
});


// Undo functionality
function undo() {
    if (currentIndex > 0) {
        currentIndex--;
        document.getElementById('svgCanvas').innerHTML = historyStack[currentIndex];
    } else if (currentIndex === 0) {
        // Reset to the initial state when currentIndex is 0
        resetSVG();
    } else {
        alert("No more actions to undo!");
    }
    initSVGInteractions(document.getElementById('svgCanvas')); // Reinitialize interactions
}

function resetSVG() {
    const svgCanvas = document.getElementById('svgCanvas');
    svgCanvas.innerHTML = initialState;
    historyStack = [initialState]; // Reset the history stack
    currentIndex = 0; // Reset the current index
    initSVGInteractions(svgCanvas); // Reinitialize interactions
}

// Keyboard shortcut handling for undo operation
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'z') {
        undo();
    }
});

// Image file handling for color extraction
document.getElementById('imageFile').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const imgElement = document.getElementById('uploadedImage');
        imgElement.src = e.target.result;
        imgElement.onload = function() {
            extractColors(); // Automatically extract colors after the image loads
        }
        imgElement.style.display = 'block'; // Show the image
    };
    reader.readAsDataURL(file);
});

function extractColors() {
    const img = document.getElementById('uploadedImage');
    const colorThief = new ColorThief();
    const colors = colorThief.getPalette(img, 8); // Extracts 8 dominant colors
    const palette = document.getElementById('palette');
    palette.innerHTML = ''; // Clear existing swatches
    colors.forEach(color => {
        const colorHex = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        const newSwatch = document.createElement('div');
        newSwatch.className = 'color-swatch';
        newSwatch.style.backgroundColor = colorHex;
        newSwatch.onclick = function() {
            document.querySelectorAll('.color-swatch').forEach(swatch => {
                swatch.style.border = 'none';
            });
            this.style.border = '1px solid black';
            currentColor = colorHex;
        };
        palette.appendChild(newSwatch);
    });
}




//color picker


let lastInvocationTime = 0;
const debounceInterval = 100; // milliseconds

function addColor(color) {
    // Ensure color starts with '#' for CSS compatibility
    if (!color.startsWith('#')) {
        color = '#' + color;
    }

    // Validate the color format, adjusting the regex to accept without '#'
    if (!color.match(/^#[0-9A-Fa-f]{6}$/)) {
        console.error("Invalid or empty hex code:", color);
        alert("Please enter a valid hex color code, optionally starting with '#' followed by six hex characters (0-9, A-F).");
        return; // Stop adding if the color is invalid
    }

    const now = Date.now();
    if (now - lastInvocationTime < debounceInterval) {
        return; // Prevents rapid successive calls
    }
    lastInvocationTime = now;

    const palette = document.getElementById('palette');
    const newSwatch = document.createElement('div');
    newSwatch.className = 'color-swatch';
    newSwatch.style.backgroundColor = color;
    newSwatch.onclick = function() {
        document.querySelectorAll('.color-swatch').forEach(swatch => {
            swatch.style.border = 'none';
        });
        this.style.border = '1px solid black';
        currentColor = color;
    };

    const placeholder = document.getElementById('palette-placeholder');
    if (placeholder) {
        placeholder.style.display = 'none';
    }

    palette.appendChild(newSwatch);
    console.log("Color added:", color);
    updateHistory();

    // Clear the hex input field after adding the color
    document.getElementById('hexColorInput').value = '';
}

document.querySelector('.color-picker button').addEventListener('click', function() {
    const hexInput = document.getElementById('hexColorInput').value.trim();
    const colorPicker = document.getElementById('colorPicker').value;

    // Adjust regex to allow hex codes without '#'
    if (hexInput.match(/^(#)?[0-9A-Fa-f]{6}$/)) {
        addColor(hexInput);
    } else {
        // If hex input is invalid or empty, use the color picker's value
        addColor(colorPicker);
    }
});

function updateHistory() {
    // Placeholder for history update logic
    console.log("History updated");
}










// Optionally, you could add a function to clear the palette that checks if it should show the placeholder again
function clearPalette() {
    const palette = document.getElementById('palette');
    palette.innerHTML = '<span id="palette-placeholder" style="color: grey; display: block;">Your color plate here</span>'; // Resets the palette
    // No need to update history here unless you want to track this action as well
}

// Initialize interactions with SVG elements
function initSVGInteractions(svgElement) {
    const fillableShapes = svgElement.querySelectorAll('path, rect, circle, ellipse, polygon, polyline');
    fillableShapes.forEach(shape => {
        shape.setAttribute('data-clicked', 'false');
        shape.addEventListener('click', function(event) {
            if (shape.getAttribute('data-clicked') === 'false') {
                startFillAnimation(event, shape, currentColor);
                shape.setAttribute('data-clicked', 'true');
            } else {
                startDissolveAnimation(shape, currentColor);
            }
        });
    });
}

// Start the filling animation for an SVG element
function startFillAnimation(event, element, color) {
    const bounds = element.getBBox();
    const centerX = bounds.x + bounds.width / 2;
    const centerY = bounds.y + bounds.height / 2;
    const clipPathId = 'clipPath-' + element.tagName + '-' + Math.random().toString(36).substr(2, 9);
    let clipPath = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
    clipPath.setAttribute('id', clipPathId);
    const clipCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    clipCircle.setAttribute('cx', centerX);
    clipCircle.setAttribute('cy', centerY);
    clipCircle.setAttribute('r', 0);
    clipPath.appendChild(clipCircle);
    element.ownerSVGElement.appendChild(clipPath);
    element.style.clipPath = `url(#${clipPathId})`;
    element.style.fill = color;
    const maxRadius = Math.sqrt(bounds.width ** 2 + bounds.height ** 2);
    animateCircle(clipCircle, centerX, centerY, maxRadius);
    console.log("Starting fill animation for element:", element);
    updateHistory();
}

// Start the dissolve animation for an SVG element
function startDissolveAnimation(element, color) {
    element.style.transition = 'fill 1s ease';
    element.style.fill = color;
}

// Animate the expansion of a circle used in clipping paths
function animateCircle(circle, cx, cy, maxRadius) {
    let radius = 0;
    const interval = setInterval(() => {
        radius += 10;
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', radius);
        if (radius >= maxRadius) {
            clearInterval(interval);
            circle.parentNode.style.clipPath = '';
            circle.setAttribute('1', 0); // Reset radius for future animations
            console.log("Animation completed for:", circle);
            updateHistory(); // Consider when and how often to update history
        }
    }, 10);
}


document.addEventListener('DOMContentLoaded', function () {
    const svgCanvas = document.getElementById('svgCanvas');
    const storedSvg = localStorage.getItem('currentSVG');
    if (storedSvg) {
        svgCanvas.innerHTML = storedSvg; // Load the SVG into the editor
    }
});








document.addEventListener('DOMContentLoaded', function () {
    const svgCanvas = document.getElementById('svgCanvas');
    const storedSvg = localStorage.getItem('currentSVG');

    if (storedSvg) {
        svgCanvas.innerHTML = storedSvg; // Load the SVG into the editor
        initSVGInteractions(svgCanvas); // Reinitialize interactions
    }
});



function shapeClickHandler(event) {
    const color = document.getElementById('colorPicker').value;
    event.target.style.fill = color; // Apply color directly to clicked shape
}



//SVG Download button



document.addEventListener('DOMContentLoaded', function() {
    const downloadButton = document.getElementById('downloadSvgButton');
    if (downloadButton) {
        downloadButton.addEventListener('click', function() {
            downloadSVG();
        });
    }
});


function downloadSVG() {
    const svgCanvas = document.getElementById('svgCanvas');
    if (svgCanvas) {
        const svgData = svgCanvas.innerHTML;
        const blob = new Blob([svgData], {type: 'image/svg+xml'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'edited-svg.svg'; // Provide a default file name for the download
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url); // Clean up the URL object
    }
}


//png Download button


document.addEventListener('DOMContentLoaded', function() {
    const downloadPngButton = document.getElementById('downloadPngButton');
    if (downloadPngButton) {
        downloadPngButton.addEventListener('click', function() {
            downloadSVGAsPNG();
        });
    }
});

function downloadSVGAsPNG() {
    const svgCanvas = document.getElementById('svgCanvas');
    const svgData = new XMLSerializer().serializeToString(svgCanvas);

    // Prepare SVG data and create a Blob URL
    const data = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData);
    const image = new Image();

    image.onload = function() {
        // When the image is loaded, render it to the canvas
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);

        // Convert canvas to PNG
        const pngUrl = canvas.toDataURL('image/png');

        // Trigger the download
        const a = document.createElement('a');
        a.href = pngUrl;
        a.download = 'edited-image.png'; // Provide a default file name for the download
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    image.src = data;
}





//adjust size of the svg to match the canvas

// function adjustSVGSize() {
//     const svgElement = document.getElementById('svgCanvas');
//     if (!svgElement) {
//         console.error('SVG element not found');
//         return;
//     }

//     // Assume the original viewBox dimensions represent the natural size
//     const originalViewBox = svgElement.getAttribute('viewBox') || '0 0 600 300';
//     const originalWidth = 800;  // Desired width for display
//     const originalHeight = 600; // Desired height for display

//     // Set the viewBox to the original dimensions if necessary
//     svgElement.setAttribute('viewBox', originalViewBox);

//     // Adjust the preserveAspectRatio to ensure proper scaling
//     svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');

//     // Set the width and height to desired display size
//     svgElement.setAttribute('width', originalWidth.toString());
//     svgElement.setAttribute('height', originalHeight.toString());

//     console.log('SVG dimensions and properties adjusted.');
// }

// // Call the function to adjust the SVG dimensions
// adjustSVGSize();


function adjustSVGSize() {
    const svgElement = document.getElementById('svgCanvas');
    if (!svgElement) {
        console.error('SVG element not found');
        return;
    }

    // Set the viewBox to the original size (update this as per your specific SVG content)
    svgElement.setAttribute('viewBox', '0 0 500 500');

    // Ensure the preserveAspectRatio is set to default or as needed
    svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    // Adjust the dimensions of the SVG element to match the canvas size
    svgElement.setAttribute('width', '800');
    svgElement.setAttribute('height', '600');

    console.log('SVG dimensions and properties adjusted.');
}

// Call the function to adjust the SVG dimensions
adjustSVGSize();









// document.addEventListener('DOMContentLoaded', function() {
//     adjustSVGsToCanvasSize('adjustable-svg', 800, 600);
// });

// function adjustSVGsToCanvasSize(svgClass, targetWidth, targetHeight) {
//     const svgs = document.querySelectorAll(`.${svgClass}`);

//     svgs.forEach(svg => {
//         const viewBox = svg.getAttribute('viewBox');
//         if (viewBox) {
//             // Preserve the original viewBox if defined
//             svg.setAttribute('viewBox', viewBox);
//         } else {
//             // If no viewBox is defined, create one based on current width and height
//             const currentWidth = svg.getAttribute('width') || svg.clientWidth;
//             const currentHeight = svg.getAttribute('height') || svg.clientHeight;
//             svg.setAttribute('viewBox', `0 0 ${currentWidth} ${currentHeight}`);
//         }

//         // Set the new width and height
//         svg.setAttribute('width', targetWidth);
//         svg.setAttribute('height', targetHeight);

//         // Set preserveAspectRatio to ensure the SVG scales correctly
//         svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
//     });
// }












document.addEventListener('DOMContentLoaded', function() {
    const svgCanvas = document.getElementById('svgCanvas');
    if (svgCanvas) {
        const elements = svgCanvas.querySelectorAll('path, rect, circle, ellipse, polygon, polyline');

        elements.forEach(element => {
            let opacity = element.style.opacity || window.getComputedStyle(element).getPropertyValue('opacity');
            if (opacity < 1) {  // Adjust this threshold as needed , its set on 0 opacity ya3ni kan fama ay opacity cursor yetjehlha
                element.style.pointerEvents = 'none';
            }
        });
    }
});

