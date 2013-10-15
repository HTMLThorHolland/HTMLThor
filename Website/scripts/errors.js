
/*
 * Iterates through the file's list of errors and populates the error tab with them.
 * Currently only works for the first file returned. Will be updated to iterate through all
 * files and display them under separate "sections" accessible through the file select dropdown.
 */
function setErrors() {
	for(var j = 0; j < jsonObject.filecount; j++) {
		syntaxErrors = "";
		semanticErrors = "";
		warningErrors = "";
		deprecatedErrors = "";
		underScoreName = jsonObject[j].filename.replace(/\./g,"_");
		for(var i = 0; i < jsonObject[j].errors.count; i++) {
			var actualLineNumber = jsonObject[j].errors[i].line;
			errorType = jsonObject[j].errors[i].type;
			errorDiv = "<div fileowner='"+jsonObject[j].filename+"' errorId='"+actualLineNumber+"' class='"+errorType+" errorListing "+underScoreName+"'>";
			errorDiv += "<p class='errorLocation'>Line "+jsonObject[j].errors[i].line+", Column "+jsonObject[j].errors[i].col+":</p>";
			errorDiv += "<p class='errorDescription'>"+jsonObject[j].errors[i].message+"</p>";
			errorDiv += "<pre><span class='linePos'>"+jsonObject[j].errors[i].line+".</span>"+oldSource[j][1][jsonObject[j].errors[i].line - 1]+"</pre></div>";
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
		if(jsonObject[j].errors.count == 0) {
			$('#errorsList').append("<div class='errorListing noErrors "+underScoreName+"'><p>There are no errors!</p></div>");
		}
		if(syntaxErrors != "") {
			$('#syntaxErrorsContainer').addClass(underScoreName).append(syntaxErrors);		
		}
		if(semanticErrors != "") {
			$('#semanticErrorsContainer').addClass(underScoreName).append(semanticErrors);		
		}
		if(warningErrors != "") {
			$('#warningErrorsContainer').addClass(underScoreName).append(warningErrors);		
		}
		if(deprecatedErrors != "") {
			$('#deprecatedErrorsContainer').addClass(underScoreName).append(deprecatedErrors);		
		}
	}
}


/* This function will navigate the user to the error they've clicked on from the page source section */
// fileowner == filename
function openErrorId(fileowner, errorId) {
	revealErrors(fileowner);
	console.log("fileowner is: "+fileowner + "errorId is: "+errorId);
	$('html, body').animate({
		// scroll to the element with the correct fileowner and errorId
		scrollTop: $(".errorListing[fileowner='"+fileowner+"'][errorId='"+errorId+"']").offset().top
	}, 600);
}


function revealErrors(filename) {
	underScoreName = filename.replace(/\./g,"_");
	$('.errorListing').not('.errorListing.'+underScoreName).hide();
	$('.errorListing.'+underScoreName).show();
	$('.errorCategory').not('.errorCategory.'+underScoreName).hide();
	$('.errorCategory.'+underScoreName).show();
	console.log("errors revealed for: "+filename);
}