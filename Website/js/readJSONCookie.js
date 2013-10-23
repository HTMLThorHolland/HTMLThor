
var jsonObject;
var directoryJSON = null;

if ($.cookie("dirPath")) {

	//console.log("cookie detected at: "+$.cookie("dirPath"));
	
	
	/*
	var jsonString = $.cookie("jsonObjectHtml");
	
	// fix quotations before attempting to parse
	jsonString = jsonString.replace(/\\\"/g, '"');
	jsonString = jsonString.substring(1, jsonString.length-1);
	
	var jsonObject = $.parseJSON(jsonString);
	*/
	
	var JSONpath = $.cookie("dirPath");
	//Remove Cookie TIME MMMMMMMMM
	var cookie_date = new Date ( );  // current date & time
	cookie_date.setTime (cookie_date.getTime() - 1);
	document.cookie = "dirPath" + "=; expires=" + cookie_date.toGMTString();
	
	
	JSONpath = JSONpath.substring(28, JSONpath.length-1);
	JSONdirectoryPath = JSONpath + "directory.json";
	
	$.getJSON(JSONdirectoryPath, function(response) {
		directoryJSON = response;
	})
	.success(function() {
		//console.log("Successfully loaded directory.");
	
		JSONpath += "errors.json";
		$.getJSON(JSONpath, function(response){
       		jsonObject = response;
 		})
 		.success(function() {
 			rockAndRoll();
 		});
	})
	.fail(function() {
	
		//console.log("Failed to load directory.");
		JSONpath += "errors.json";
		$.getJSON(JSONpath, function(response){
       		jsonObject = response;
 		})
 		.success(function() {
 			rockAndRoll();
 		});
	});
	
	
	
	
	// once cookie is read and parsed, it can be deleted
	// $.removeCookie("jsonObjectHtml");
	
	
	/*
	======= EXAMPLES OF USE ERRORS OBJECT ======
	
	-- Access file name of first file --
	jsonObject.filecount -> returns number of files
	
	-- Access file name of first file --
	jsonObject[0].filename -> returns String
	
	-- Access source code of first file --
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
	
	-- Access error excerpt of first error of first file --
	jsonObject[0].errors[0].errorExcerpt; -> returns string
	
	-- Access error count for first file --
	jsonObject[0].errors.count; -> returns integer
	
	
	======= END OF EXAMPLES ERRORS OBJECT ======
	
	
	======= EXAMPLES OF USE DIRECTORY OBJECT ======
	-- Access type --
	directoryJSON.type -> returns string (file, folder or brokenFile)
	
	-- Access full path --
	directoryJSON.fullPath -> returns string
	
	-- Access file name --
	directoryJSON.name -> returns string
	
	-- Access error count --
	directoryJSON.totalErrors -> returns integer
	
	-- Access first child file --
	directoryJSON.children[0] -> returns JSONObject
	
	-- Access type of first child file --
	directoryJSON.children[0].type -> returns string
	
	-- Access new location if existing --
	directoryJSON.children[0].newLocation -> returns string ### CURRENTLY NOT IMPLEMENTED! ###	
	
	======= END OF EXAMPLES DIRECTORY OBJECT ======
	*/
	
	// ========== Simon add your code here! ======

	
	
		/*
		if(jsonObject[0].errors[0]) {
			//console.log("error location "+jsonObject[0].errors[0].line);		
		}
		if(jsonObject[0].errors.count != 0) {
			//console.log("there are "+jsonObject[0].errors.count+" errors");		
		}
		else {
			//console.log("no errors");		
		}
		*/

		/* This order is important, setPageSource must be before setErrors! */
		 // THIS FUNCTION CONTROLS THE SITE AND CONTAINS THE CALLS THAT USED TO BE BELOW
		// IT'S DEFINED IN revealSite.js
	
	
	 // this is only ending the success() function. May want to rewrite this to make it more clear.
}