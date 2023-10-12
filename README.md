# MSA Nose Extension

This extension has the goal to help architects and developers to create a Microservices Architecture (MSA) using the MSA-Nose tool (https://github.com/JSamoes/msa-nose originally from https://github.com/cloudhubs/msa-nose).

## Features

The main feature is to visualize the MSA-Nose results in a graphical way. The extension will create a new tab in the editor with the visualization.

## Requirements

* The extension requires the MSA-Nose tool to be cloned and running in the same machine as the extension. The extension will comunicate with the tool using the port 8080.
* Node and npm installed in the machine.
* `code` command should be installed if not using the default installation of VSCode and if using MacOS (which is not installed by default).

## Known Issues

* Frontend is not well rendered and the size of the accordion is not well calculated.
