"use strict";

var fs = require('fs');
var whacko = require('whacko');

var baseOutputPath = "./out/";
var specFile = 'single-page.html';

if(process.argv[2] !== undefined) {
	if(process.argv[3] !== undefined) {
		baseOutputPath = process.argv[3];
	}
	specFile = process.argv[2];
}

console.log('This platform is', process.platform, 'node', process.version);

console.log('Loading single-page.html');

var $ = whacko.load(fs.readFileSync(specFile));

var sections = [
     { id: "introduction" }
  ,  { id: "infrastructure" }
  ,  { id: "dom" }
  ,  { id: "semantics" }
  ,  { id: "document-metadata" }
  ,  { id: "sections" }
  ,  { id: "grouping-content" }
  ,  { id: "textlevel-semantics" }
  ,  { id: "edits" }
  ,  { id: "semantics-embedded-content" }
  ,  { id: "links" }
  ,  { id: "tabular-data" }
  ,  { id: "sec-forms" }
  ,  { id: "interactive-elements" }
  ,  { id: "semantics-scripting" }
  ,  { id: "common-idioms-without-dedicated-elements" }
  ,  { id: "disabled-elements" }
  ,  { id: "matching-html-elements-using-selectors" }
  ,  { id: "editing" }
  ,  { id: "browsers" }
  ,  { id: "webappapis" }
  ,  { id: "syntax" }
  ,  { id: "xhtml" }
  ,  { id: "rendering" }
  ,  { id: "obsolete" }
  ,  { id: "iana" }
  ,  { id: "index" }
  ,  { id: "property-index" }
  ,  { id: "idl-index" }
  ,  { id: "references" }
  ,  { id: "changes" }
  ,  { id: "acknowledgements" }
];

console.log("Removing unused sections");

var keepsections = [];
for(var i=0; i<sections.length; i++) {
  var hasNode = $("#" + sections[i].id).length;
  if (hasNode === 1) {
    keepsections.push(sections[i]);
  } else {
    console.log("  Removed " + sections[i].id);
  }
}
sections = keepsections;

console.log("Creating ID->file mapping");

// first, create a mapping between the ids and their files
var idMap = [];
for(var i=0; i<sections.length; i++) {
  var section = sections[i];

	if(section.id==="index") {
		section.filename = "fullindex";
	} else {
    section.filename = section.id;
  }

	var sNode = $('#'+section.id).parents('section');
	if(!sNode) throw 'section not found';
  if (sNode.length > 1) {
    // if we are in a subsection, just take the first
    sNode = sNode.first();
  }
  if (id === "semantics") {
    // we only take the first subsection for semantics
    // others will be handled by ids
    idMap['#' + section.id] = section.filename;
    sNode = sNode.find("section").first();
  }
	sNode.find('*[id]').each(function(i,element) {
		idMap['#'+$(this).attr('id')] = section.filename;
	});
}

// remapping links
// console.log("Remapping links");
var notFound = [];
$("a[href^='#']").each(function(i,element) {
	var href = $(this).attr('href');
	if(idMap[href] !== undefined) {
		$(this).attr('href',idMap[href] + ".html" + href);
	} else {
		if(notFound[href]===undefined) {
			notFound[href] = href;
			console.error('Link not found: ' + href);
		}
	}
});

// save the information to generate the proper sections

console.log("Sorting out sections");

var htmlTitle = $("title").first().text();

for(var i=0; i<sections.length; i++) {
  var section = sections[i];

  // find the proper header
  var header = $("#" + section.id);

  // compute the nice title
  section.title  = htmlTitle + ": "+ header.text();

  // find the proper section
  section.node = header.parent();
  while (typeof section.node[0] !== 'undefined' && section.node.get(0).tagName !== "section") {
    section.node = section.node.parent();
  }
  // for section 4, only keep the first subsection
  if (section.id === "semantics") {
    var newSection = $('<section></section>');
    var h2 = section.node.children().get(1);

    // s is the first subsection
    var s = section.node.children().get(2);

    if (h2 && s) {
      newSection.append(h2);
      newSection.append(s);
      section.node = newSection;
    }
  }
  // Serialize to string to avoid uncollectable jQuery object graphs when mixed into another
  // document later. See https://github.com/w3c/html/issues/833
  section.node = "<section>" + section.node.html() + "</section>";
}

console.log("Generating index");

// remove main to avoid having it in the index output
$("nav").next().remove();

fs.writeFileSync(baseOutputPath + "index.html",$.html());

console.log("Generating sections");

// main was removed before generating the index, so recreate it
$("nav").after('<main></main>');

// remove unnecessary heading (Version links, editors, etc.)
var current = $("div[data-fill-with=abstract]").first();
do {
  var nextElement = current.next();
  current.remove();
  current = nextElement;
} while(current && current.get(0).tagName !== "nav");
current = $("header").first().next();
do {
  nextElement = current.next();
  current.remove();
  current = nextElement;
} while($(current).get(0));

// this will be our template for each section page
var sectionDocument = $.html();

for(var i=0; i<sections.length; i++) {
	var id = sections[i].id;

	var doc = whacko.load(sectionDocument);

  var sectionString = sections[i].node;

  // insert the proper section
  var main = doc("main").first().append(sectionString);

  // Adjust the table of contents
	var toc = doc("nav#toc ol").first();
  var item = toc.find('a[href$="#' + id + '"]').first().parent();

  // find its previous and next
  var previous_item = undefined, next_item = undefined;
  if (i > 0) {
    previous_item = toc.find('a[href$="#' + sections[i-1].id + '"]').first();
  }
  if ((i+1) < sections.length) {
    next_item = toc.find('a[href$="#' + sections[i+1].id + '"]').first();
  }

        // only keep the appropriate nav toc
  toc.empty();
  toc.append(item);

  // again, for section 4, we eliminate all subtoc after the first
  if (id === "semantics") {
    item.children("ol").children("li").each(function(i,element) {
      if (i > 0) doc(element).remove();
    });
  }

  // make a nice title for the document
	doc("title").first().text(sections[i].title);

  // insert top and botton mini navbars
  var nav = "<a href='index.html#contents'>Table of contents</a>";
  if(previous_item!== undefined) {
  	nav = "← " + previous_item.toString() + " — " + nav;
  }
  if(next_item!==undefined) {
  	nav += " — " + next_item.toString() + " →";
  }
	nav = "<p class='prev_next'>" + nav + "</p>";
	var mainNav = doc("nav#toc");
	mainNav.prepend(nav);
	mainNav.parent().append(nav);

  console.log('Saving ' + sections[i].title);
  fs.writeFileSync(baseOutputPath + sections[i].filename + ".html",doc.html());
}
