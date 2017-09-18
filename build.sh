#!/bin/sh

rollup --config rollup.config.js;

cp src/manifest.json build/addon/manifest.json;
cp src/popup/index.html build/addon/index.html;
cp src/popup/style.css build/addon/style.css;
cp -R src/icons build/addon/icons;
