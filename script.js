document.addEventListener('DOMContentLoaded', function () {
    const grid = document.getElementById('svgGrid');

    fetch('svgs.json')  // Adjust path if needed
        .then(response => response.json())
        .then(svgs => {
            svgs.forEach(svg => {
                const col = document.createElement('div');
                col.className = 'col-sm-6 col-md-4 col-lg-3 mb-4';

                const card = document.createElement('div');
                card.className = 'card h-100 position-relative';
                card.onclick = () => openInEditor(card); // Add click event to open SVG in editor

                const downloadIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                downloadIcon.setAttribute('viewBox', '0 0 24 24');
                downloadIcon.setAttribute('fill', 'none');
                downloadIcon.setAttribute('width', '24');
                downloadIcon.setAttribute('height', '24');
                downloadIcon.setAttribute('class', 'download-icon');
                downloadIcon.innerHTML = '<path d="M17 17H17.01M17.4 14H18C18.9319 14 19.3978 14 19.7654 14.1522C20.2554 14.3552 20.6448 14.7446 20.8478 15.2346C21 15.6022 21 16.0681 21 17C21 17.9319 21 18.3978 20.8478 18.7654C20.6448 19.2554 20.2554 19.6448 19.7654 19.8478C19.3978 20 18.9319 20 18 20H6C5.06812 20 4.60218 20 4.23463 19.8478C3.74458 19.6448 3.35523 19.2554 3.15224 18.7654C3 18.3978 3 17.9319 3 17C3 16.0681 3 15.6022 3.15224 15.2346C3.35523 14.7446 3.74458 14.3552 4.23463 14.1522C4.60218 14 5.06812 14 6 14H6.6M12 15V4M12 15L9 12M12 15L15 12" stroke="#CBD5E1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
                // SVG path for download icon omitted for brevity

                fetch(svg.url)
                    .then(response => response.text())
                    .then(svgData => {
                        const cardBody = document.createElement('div');
                        cardBody.className = 'card-body d-flex flex-column';
                        cardBody.innerHTML = `<h5 class="card-title">${svg.name}</h5><div class="svg-container flex-grow-1">${svgData}</div><p class="card-text">${svg.tags.join(', ')}</p>`;
                        card.appendChild(cardBody);
                        card.appendChild(downloadIcon);
                        col.appendChild(card);
                        grid.appendChild(col);
                        markInitialElements(card.querySelector('.svg-container'), '#6c63ff');
                        downloadIcon.addEventListener('click', function(event) {
                            event.stopPropagation(); // Prevent the card click event
                            downloadSVG(card.querySelector('.svg-container').innerHTML, svg.name);
                        });
                    });
            });
        });
});

function openInEditor(svgCard) {
    const svgData = svgCard.querySelector('.svg-container').innerHTML;
    localStorage.setItem('currentSVG', svgData); // Store SVG data in local storage
    window.location.href = '/editor/editor-index.html'; // Navigate to the editor page
}







  // Get the color picker element and add an event listener to handle color changes.
  const colorPicker = document.getElementById('colorPicker');
  colorPicker.addEventListener('input', function (e) {
      const newColor = e.target.value;
      updateSVGColors(newColor); // Call function to update SVG colors based on picker input.
  });


// Function to mark SVG elements that can have their color changed.
function markInitialElements(svgContainer, targetColor) {
  // Select all possible elements within the SVG that could be colored.
  const elements = svgContainer.querySelectorAll('path, circle, rect, polygon, polyline, line, ellipse');
  elements.forEach(element => {
      const currentFill = element.getAttribute('fill');
      // Check if the current fill color matches the target color.
      if (currentFill && currentFill.toUpperCase() === targetColor.toUpperCase()) {
          element.dataset.modifiedByPicker = true; // Mark the element for color update handling.
      }
  });
}

// Function to update the colors of marked SVG elements.
function updateSVGColors(newColor) {
  // Select all elements marked as modifiable.
  const markedElements = document.querySelectorAll('[data-modified-by-picker]');
  markedElements.forEach(element => {
      element.setAttribute('fill', newColor); // Update the fill attribute to the new color.
  });
}

// Function to handle downloading of an SVG.
function downloadSVG(svgData, name) {
  const blob = new Blob([svgData], {type: 'image/svg+xml'}); // Create a blob from the SVG data.
  const url = window.URL.createObjectURL(blob); // Create a URL from the blob.
  const a = document.createElement('a'); // Create a temporary anchor element.
  a.href = url;
  a.download = name + '.svg'; // Set the download attribute with filename.
  document.body.appendChild(a); // Append the anchor to the body.
  a.click(); // Programmatically click the anchor to trigger the download.
  document.body.removeChild(a); // Remove the anchor after download.
  window.URL.revokeObjectURL(url); // Clean up the blob URL.
}
