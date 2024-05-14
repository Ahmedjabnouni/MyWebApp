<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <link rel="stylesheet" type="text/css" href="editor-style.css">
    <title>Responsive SVG Editor</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    <style>
        /* Media query for desktop devices */
        @media (min-width: 768px) {
            .download-buttons {
                position: sticky;
                top: 50px;
                margin-top: 0;
            }
            .controls h5 {
                margin-top: 30px;
                margin-bottom: 5px;
            }
        }

        /* Media query for mobile devices */
        @media (max-width: 767px) {
            h5, p.control-description {
                display: none;
            }
        }

        /* Remove box shadows */
        .e-card, .btn, .svg-canvas, .image-upload {
            box-shadow: none !important;
        }
    </style>
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8">
                <div class="svg-canvas" data-toggle="tooltip" title="Click on a shape to fill with the selected color">
                    <svg id="svgCanvas" width="100%" viewBox="0 0 800 600"></svg>
                </div>
            </div>
            <div class="col-md-4">
                <div class="controls" style="margin-top: 50px;">
                    <!-- Color Picker -->
                    <h5 style="margin-top: -27px !important;">Pick a Color</h5>
                    <p class="control-description" style="font: small-caption; color: grey;">Choose a color to apply to the SVG elements.</p>
                    <div class="color-picker mb-3">
                        <input type="color" id="colorPicker" value="#00a7bd" class="form-control" data-toggle="tooltip" title="Select a color">
                        <input type="text" id="hexColorInput" placeholder="#ffffff" class="form-control" style="width: 100px; margin-left: 10px;" data-toggle="tooltip" title="Enter a hex color code">
                        <button onclick="addColor()" class="btn btn-secondary" style="background-color: #8334f7;margin-left: 10px;" data-toggle="tooltip" title="" data-original-title="Add color to palette">Add Color</button>                    </div>
                    <!-- Color Palette -->
                    <h5>Your Color Palette</h5>
                    <p class="control-description" style="font: small-caption; color: grey;">Select a color from your palette to use on the SVG.</p>
                    <div class="palette mb-3" id="palette" style="align-content: center; display: flex; justify-content: center;">
                        <span id="palette-placeholder" style="color: #c4c4c4; display: block;">Your color palette here</span>
                    </div>
                    <!-- Extract Colors Feature -->
                    <h5>Extract Colors from Image</h5>
                    <p class="control-description" style="font: small-caption; color: grey;">Click to upload an image and extract colors to use in your SVG.</p>
                    <div class="image-upload mb-3 e-card" id="imageUploadContainer" data-toggle="tooltip" title="Click to upload an image and extract colors" style="border-radius: 8px;">
                        <div class="upload-controls" style="right: -33px !important;">
                            <p class="upload-text">Extract Colors from Image</p>
                            <input type="file" id="imageFile" accept="image/*" style="display: none;">
                        </div>
                        <div id="imageContainer" class="image-preview">
                            <img id="uploadedImage" alt="Uploaded Image Preview" style="display:none; max-width:100%; max-height:100%;">
                        </div>
                        <div class="wave"></div>
                        <div class="wave"></div>
                        <div class="wave"></div>
                    </div>
                    <!-- Download Buttons -->
                    <div class="download-buttons" style="display: flex; flex-direction: column;">
                        <button id="downloadSvgButton" class="btn btn-outline-dark" style="margin-bottom: 8px;margin-top: 16px;background-color: #8334f7;color: rgb(255 255 255);" data-toggle="tooltip" title="" data-original-title="Download your SVG file">Download SVG</button>                        <button id="downloadPngButton" class="btn btn-outline-dark" data-toggle="tooltip" title="Download your image as PNG">Download PNG</button>
                    </div>
                    <button id="undoButton" class="btn btn-outline-dark mobile-only" data-toggle="tooltip" title="Undo the last action">
                        <svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <g data-name="Layer 2">
                                <g data-name="arrow-back">
                                    <rect width="24" height="24" transform="rotate(90 12 12)" opacity="0"/>
                                    <path d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23 1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z"/>
                                </g>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <script src="editor-script.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.3.0/color-thief.umd.js"></script>
    <script>
        $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip();
        });
    </script>
</body>
</html>
