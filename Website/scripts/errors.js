
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
		brokenErrors = "";
		underScoreName = jsonObject[j].filename.replace(/\./g,"_");
		underScoreName = underScoreName.replace(/\//g,"_");
		
		var errorsArray = new Array();
		
		for(var i = 0; i < jsonObject[j].errors.count; i++) {
			errorsArray.push(jsonObject[j].errors[i]);
		}
		
		errorsArray.sort(function(a,b) { return a.line - b.line } );
		for(var i = 0; i < errorsArray.length; i++) {
			console.log("LINE@ "+errorsArray[i].line);
			var actualLineNumber = errorsArray[i].line;
			var actualColumnNumber = errorsArray[i].col + 1;
			errorType = errorsArray[i].type;
			errorDiv = "<div data-fileowner='"+jsonObject[j].filename+"' data-errorId='"+actualLineNumber+"' class='"+errorType+" errorListing "+underScoreName+"'>";
			errorDiv += "<p class='errorLocation'>Line "+errorsArray[i].line+", Column "+actualColumnNumber+":</p>";
			
			//console.log("Trying to run escapeHTML on "+jsonObject[j].errors[i]+" excerpt of: "+jsonObject[j].errors[i].errorExcerpt+" the error message is "+jsonObject[j].errors[i].message+" and the line number is "+jsonObject[j].errors[i].line);
			if(!errorsArray[i].errorExcerpt) {
				console.log("THIS IS BAD. THERE IS NO ERROR EXCERPT FOR "+errorsArray[i].message+" ON LINE "+errorsArray[i].line);
				errorsArray[i].errorExcerpt = "";
			}
			//console.log("The new error excerpt is "+jsonObject[j].errors[i].errorExcerpt);
			
			errorDiv += "<p class='errorDescription'>"+escapeHTML(errorsArray[i].message)+"</p>";
			//var noTabsError = oldSource[j][1][jsonObject[j].errors[i].line - 1].replace(/\t/g, ""); // replace all indentation with ""
			errorDiv += "<pre><span class='linePos'>"+errorsArray[i].line+".</span>"+oldSource[j][1][errorsArray[i].line - 1].replace(/\t/g, "")+"</pre></div>";
			switch (errorType)
				{
				case "html": // html should not be a case...
					//console.log(errorType);
					syntaxErrors += errorDiv;
				  break;
				case "syntax":
					//console.log(errorType);
					syntaxErrors += errorDiv;
				  break;
				case "semantic":
					//console.log(errorType);
					semanticErrors += errorDiv;
				  break;
				case "warning":
					//console.log(errorType);
					warningErrors += errorDiv;
				  break;
				case "deprecated":
					//console.log(errorType);
					deprecatedErrors += errorDiv;
				  break;
				case "broken":
					//console.log(errorType);
					brokenErrors += errorDiv;
				  break;
				}
			
		}
		
		/*
		for(var i = 0; i < jsonObject[j].errors.count; i++) {
			var actualLineNumber = jsonObject[j].errors[i].line;
			var actualColumnNumber = jsonObject[j].errors[i].col + 1;
			errorType = jsonObject[j].errors[i].type;
			errorDiv = "<div data-fileowner='"+jsonObject[j].filename+"' data-errorId='"+actualLineNumber+"' class='"+errorType+" errorListing "+underScoreName+"'>";
			errorDiv += "<p class='errorLocation'>Line "+jsonObject[j].errors[i].line+", Column "+actualColumnNumber+":</p>";
			
			//console.log("Trying to run escapeHTML on "+jsonObject[j].errors[i]+" excerpt of: "+jsonObject[j].errors[i].errorExcerpt+" the error message is "+jsonObject[j].errors[i].message+" and the line number is "+jsonObject[j].errors[i].line);
			if(!jsonObject[j].errors[i].errorExcerpt) {
				console.log("THIS IS BAD. THERE IS NO ERROR EXCERPT FOR "+jsonObject[j].errors[i].message+" ON LINE "+jsonObject[j].errors[i].line);
				jsonObject[j].errors[i].errorExcerpt = "";
			}
			//console.log("The new error excerpt is "+jsonObject[j].errors[i].errorExcerpt);
			
			errorDiv += "<p class='errorDescription'>"+escapeHTML(jsonObject[j].errors[i].message)+"</p>";
			//var noTabsError = oldSource[j][1][jsonObject[j].errors[i].line - 1].replace(/\t/g, ""); // replace all indentation with ""
			errorDiv += "<pre><span class='linePos'>"+jsonObject[j].errors[i].line+".</span>"+oldSource[j][1][jsonObject[j].errors[i].line - 1].replace(/\t/g, "")+"</pre></div>";
			switch (errorType)
				{
				case "html": // html should not be a case...
					//console.log(errorType);
					syntaxErrors += errorDiv;
				  break;
				case "syntax":
					//console.log(errorType);
					syntaxErrors += errorDiv;
				  break;
				case "semantic":
					//console.log(errorType);
					semanticErrors += errorDiv;
				  break;
				case "warning":
					//console.log(errorType);
					warningErrors += errorDiv;
				  break;
				case "deprecated":
					//console.log(errorType);
					deprecatedErrors += errorDiv;
				  break;
				case "broken":
					//console.log(errorType);
					brokenErrors += errorDiv;
				  break;
				}
		}
		*/
		
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
		if(brokenErrors != "") {
			$('#brokenErrorsContainer').addClass(underScoreName).append(brokenErrors);		
		}
	}
}


/* This function will navigate the user to the error they've clicked on from the page source section */
// fileowner == filename
function openErrorId(fileowner, errorId) {
	revealErrors(fileowner);
	//console.log("fileowner is: "+fileowner + "errorId is: "+errorId);
	$('html, body').animate({
		// scroll to the element with the correct fileowner and errorId
		scrollTop: $(".errorListing[data-fileowner='"+fileowner+"'][data-errorId='"+errorId+"']").offset().top
	}, 600);
}


function revealErrors(filename) {
	underScoreName = filename.replace(/\./g,"_");
	underScoreName = underScoreName.replace(/\//g,"_");
	$('.errorListing').not('.errorListing.'+underScoreName).hide();
	$('.errorListing.'+underScoreName).show();
	$('.errorCategory').not('.errorCategory.'+underScoreName).hide();
	$('.errorCategory.'+underScoreName).show();
	//console.log("errors revealed for: "+filename);
}