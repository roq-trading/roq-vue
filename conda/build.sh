#!/usr/bin/env bash

set -e

echo -e "\033[1;34m--- ENV ---\033[0m"

env | sort

echo -e "\033[1;34m--- BUILD ---\033[0m"

npm install --quiet
npm run build

echo -e "\033[1;34m--- COPY ---\033[0m"

find $SRC_DIR/dist -name "*"

DATADIR="$PREFIX/share/roq/html"

mkdir -p $DATADIR
cp -r $SRC_DIR/dist/* $DATADIR

echo -e "\033[1;34m--- DONE ---\033[0m"
