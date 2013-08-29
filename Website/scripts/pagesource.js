

var oldSource = new Array(); /* Has no error messages */
var finalSource = new Array();

/*
 * Iterates through the source code, escapes certain HTML characters.
 * Populates the page source tab with the converted source code.
 * Runs the js plugin prettyPrint which adds styling and numbering to the code.
 * Calls addErrorIcon funcntion which creates errorIcons beside each error.
 *
 * @param	source	An array containing the source code.
 */
function setPageSource(source) {
	for(var i = 0; i < source.length; i++) {
		var htmlElements = [["<","&lt;"],[">","&gt;"],["\"","&quot;"],["\'","&#39;"]];
		for(var j=0; j<htmlElements.length; j++) {
			reg = new RegExp(htmlElements[j][0], "gi");
			source[i] = source[i].replace(reg,htmlElements[j][1]);
		}
		oldSource[i] = source[i];
		oldSource[i] += "\n";
		finalSource[i] = source[i];
		finalSource[i] += "\n";
	}
	finalSource = generateErrors(finalSource);
	$("#pageCode").html(finalSource);
	prettyPrint();
	addErrorIcon();
	//console.log("page source updated");
}

/*
 * Iterates through the list of errors and then creates surrounding html elements which
 * highlight the error and allow the user to hover over them.
 * Uses the line number from the error message to highlight the error.
 * Returns the source code with the inserted errors.
 *
 * @param	source	An array containing the HTML source code.
 * @return	source	The same HTML source array but with all of the errors inserted.
 */
function generateErrors(source) {
	console.log("begin finding errors: " + jsonObject[0].errors.count);
	for(var i = 0; i < jsonObject[0].errors.count; i++) {
		lineNumber = jsonObject[0].errors[i].line - 1;
		console.log("is there an error at "+lineNumber+"?" + jsonObject[0].errors[i].line + jsonObject[0].errors[i].message);
		source[lineNumber] = "<div id='error1' class='errorContainer syntax'><span class='errorHighlight syntaxError'>"+source[lineNumber]+"</span></div><div style='clear:both'></div>"
	}
	console.log("finish finding errors");
	return source;
}