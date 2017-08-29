#!/bin/sh

rm -rf .gh-pages-tmp lib demo.tar.gz  &&
mkdir .gh-pages-tmp &&

node node_modules/webpack/bin/webpack.js --config ./webpack.production.config.js --hide-modules &&
cp -R lib/* .gh-pages-tmp &&
cp -R src/client/demo/index.html .gh-pages-tmp &&
cp -R .gitignore .gh-pages-tmp &&
tar -cvzf demo.tar.gz .gh-pages-tmp
