# Build documentation

The [HTML specification](https://www.w3.org/TR/html52/) is built using [Bikeshed](https://github.com/tabatkins/bikeshed). Please setup and run Bikeshed on your clone of the HTML repository, to make sure the specification builds properly before you create a Pull Request (PR).

Bikeshed produces a single page version of the specification. There is also a multi-page script that breaks down the single page version into multiple pages.

Note: If your PR fixes a spelling mistake or a minor grammatical mistake, you do not need to run Bikeshed locally before creating your PR.

## Installing Bikeshed

Full installation information is available in the [Bikeshed documentation](https://tabatkins.github.io/bikeshed/).

### Quick Windows installation

Tested on Windows 10.

1.  Install [Python2.7](https://www.python.org/downloads/release/python-2713/) (32bit version) in the default location.
2. In an elevated command prompt, run: setx /m PATH "%PATH%;C:\Python27;C:\Python27\Scripts"
3. Install [Pip.py](https://bootstrap.pypa.io/get-pip.py).
4. Run: c:\python27\python -m pip install pygments lxml==3.6.0 --upgrade
5.  Clone Bikeshed: git clone https://github.com/tabatkins/bikeshed.git
6. Run: c:\python27\python -m pip install --editable [path to bikeshed]

## Installing the multi-page script (optional)

1. Install [Node.JS]()
2. Clone the [multi-page repo](https://github.com/adrianba/multipage)
3. Open a command prompt from the multi-page repo folder and run: npm install

## Building the specification

### Producing a single page version

1. Open a command prompt from the HTML repo folder.
2. Run: bikeshed update
3. Run: bikeshed spec

### Producing a multi-page version

1. Run: node multipage.js [path of the spec]

## Automatic builds

When a change is made to the master branch of the HTML repo, [Travis-CI](https://travis-ci.org/) rebuilds the specification and replaces the files in the `gh-pages` branch. You should not edit or commit changes directly on the `gh-pages` branch because any changes will be lost when the specification is next rebuilt.
