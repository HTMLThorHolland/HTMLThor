

function setPageSource(source) {
	
	var finalSource = new Array();
	
	for(var i = 0; i < source.length; i++) {
		var htmlElements = [["<","&lt;"],[">","&gt;"],["\"","&quot;"],["\'","&#39;"]];
		for(var j=0; j<htmlElements.length; j++) {
			reg = new RegExp(htmlElements[j][0], "gi");
			source[i] = source[i].replace(reg,htmlElements[j][1]);
		}
		finalSource[i] = source[i];
		finalSource[i] += "\n";
	}
	finalSource = generateErrors(finalSource);
	$("#pageCode").html(finalSource);
	prettyPrint();
	addErrorIcon();
	//console.log("page source updated");
}

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