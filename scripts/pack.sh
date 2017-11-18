#!/bin/sh

NAME="on-reddit"
BUILD_DIR="./build"
ARCHIVE="$BUILD_DIR/$NAME.zip"
SRC="$BUILD_DIR/addon"

echo
echo "Building..."

if [ -e $ARCHIVE ]
then
    echo "Deleting old archive..."
    rm $ARCHIVE
    echo "Deleted $ARCHIVE"
fi

echo "Archiving..."
cd $SRC
zip -r  "../$NAME.zip" .
echo "Created $ARCHIVE"
echo Done.

