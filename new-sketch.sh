#!/bin/bash

currentDate=$(date +'%Y%d%m')

tmpFolder=$currentDate-$(openssl rand -hex 4)
cp -R ./p5/empty-example $tmpFolder

echo $(pwd)/$tmpFolder/index.html | pbcopy
