
function getFile(id) {
	//console.log(id);
	document.getElementById(id).click();
	//console.log("clicked");
}

/* Important function that submits the singleUploadForm when the user selects a file. */
function uploadJSP(id) {
	var ext = $('#'+id).val().split('.').pop().toLowerCase();
	
	
	var fileInput = $('#'+id);
    var maxSize = fileInput.data('max-size');
	
	
	switch (id) 
		{
		case "singleUpload":
			if($.inArray(ext, ['html','htm','php','xhtml']) == -1) {
				//alert('invalid extension!: ' + ext + " please upload a html or php file");
				uploadError(id, maxSize, fileSize, ext, "extension");
				fileInput.val('');
				return false;
			}
		break;
		case "multiUpload":
			if($.inArray(ext, ['html','htm','php','xhtml']) == -1) {
				//alert('invalid extension!: ' + ext + " please upload a html or php file");
				uploadError(id, maxSize, fileSize, ext, "extension");
				fileInput.val('');
				return false;
			}
		break;
		case "zipUpload":
			if($.inArray(ext, ['zip']) == -1) {
				//alert('invalid extension!: ' + ext + " please upload a zip file");
				uploadError(id, maxSize, fileSize, ext, "extension");
				fileInput.val('');
				return false;
			}
		break;
		}
	
	// check to see if the selected file is too big
	if(fileInput.get(0).files.length){
		var fileSize = fileInput.get(0).files[0].size; // in bytes
		if(fileSize>maxSize){
			uploadError(id, maxSize, fileSize, ext, "size");
			fileInput.val('');
			return false;
		}
	}
	
	form = id+"Form";
	/* the id + "Form" must result in the container FORM id */
	document.getElementById(form).submit();
	loadingAnimation();
}

/*
 *	Accepted types: size, extension, empty
 */
function uploadError(fileInputId, maxSize, fileSize, ext, type) {
	var fileInput = $("#"+fileInputId);
	var parentId = fileInput.closest(".uploadWrapper").attr("id");
	console.log("parent id: "+parentId);
	var warningErrorMessage = "";
	var sizeType = "";
	var sizeInMB = (fileSize / (1024*1024)).toFixed(2);
	
	switch (type) 
		{
		case "size":
			switch (fileInputId) {
				case "singleUpload":
					warningErrorMessage = "THOR might be a god but any .html file over <span class='highlight'>5mb</span> is too much to handle. The file you uploaded is <span class='highlight'>"+sizeInMB+"mb</span> and is <span class='highlight'>too big.</span>";
				break;
				case "multiUpload":
					warningErrorMessage = "THOR might be a god but any .html files adding up to over <span class='highlight'>15mb</span> is too much to handle. The files you uploaded add up to <span class='highlight'>"+sizeInMB+"mb</span> and are <span class='highlight'>too big.</span>";
				break;
				case "zipUpload":
					warningErrorMessage = "THOR might be a god but any .zip over <span class='highlight'>45mb</span> is too much to handle. The file you uploaded is <span class='highlight'>"+sizeInMB+"mb</span> and is <span class='highlight'>too big.</span>";
				break;
			}
		break;
		case "extension":
			switch (fileInputId) {
				case "singleUpload":
					warningErrorMessage = "Invalid extension!: <span class='highlight'>." + ext + "</span> please upload a <span class='highlight'>.html file</span>";
				break;
				case "multiUpload":
					warningErrorMessage = "Invalid extension!: <span class='highlight'>." + ext + "</span> please upload a <span class='highlight'>.html file</span>";
				break;
				case "zipUpload":
					warningErrorMessage = "Invalid extension!: <span class='highlight'>." + ext + "</span> please upload a <span class='highlight'>.zip file</span>";
				break;
			}
		break;
		case "empty":
			warningErrorMessage = "too empty";
		break;
		}
	
	$("#"+fileInputId).qtip({
			overwrite: false,
			show: {
				event: event.type,
				ready: true
			},
			position: {
				my: 'top left',
				at: 'bottom left',
				target: $("#"+parentId)
			},
			style: { classes: 'warningTip' },
			hide: {
				event: 'unfocus'
			}, 
			content: {
				text: "<p>"+warningErrorMessage+"</p>"
			}
		});
		
	console.log("error message is: "+warningErrorMessage);
	
	// create qtip
	// incorrect file extension
	// incorrect file size
	// empty field
}