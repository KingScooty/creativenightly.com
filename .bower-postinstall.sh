#!/bin/bash

# Move Jekyll minify script into app/_includes
mv app/assets/_bower_components/minifyHTML/index.html app/_layouts/compress.html
rm -r app/assets/_bower_components/minifyHTML
