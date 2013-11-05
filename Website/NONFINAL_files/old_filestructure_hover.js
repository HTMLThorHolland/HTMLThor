

/*
 *	NOWHERE NEAR COMPLETE!
 *	Create a new broken link error
 *	Enter into #brokenErrorsContainer
 */
function generateBrokenError(errorMessage, fileName, lineNumber, underScoreName) {
	errorDiv = "<div fileowner='"+fileName+"' errorId='"+actualLineNumber+"' class='"+errorType+" errorListing "+underScoreName+"'>";
	errorDiv += "<p class='errorLocation'>Line "+jsonObject[j].errors[i].line+", Column "+jsonObject[j].errors[i].col+":</p>";
	errorDiv += "<p class='errorDescription'>"+jsonObject[j].errors[i].message+"</p>";
	errorDiv += "<pre><span class='linePos'>"+jsonObject[j].errors[i].line+".</span>"+oldSource[j][1][jsonObject[j].errors[i].line - 1]+"</pre></div>";
	return errorDiv;
}

/**
 *	
 *	Function to generate the qtip error message.
 *	
 *	@param		name			String			The name of the file.
 *	@param		total			Integer			The total number of broken links associated with the file.
 *	@param		filePath		String			The file path of the file. (Based upon the uploaded .zip)
 *	@param		location		String			Optional. The suggestion for where this file should be located.	
 *	
 */
function getFileErrors(fileId) {
	for(var i = 0; i < fileErrors.length; i++) {
		/* If this is the case, we know what error message to show */
		if(fileErrors[i].id == fileId) {
			errorMessage = "";
			brokenLinks = 0;
			for(var j = 0; j < fileErrors[i].errors.length; j++) {
				if(fileErrors[i].errors[j]['brokenLink']){
					brokenLinks ++;
				}
			}
			if(brokenLinks == 1) {
				errorMessage = "<p>This file contains "+brokenLinks+" broken link.</p>";
			}
			else {
				errorMessage = "<p>This file contains "+brokenLinks+" broken links.</p>";
			}
			return errorMessage;
		}
	}
}

/* When the user highlights over a brokenLink a qtip is generated. */
$(document).delegate('.brokenLink', 'mouseover', function(event) {
	//console.log("hover");
	$(this).qtip({
		overwrite: true,
		show: {
			event: event.type,
			ready: true
		},
		position: {
			adjust: {
               screen: true // Keep the tooltip on-screen at all times
            },
			my: 'bottom left',
			at: 'top left',
			target: $(this)
		},
		style: { 
			classes: 'fileStructureHighlight',
			tip: true,
			border: {
				width: 3, 
				radius: 8, 
				color: '#646358'
			}
		},
		hide: {
			/*event:"false"*/
		}, 
		content: {
			text: getFileErrors($(this).attr('id'))
		}
	});
	
	event.preventDefault();
});

