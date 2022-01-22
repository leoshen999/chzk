#!/bin/bash

cd `dirname $0`

rm -rf build
rm -rf ../chzk_deploy/*
yarn build
cp -rf build/* ../chzk_deploy/

revision=$(git rev-parse HEAD)

cd ../chzk_deploy/
git add *
git status
git commit -m "Update to $revision"
