document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('image-upload-form');
  const fileInput = document.getElementById('image-upload');
  const canvas = document.getElementById('image-canvas');
  const captionText = document.getElementById('caption-text');
  const ctx = canvas.getContext('2d');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form submission

    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async function (event) {
        const img = new Image();
        img.onload = function () {
          // Clear previous canvas and draw new image
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Send the image to the server for captioning
          uploadImage(file);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  async function uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('upload_image.php', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        captionText.textContent = data.caption || "No caption generated.";
      } else {
        captionText.textContent = "Error generating caption.";
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      captionText.textContent = "Failed to upload image.";
    }
  }
});
