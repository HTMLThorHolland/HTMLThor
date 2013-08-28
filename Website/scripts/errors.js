

function setErrors() {
	for(var i = 0; i < jsonObject[0].errors.count; i++) {
		errorDiv = "<div class='syntaxError errorListing'>";
		errorDiv += "<p class='errorLocation'>Line "+jsonObject[0].errors[i].line+", Column "+jsonObject[0].errors[i].col+":</p>";
		errorDiv += "<p class='errorDescription'>"+jsonObject[0].errors[i].message+"</p>";
		errorDiv += "<pre>"+oldSource[jsonObject[0].errors[i].line - 1]+"</pre>";
		$('#errorsList').append(errorDiv);
	}
	if(jsonObject[0].errors.count == 0) {
		$('#errorsList').html("<p>There are no errors!</p>");
	}
}