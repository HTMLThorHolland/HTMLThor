

function setPageSource(source) {

	console.log(source);

	var htmlElements = [["<","&lt;"],[">","&gt;"],["\"","&quot;"],["\'","&#39;"]];
	for(var i=0; i<htmlElements.length; i++) {
		reg = new RegExp(htmlElements[i][0], "gi");
		source = source.replace(reg,htmlElements[i][1]);
	}

	console.log("new " +source);
	$("#pageCode").html(source);
	prettyPrint();
	console.log("page source updated");
}