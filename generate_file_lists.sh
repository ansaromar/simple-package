#!/bin/bash

# This script generates file_list.json files for each class directory
# This makes it possible for the website to display all files in each directory

# Loop through each class directory
for i in {1..8}; do
  CLASS_DIR="resources/class$i"
  OUTPUT_FILE="$CLASS_DIR/file_list.json"
  
  echo "Generating file list for Class $i..."
  
  # Start JSON array
  echo "[" > "$OUTPUT_FILE"
  
  # Get list of files in the directory, excluding any file_list.json
  FILES=$(find "$CLASS_DIR" -type f -not -name "file_list.json" | sort)
  
  # Counter for adding commas between entries
  COUNT=0
  TOTAL=$(echo "$FILES" | wc -l)
  
  # Process each file
  for FILE in $FILES; do
    COUNT=$((COUNT + 1))
    
    # Get filename (without path)
    FILENAME=$(basename "$FILE")
    
    # Create a friendly title (remove extension, replace underscores with spaces)
    TITLE=$(echo "$FILENAME" | sed 's/\.[^.]*$//' | sed 's/_/ /g' | sed 's/-/ /g')
    
    # Determine file size and format it
    SIZE=$(du -h "$FILE" | cut -f1)
    
    # Determine file type for meta field
    if [[ "$FILENAME" == *.pdf ]]; then
      META="PDF, $SIZE"
    elif [[ "$FILENAME" == *.docx ]] || [[ "$FILENAME" == *.doc ]]; then
      META="Word, $SIZE"
    elif [[ "$FILENAME" == *.pptx ]] || [[ "$FILENAME" == *.ppt ]]; then
      META="PowerPoint, $SIZE"
    elif [[ "$FILENAME" == *.zip ]]; then
      META="ZIP, $SIZE"
    elif [[ "$FILENAME" == *.png ]] || [[ "$FILENAME" == *.jpg ]] || [[ "$FILENAME" == *.jpeg ]]; then
      META="Image, $SIZE"
    else
      META="File, $SIZE"
    fi
    
    # Determine basic description based on filename
    DESCRIPTION="Class $i resource: $TITLE"
    
    # Create relative path
    REL_PATH=$(echo "$FILE" | sed "s|^|./|")
    
    # Add JSON entry
    echo "  {" >> "$OUTPUT_FILE"
    echo "    \"filename\": \"$FILENAME\"," >> "$OUTPUT_FILE"
    echo "    \"title\": \"$TITLE\"," >> "$OUTPUT_FILE"
    echo "    \"description\": \"$DESCRIPTION\"," >> "$OUTPUT_FILE"
    echo "    \"meta\": \"$META\"," >> "$OUTPUT_FILE"
    echo "    \"path\": \"$REL_PATH\"" >> "$OUTPUT_FILE"
    
    # Add comma if not the last entry
    if [ $COUNT -lt $TOTAL ]; then
      echo "  }," >> "$OUTPUT_FILE"
    else
      echo "  }" >> "$OUTPUT_FILE"
    fi
  done
  
  # Close JSON array
  echo "]" >> "$OUTPUT_FILE"
  
  echo "Generated $OUTPUT_FILE with $(echo "$FILES" | wc -l) files"
done

echo "All file lists generated successfully!"
