<?php
// upload_image.php
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['image'])) {
    $image = $_FILES['image'];

    // Move the uploaded file to the server (ensure directory is writable)
    $upload_dir = 'uploads/';
    $upload_file = $upload_dir . basename($image['name']);
    if (move_uploaded_file($image['tmp_name'], $upload_file)) {
        // Process image here, call your AI model to generate the caption
        $caption = 'Generated caption for the uploaded image';

        // Return the caption as JSON
        echo json_encode(['caption' => $caption]);
    } else {
        echo json_encode(['caption' => 'Failed to upload image.']);
    }
} else {
    echo json_encode(['caption' => 'No image received.']);
}
