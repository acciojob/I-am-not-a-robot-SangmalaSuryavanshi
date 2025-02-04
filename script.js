//your code here
document.addEventListener('DOMContentLoaded', function () {
  // Image elements
  const images = document.querySelectorAll('img');
  const resetButton = document.getElementById('reset');
  const verifyButton = document.getElementById('verify');
  const message = document.getElementById('h');
  const resultMessage = document.getElementById('para');
  
  let selectedImages = [];
  let duplicateImage = null;

  // Step 1: Randomize images
  function shuffleImages() {
    const imgSources = [
      "https://picsum.photos/id/237/200/300", 
      "https://picsum.photos/seed/picsum/200/300", 
      "https://picsum.photos/200/300?grayscale", 
      "https://picsum.photos/200/300/", 
      "https://picsum.photos/200/300.jpg"
    ];
    
    const randomIndex = Math.floor(Math.random() * 5); 
    duplicateImage = imgSources[randomIndex]; // Pick one random image to duplicate
    
    imgSources.push(duplicateImage); // Add the duplicate image to the array

    // Shuffle the images
    imgSources.sort(() => Math.random() - 0.5);

    // Assign the shuffled image sources to image elements
    images.forEach((img, index) => {
      img.src = imgSources[index];
    });
  }

  // Step 2: Handle image click
  function handleImageClick(event) {
    const clickedImage = event.target;

    if (selectedImages.length < 2 && !selectedImages.includes(clickedImage)) {
      clickedImage.classList.add("selected");
      selectedImages.push(clickedImage);
    }

    // Step 3: Show reset button after the first click
    resetButton.style.display = 'inline-block';

    // Step 4: Show verify button after two images are clicked
    if (selectedImages.length === 2) {
      verifyButton.style.display = 'inline-block';
    }
  }

  // Step 5: Reset the game
  resetButton.addEventListener('click', () => {
    selectedImages.forEach(img => img.classList.remove("selected"));
    selectedImages = [];
    resetButton.style.display = 'none';
    verifyButton.style.display = 'none';
    resultMessage.textContent = '';
  });

  // Step 6: Verify the selected images
  verifyButton.addEventListener('click', () => {
    const [firstImage, secondImage] = selectedImages;
    if (firstImage.src === secondImage.src) {
      resultMessage.textContent = "You are a human. Congratulations!";
    } else {
      resultMessage.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
    verifyButton.style.display = 'none'; // Hide the verify button after use
  });

  // Initialize the images and event listeners
  shuffleImages();

  images.forEach(img => img.addEventListener('click', handleImageClick));
});
