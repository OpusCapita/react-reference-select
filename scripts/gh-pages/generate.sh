#!/bin/bash

rm -rf gh-pages-branch .gh-pages-tmp demo.tar.gz  &&
mkdir .gh-pages-tmp &&

cp -R lib/client/demo/bundle.js .gh-pages-tmp &&
cp -R lib/client/demo/fonts/ .gh-pages-tmp &&
cp -R lib/client/demo/index.html .gh-pages-tmp &&
cp -R .gitignore .gh-pages-tmp &&
tar -cvzf demo.tar.gz .gh-pages-tmp
