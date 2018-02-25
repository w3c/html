# Contributing documentation

This document contains information about contributing to the HTML specification.

## Making a contribution

The HTML specification is governed by the [W3C Patent Policy](https://www.w3.org/Consortium/Patent-Policy-20040205/), and [Software and Document License](https://www.w3.org/Consortium/Legal/copyright-software). This ensures that the HTML standard will remain royalty free for everyone to use.

To make a substantive contribution to the HTML specification, you must either be a member of the [Web Platform Working Group](https://www.w3.org/WebPlatform/WG/) or have made a non-member patent licensing commitment.

### Multiple contributors

If you are not the sole contributor to a substantive Pull Request (PR), you must identify all contributors in the PR comment. To do this, mark each contributor on a separate line, as follows:
```
+@github_username
```

If you need to remove a contributor, or need to remove yourself because you created the PR on behalf of the contributor, you can do so as follows:
```
-@github_username
```

## Editing the HTML specification

Use the standard fork, branch, and pull request workflow to propose changes to the specification. Please make branch names informative - by including the issue or bug number for example.

### Branches and versions

The `master` branch is the "work in progress" version of the HTML specification. It is available at [https://w3c.github.io/html/](https://w3c.github.io/html/)

Once a year, the HTML editors create a new `<version>` branch for the HTML specification. It only contains features that the Working Group believes can be shipped as part of the W3C Recommendation. That branch becomes associated with a specific version of the HTML specification. For a *limited period* of time, the Editor Team only accepts editorial changes or removal of features at risks in this branch. It becomes frozen once that version of HTML becomes a W3C Recommendation. Unless you're targetting a specific version of HTML (and really, you shouldn't), pull requests MUST always be made against the `master` branch.

### Making edits

1. Identify an [HTML issue](https://github.com/w3c/html/issues) that you want to work on. If no issue exists, create one.

2. For editorial changes (spelling and grammar corrections), make your edits and create a PR. For substantive changes, propose your edits in the issue so others can comment. When there is consensus about the proposed change, make the edits and create a PR.
Note: For substantive changes it may be necessary to ask the Web Platform WG for consensus before the edits can be made. If you are not sure about this, contact the <a href="mailto:team-webplatform@w3.org">Web Platform WG chairs</a>.

3. For substantive changes that improve or change the way a feature works, create a test case that demonstrates that browsers support the change. Also include links to any browser issue tracking systems, to show that a browser has expressed an intent to implement the change.

4. Edit single-page.bs or one of the include files it references. The include files are mapped in sources.html.

5. Edit the [Acknowledgements section](https://github.com/w3c/html/blob/master/sections/acknowledgements.include) to add your name.

6. For substantive changes, run Bikeshed to make sure there are no errors.
Note: The [Build documentation](build-documentation.md) page has information about setting up and using Bikeshed.

7. Create a PR, but do not include single-page.html.

8. When one of the HTML editors merges your PR, Travis-CI will build the files and update the `gh-pages` branch.

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
Please do not change these parts of the specification without [filing an issue](https://github.com/w3c/html/issues).
