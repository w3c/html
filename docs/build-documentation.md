# Build documentation

The [HTML specification](https://www.w3.org/TR/html53/) is built using [Bikeshed](https://github.com/tabatkins/bikeshed) - instructions for installing it are below.
Before you create a Pull Request (PR) that is more complex than a simple typo or formatting fix,
please update and run bikeshed locally to check that the spec builds correctly.

## Producing a single page version

1. Open a command prompt from the HTML repo folder.
2. Run: bikeshed update
3. Run: bikeshed spec

### Producing a multi-page version

Bikeshed produces a single page version of the specification. 
There is also a multi-page script that breaks down the single page version into multiple pages.
This relies on node.js - installation instructions are below.

1. Run: node multipage.js [path of the spec]

## Installing Bikeshed

Full installation information is available in the [Bikeshed documentation](https://tabatkins.github.io/bikeshed/).

### Quick Windows installation

Tested on Windows 10.

1. Install [Python 2.7.x](https://www.python.org/downloads/) (32bit version) in the default location.

    `Note:` Make sure you select the option to install the `system path environment variable` (it isn't selected by default).
2. In an elevated command prompt, run: setx /m PATH "%PATH%;C:\Python27;C:\Python27\Scripts"
  
    `Note:` to open an elevated command prompt:
    * Type `Command prompt` into the Windows search
    * Right click/open the context menu on the search box, and choose `Run as administrator`
    * Select `Yes` if a User Account Control (UAC) dialog opens
3. Clone Bikeshed: `git clone https://github.com/tabatkins/bikeshed.git` or use a desktop client
4. Run: $ python -m pip install --editable /path/to/cloned/bikeshed

    `Note:` if the path to the Bikeshed folder contains spaces, enclose the path in quotation marks.

## Installing the multi-page script (optional)

1. Install [Node.JS](https://nodejs.org)
2. Clone the [multi-page repo](https://github.com/adrianba/multipage)
3. Open a command prompt from the multi-page repo folder and run: npm install

## Automatic builds

When a change is made to the master branch of the HTML repo, [Travis-CI](https://travis-ci.org/) rebuilds the specification and replaces the files in the `gh-pages` branch.
You should not edit or commit changes directly on the `gh-pages` branch because any changes will be lost when the specification is next rebuilt.
