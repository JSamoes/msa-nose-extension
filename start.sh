#!/bin/bash

# Install the extension
cd extension

if ! [ -x "$(command -v vsce)" ]; then
  echo 'Error: vsce is not installed.' >&2
  echo 'Installing vsce...'
  npm install -g vsce
fi
yes | vsce package -o msa-nose-extension.vsix
code --install-extension msa-nose-extension.vsix
rm msa-nose-extension.vsix

# Install dependencies and start the webview
cd ..
cd webview
npm install
npm run start
