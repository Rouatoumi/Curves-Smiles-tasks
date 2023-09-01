// Get references to elements
const arrow = document.getElementById('arrow');
const content = document.getElementById('content');
const uploadTitle = document.getElementById('uploadTitle');
const pictureIcon = document.getElementById('pictureIcon'); // Reference to the picture icon
const uploadmenu = document.getElementById('uploadMenu'); 
const homeIcon = document.getElementById('homeIcon'); // Reference to the home icon
const uploadAbout = document.getElementById('uploadAbout'); // Reference to the upload
const uploadOrder = document.getElementById('uploadOrder'); // Reference to the upload order

// Initial state of content
let collapsed = false;

// Event listener for arrow click
arrow.addEventListener('click', () => {
  // Toggle collapsed content
  content.classList.toggle('collapsed-content');
  // Toggle arrow rotation
  arrow.classList.toggle('arrow-rotate');
  // Toggle picture icon rotation
  pictureIcon.style.transform = collapsed ? 'rotate(0deg)' : 'rotate(360deg)'; // Rotate 360 degrees when collapsed is true 
  // Toggle collapsed state
  collapsed = !collapsed;
  // Toggle hidden class on uploadTitle based on collapsed state
  uploadTitle.classList.toggle('hidden', collapsed);
  uploadmenu.classList.toggle('hidden', collapsed);
  uploadAbout.classList.toggle('hidden', collapsed);
  uploadOrder.classList.toggle('hidden', collapsed);
}); 

 const previewImage1 = document.getElementById('previewImage1');
    const previewImage2 = document.getElementById('previewImage2');
    const coordinates1 = document.getElementById('coordinates1');
    const coordinates2 = document.getElementById('coordinates2');

    let isDragging1 = false;
    let isDragging2 = false;
    let offsetX1 = 0;
    let offsetY1 = 0;
    let offsetX2 = 0;
    let offsetY2 = 0;

    document.getElementById('imageInput1').addEventListener('change', function () {
        previewSelectedImage(this, previewImage1);
    });

    document.getElementById('imageInput2').addEventListener('change', function () {
        previewSelectedImage(this, previewImage2);
    });

    function previewSelectedImage(input, imgElement) {
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imgElement.src = e.target.result;
                imgElement.style.left = '0';
                imgElement.style.top = '0';
                offsetX1 = 0;
                offsetY1 = 0;
                offsetX2 = 0;
                offsetY2 = 0;
            };
            reader.readAsDataURL(file);
        }
    }

    previewImage1.addEventListener('mousedown', (e) => {
        isDragging1 = true;
        offsetX1 = e.clientX - previewImage1.getBoundingClientRect().left;
        offsetY1 = e.clientY - previewImage1.getBoundingClientRect().top;
    });

    previewImage2.addEventListener('mousedown', (e) => {
        isDragging2 = true;
        offsetX2 = e.clientX - previewImage2.getBoundingClientRect().left;
        offsetY2 = e.clientY - previewImage2.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging1) {
            moveImage(e, previewImage1, offsetX1, offsetY1, coordinates1);
        }
        if (isDragging2) {
            moveImage(e, previewImage2, offsetX2, offsetY2, coordinates2);
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging1 = false;
        isDragging2 = false;
    });

    function moveImage(e, imgElement, offsetX, offsetY, coordinates) {
        const rect = imgElement.parentElement.getBoundingClientRect();
        const newX = e.clientX - offsetX - rect.left;
        const newY = e.clientY - offsetY - rect.top;
        imgElement.style.left = `${Math.max(0, Math.min(newX, rect.width - imgElement.width))}px`;
        imgElement.style.top = `${Math.max(0, Math.min(newY, rect.height - imgElement.height))}px`;
        updateCoordinates(coordinates, newX, newY);
    }

    previewImage1.addEventListener('mouseenter', () => {
        coordinates1.classList.remove('hidden');
    });

    previewImage1.addEventListener('mouseleave', () => {
        coordinates1.classList.add('hidden');
    });

    previewImage2.addEventListener('mouseenter', () => {
        coordinates2.classList.remove('hidden');
    });

    previewImage2.addEventListener('mouseleave', () => {
        coordinates2.classList.add('hidden');
    });

    function updateCoordinates(coordinates, x, y) {
        coordinates.textContent = `X: ${x.toFixed(2)}, Y: ${y.toFixed(2)}`;
    }