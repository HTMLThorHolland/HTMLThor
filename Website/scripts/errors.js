
/*
 * Iterates through the file's list of errors and populates the error tab with them.
 * Currently only works for the first file returned. Will be updated to iterate through all
 * files and display them under separate "sections" accessible through the file select dropdown.
 */
function setErrors() {
	syntaxErrors = "";
	semanticErrors = "";
	warningErrors = "";
	deprecatedErrors = "";
	for(var i = 0; i < jsonObject[0].errors.count; i++) {
		errorDiv = "<div class='syntaxError errorListing'>";
		errorDiv += "<p class='errorLocation'>Line "+jsonObject[0].errors[i].line+", Column "+jsonObject[0].errors[i].col+":</p>";
		errorDiv += "<p class='errorDescription'>"+jsonObject[0].errors[i].message+"</p>";
		errorDiv += "<pre>"+oldSource[jsonObject[0].errors[i].line - 1]+"</pre></div>";
		errorType = jsonObject[0].errors[i].type;
		switch (errorType)
			{
			case "html": // html should not be a case...
				console.log(errorType);
				syntaxErrors += errorDiv;
			  break;
			case "syntax":
				console.log(errorType);
				syntaxErrors += errorDiv;
			  break;
			case "semantic":
				console.log(errorType);
				semanticErrors += errorDiv;
			  break;
			case "warning":
				console.log(errorType);
				warningErrors += errorDiv;
			  break;
			case "deprecated":
				console.log(errorType);
				deprecatedErrors += errorDiv;
			  break;
			}
	}
	if(jsonObject[0].errors.count == 0) {
		$('#errorsList').html("<p>There are no errors!</p>");
	}
	else {
		$('#errorsList').append(syntaxErrors);		
		$('#errorsList').append(semanticErrors);	
		$('#errorsList').append(warningErrors);	
		$('#errorsList').append(deprecatedErrors);	
	}
}