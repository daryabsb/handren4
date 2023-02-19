const sizeOf = require("image-size");
const fs = require("fs");

// This function is called when the user selects an image file
function handleFileSelection(file) {
  // Read the file into a Buffer
  fs.readFile(file.path, function (err, data) {
    if (err) {
      // Handle error
      return;
    }

    // Detect image dimensions from the Buffer
    const dimensions = sizeOf(data);

    console.log(`Image width: ${dimensions.width}`);
    console.log(`Image height: ${dimensions.height}`);

    // Upload the file to the server
    uploadFile(data);
  });
}

// This function is called when the file is uploaded
function uploadFile(fileData) {
  // Upload the file to the server
  // ...
}
