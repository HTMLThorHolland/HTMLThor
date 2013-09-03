
/* Important function that submits the singleUploadForm when the user selects a file. */
function uploadJSP(id) {
	form = id+"Form";
	/* the id + "Form" must result in the container FORM id */
	document.getElementById(form).submit();
}