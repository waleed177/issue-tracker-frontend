#!/bin/bash

for file in $(find ./ -name '*.vue'); do 
    cat preamble $file | sponge $file
done