# HTML

[![Build Status](https://travis-ci.org/w3c/html.svg?branch=master)](https://travis-ci.org/w3c/html)

This is the repository for the [Working Draft of the HTML specification](https://w3c.github.io/html/). This repository is managed by the [W3C Web Platform Working Group](https://www.w3.org/WebPlatform/WG/).

## Editorial Documentation

The specification is built using Bikeshed. If you would like to propose edits, please make sure that they result in a specification that will build correctly, by testing in your own clone of the repository.

1. Install [bikeshed](https://github.com/tabatkins/bikeshed)
2. From the HTML folder open a command prompt
3. run bikeshed update: `bikeshed update`
4. run bikeshed: `bikeshed spec`

For the multipage version, one can do as follows:

1. Install [multipage](https://github.com/adrianba/multipage)
2. Follow the instructions there to regenerate the HTML files

## Contributing to this Repository

Use the standard fork, branch, and pull request workflow to propose changes to the specification. Please make branch names informative - by including the issue or bug number for example.

More information on contributing is in [CONTRIBUTING.md](CONTRIBUTING.md).

To make changes to the specification:

1. Edit single-page.bs (or one of the include files it references) in the `master` branch. Do not edit the HTML files in the `gh-pages` branch. These are built automatically.
2. Edit the [Acknowledgements section](https://github.com/w3c/html/blob/master/sections/acknowledgements.include) in the `master` branch to include your name.
3. Ideally run bikeshed on single-page.bs to make sure there are no errors (run `bikeshed spec`).
4. Create a pull request but do not include the single-page.html file
5. When the editors merge and commit your pull request Travis-CI will build the HTML files

The following considerations should be kept in mind when making a pull request:

* Editorial changes that improve the readability of the spec or correct spelling or grammatical mistakes are welcome.
* Ideally new features should be proposed in a new specification and not as additions to the HTML spec. The [Web Platform WG charter](https://www.w3.org/2015/10/webplatform-charter.html#deliverables) requires that the WG only adopt new proposals after they have been through an incubation phase. Please consider the WICG's [Intent to Migrate](https://wicg.github.io/admin/intent-to-migrate.html) template when proposing new features.
* Normative changes to the spec should aim to improve interoperability amongst browsers. Such changes should be accompanied by a test case to show that the change does this. It may also include links to bug trackers for browsers showing that there is an intent to adopt the new behaviour.
* Normative changes to the spec should be associated with a bug or issue that describes the reason for the change.

## HTML branching and versioning

The `master` branch of this repository always contains the **work in progress** version of the HTML specification. This branch always welcomes substantive and editorial changes and pull requests.

The `master` branch is always exposed at [https://www.w3.org/TR/html/](https://www.w3.org/TR/html/).

Once a year, the HTML editors create a new `<version>` branch for the HTML specification. It only contains features that the Working Group believes can be shipped as part of the W3C Recommendation. That branch becomes associated with a specific version of the HTML specification. For a *limited period* of time, the Editor Team only accepts editorial changes or removal of features at risks in this branch. It becomes frozen once that version of HTML becomes a W3C Recommendation. Unless you're targetting a specific version of HTML (and really, you shouldn't), pull requests MUST always be made against the `master` branch.

The `<version>` branches are exposed as /TR/html`<version>`/ .

## Old HTML repository

The [old HTML repo](https://github.com/w3c/html-old) is available for archival purposes.
