

/**
 * Returns the error message to be displayed when the user hovers over the error.
 *
 * @param  errorId  the id of the error
 * @return qtip error message
 */
function getContent(errorId) {
		linePos = $('#'+errorId).parent().index() + 1;
		console.log(linePos + " " + jsonObject[0].errors[0].line);
		for(var i = 0; i < jsonObject[0].errors.count; i++) {
			/* If this is the case, we know what error message to show */
			if(jsonObject[0].errors[i].line == linePos) {
				//alert(errors[i][1]);
				/*
					errors[i][0] - error ID (used in html generation)
					errors[i][1] - error Class (used to specify the type of error)
					errors[i][2] - error Type (text describing the category of error)
					errors[i][3] - error Line (the line the error takes place on)
					errors[i][4] - error Message (the message that appears)
				*/
				return "<p class='errorMessage'><span class='syntaxError'>"+jsonObject[0].errors[i].type+"</span>"+jsonObject[0].errors[i].message+"</p><p class='errorLine errorMessage'>Line "+linePos+"</p>";
			}
		}
		
		return "<p class='errorMessage'><span class='syntaxError'>Syntax Error</span>Not in database</p><p class='errorLine errorMessage'>Line "+linePos+"</p>";
		
}

/* Adds the error icon that is displayed on the source code page. */
function addErrorIcon() {
	//console.log("running");
	$("#pageCode").children(".linenums").children("li").children(".errorContainer").each(function () {
		console.log($(this));
		$(this).children(".errorHighlight").after("<div class='nocode testError'></div>");
	});
}