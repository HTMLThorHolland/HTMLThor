if ($.cookie("jsonObjectHtml")) {


	
	var jsonString = $.cookie("jsonObjectHtml");
	
	// fix quotations before attempting to parse
	jsonString = jsonString.replace(/\\\"/g, '"');
	jsonString = jsonString.substring(1, jsonString.length-1);
	
	var jsonObject = $.parseJSON(jsonString);
	
	// once cookie is read and parsed, it can be deleted
	$.removeCookie("jsonObjectHtml");
	
	/*
	======= EXAMPLES OF USE ======
	
	
	-- Access first source code of first file (and at this point only file) --
	jsonObject[0].source; -> returns string
	
	-- Access error message of first error of first file --
	jsonObject[0].errors[0].message; -> returns string
	
	-- Access error type of third error of first file --
	jsonObject[0].errors[2].type; -> returns string
	
	-- Access line number of first error of first file --
	jsonObject[0].errors[0].line; -> returns integer
	
	-- Access column number of first error of first file --
	jsonObject[0].errors[0].col; -> returns integer
	
	********* Still to be added to JSON Object **********
	*****************************************************
	-- Access error count for first file --
	jsonObject[0].errorCount; -> returns integer
	*****************************************************
	
	
	======= END OF EXAMPLES ======
	*/
	
	
	// ========== Simon add your code here! ======
}