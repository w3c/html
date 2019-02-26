linkdiff - Link Correctness Comparison Tool
===========================================

Abstract
============

One of the common, difficult to figure-out problems in the current HTML spec is whether links are
"correct". Not "correct" as in syntax or as opposite to broken links, but rather that the link in
question goes to the semantically correct place in the spec or other linked spec. Correctness, in
this sense, can only be determined by comparing the links to a canonical "correct" source. In the
case of the W3C HTML spec, the source used for determining correctness in the WHATWG version of the
spec.

Usage
======

```
python ./linkdiff https://html.spec.whatwg.org/ https://w3c.github.io/html/single-page.html > link_report.json
```

Approach
=======
The approach taken by this project is to validate two things: first that a given **origin link**
(the `<a href>` itself) can be compared properly between the W3C and the WHATWG specs. Since one or
both specs may have links that the other doesn't, all links to be tested must first be checked to
see that they are essentially "the same" link. If they are not the same, then no checking for
correctness is necessary (and they can be flagged for follow-up). Once two origin links are
determined to be the same, then their respective **link targets** (the place where clicking the link
would go) can be checked. Checking link targets will use the same technique as validating the two
origin links are the same.

Details for Same-ness check
=========================

Due to possible small structure and prose differences in the W3C and WHATWG specs, to validate that
either the source or target of a link is the same relative place, a statistical approach is used.
Structure of the surrounding document is ignored, and some amount of textual content is extracted.
This text is then lexically compared to generate a ratio of alignment (used for diffing). Where
there is a high percentage of alignment between the tokens (given a statistically-sound
sample size), the links can be considered the same. The target of the links is then located in the
document and compared in like manner.

Links matching
================

The tool assumes that one link in the **baseline doc** should have a corresponding link (and only
one) in the **source doc**. The link matching algorithm will attempt to match up every link in the
baseline doc to exactly one match in the source doc and vice-versa. To avoid potential `O(n^2)`
runtime for matching up links (especially where n is very large), the matching algorithm uses
an index and selects the best candidate match from among the entire set of possible links. Multiple
matches above the given threshold are possible, and all such matched are saved in the matching phase.
Following the matching phase, duplicate matches are resolved taking all potential candidates (from 
the baseline and source documents) into account and selecing the match with the highest ratio. In case
of a tie, the first match in document order is chosen.

Input
=======

In order to avoid hard-coding the percent-alignment necessary to constitute "sameness" the program may
takes as input a floating-point number between 0 and 1, representing the percentage threshold to use
when determining if two links are the same. The default value is **0.8** (80% similar).

An "ignore list" file may be provided for links, if encountered, to be skipped during processing.
The file contents should be JSON formatted using the following syntax. The default value is to **not
use an ignore list**.

```json
{
  "ignoreList": [
    "full_URL_here_including_hash_or_query_param",
    "additional_URLs_here"
  ]
}
```

A "visual diff" flag may be provided, which causes the tool to additionally output two files: a 
`visual_baseline.html` and `visual_source.html`. These files will contain a visual output of the
link diff tool: gray highlighted links are not found, red-ish links are matched but not correct, 
while green links are matched and correct.

Output
========

The tool returns a report of the links checked in two given documents (the baseline document
compared to the test document), as well as the links skipped. The report is in JSON and has the
following format:

```json
{
  "ratioThreshold": #.#,
  "matchingLinksTotal": ##,
  "correctLinksTotal": ##,
  "potentialMatchingLinksSetSize": ##,
  "percentMatched": #.#,
  "percentCorrect": #.#,
  "baselineDoc": {
    "linksTotal": ###,
    "nonMatchedTotal": ##,
    "linkIndex": [
      {
        "index": ##,
        "status": "",
        "href": "",
        "matchIndex": ##,
        "matchRatio": #.#,
        "correctRatio": #.#,
        "lineNo": ##
      }
    ]
  },
  "sourceDoc": {
     ...
  }
}
```

* `ratioThreshold` - reflects the value used to determine the threshold above which the links are
    considered matching or correct.
* `matchingLinksTotal` - the number of origin links which were both found to be the same link in
    both the baseline doc and the source doc.
* `correctLinksTotal` - the number of origin links which were both found to be the same link in
    both the baseline doc and the source doc **and** whose link targets were also found to be the
    same.
* `potentialMatchingLinksSetSize` - the minimum of the total link count from the baseline doc and
    the source doc -- the upper bound on the number of potential possible matches assuming every
    link could be matched between the baseline and source docs.
* `percentMatched` - the percentage as a value between 0 and 1 of `matchingLinksTotal` divided by
    the `potentialMatchingLinksSetSize`.
* `percentCorrect` - the percentage as a value between 0 and 1 of `correctLinksTotal` divided by
    the `potentialMatchingLinksSetSize`.
* `baselineDoc` and `sourceDoc` have the same structure:
  * `linksTotal` - the total number of links found in the respective document
  * `nonMatchedTotal` - the `linksTotal` less `matchingLinksTotal` number. How many of the total
       links were not matched at all.
  * `linkIndex` - an array of link objects--one entry for each link found in the document

A link object has:

* `index` - the ordinal index of this link in document order.
* `status` - a string, one of:
  * "non-matched" - the link wasn't matched up with any other link in the other document. For
      the statistics, this increments the `nonMatchedTotal` value.
  * "matched" - the link was only matched in the other document (but the link target was not
      matched, e.g., not "correct"). For the statistics, this increments the `matchingLinksTotal`
      value.
  * "correct" - the link was matched and the respective links in both baseline and source docs
      refer to the same relative place when followed. For the statistics, this increments the
      `correctLinksTotal` value.
  * "skipped" - the link was skipped because it was one of the links present on the ignore list
      provided as input. For the statistics, this decrements the pool of potential links for this
      document, which contributes to the `potentialMatchingLinksSetSize`.
  * "broken" - the link was non-external yet, didn't resolve to anywhere in the document. For
      statistics, this increments no values (it's in the `potentialMatchingLinksSetSize`, but not
      a part of the `correctLinksTotal`--same bucket as the `matchingLinksTotal`).
  * "non-matched-external" - the link wasn't matched up with any other link in the other
      document, and the link's href refers to an external location (its value is not checked).
      For the statistics, this increments the `nonMatchedTotal` value.
  * "matched-external" - the link was matched up in the other document, but the URLs are not
      100% the same. For the statistics, this increments the `matchingLinksTotal` value.
  * "correct-external" - the link was matched up in the other document and it's URL is 100%
      the same--both specs external link targets would end-up in exactly the same place. For the
      statistics, this increments the `correctLinksTotal` value.
* `href` - the original value of the link's href attribute (to help with locating this specific
    link in the source document.
* `matchIndex` - if the status value is "matched", "correct", "matched-external" or
    "correct-external" (considered **matching statuses**), this is the index to the matching link
    in the other document (if the link object is in the `baselineDoc`'s list of `linkIndexes`,
    then this link object's `matchIndex` is a reference to a link object with matching index in
    the `sourceDoc`'s list of `linkIndexes`). Otherwise the `matchIndex` will be the "closest"
    (best) match that could be located among all potential candidates. If all candidates were
    equally comparable (e.g., had the same `matchRatio`) then this is the last candidate checked.
    The default value is -1.
* `matchRatio` - the value from 0 to 1 used to determine that this was a match (the first match
    found for any matching statuses), or if the status is not one of the matching statuses, the
    best ratio obtained from the best possible match of all the links tested. The default value is
    0.
* `correctRatio` - the value from 0 to 1 used to determine that the target of the link was correct
   (or not) for the given matched pair. The default value is 0.
* `lineNo` - the line number in the source where the link was encountered. If the "visual diff" flag 
   is provided, the line number will refer to the line numbers in the output `visual_baseline.html`
   and `visual_source.html` files (which have a different offset due to injected CSS and JavaScript).

External Links
==============

The algorithm only follows and validates "internal" links (to make sure they land in the appropriate
section of the spec. For external links, the algorithm attempts to match up the origin links, and
only considers the actual HREF value as a string literal to see if the HREF would go to the same
place if clicked. If there are any differences (e.g., the string is not 100% the same), then the
external link is not considered "correct".

Dependencies
==============

Uses the built-in Python library [difflib](https://docs.python.org/2/library/difflib.html) for an
implementation of token matching and ratio of sameness calculations. It also uses python's built-in
[HTMLParser](https://docs.python.org/2/library/htmlparser.html) library for parsing help.
