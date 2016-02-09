#!/bin/bash
set -ev
rm -rf out
mkdir out

git clone --depth=1 --branch=master https://github.com/w3c/html-tools.git ./tools
pushd ./tools
npm install
popd

DIR=`pwd`

node ./tools/multipage.js file://$DIR/single-page.html ./out/
