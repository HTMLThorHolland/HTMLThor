/* TO DO JAVADOC STYLE COMMENTING */

$(document).ready(function() {
	$('#structureContainer').html(getFiles(directory));
	createTree(); // executes JSTree
});

/* Example JSON Object that should be generated when a user uploads a directory via .zip */
var directory = [
	{ "name":"images", "id":"images_0", "type":"folder", "totalErrors":"0", "errorTypes":"", "children":
		[
			{ "name":"index.html", "id":"index.html_0", "type":"brokenFile", "totalErrors":"2", "errorTypes":
				["brokenLink","incorrectLocation"], "children":""},
			{ "name":"webloop.html", "id":"webloop.html_0", "type":"file", "totalErrors":"0", "errorTypes":["incorrectLocation"], "children":"" },
			{ "name":"testfile.html", "id":"testfile.html_0", "type":"brokenFile", "totalErrors":"2", "errorTypes":["brokenLink"], "children":"" },
			{ "name":"sub_images", "id":"sub_images_0", "type":"folder", "totalErrors":"0", "errorTypes":"", "children":
				[
					{ "name":"starlight.tif", "id":"starlight.tif_0", "type":"file", "totalErrors":"0", "errorTypes":"", "children":""}
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
			{ "incorrectLocation":"/images", "linkSuggestion":"root"}
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
			// call function to generate a broken file in the overall broken files list
			generateBrokenFile(container[i].name, container[i].totalErrors);
		}
		list += ">"; // CLOSE OPENING LI TAG
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
		list += "</li>"; // CLOSE OVERALL LI TAG
	}
	//console.log("end of loop");
	list += "</ul>";
	//console.log(list);
	return list;
}

function generateBrokenFile(name, total, location) {
	brokenFile = "<div class='structureBrokenFile'>";
	brokenFile += "<span class='brokenLinkIcon'></span>";
	brokenFile += "<p class='fileLocation'><span class='fileName'>"+name+"</span></p>";
	brokenFile += "<p class='brokenLinksNumber'>Broken Links: "+total+"</p>";
	if(location) {
		brokenFile += "<p class='fileLocationWarning'>New Location: This file should be placed in the <span class='highlight link'>/html folder</span>.</p>"
	}
	brokenFile += "<div style='clear: both'></div>";
	brokenFile += "</div>";
	$('.structureBrokenFilesList').append(brokenFile);
}


/* Function to generate the qtip error message */
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
	console.log("hover");
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

