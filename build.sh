#!/bin/bash

# Define the output zip file name
OUTPUT_FILE="chrome-ext-short-url.zip"

# Remove existing zip file if it exists
if [ -f "$OUTPUT_FILE" ]; then
    rm "$OUTPUT_FILE"
fi

# Create the zip file
zip -r "$OUTPUT_FILE" manifest.json src/ image/

echo "Created $OUTPUT_FILE successfully."
