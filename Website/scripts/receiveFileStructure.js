/* TO DO JAVADOC STYLE COMMENTING */

$(document).ready(function() {
	$('#structureContainer').html(getFiles(directory));
	createTree(); // executes JSTree
});

/* Example JSON Object that should be generated when a user uploads a directory via .zip */
var directory = [
	{ "name":"images", "id":"images_0", "type":"folder", "errorTypes":"", "children":
		[
			{ "name":"index.html", "id":"index.html_0", "type":"file", "errorTypes":
				["brokenLink","linkSuggestion"], "children":""},
			{ "name":"webloop.html", "id":"testfile.html_0", "type":"file", "errorTypes":["linkSuggestion"], "children":"" },
			{ "name":"testfile.html", "id":"testfile.html_0", "type":"file", "errorTypes":["brokenLink"], "children":"" },
			{ "name":"sub_images", "id":"sub_images_0", "type":"folder", "errorTypes":"", "children":
				[
					{ "name":"starlight.tif", "id":"starlight.tif_0", "type":"file", "errorTypes":"", "children":""}
				]
			}
		]
	},
	{ "name":"about.html", "id":"about.html_0", "type":"file", "errorTypes":"", "children":"" }
];

var fileErrors = [
	{"id":"index.html_0", "errors":
		[
			{ "incorrectLocation":"/images", "linkSuggestion":"root"},
			{ "brokenLink":"starlight.tfi", "linkSuggestion":"images/starlight.tfi" },
			{ "brokenLink":"image.jpg", "linkSuggestion":"" }
		]
	},
	{"id":"webloop.html_0", "errors":
		[
			{ "brokenLink":"starlight.tfi", "linkSuggestion":"testLocation" },
			{ "brokenLink":"image.jpg", "linkSuggestion":"" }
		]
	},
	{"id":"testfile.html_0", "errors":
		[
			{ "brokenLink":"starlight.tfi", "linkSuggestion":"testLocation" },
			{ "brokenLink":"image.jpg", "linkSuggestion":"" }
		]
	}
];

/* Loop through each base-level item in the directory */
function getFiles(container) {
	list = "<ul>";
	for(var i = 0; i < container.length; i++) {
		//console.log("loop started with " + container[i].name + container[i].type + " i = "+i+" container length is "+container.length);
		list += "<li id='"+container[i].id+"' rel='"+container[i].type+"' "; // CREATE LI TAG WITH ID AND ITEM TYPE
		/* Check if the item contains errors */
		if(container[i].errorTypes != null && container[i].errorTypes != "") {
			list +="class='"
			for(var j = 0; j < container[i].errorTypes.length; j++){
				list += container[i].errorTypes[j] + " ";
			}
			list += "'";
		}
		list += ">"; // CLOSE FIRST LI TAG
		/* Check if the item is a folder */
		if(container[i].children != "" && container[i].children != null) {
			list += "<a href='#'>" + container[i].name + "</a>";
			//console.log(container[i].name + " has children and is a folder");
			list += getFiles(container[i].children);
		}
		else {
			list += "<a href='#'>" + container[i].name + "</a>";
			//console.log(container[i].name + " has no children and is a file");
		}
		list += "</li>"; // CLOSE LI TAG
	}
	//console.log("end of loop");
	list += "</ul>";
	//console.log(list);
	return list;
}


/* Function to generate the qtip error message */
function getFileErrors(fileId) {
	for(var i = 0; i < fileErrors.length; i++) {
		/* If this is the case, we know what error message to show */
		if(fileErrors[i].id == fileId) {
			errorMessage = "";
			incorrectLocation = "";
			brokenLinksMessage = "";
			brokenLinks = 0;
			for(var j = 0; j < fileErrors[i].errors.length; j++) {
				if(fileErrors[i].errors[j]['incorrectLocation']){
					console.log("there is an incorrectLocation");
					incorrectLocation += "<p class='incorrectLocation'>Hey this file should probably be in your <span class='fileLocation'>" + 
					fileErrors[i].errors[j].incorrectLocation + "</span> folder.</p>";
				}
				if(fileErrors[i].errors[j]['brokenLink']){
					brokenLinks ++;
					console.log("there is a brokenLink");
					brokenLinksMessage += "<p class='brokenLink'>Oops! This link is broken...  <span class='fileName'>" + fileErrors[i].errors[j].brokenLink + "</span>";
					if(fileErrors[i].errors[j]['linkSuggestion']){
						console.log("there is an incorrectLocation");
						brokenLinksMessage += " perhaps you're meant to link to <span class='fileLocation'>" + fileErrors[i].errors[j].linkSuggestion + "</span>";
					}
					brokenLinksMessage += "</p>";
				}
			}
			if(fileErrors.length == 1) {
				brokenLinksMessage = "<p>Hey, we couldn't find the file</p>" + brokenLinksMessage;
			}
			else {
				brokenLinksMessage = "<p>Hey, we couldn't find these files</p>" + brokenLinksMessage;
			}
			errorMessage = incorrectLocation + brokenLinksMessage;
			return errorMessage;
		}
	}
}

/* When the user highlights over a brokenLink a qtip is generated. */
$(document).delegate('.brokenLink', 'mouseover', function(event) {
	console.log("hover");
	$(this).qtip({
		overwrite: false,
		show: {
			event: event.type,
			ready: true
		},
		position: {
			my: 'bottom left',
			at: 'top left',
			target: $(this)
		},
		style: { classes: 'fileStructureHighlight' },
		hide: {
			event:"false"
		}, 
		content: {
			text: getFileErrors($(this).attr('id'))
		}
	});
	
	event.preventDefault();
});

