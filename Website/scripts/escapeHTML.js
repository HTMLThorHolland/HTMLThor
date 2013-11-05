
/**
 *
 *	Escape the supplied HTML string so it can be displayed without being treated as actual html.
 *
 *	@param		htmlString		String
 *
 *	@return		htmlString		String
 *
 */
function escapeHTML(htmlString) {

	var htmlElements = [["<","&lt;"],[">","&gt;"],["\"","&quot;"],["\'","&#39;"]];
	for(var j=0; j<htmlElements.length; j++) {
		reg = new RegExp(htmlElements[j][0], "gi");
		htmlString = htmlString.replace(reg,htmlElements[j][1]);
	}

	return htmlString;
}

/**
 *
 *	Convert escaped html back to the original html.
 *
 *	@param		htmlString		String
 *
 *	@return		htmlString		String
 *
 */
function reconvertHTML(htmlString) {

	var htmlElements = [["&lt;", "<"],["&gt;",">"],["&quot;","\""],["&#39;","\'"]];
	for(var j=0; j<htmlElements.length; j++) {
		reg = new RegExp(htmlElements[j][0], "gi");
		htmlString = htmlString.replace(reg,htmlElements[j][1]);
	}

	return htmlString;
}