// Global varaibles

let width = 500,
    height = 0,
    filter = "none",
    streaming = false;

// DOM Elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const takePhotoButton = document.getElementById('photo-button');
const clearButton = document.getElementById('clear-button');
const photoFilter = document.getElementById('photo-filter');

// Get media stream

navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(function (stream) {
    // Link to the video source
    video.srcObject = stream;
    // Play video
    video.play();
}).catch(function (error) {
    alert(error.name)
});

// Play when ready

video.addEventListener('canplay', function (e) {
    if (!streaming) {
        // Set video
        height = video.videoHeight / (video.videoWidth / width);

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);

        streaming = true;
    }
});

// Filter event
photoFilter.addEventListener("change", function (e) {
    // Set filter to chosen option
    filter = e.target.value;
    // Set filter to video
    video.style.filter = filter;
    e.preventDefault();
});

// Clear event
clearButton.addEventListener("click", function (e) {
    // Clear photos
    photos.innerHTML = '';

    // Change filter to normal
    filter = "none";

    // Set video filter
    video.style.filter = filter;
    
    // Reset select list
    photoFilter.selectedIndex = 0;
});

// Take Photo event
takePhotoButton.addEventListener("click", function (e) {
    takePhoto();
    e.preventDefault();
});

// Take picture from canvas
function takePhoto() {
    // Create canvas 
    var context = canvas.getContext('2d');
    if (width && height) {
        //  Set canvas props
        canvas.width = width;
        canvas.height = height;
        // Draw image of the video on the canvas
        context.drawImage(video, 0, 0, width, height);

        // Create image from the canvas
        const imgUrl = canvas.toDataURL("image/png");

        // Create img element
        const img = document.createElement('img');

        // Set img src
        img.setAttribute('src', imgUrl);

        // Set image filter
        img.style.filter = filter;

        // Add image to photos
        photos.appendChild(img);
    }
}