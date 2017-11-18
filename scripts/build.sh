#!/bin/sh

SRC_PATH="./src"
DEST_PATH="./build/addon"

MANIFEST="manifest.json"
ICONS="icons"
STYLES="style.css"

echo running Rollup...
rollup --config rollup.config.js;

echo
echo Copying...
cp "$SRC_PATH/$MANIFEST" "$DEST_PATH/$MANIFEST"
echo Copied $MANIFEST

cp "$SRC_PATH/popup/index.html" "$DEST_PATH/popup.html"
echo Copied 'index.html'

cp "$SRC_PATH/popup/$STYLES" "$DEST_PATH/$STYLES"
echo Copied $STYLES

cp -R "$SRC_PATH/$ICONS" "$DEST_PATH"
echo Copied $ICONS

echo Done.
