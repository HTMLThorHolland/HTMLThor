/* This is semi-temporary to act as the loading and converting section */

var sourceData = [];
var errorNumber = 2;

var test = "This is a syntax error";

$(document).ready(function() {
	//testStuff();
});


/* This is just for testing stuff as I add it */
function testStuff() {
	console.log("Initiate test");
	readTextFile("test.txt");
	console.log("end test");
}


/* Loads the text file */
function readTextFile(file)
{
	$.ajax({ 
        url: file,
        type: "POST",
        dataType: "text",
        success: function(data) {
            alert(data);
			var something = data;
			var splitData = something.split('\n');
			loadFile(splitData);
        }
    });
}


/* Gets the file data to be converted and then displayed */
function loadFile(array) {
	html = array;
	html = convertHTML(html);
	$("#pageCode").html(html);
	prettyPrint();
	addErrorIcon();
}


/* Iterates through the HTML and sets it in the div*/
function convertHTML(html) {
	for(var i=0; i<html.length; i++) {
		html[i]=replaceHTML(html[i]);
		/* Below code is being used to randomly insert an error message */
		/*if(i == 7) {
			console.log(i);
			html.splice(7, 0, "<p title='This is a terrible error.' class='errorHighlight redError'>test error</p>");
			i++;
		}*/
	}
	return html;
	//SyntaxHighlighter.highlight();
}

/* Converts the HTML to escaped characters so it can be displayed. */
function replaceHTML(line) {
	var newLine = line;
	var reg;
	var htmlElements = [["<","&lt;"],[">","&gt;"],["\"","&quot;"],["\'","&#39;"]];
	for(var i=0; i<htmlElements.length; i++) {
		reg = new RegExp(htmlElements[i][0], "gi");
		newLine = newLine.replace(reg,htmlElements[i][1]);
	}
	
	/* Trial method for adding error span */
	patt = /html5shim/gi;
	if(patt.test(newLine)) {
		newLine = "<div id='error1' class='errorContainer'><span class='errorHighlight syntaxError'>"+newLine+"</span></div><div style='clear:both'></div>";
	}
	
	/* Random error */
	var errorChance = Math.floor(Math.random() * 20) + 1;
	if(errorChance == 1) {
		newLine = "<div id='error"+errorNumber+"' class='errorContainer'><span class='errorHighlight semanticError'>"+newLine+"</span></div>";
		errorNumber++;
	}
	
	return newLine;
}
