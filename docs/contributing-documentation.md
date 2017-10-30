# Contributing to the HTML spec

This document contains information about contributing to the HTML specification.

## Copyright and Patent Licensing

HTML is published under the [W3C Software and Document License](http://www.w3.org/Consortium/Legal/copyright-software).
Please do not make a Pull Request to commit content if you cannot provide it under these terms.

HTML is published under the [W3C Patent Policy](http://www.w3.org/Consortium/Patent-Policy-20040205/) to keep the specification
royalty free for everyone to use. To make a substantive contribution to the HTML specification,
you must either be a member of the [Web Platform Working Group](https://www.w3.org/WebPlatform/WG/)
or make a non-member patent licensing commitment. Please see below for further details.

## Editing the HTML specification

Please use the standard fork, branch, and pull request workflow to propose changes to the specification. Please make branch names informative - by including the issue or bug number for example.

If you are not sure what this means, then editing the relevant file through the github web interface will start you down the right path.

### Branches and versions

The `master` branch is the "work in progress" version of the HTML specification. It is available at [https://w3c.github.io/html/](https://w3c.github.io/html/)

About once a year, the HTML editors create a new `<version>` branch for the HTML specification. It only contains features that the Working Group believes can be shipped as part of the W3C Recommendation. 
That branch becomes associated with a specific version of the HTML specification. For a *limited period* of time, the Editor Team only accepts editorial changes or removal of features at risks in this branch.
It becomes frozen once that version of HTML becomes a W3C Recommendation. 
Unless you're targetting a specific version of HTML (and really, you shouldn't), pull requests MUST always be made against the `master` branch.

### Editorial changes

Editorial changes include spelling and grammar improvements, and providing non-normative clarification,
as well as making normative text easier to read and understand. Conformance of tools or content is not changed by an editorial change.

Where the specification is inconsistent, e.g. the main text says the `<exampleElement>` element must not have a `title` attribute,
but the table of attributes says the `title` attribute is valid for the element, making it consistent is generally an editorial change.

1. Identify an [HTML issue](https://github.com/w3c/html/issues) that you want to work on. If no issue exists, please create one.

2. Make a branch and commit your edits to it. 
Please remember to add your name in the [Acknowledgements section](https://github.com/w3c/html/blob/master/sections/acknowledgements.include)
if it is not there already.
(We are grateful for contributions, and even more so if the editors don't have to make a separate change to do that :) ).

3. For large or complicated changes, please run Bikeshed to make sure there are no errors.
Note: The [Build documentation](docs/build-documentation.md) page has information about setting up and using Bikeshed.

4. Create a Pull Request and add at least the label "Editorial". If you are not a member of the Working Group, you will get a notice that your Pull Request failed an IPR check.
If the change is editorial, do not worry about this - it will be dealt with by the editors when merging the change.

5. Be happy that you have helped improve HTML, and that we are grateful for your effort :)

### Making technical (substantive) changes

Substantive changes are any changes that affect conformance of some tools or content. 
They can add new features (but see below), or adjustments to existing features to match real-world deployment.

The HTML specification is governed by the [W3C Patent Policy](http://www.w3.org/Consortium/Patent-Policy-20040205/) to keep HTML
royalty free for everyone to use.

To make a substantive contribution to the HTML specification, you must either be a member of the [Web Platform Working Group](https://www.w3.org/WebPlatform/WG/) or have made a non-member patent licensing commitment.

1. Identify an [HTML issue](https://github.com/w3c/html/issues) that you want to work on. If no issue exists, please create one.

2. Propose your edits in the issue so others can comment. When there is consensus about the proposed change create a Pull Request.
Note: Tt may be necessary to ask the Web Platform WG for consensus. If you are not sure about this,
contact the <a href="mailto:team-webplatform@w3.org">Web Platform WG chairs</a>.

3. Point to a test (or several if necessary) that demonstrates that browsers support the change. 
Links to browser issue tracking systems, showing an intent to implement the change can also be useful.

4. In general, you should be editing one or more files in the [sections directory](https://github.com/w3c/html/blob/master/sections/) directory. The include files are described in sources.html.

5. Edit the [Changes section](https://github.com/w3c/html/blob/master/sections/changes.include) to list the change, 
and the [Acknowledgements section](https://github.com/w3c/html/blob/master/sections/acknowledgements.include) 
to add your name and that of others who contributed.

6. If the Pull request fixes one or more issues, please note it in a separate line in the Pull Request comment, as follows:
  ```
  fix #27, #33
  ```
  If it addresses an issue without fixing it, please mention the issue number somewhere in your comments.

7. If you are not the sole contributor to the Pull Request (PR), you must identify all contributors in the Pull Request comment. To do this, mark each contributor on a separate line, as follows:
    ```
    +@github_username
    ```
  You can remove yourself or someone else e.g. because you were purely making the Pull Request with someone else's content
(and permission), by putting `-@github_username` in a separate line.

8. For large or complicated changes, run Bikeshed to make sure there are no errors.
Note: The [Build documentation](docs/build-documentation.md) page has information about setting up and using Bikeshed.

9. Create a Pull Request, but do not include single-page.html.

When one of the HTML editors merges your Pull Request, Travis-CI will build the files and update the `gh-pages` branch.

## Proposing new features

Ideally new features should be proposed in a new specification and not as additions to the HTML spec. The [Web Platform WG charter](https://www.w3.org/2016/11/webplatform-charter.html#deliverables) requires that the WG only adopt new proposals after they have been through an incubation phase. Please consider the WICG's [Intent to Migrate](https://wicg.github.io/admin/intent-to-migrate.html) template when proposing new features.

## Editorial conventions

When making a contribution, these editorial conventions should be followed.

* Use the active voice;
* Use the present tense;
* Be concise.

### Formatting conventions
* Line wrap at column `100` to keep lines easily readable
* Replace tab characters by `2 spaces` (use `2` as the tab stop interval)

### Markdown conventions

Use markdown for contributions, unless otherwise stated.
* Use [bikeshed definition list syntax](https://tabatkins.github.io/bikeshed/#markdown) where possible. E.g., prefer:

```
: define term
:: term's definition
```

vs.

```html
<dl>
      <dt>define term</dt>
      <dd>term's definition</dd>
</dl>
```

(unless the `<dl>` needs a class attribute for styling i.e., `<dl class="domintro">`)

```markdown
* unordered list item
```

vs.

```html
<ul>
      <li>unordered list item</li>
</ul>
```

----

```markdown
1. ordered list item
```
vs.

```html
<ol>
      <li>ordered list item</li>
</ol>
```

----

```markdown
newline separator

between paragraphs
```

vs.
      
```html
<p>newline separator</p>

<p>between paragraphs</p>
```

### Linking conventions

* For definitions of standard terms, use `<a>term known to bikeshed</a>`
* To define such a term, use `<dfn>`. You can use `<dfn lt="alternate name">` to add another reference for the term. Please watch out for conflicting term names! 
* For definitions of elements use `<{img}>`
* For definitions of attributes use `<{img/alt}>`
* For WebIDL terms use `{{HTMLImageElement/alt}}`
* For Normative references use `[[!shortname]]` where `shortname` is the W3C "shortname" of the spec
* For informative references use `[[shortname]]`
* Avoid breaking `<a>` (or `<dfn>`) text content across line breaks (note this is an exception to the above 100 character line-wrap best-practice). E.g., prefer:

```html
here is a
<a>link that is not broken across lines</a>
making it easy to search/replace :)
```

vs.

```html
here is a <a>link that is sadly broken across
lines</a> making it much harder to search/replace
```

### Protected content

Parts of the HTML specification are protected to prevent them being overwritten. Protected content is identified using comments, as follows:
`<!-- W3C START - DO NOT OVERWRITE--> protected text <!-- W3C END -->`.
Please do not change these parts of the specification without [filing an issue](https://github.com/w3c/tml/issues).
