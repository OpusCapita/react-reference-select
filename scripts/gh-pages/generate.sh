#!/bin/sh

rm -rf gh-pages-branch .gh-pages-tmp lib demo.tar.gz  &&
mkdir .gh-pages-tmp &&

node node_modules/webpack/bin/webpack.js --config ./webpack.docs.config.js --hide-modules &&
mkdir .gh-pages-tmp/static &&
cp -R lib/* .gh-pages-tmp/static &&
cp -R src/client/demo/fonts/ .gh-pages-tmp/ &&
cp -R src/client/demo/css/ .gh-pages-tmp/ &&
cp -R src/client/demo/index.html .gh-pages-tmp &&
cp -R .gitignore .gh-pages-tmp &&
tar -cvzf demo.tar.gz .gh-pages-tmp
