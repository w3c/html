#!/bin/bash
set -ev
rm -rf out
mkdir out

nvm install stable
git clone --depth=1 --branch=master https://github.com/w3c/html-tools.git ./tools
pushd ./tools
npm install
popd

node ./tools/multipage.js single-page.html ./out
