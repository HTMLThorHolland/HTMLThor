var allBrokenLinksTotal = 0;

$(document).ready(function() {
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

function generateFileStructure(object) {
	$('#structureContainer').html(getFiles(directoryJSON.children));
	createTree(); // executes JSTree
	$('#totalBroken').text(allBrokenLinksTotal);
	if(allBrokenLinksTotal != 0) {
		$('#totalBroken').addClass("broken");
	}
	if(allBrokenLinksTotal > 15) {
		$("#brokenFeedback p").text("We've detected heaps of broken links within your uploaded .zip folder. Broken links are caused when the file you're linking to can't be found.");
	}
	else if(allBrokenLinksTotal <= 15 && allBrokenLinksTotal > 5) {
		$("#brokenFeedback p").text("We've detected a lot of broken links within your uploaded .zip folder. Broken links are caused when the file you're linking to can't be found.");
	}
	else if(allBrokenLinksTotal <= 5 && allBrokenLinksTotal > 0) {
		$("#brokenFeedback p").text("We've detected a few broken links within your uploaded .zip folder. Broken links are caused when the file you're linking to can't be found.");
	}
	else {
		$("#brokenFeedback p").text("No broken links have been detected in your uploaded .zip folder. Congratulations!");
	}
	
	// NEW TESTING FOR NEW JSON OBJECT
	
}

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

/* Loop through each base-level item in the directory */
function getFiles(container) {
	//console.log("beginning structure: "+container + " first child is: "+container[0].name);
	list = "<ul>";
	for(var i = 0; i < Object.size(container) - 1; i++) { // have to - 1 as .size is returning 1 too many
		//console.log("i is: " + i + " and the object size is: " + Object.size(container) + " and the name is: "+container[i].name);
		////console.log("loop started with " + container[i].name + container[i].type + " i = "+i+" container length is "+container.length);
		
		var fullPath = container[i].fullPath.replace(/\./g,"_");
		
		list += "<li id='"+fullPath+"' rel='"+container[i].type+"' "; // CREATE LI TAG WITH ID AND ITEM TYPE
		/* Check if the item contains errors */
		//console.log("This file has a new location at: "+container[i].newLocation);
		if(container[i].totalErrors != 0) {
			// call function to generate a broken file in the overall broken files list
			if(container[i].newLocation != "") {
				generateBrokenFile(container[i].name, container[i].totalErrors, container[i].newLocation);
			}
			else {
				generateBrokenFile(container[i].name, container[i].totalErrors);
			}
			allBrokenLinksTotal += parseInt(container[i].totalErrors);
		}
		else if(container[i].newLocation != "") {
			generateBrokenFile(container[i].name, container[i].totalErrors, container[i].newLocation);
		}
		list += ">"; // CLOSE OPENING LI TAG
		/* Check if the item is a folder */
		if(container[i].children.count != 0) {
			list += "<a href='#'>" + container[i].name + "</a>";
			//console.log(container[i].name + " has children and is a folder with these children: "+container[i].children);
			list += getFiles(container[i].children);
		}
		else {
			list += "<a href='#'>" + container[i].name + "</a>";
			////console.log(container[i].name + " has no children and is a file");
		}
		list += "</li>"; // CLOSE OVERALL LI TAG
	}
	////console.log("end of loop");
	list += "</ul>";
	////console.log(list);
	return list;
}


Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


function generateBrokenFile(name, total, location) {
	brokenFile = "<div class='structureBrokenFile'>";
	brokenFile += "<span class='brokenLinkIcon'></span>";
	brokenFile += "<p class='fileLocation'><span class='fileName'>"+name+"</span></p>";
	brokenFile += "<p class='brokenLinksNumber'>Broken Links: "+total+"</p>";
	if(location) {
		brokenFile += "<p class='fileLocationWarning'>New Location: This file should be placed in the <span class='highlight'>/html folder</span>.</p>"
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

