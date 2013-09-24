
var jsonObject;

if ($.cookie("dirPath")) {

	console.log("cookie detected");
	
	
	/*
	var jsonString = $.cookie("jsonObjectHtml");
	
	// fix quotations before attempting to parse
	jsonString = jsonString.replace(/\\\"/g, '"');
	jsonString = jsonString.substring(1, jsonString.length-1);
	
	var jsonObject = $.parseJSON(jsonString);
	*/
	
	var JSONpath = $.cookie("dirPath");
	JSONpath = JSONpath.substring(28, JSONpath.length-1);
	JSONpath += "errors.json";
	$.getJSON(JSONpath, function(response){
       jsonObject = response;
 	})
 	.success(function() {
	
	// once cookie is read and parsed, it can be deleted
	// $.removeCookie("jsonObjectHtml");
	
	
	/*
	======= EXAMPLES OF USE ======
	
	-- Access file name of first file --
	jsonObject.filecount -> returns number of files
	
	-- Access file name of first file --
	jsonObject[0].filename -> returns String
	
	-- Access source code of first file (and at this point only file) --
	jsonObject[0].source; -> returns JSONObject
	
	-- Access first line of source code of first file --
	jsonObject[0].source[0] -> returns string
	
	-- Access number of lines in source code of first file --
	jsonObject[0].source.length -> returns integer
	
	-- Access error message of first error of first file --
	jsonObject[0].errors[0].message; -> returns string
	
	-- Access error type of third error of first file --
	jsonObject[0].errors[2].type; -> returns string
	
	-- Access line number of first error of first file --
	jsonObject[0].errors[0].line; -> returns integer
	
	-- Access column number of first error of first file --
	jsonObject[0].errors[0].col; -> returns integer
	
	-- Access error count for first file --
	jsonObject[0].errors.count; -> returns integer
	
	
	======= END OF EXAMPLES ======
	*/
	
	// ========== Simon add your code here! ======

	
	$(document).ready(function() {
		/*
		if(jsonObject[0].errors[0]) {
			console.log("error location "+jsonObject[0].errors[0].line);		
		}
		if(jsonObject[0].errors.count != 0) {
			console.log("there are "+jsonObject[0].errors.count+" errors");		
		}
		else {
			console.log("no errors");		
		}
		*/

		/* This order is important, setPageSource must be before setErrors! */
		for(var i = 0; i < jsonObject.filecount; i++) {
			console.log("ATTENTION!: there are "+jsonObject.filecount+" files and this file is: "+jsonObject[i].filename);
		}
		setPageSource(jsonObject[0].source, jsonObject[0].filename);
		setErrors();
		populateStatistics();
		hideChangeFile(); // if there's only one page returned, don't provide change page options
		revealSite();
	});
	
	}); // this is only ending the success() function. May want to rewrite this to make it more clear.
}