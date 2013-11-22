#!/bin/bash

#   This is a code you could use in your integration server or wherever
# you build your project.

npm install
if [[ $? != 0 ]]; then
	echo "NPM Registry failed ! using cached..."
fi
exit 0
