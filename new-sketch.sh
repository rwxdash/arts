#!/bin/bash

currentDate=$(date +'%Y%d%m')

if [ -z "$1" ]
then
    tmpFolder=$currentDate
else
    tmpFolder="${currentDate}-$1"
fi

cp -R ./p5/empty-example $tmpFolder
