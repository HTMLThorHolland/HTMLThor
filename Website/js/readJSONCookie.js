if ($.cookie("jsonObjectHtml")) {
	var jsonString = $.cookie("jsonObjectHtml");
	// jsonString = jsonString.replace(/\\\//g, "/");
	jsonString = jsonString.replace(/\\\"/g, '"');
	
	// required to remove quotes before parsing JSON
	jsonString = jsonString.substring(1, jsonString.length-1);
	
	alert(jsonString);
	
	
	var jsonObject = $.parseJSON(jsonString);
	alert(jsonObject[0].source);
	
	// show source code and errors etc.
}