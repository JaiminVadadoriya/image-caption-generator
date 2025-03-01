<?php
// Define the upload directory (make sure it's writable by the server)
$uploadDir = 'uploads/';

// Make sure the 'uploads' directory exists, if not, create it
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// Check if a file was uploaded
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $image = $_FILES['image'];
    $uploadFile = $uploadDir . basename($image['name']);
    $imageType = strtolower(pathinfo($uploadFile, PATHINFO_EXTENSION));

    // Allowed file types for the image
    $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];

    // Check if the uploaded file is an image
    if (in_array($imageType, $allowedTypes)) {
        // Move the uploaded file to the target directory
        if (move_uploaded_file($image['tmp_name'], $uploadFile)) {
            // Run the Python script to generate the caption
            // Ensure Python is installed and the 'generate_caption.py' script is in the same directory or provide full path
            $command = escapeshellcmd("python generate_caption.py " . escapeshellarg($uploadFile));
            $caption = shell_exec($command); // Get the caption returned by the Python script

            // Return the caption to the frontend
            echo json_encode([
                'success' => true,
                'message' => 'Image uploaded successfully!',
                'file' => $uploadFile,
                'caption' => trim($caption)  // Send the generated caption back
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'error' => 'Failed to move uploaded file.'
            ]);
        }
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Invalid file type. Only JPG, JPEG, PNG, and GIF are allowed.'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'error' => 'No file uploaded.'
    ]);
}
?>
