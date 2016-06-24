#!/bin/bash
set -ev
rm -rf out
mkdir out

git clone --depth=1 --branch=master https://github.com/adrianba/multipage.git ./tools
pushd ./tools
npm install
popd

node --max_old_space_size=2048 ./tools/multipage.js single-page.html ./out/
