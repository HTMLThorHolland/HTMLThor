
function getFile(id) {
	//console.log(id);
	document.getElementById(id).click();
	//console.log("clicked");
}

/* Important function that submits the singleUploadForm when the user selects a file. */
function uploadJSP(id) {
	var ext = $('#'+id).val().split('.').pop().toLowerCase();
	switch (id) 
		{
		case "singleUpload":
			if($.inArray(ext, ['html','htm','php','xhtml']) == -1) {
				alert('invalid extension!: ' + ext + " please upload a html or php file");
				return;
			}
		break;
		case "multiUpload":
			if($.inArray(ext, ['html','htm','php','xhtml']) == -1) {
				alert('invalid extension!: ' + ext + " please upload a html or php file");
				return;
			}
		break;
		case "zipUpload":
			if($.inArray(ext, ['zip']) == -1) {
				alert('invalid extension!: ' + ext + " please upload a zip file");
				return;
			}
		break;
		}
	form = id+"Form";
	/* the id + "Form" must result in the container FORM id */
	document.getElementById(form).submit();
}