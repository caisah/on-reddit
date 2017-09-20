#!/bin/sh

rollup --config rollup.config.js;

echo
echo Copying...
echo Copying 'manifest.json';
cp src/manifest.json build/addon/manifest.json;
echo Copying 'index.html'
cp src/popup/index.html build/addon/popup.html;
echo Copying 'style.css'
cp src/popup/style.css build/addon/style.css;
echo Copying 'icons'
cp -R src/icons build/addon/icons;
