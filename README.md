# Image Captioning with BLIP (BLIP-Image-Captioning-Large)

This project uses a pre-trained BLIP model from Salesforce, which generates captions for images. The model leverages BLIP for both conditional and unconditional image captioning. This project is designed to be integrated with a PHP backend, making it easy to call via `shell_exec()`.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Requirements](#requirements)
3. [Apache & PHP Setup for Windows Users](#apache-php-setup-for-windows-users)
4. [Python Setup and Dependencies](#python-setup-and-dependencies)
5. [Directory Structure](#directory-structure)

## Project Overview

This project uses the BLIP (Bootstrapping Language-Image Pretraining) model from Salesforce to generate captions for images. It can provide both **conditional** captions (given a prompt) and **unconditional** captions (without any prompt).

The code integrates Python with a PHP backend using Apache to call Python scripts and display generated captions on a webpage.

## Requirements

### Prepare your environment:

- Ensure that Python is installed and the dependencies are set up as mentioned in the [Python Setup and Dependencies](#python-setup-and-dependencies) section.

- Make sure Apache is running via XAMPP.

## Apache PHP Setup for Windows Users

If you are running this project on **Windows** using **Apache** and **PHP** (for local development with XAMPP), follow these steps to set up:

1. **Install XAMPP** (if not installed yet):

   - Download and install XAMPP from [here](https://www.apachefriends.org/index.html).
   - After installation, launch the XAMPP control panel.

2. **Place the Project Files in the Correct Directory**:

   - Move or clone this project folder to the `htdocs` directory of your XAMPP installation.
   - Example: If XAMPP is installed at `C:\xampp`, place the project in `C:\xampp\htdocs\image-caption-generator`.

3. **Ensure PHP Can Access the Python Script**:

   - Use `shell_exec()` in PHP to execute the Python script.
   - Make sure PHP has permissions to execute the Python script from the command line.

   Example PHP code to call the Python script:

```php
   <?php
   // Example path to the image
   $image_path = 'C:/xampp/htdocs/image-caption-generator/images/myimage.jpg';

   // Command to run the Python script
   $command = "python C:/xampp/htdocs/image-caption-generator/generate_caption.py $image_path";

   // Execute the command and capture the output
   $output = shell_exec($command);

   // Display the output (captions)
   echo $output;
   ?>
```

## Python Setup and Dependencies

Before running the Python script, you'll need to install the following dependencies:

- `torch`: For running the deep learning model.
- `transformers`: For using the BLIP model and processor.
- `Pillow`: For image processing and opening image files.
- `requests`: For handling HTTP requests (if needed).

You can install all the necessary dependencies by running the following command in your Python environment:

```bash
pip install -r requirements.txt
```

## Directory Structure

The recommended directory structure for your project should look like this:

```bash
/xampp/htdocs/image-caption-generator/
├── generate_caption.py      # Python script for captioning
├── images/                  # Directory to store images
├── uploads/                 # Directory to store uploaded images
├── requirements.txt         # Python dependencies
├── README.md                # This file
└── your_php_script.php      # PHP script to call Python script
```
