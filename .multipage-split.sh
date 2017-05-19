#!/bin/bash
set -ev
rm -rf out
mkdir out
rm -rf tools

git clone --depth=1 --branch=master https://github.com/w3c/html-tools.git ./tools

pushd ./tools
npm install
popd

node --max_old_space_size=2048 --expose-gc ./tools/multipage.js single-page.html ./out/
