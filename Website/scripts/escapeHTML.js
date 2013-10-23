

function escapeHTML(htmlString) {

	var htmlElements = [["<","&lt;"],[">","&gt;"],["\"","&quot;"],["\'","&#39;"]];
	for(var j=0; j<htmlElements.length; j++) {
		reg = new RegExp(htmlElements[j][0], "gi");
		htmlString = htmlString.replace(reg,htmlElements[j][1]);
	}

	return htmlString;
}

function reconvertHTML(htmlString) {

	var htmlElements = [["&lt;", "<"],["&gt;",">"],["&quot;","\""],["&#39;","\'"]];
	for(var j=0; j<htmlElements.length; j++) {
		reg = new RegExp(htmlElements[j][0], "gi");
		htmlString = htmlString.replace(reg,htmlElements[j][1]);
	}

	return htmlString;
}