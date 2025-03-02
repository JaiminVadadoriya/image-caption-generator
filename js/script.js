document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("image-upload-form").addEventListener("submit", function (event) {
      event.preventDefault();
  
      // Get the file input and selected file
      const fileInput = document.getElementById("image-upload");
      const file = fileInput.files[0];
  
      if (!file) {
          alert("Please select an image to upload.");
          return;
      }
  
      // Show the loading spinner
      document.getElementById("loading-spinner").style.display = "flex";
  
      // Preview the image in the canvas
      const reader = new FileReader();
      reader.onload = function (e) {
          const imgElement = new Image();
          imgElement.src = e.target.result;
  
          imgElement.onload = function () {
              // Display the image in canvas
              const canvas = document.getElementById("image-canvas");
              const ctx = canvas.getContext("2d");
              ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear any previous content
              ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
  
              // Optionally, you can hide the canvas and show an image preview for better quality display
              document.getElementById("image-preview").src = e.target.result;
              document.getElementById("image-preview").style.display = "block";
          };
      };
      reader.readAsDataURL(file);
  
      // Prepare FormData to send image to PHP backend
      const formData = new FormData();
      formData.append("image", file);
  
      // Send the image to the backend via POST
      fetch("upload_image.php", {
          method: "POST",
          body: formData
      })
      .then(response => response.json())
      .then(data => {
          document.getElementById("loading-spinner").style.display = "none";  // Hide the loading spinner
          if (data.success) {
            console.log(data);
            let array = data.caption.split("\n");
              document.getElementById("caption-text").textContent = array[0];
              document.getElementById("caption-text2").textContent = array[1];
          } else {
              document.getElementById("caption-text").textContent = "Error: " + data.error;
          }
      })
      .catch(error => {
          document.getElementById("loading-spinner").style.display = "none";  // Hide the loading spinner
          console.error('Error:', error);
          document.getElementById("caption-text").textContent = "Error uploading image.";
      });
    });
  });
  