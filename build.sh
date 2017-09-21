#!/bin/sh

echo running Rollup...
rollup --config rollup.config.js;

echo
echo Copying...
cp src/manifest.json build/addon/manifest.json;
echo Copied 'manifest.json';
cp src/popup/index.html build/addon/popup.html;
echo Copied 'index.html'
cp src/popup/style.css build/addon/style.css;
echo Copied 'style.css'
cp -R src/icons build/addon/icons;
echo Copied 'icons'
