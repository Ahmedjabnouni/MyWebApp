let historyStack = [];
let currentIndex = -1;
let initialState;
let defaultColor = '#ff0000'; // Default color set to red
let currentColor = defaultColor; // Initialize current color with default
let lastInvocationTime = 0;
const debounceInterval = 100; // milliseconds

// Function to update the history stack
function updateHistory() {
    const svgCanvas = document.getElementById('svgCanvas');
    if (currentIndex < historyStack.length - 1) {
        historyStack = historyStack.slice(0, currentIndex + 1);
    }
    historyStack.push(svgCanvas.innerHTML);
    currentIndex++;
    console.log("History updated:", historyStack);
    console.log("Current index:", currentIndex);
}

// Function to initialize SVG interactions
function initSVGInteractions(svgElement) {
    const fillableShapes = svgElement.querySelectorAll('path, rect, circle, ellipse, polygon, polyline');
    fillableShapes.forEach(shape => {
        shape.addEventListener('click', function(event) {
            startFillAnimation(event, shape, currentColor);
        });

        // Ignore pointer events for elements with opacity less than 1
        let opacity = shape.style.opacity || window.getComputedStyle(shape).getPropertyValue('opacity');
        if (opacity < 1) {
            shape.style.pointerEvents = 'none';
        }
    });
}

// Function to handle file upload
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
            updateHistory(); // Initial load should also update history
        };
        reader.readAsText(file);
    } else {
        alert('Please upload a valid SVG file.');
    }
});

// Function to undo the last action
function undo() {
    if (currentIndex > 0) {
        currentIndex--;
        document.getElementById('svgCanvas').innerHTML = historyStack[currentIndex];
        initSVGInteractions(document.getElementById('svgCanvas')); // Reinitialize interactions
        console.log("Undo successful, current index:", currentIndex);

        // Perform the undo action twice if necessary
        if (currentIndex > 0 && document.getElementById('svgCanvas').innerHTML === '') {
            currentIndex--;
            document.getElementById('svgCanvas').innerHTML = historyStack[currentIndex];
            initSVGInteractions(document.getElementById('svgCanvas')); // Reinitialize interactions
            console.log("Undo successful on second attempt, current index:", currentIndex);
        }
    } else if (currentIndex === 0) {
        resetSVG(); // Reset to initial state when at the first action
    } else {
        alert("No more actions to undo!");
    }
}

// Function to reset SVG to initial state
function resetSVG() {
    console.log("Resetting to initial state");
    const svgCanvas = document.getElementById('svgCanvas');
    svgCanvas.innerHTML = initialState;
    historyStack = [initialState]; // Reset the history stack
    currentIndex = 0; // Reset the current index
    initSVGInteractions(svgCanvas); // Reinitialize interactions
}

// Function to add a color to the palette
function addColor(color) {
    if (!color.startsWith('#')) {
        color = '#' + color;
    }

    if (!color.match(/^#[0-9A-Fa-f]{6}$/)) {
        console.error("Invalid or empty hex code:", color);
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
    updateHistory(); // Update history after adding a color

    // Clear the hex input field after adding the color
    document.getElementById('hexColorInput').value = '';
}

// Event listener for color picker change
document.getElementById('colorPicker').addEventListener('change', function() {
    const colorValue = this.value;
    console.log("Color picker changed to: ", colorValue);
    currentColor = colorValue;
    addColor(colorValue);
});

// Event listener for the add color button
document.querySelector('.color-picker button').addEventListener('click', function() {
    const hexInput = document.getElementById('hexColorInput').value.trim();
    if (hexInput.match(/^(#)?[0-9A-Fa-f]{6}$/)) {
        addColor(hexInput);
    } else {
        const colorPicker = document.getElementById('colorPicker').value;
        addColor(colorPicker);
    }
});

// Function to handle image file upload for color extraction
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

// Function to extract colors from the uploaded image
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

// Function to start the filling animation for an SVG element
function startFillAnimation(event, element, color) {
    const bounds = element.getBBox();
    const svg = element.ownerSVGElement;

    // Get the mouse click position relative to the SVG element
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const transformedPoint = point.matrixTransform(svg.getScreenCTM().inverse());

    const clipPathId = 'clipPath-' + element.tagName + '-' + Math.random().toString(36).substr(2, 9);
    let clipPath = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
    clipPath.setAttribute('id', clipPathId);
    const clipCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    clipCircle.setAttribute('cx', transformedPoint.x);
    clipCircle.setAttribute('cy', transformedPoint.y);
    clipCircle.setAttribute('r', 0);
    clipPath.appendChild(clipCircle);
    element.ownerSVGElement.appendChild(clipPath);
    element.style.clipPath = `url(#${clipPathId})`;
    element.style.fill = color;
    const maxRadius = Math.sqrt(bounds.width ** 2 + bounds.height ** 2);
    animateCircle(clipCircle, transformedPoint.x, transformedPoint.y, maxRadius, () => {
        element.style.clipPath = ''; // Remove the clipPath after animation
        element.removeAttribute('clip-path'); // Ensure clip-path is removed
        updateHistory(); // Update history after the animation completes
    });
    console.log("Starting fill animation for element:", element);
}

// Function to animate the expansion of a circle used in clipping paths
function animateCircle(circle, cx, cy, maxRadius, callback) {
    let radius = 0;
    const interval = setInterval(() => {
        radius += 3;
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', radius);
        if (radius >= maxRadius) {
            clearInterval(interval);
            if (circle.parentNode) {
                circle.parentNode.removeChild(circle); // Remove the circle after animation
            }
            if (typeof callback === 'function') {
                callback();
            }
            console.log("Animation completed for:", circle);
        }
    }, 10);
}

// Function to start the dissolve animation for an SVG element
function startDissolveAnimation(element, color) {
    element.style.transition = 'fill 1s ease';
    element.style.fill = color;
    updateHistory(); // Update history after the animation completes
}

// Function to adjust SVG size to match the canvas
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

// Function to download the SVG
function downloadSVG() {
    const svgCanvas = document.getElementById('svgCanvas');
    if (svgCanvas) {
        const svgData = svgCanvas.innerHTML;
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
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

// Function to download the SVG as PNG
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

// Event listener for downloading SVG
document.addEventListener('DOMContentLoaded', function() {
    const downloadButton = document.getElementById('downloadSvgButton');
    if (downloadButton) {
        downloadButton.addEventListener('click', function() {
            downloadSVG();
        });
    }
});

// Event listener for downloading SVG as PNG
document.addEventListener('DOMContentLoaded', function() {
    const downloadPngButton = document.getElementById('downloadPngButton');
    if (downloadPngButton) {
        downloadPngButton.addEventListener('click', function() {
            downloadSVGAsPNG();
        });
    }
});

// Event listener to handle keyboard shortcut for undo operation
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'z') {
        undo();
    }
});

// Event listener to handle DOM content loaded
document.addEventListener('DOMContentLoaded', function () {
    const svgCanvas = document.getElementById('svgCanvas');
    const storedSvg = localStorage.getItem('currentSVG');
    if (storedSvg) {
        svgCanvas.innerHTML = storedSvg; // Load the SVG into the editor
        initSVGInteractions(svgCanvas); // Reinitialize interactions
    }

    adjustSVGSize(); // Adjust SVG size to match the canvas
});

// Error handling for global script errors
window.addEventListener('error', function(event) {
    console.error('Error occurred:', event.message);
    console.error('At:', event.filename, 'Line:', event.lineno, 'Column:', event.colno);
});
