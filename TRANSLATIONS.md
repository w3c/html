# Translations

The HTML 5.1 specification is now a stable document. We invite you to [volunteer to translate](https://www.w3.org/Consortium/Translation/) this specification, and help people around the world to reach the HTML 5.1 project.

## How to Build

The specification is built using [Bikeshed](https://github.com/tabatkins/bikeshed). If you would like to take advantage of the single-page.bs and build the spec when you've completed your translation, here are some suggestions for you:

1. Fork the w3c/html repo
2. Clone your fork to local: `git clone https://github.com/yourfork/html`
3. Checkout the html5.1 branch: `git checkout html5.1`
4. Translate the documents
5. Install [bikeshed](https://github.com/tabatkins/bikeshed)
6. From the HTML folder open a command prompt
7. Run bikeshed update: `bikeshed update`
8. Run bikeshed: `bikeshed spec`

Now you have a single-page.html, you may wish to build the multipage version, please do as follows:

1. Install [multipage](https://github.com/adrianba/multipage)
2. From the multipage folder open a command prompt
3. Put the single-page.html in this folder
4. Run multipage.js: `node --max_old_space_size=2048 multipage.js single-page.html ./out/`

Otherwise, you can also start from the HTML files in ["published"](https://github.com/w3c/html/tree/html5.1/published) folder.


## W3C Translations

Please, read the instructions in the [W3C Translations](https://www.w3.org/Consortium/Translation/) page and follow the steps outlined there.

We strongly suggest you to [announce your intention](https://www.w3.org/Consortium/Translation/#volunteer) before you start translating and annouce your translation afterwards.
