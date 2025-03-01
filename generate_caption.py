import sys
import requests
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration

# Load pre-trained BLIP processor and model
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-large")

# Get the image path from the command line argument (passed from PHP)
img_path = sys.argv[1]

# Open the image
raw_image = Image.open(img_path).convert('RGB')

# Conditional image captioning
text = "a photography of"  # This is the prompt text for conditional captioning
inputs = processor(raw_image, text, return_tensors="pt")

# Generate caption
out = model.generate(**inputs)
caption_conditional = processor.decode(out[0], skip_special_tokens=True)

# Unconditional image captioning
inputs_unconditional = processor(raw_image, return_tensors="pt")
out_unconditional = model.generate(**inputs_unconditional)
caption_unconditional = processor.decode(out_unconditional[0], skip_special_tokens=True)

# Print the generated caption (this will be captured by PHP's shell_exec)
print(f"Conditional Caption: {caption_conditional}")
print(f"Unconditional Caption: {caption_unconditional}")
