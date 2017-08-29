#!/bin/sh

npm start compile-css &&
rm -rf .gh-pages-tmp &&
mkdir .gh-pages-tmp &&
cp -R dist/css/* .gh-pages-tmp
cp -R src/client/* .gh-pages-tmp
