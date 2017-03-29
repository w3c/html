# Build documentation

The [HTML specification](https://www.w3.org/TR/html52/) is built using [Bikeshed](https://github.com/tabatkins/bikeshed) - instructions for installing it are below.
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

1.  Install [Python2.7](https://www.python.org/downloads/release/python-2713/) (32bit version) in the default location.
2. In an elevated command prompt, run: setx /m PATH "%PATH%;C:\Python27;C:\Python27\Scripts"
3. Download [Pip.py](https://bootstrap.pypa.io/get-pip.py).
4. Run `python get-pip.py` where you downloaded the file (??)
5. Run: c:\python27\python -m pip install pygments lxml==3.6.0 --upgrade
6. Clone Bikeshed: `git clone https://github.com/tabatkins/bikeshed.git` or use a desktop client
7. Run: c:\python27\python -m pip install --editable [path to bikeshed]

## Installing the multi-page script (optional)

1. Install [Node.JS]()
2. Clone the [multi-page repo](https://github.com/adrianba/multipage)
3. Open a command prompt from the multi-page repo folder and run: npm install


## Automatic builds

When a change is made to the master branch of the HTML repo, [Travis-CI](https://travis-ci.org/) rebuilds the specification and replaces the files in the `gh-pages` branch.
You should not edit or commit changes directly on the `gh-pages` branch because any changes will be lost when the specification is next rebuilt.
