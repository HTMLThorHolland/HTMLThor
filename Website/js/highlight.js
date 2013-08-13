
var errors = [["error1","syntaxError","Syntax Error","201","Terrible code from the database."],["error2","semanticError","Semantic Error","98","A terrible code"]];

function getContent(errorId) {
		for(var i = 0; i < errors.length; i++) {
			/* If this is the case, we know what error message to show */
			if(errors[i][0] == errorId) {
				//alert(errors[i][1]);
				/*
					errors[i][0] - error ID (used in html generation)
					errors[i][1] - error Class (used to specify the type of error)
					errors[i][2] - error Type (text describing the category of error)
					errors[i][3] - error Line (the line the error takes place on)
					errors[i][4] - error Message (the message that appears)
				*/
				return "<p class='errorMessage'><span class='"+errors[i][1]+"'>"+errors[i][2]+"</span>"+errors[i][4]+"</p><p class='errorLine errorMessage'>Line "+errors[i][3]+"</p>"
			}
		}
		
		return "couldn't find error in database";
		
}



$(document).ready(function() {


	/* When a span within #pageCode with the class of .errorHighlight is 
		hovered over, it gets its id. Soon it will show the error depending 
		on that id.
	*/
	$("#pageCode").on('mouseover', '.errorHighlight', function() {
		errorId = $(this).attr('id');
		console.log($(this).attr('id'));
		for(var i = 0; i < errors.length; i++) {
			/* If this is the case, we know what error message to show */
			if(errors[i][0] == errorId) {
				//alert(errors[i][1]);
			}
		}
	});
	
});