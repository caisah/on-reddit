#!/bin/sh

SRC_PATH="./src"
DEST_PATH="./build/addon"

MANIFEST="manifest.json"
ICONS="icons"
ADDON_STYLES="style.css"
OPTIONS="options"

echo running Rollup...
rollup --config rollup.config.js;

echo
echo Copying...
cp "$SRC_PATH/$MANIFEST" "$DEST_PATH/$MANIFEST"
echo "Copied $MANIFEST"

cp "$SRC_PATH/popup/index.html" "$DEST_PATH/popup.html"
echo Copied 'index.html'

cp "$SRC_PATH/popup/$ADDON_STYLES" "$DEST_PATH/$ADDON_STYLES"
echo "Copied $ADDON_STYLES"

cp -R "$SRC_PATH/$ICONS" "$DEST_PATH"
echo "Copied $ICONS"

cp "$SRC_PATH/$OPTIONS/$OPTIONS.html" "$DEST_PATH/$OPTIONS.html"
cp "$SRC_PATH/$OPTIONS/$OPTIONS.css" "$DEST_PATH/$OPTIONS.css"
echo "Copied $OPTIONS"

echo Done.
